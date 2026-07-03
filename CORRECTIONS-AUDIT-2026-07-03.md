# ✅ Corrections appliquées suite à l'audit du 3 juillet 2026

*Toutes les modifications ci-dessous ont été appliquées automatiquement et vérifiées. 263+ fichiers touchés, sitemap mis à jour (lastmod 2026-07-03 sur 246 URLs). Sources : Légifrance, code.travail.gouv.fr, service-public.gouv.fr, DREETS.*

---

## 🔴 IDCC corrigés (croisés avec Légifrance / code.travail.gouv.fr)

**IDCC 9811 éradiqué (128 occurrences)** — 9811 = exploitations agricoles du **Tarn** (convention départementale), pas l'agriculture nationale.
- Pages agricoles (agriculture, apiculteur, ouvrier-agricole-saisonnier, ouvrier-viticole) + index + search-index : **9811 → 7024** (CCN Production agricole et CUMA du 15 sept. 2020) — 28 occ.
- 91 pages généralistes : badge « · IDCC 9811 » **retiré** du bandeau (aucun IDCC n'y avait de sens) ; `regles-hs-transport-routier-detail` → **IDCC 16**.
- 12 tableaux « Repères » : cellule IDCC 9811 → « selon la convention applicable ».
- Title + og:title cassés de la page agriculture réparés (« 2026xploitations » → « 2026 : IDCC 7024 et exploitations »).

**IDCC 1921 → 413 (39 occurrences)** — 1921 = huissiers de justice ; la CCN 66 (établissements pour personnes inadaptées et handicapées) = **413**. Corrigé sur les 8 pages médico-sociales + index + search-index. La page `huissier-commissaire-justice` conserve légitimement ses 5 mentions IDCC 1921.

**Pharmacie (43 occurrences)** — officine : **2104 → 1996** (CCN du 3 déc. 1997) ; industrie : **IDCC 216 → 176**. La page pharmacie se contredisait (FAQ/JSON-LD faux vs tableau juste) : tout est aligné. Les « 2104 » d'ascensoriste et plombier étaient des **numéros de brochure JO**, pas des IDCC → non touchés (à vérifier un jour, la valeur semble douteuse pour ces métiers).

**Coiffure : 1040 → 2596 (21 occurrences)** — 1040 = ancienne CCN ; l'actuelle « Coiffure et professions connexes » = 2596 (brochure 3159). Contingent 200 h confirmé (code.travail.gouv.fr), inchangé.

**Divers** — rédacteur web : édition « 1486/1921 » → « 1486/**2121** » (CCN de l'édition) ; meunerie : « IDCC 974 variante / 1921 » → « **IDCC 1930** » (CCN transformation des grains, brochure 3060).

## 🟠 Boulangerie : nuance 220 h / 329 h

code.travail.gouv.fr retient **220 h** pour l'IDCC 843 (l'art. 22 de la CCN renvoie aux textes légaux depuis 2002) ; le 329 h vient d'un avenant étendu de 1982, encore cité mais discuté. La page principale (title, og, meta, JSON-LD, H1, H2, intro, section, FAQ ×2), la FAQ de la boulangerie industrielle, le tableau comparatif de la boucherie et l'entrée search-index présentent désormais les **deux chiffres avec la position officielle en référence**.

## 🟡 Technique / SEO

- **Liens morts (14)** réécrits vers les pages réelles : conges-maternite-paternite, conge-paye-calcul, saisie-salaire-hs-guide, conges-evenements-familiaux, appel-jugement-prudhommal-guide, rgpd-dossier-salarie-guide, surveillance-vie-privee-travail, prescription-procedure-prudhomale-guide, syntec-heures-supplementaires.
- **Canonical corrompu** de `droit-deconnexion-hs-guide` (accent dans l'URL) réparé — 7 occ. (canonical, og:url, JSON-LD).
- Image cassée `pnj-Conscieencieux.PNG` → `pnj-Consciencieux.PNG` (page gardiennage).
- **154 bandeaux** « a jour sept. 2026 » → « **à** jour sept. 2026 ».
- `404.html` : `noindex` ajouté.
- Supprimés : `Hhh`, `assets/Hhh`, `assets/img/Gg`, `search-index.js` racine (doublon obsolète), `_redirects.A-FUSIONNER.txt`.
- `sitemap.xml` : lastmod 2026-07-03 sur toutes les pages modifiées.

## ✅ Vérifié conforme, volontairement non modifié

Syntec (130 h ETAM / 90 h modulation / 220 h cadres : déjà complet sur la page), sécurité privée 329 h (confirmé Légifrance), propreté 190 h, hospitalisation privée 130/70 h, assurance 70 h, HCR 360 h, transport 195/130/480 h, métallurgie 220 h + 80 h volontaires, tous les chiffres de droit commun (SMIC 12,31 €, 7 500 €, 11,31 %, 220 h, prescription 3 ans), et la jurisprudence Cass. 10 sept. 2025 / 7 janv. 2026.


## 🔵 Complément du 3 juillet (audit croisé avec l'application)

**ALISFA corrigé : 100 h → 60 h** — Légifrance (texte de base CCN 1261, art. 1.4) fixe le contingent à **60 heures** (100 h uniquement pour les CDI intermittents — nuance ajoutée en FAQ). L'application avait la bonne valeur ; c'est le guide qui était faux. Corrigé sur la page centres-sociaux (title, og, meta, JSON-LD, hero, H2, corps, FAQ ×2), la tuile d'accueil et search-index. Au passage, la cellule comparative « CCN Éclat 100 h/an » a été alignée sur 70 h (valeur commune app + page animation du guide).

**Industrie pharmaceutique tranchée : 145 h → 220 h** — la fiche officielle code.travail.gouv.fr (contribution/176) fixe le contingent de l'IDCC 176 à **220 heures** (droit commun) ; là encore l'application avait la bonne valeur et le guide la mauvaise. Corrigé sur les 3 pages pharma (meta, JSON-LD, FAQ ×2, tableaux, barres comparatives, pitchs), la tuile d'accueil, la puce de la page chimie et search-index.

**`_redirects` : fusion DÉFINITIVE livrée** — les règles réelles de l'application ont été extraites de son dépôt (`/heures`, `/paye`, `/fox`, `/module4` → 200, aucun catch-all) et fusionnées avec la règle guide `/guides/* → 301`. Le fichier `_redirects` de ce dossier est désormais **prêt à déployer tel quel** : l'action manuelle n°1 ci-dessous est soldée.

## ⚠️ Reste à faire à la main (1 chose)

1. **Jour J (septembre)** : après contrôle qu'aucune revalorisation SMIC n'est annoncée fin août (indice INSEE), harmoniser les bandeaux :
   `grep -rl 'à jour juin 2026' *.html | xargs sed -i 's/à jour juin 2026/à jour sept. 2026/g'`
   Et penser à incrémenter le `?v=` des assets + re-soumettre le sitemap en Search Console. Mettre une alerte **novembre 2026** : sort du PLF 2027 sur la monétisation RTT (le dispositif expire le 31/12/2026 — 12 mentions sur le site à mettre à jour selon l'issue).
