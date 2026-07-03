# Delta depuis votre premier push (paquet « fichiers modifiés » initial)

Ces **10 fichiers** sont les seuls modifiés depuis. À décompresser par-dessus votre dépôt, puis commit/push. (Si vous aviez déjà pushé la version intermédiaire avec centres-sociaux et le _redirects définitif, ces 2 fichiers seront identiques : git n'affichera aucun diff, c'est sans risque.)

## Vague 1 — ALISFA & _redirects (pendant l'audit de l'app)
- `centres-sociaux-heures-supplementaires.html` — contingent 100 h → **60 h** (Légifrance, CCN 1261 art. 1.4 ; 100 h = CDI intermittents, nuance ajoutée en FAQ) + cellule ÉCLAT 70 h
- `_redirects` — version **DÉFINITIVE** : règle guide `/guides/* → 301` + les 4 vraies règles de l'app (`/heures`, `/paye`, `/fox`, `/module4` → 200), déployable tel quel

## Vague 2 — Pharma industrie tranchée (code.travail.gouv.fr : 220 h)
- `industrie-pharmaceutique-heures-supplementaires.html` — 145 h → **220 h** (meta, JSON-LD, FAQ ×2, tableaux, pitch M1)
- `pharma-industrie-heures-supplementaires.html` — idem (hero, comparaison chimie, pitch app)
- `pharmacie-heures-supplementaires.html` — FAQ, H2, corps, barre comparative (66 % → 100 %), meta « 145h »
- `chimie-heures-supplementaires.html` — puce « Industrie pharmaceutique · 145 h » → 220 h

## Communs aux deux vagues
- `index.html` — tuiles Centres sociaux (60 h) et Pharmacie (220h)
- `assets/search-index.js` — extraits centres-sociaux + 3 extraits pharma
- `sitemap.xml` — lastmod 2026-07-03 sur les pages retouchées
- `CORRECTIONS-AUDIT-2026-07-03.md` — changelog complété (ALISFA, _redirects définitif, pharma)

Rappel inchangé : les 5 fichiers à supprimer à la main (`Hhh`, `assets/Hhh`, `assets/img/Gg`, `search-index.js` racine, `_redirects.A-FUSIONNER.txt`) si ce n'est pas déjà fait.
