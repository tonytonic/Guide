#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PASSAGE-ANNEE.PY — fait passer le guide d'une année à la suivante (ex. 2026 → 2027)

À lancer en janvier, UNE FOIS les valeurs de la nouvelle année connues
(SMIC surtout), depuis l'onglet Actions du dépôt Guide (workflow
« Passage à la nouvelle année »). Deux temps :
  1. essai      : rien n'est modifié, un rapport liste tout ce qui changerait ;
  2. appliquer  : les fichiers sont modifiés sur une branche à part
                  (passage-AAAA), à relire avant de la fusionner.

CE QUI EST FAIT AUTOMATIQUEMENT
  A. Les repères « à jour » : <title>, description, og:/twitter:, JSON-LD
     (headline, description, name), <h1>, bandeau « Guide AAAA », tampon
     « à jour <mois> AAAA » (devient le mois du passage), dateModified.
     Seul le millésime seul change ; les dates précises (01/06/2026) et les
     textes datés (« loi de 2026 », « LFSS 2026 », « depuis 2026 »…) sont
     laissés tels quels.
  B. Les blocs d'exemple au SMIC (« Semaine type — 44 h au SMIC 2026 »,
     « Semaine de 40 h · 12,31 €/h brut ») : taux horaire, montants de chaque
     ligne et total recalculés avec le nouveau SMIC — seulement si CHAQUE
     ligne du bloc est reconnue ; sinon le bloc est listé à relire.

CE QUI N'EST PAS FAIT (listé dans le rapport, à relire à la main)
  - le texte courant (« en 2026, le plafond est de… ») ;
  - les autres valeurs datées (PASS, plafonds, forfaits) ;
  - les pages dont l'ADRESSE contient l'année (conge-naissance-2026-guide.html) :
    leur sujet est lié à cette année-là, on ne les renomme jamais (référencement).

USAGE
    python3 passage-annee.py --ancienne 2026 --nouvelle 2027 \
        [--smic 12.31:12.62] [--appliquer] [--rapport rapport.md]
"""
import argparse
import datetime
from decimal import Decimal, ROUND_HALF_UP
import glob
import html as H
import os
import re

MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre", "novembre", "décembre"]
ESP = r"(?:\s|&nbsp;|\u00a0|\u202f)"


def millesime(a):
    return re.compile(r"(?<![\d/.\-])" + a + r"(?![\d\-/])")


def protege(avant):
    """Vrai si l'année est précédée d'un texte qui la rend historique."""
    return re.search(r"(?i)(lfss|plfss|\blf\b|loi(?: de finances)?(?: de)?|décret|decret|arrêté|arrete|"
                     r"ordonnance|réforme|reforme|accord|avenant|depuis|avant|après|apres|"
                     r"(?:janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|"
                     r"octobre|novembre|décembre|decembre))\s*(?:de\s+|du\s+|d'|en\s+)?$", avant) is not None


def remplace_zone(texte, ancienne, nouvelle, compte):
    re_a = millesime(ancienne)

    def f(m):
        if protege(texte[max(0, m.start() - 40):m.start()]):
            return m.group(0)
        compte[0] += 1
        return nouvelle
    return re_a.sub(f, texte)


def zones_a(page, ancienne, nouvelle, aujourd_hui):
    """Catégorie A : repères de fraîcheur. Renvoie (page, nombre de changements)."""
    c = [0]
    mois = MOIS[aujourd_hui.month - 1]

    def sub_contenu(m):
        return m.group(1) + remplace_zone(m.group(2), ancienne, nouvelle, c) + m.group(3)

    page = re.sub(r"(<title>)(.*?)(</title>)", sub_contenu, page, flags=re.S)
    # Le contenu peut contenir une apostrophe (« de l'agent… ») : on s'arrête
    # au guillemet qui l'a ouvert, pas au premier ' ou ".
    page = re.sub(r"""(<meta\b[^>]*\b(?:name|property)=["'](?:description|og:title|og:description|twitter:title|twitter:description)["'][^>]*\bcontent=")([^"]*)(")""",
                  sub_contenu, page, flags=re.I)
    page = re.sub(r"""(<meta\b[^>]*\bcontent=")([^"]*)("[^>]*\b(?:name|property)=["'](?:description|og:title|og:description|twitter:title|twitter:description)["'])""",
                  sub_contenu, page, flags=re.I)
    page = re.sub(r"(<h1\b[^>]*>)(.*?)(</h1>)", sub_contenu, page, flags=re.S | re.I)
    page = re.sub(r"""("(?:headline|description|name|alternativeHeadline)"\s*:\s*")((?:[^"\\]|\\.)*)(")""", sub_contenu, page)
    page = re.sub(r"""(class="eyebrow[^"]*"[^>]*>)([^<]*)(<)""", sub_contenu, page)
    # Liens « chip » vers d'autres pages du guide : ils reprennent leur titre.
    page = re.sub(r"""(<a\b[^>]*class="chip"[^>]*>)([^<]*)(</a>)""", sub_contenu, page)

    def tampon(m):
        c[0] += 1
        return m.group(1) + "à jour " + mois + " " + nouvelle + m.group(2)
    page = re.sub(r"""(data-stamp=")à jour\s+[^\s·"]+\s+""" + ancienne + r"""(\s*[·"])""", tampon, page)

    def dm(m):
        c[0] += 1
        return m.group(1) + aujourd_hui.isoformat() + m.group(3)
    page = re.sub(r"""("dateModified"\s*:\s*")([^"]*)(")""", dm, page)
    return page, c[0]


# ── Blocs d'exemple au SMIC ────────────────────────────────────────────────
NUM = r"(\d+(?:[,.]\d+)?)"
L_NORMALES = re.compile(r"^" + NUM + r"\s*h\s+(?:normales|contractuelles)(?:\s+au SMIC)?(?:\s*·\s*" + NUM + r"\s*€/h)?$")
L_MAJ = re.compile(r"^" + NUM + r"\s*(?:h|HS|h compl\.)\b.*?à\s*\+" + NUM + ESP + r"*%$")


def f2(x):
    return float(str(x).replace(",", "."))


def euro(v, modele):
    """Même écriture que le montant d'origine (virgule ou point, espace insécable)."""
    s = "%.2f" % v
    if "," in modele.split("€")[0]:
        s = s.replace(".", ",")
    suffixe = "&nbsp;€" if "&nbsp;€" in modele else " €"
    return s + suffixe


def centime(x):
    return float(Decimal(repr(x)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))


def montant(txt):
    t = H.unescape(txt).replace("\u00a0", " ").replace("€", "").replace(" ", "").replace(",", ".")
    try:
        return float(t)
    except ValueError:
        return None


def bloc_smic(bloc, ancienne, nouvelle, t_anc, t_nouv):
    """Recalcule un bloc « ex » au SMIC. Renvoie (bloc, 'ok'|'ignore'|raison)."""
    if not re.search(r"SMIC" + ESP + r"*" + ancienne + "|" + re.escape(t_anc.replace(".", ",")) + ESP + r"*€/h", bloc):
        return bloc, "ignore"
    lignes = re.findall(r'<div class="ex-line"><span class="h">(.*?)</span><span class="amt">(.*?)</span></div>', bloc)
    if not lignes:
        return bloc, "aucune ligne"
    taux = f2(t_nouv)
    t0 = f2(t_anc)
    nouveaux = []
    for h, amt in lignes:
        hs = H.unescape(h).replace("\u00a0", " ").strip()
        hs = re.sub(r"\s+", " ", hs)
        m = L_NORMALES.match(hs)
        if m:
            if m.group(2) and abs(f2(m.group(2)) - f2(t_anc)) > 0.001:
                return bloc, "taux horaire différent du SMIC : « " + hs + " »"
            nouveaux.append((h, amt, f2(m.group(1)), 0.0))
            continue
        m = L_MAJ.match(hs)
        if m:
            nouveaux.append((h, amt, f2(m.group(1)), f2(m.group(2))))
            continue
        return bloc, "ligne non reconnue : « " + hs + " »"
    # Contrôle : avec l'ANCIEN SMIC, on doit retrouver les montants écrits dans
    # la page, au centime près. Sinon le bloc repose sur autre chose (taux
    # conventionnel, prime, calcul particulier) : on n'y touche pas.
    for h, amt, heures, maj in nouveaux:
        attendu = montant(amt)
        if attendu is None or abs(centime(heures * t0 * (1 + maj / 100)) - attendu) > 0.011:
            return bloc, "montant non retrouvé avec l'ancien SMIC : « " + re.sub(r"<[^>]+>", "", H.unescape(h)) + " » = " + H.unescape(amt).strip()
    out = bloc
    total = 0.0
    for h, amt, heures, maj in nouveaux:
        v = centime(heures * taux * (1 + maj / 100))
        total += v
        nh = h.replace(t_anc.replace(".", ","), t_nouv.replace(".", ","))
        out = out.replace('<span class="h">' + h + '</span><span class="amt">' + amt + '</span>',
                          '<span class="h">' + nh + '</span><span class="amt">' + euro(v, amt) + '</span>', 1)
    mt = re.search(r'(<div class="ex-total"><span class="lbl">[^<]*</span><span class="amt">)(.*?)(</span>)', out)
    if mt:
        attendu_total = montant(mt.group(2))
        somme_ancienne = sum(centime(hh * t0 * (1 + mm / 100)) for _, _, hh, mm in nouveaux)
        if attendu_total is None or abs(somme_ancienne - attendu_total) > 0.021:
            return bloc, "total différent de la somme des lignes : " + H.unescape(mt.group(2)).strip()
        out = out[:mt.start(2)] + euro(centime(total), mt.group(2)) + out[mt.end(2):]
    out = out.replace(t_anc.replace(".", ",") + " €/h", t_nouv.replace(".", ",") + " €/h")
    out = re.sub(r"(SMIC" + ESP + r"*)" + ancienne, r"\g<1>" + nouvelle, out)
    return out, "ok"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--racine", default=".")
    ap.add_argument("--ancienne", required=True)
    ap.add_argument("--nouvelle", required=True)
    ap.add_argument("--smic", help="ancien:nouveau taux horaire brut, ex. 12.31:12.62")
    ap.add_argument("--appliquer", action="store_true")
    ap.add_argument("--rapport", default="rapport-passage.md")
    args = ap.parse_args()
    auj = datetime.date.today()
    t_anc = t_nouv = None
    if args.smic:
        t_anc, t_nouv = [x.strip().replace(",", ".") for x in args.smic.split(":")]
        t_anc, t_nouv = "%.2f" % float(t_anc), "%.2f" % float(t_nouv)

    re_a = millesime(args.ancienne)
    tot_a = pages_a = blocs_ok = 0
    modifiees = []
    exclues, blocs_a_revoir, restes = [], [], []
    for chemin in sorted(glob.glob(os.path.join(args.racine, "**", "*.html"), recursive=True)):
        rel = os.path.relpath(chemin, args.racine)
        if rel.startswith((".", "_")) or "/." in rel:
            continue
        if args.ancienne in os.path.basename(rel):
            exclues.append(rel)
            continue
        page = open(chemin, encoding="utf-8").read()
        nouvelle_page, n = zones_a(page, args.ancienne, args.nouvelle, auj)
        if t_anc:
            def f(m):
                nonlocal blocs_ok
                b, etat = bloc_smic(m.group(0), args.ancienne, args.nouvelle, t_anc, t_nouv)
                if etat == "ok":
                    blocs_ok += 1
                elif etat != "ignore":
                    blocs_a_revoir.append((rel, etat))
                return b
            nouvelle_page = re.sub(r'<div class="ex">.*?</div>\s*(?=</section>)', f, nouvelle_page, flags=re.S)
        if n:
            tot_a += n
            pages_a += 1
        # Ce qui reste : mentions de l'ancienne année dans le texte visible
        corps = re.sub(r"<script(?![^>]*ld\+json)[^>]*>.*?</script>|<style.*?</style>|<!--.*?-->", " ", nouvelle_page, flags=re.S | re.I)
        for m in re_a.finditer(corps):
            avant = re.sub(r"<[^>]+>", " ", corps[max(0, m.start() - 90):m.start()])
            if protege(avant[-40:]):
                continue
            ctx = re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", corps[max(0, m.start() - 90):m.end() + 50]))).strip()
            restes.append((rel, ctx))
        if nouvelle_page != page:
            modifiees.append(rel)
            if args.appliquer:
                open(chemin, "w", encoding="utf-8").write(nouvelle_page)

    # Index de recherche : titres, h1 et extraits reprennent ceux des pages.
    idx_n = 0
    for nom in ("assets/search-index.js", "search-index.js"):
        chemin = os.path.join(args.racine, nom)
        if not os.path.isfile(chemin):
            continue
        t = open(chemin, encoding="utf-8").read()
        c = [0]
        t2 = re.sub(r'("(?:title|h1|excerpt)"\s*:\s*")((?:[^"\\]|\\.)*)(")',
                    lambda m: m.group(1) + remplace_zone(m.group(2), args.ancienne, args.nouvelle, c) + m.group(3), t)
        idx_n += c[0]
        if args.appliquer and t2 != t:
            open(chemin, "w", encoding="utf-8").write(t2)
    # Plan du site : date de mise à jour des pages modifiées (signal pour Google).
    sm_n = 0
    chemin = os.path.join(args.racine, "sitemap.xml")
    if os.path.isfile(chemin):
        t = open(chemin, encoding="utf-8").read()
        slugs = {re.sub(r"\.html$", "", r).replace(os.sep, "/") for r in modifiees}
        slugs |= {"" for r in modifiees if r == "index.html"}

        def lm(m):
            nonlocal sm_n
            slug = m.group(2).split("simulateurheuressupfrance.fr/", 1)[-1].rstrip("/")
            if slug in slugs:
                sm_n += 1
                return m.group(1) + auj.isoformat() + m.group(4)
            return m.group(0)
        t2 = re.sub(r"(<url><loc>([^<]*)</loc><lastmod>)([^<]*)(</lastmod>)", lm, t)
        if args.appliquer and t2 != t:
            open(chemin, "w", encoding="utf-8").write(t2)

    L = ["# Passage " + args.ancienne + " → " + args.nouvelle + " — " + ("APPLIQUÉ" if args.appliquer else "ESSAI (rien n'a été modifié)"), "",
         "- Repères « à jour » remplacés : **%d** dans **%d** pages" % (tot_a, pages_a),
         ("- Blocs « au SMIC » recalculés (%s € → %s €) : **%d** · à relire : **%d**" % (t_anc.replace(".", ","), t_nouv.replace(".", ","), blocs_ok, len(blocs_a_revoir))) if t_anc else "- Blocs « au SMIC » : non traités (pas de --smic)",
         "- Index de recherche : **%d** titres/extraits mis à jour · plan du site : **%d** dates de mise à jour" % (idx_n, sm_n),
         "- Pages non touchées car l'année est dans leur adresse : **%d**" % len(exclues),
         "- Mentions restantes à relire dans le texte : **%d**" % len(restes), ""]
    if blocs_a_revoir:
        L += ["## Blocs d'exemple à relire à la main", ""] + ["- `%s` : %s" % x for x in blocs_a_revoir] + [""]
    if exclues:
        L += ["## Pages dont l'adresse contient " + args.ancienne + " (non modifiées)", ""] + ["- `%s`" % x for x in exclues] + [""]
    if restes:
        L += ["## Mentions restantes dans le texte", ""]
        for rel, ctx in restes:
            L.append("- `%s` : …%s…" % (rel, ctx))
    open(args.rapport, "w", encoding="utf-8").write("\n".join(L) + "\n")
    print("\n".join(L[:8]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
