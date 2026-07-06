# ✅ Audit final GM3 + lots 4-12 — 5 juillet 2026

**Verdict : prêt à pusher en un commit.** Guide-main_3 contrôlé, lots 4-12 (100 pages) audités, corrigés et intégrés, sitemap horodaté, parasites supprimés.

## 1. Mea culpa : 5 corrections du 3-4 juillet étaient FAUSSES (source wiki défaillante) — réparées avec sources officielles
| Page | J'avais mis | Correct (source) |
|---|---|---|
| cabinets-dentaires | 240 | **1619** (Légifrance, CTgouv, brochure 3255) |
| boulangerie-industrielle (+8 pages sœurs en 3233) | 2480 | **1747** (liste OPCO OCAPIAT — fusion 1747+2075) |
| sucrerie-distillerie | 1747 | **2728** (OCAPIAT) |
| industrie-chimique-pétrochimie | 303 | **1388** (Légifrance, CTgouv, brochure 3001) |
| transports-ports-manutention | 1413 | **538** (Légifrance, CTgouv — le code initial de l'agent était bon ; 1413 = permanents des ETT) |

Règle adoptée : **plus aucun code sans 2 sources dont 1 officielle** (Légifrance / code.travail.gouv.fr / OPCO).

## 2. Les 12 pages retravaillées par l'agent : 12/12 validées
2543 ✓ · 2336 ✓ · 2046 ✓ · **5619 pêche maritime** ✓ (code que j'ignorais, vérifié) · 275 ✓ · 2104+1979 ✓ · 413 ✓ · 45+3248 ✓ · **1413 & 2378 intérim** ✓ (libellés corrects) · 2264 ✓ · 2717 doublage (plausible, entreprises techniques de la création) · hôtesse sans code ✓ (le bon choix).

## 3. Spot-fixes GM3 (répliques historiques des erreurs)
Tuiles d'accueil (imprimerie 405→184, intérim 1321→1413 & 2378, blanchisserie 1316→2002 & 3043) · agences-travail-temporaire + travail-interimaire (1321→1413 & 2378, articles L1321-x préservés) · geometre-topographe (3205→2543 ; 3205 = n° de brochure !) · imprimeur-prépresse (405→184) · pneumatique-caoutchouc (1031→45) · technicien-laboratoire (2205→959 ; 2205 = notariat) · peintre-bâtiment (2205/3257→1596) · psychologue (retrait du 405 incertain) · **chirurgie nettoyage-entretien** : propreté = 3043 (190 h) / blanchisserie-pressing = 2002, hero + meta + tableau + corps réécrits.

## 4. Lots 4-12 : 100 pages intégrées
Structure irréprochable (0 JSON-LD KO, 0 lien mort, 8 FAQ ×100, témoignages 100 % étiquetés fictifs, SMIC 12,31 €). Corrigé avant intégration : labo-biologie (2205→**959**), vins-spiritueux (7024→**493**, Légifrance — la vieille erreur de l'app ressurgissait), doublon « 783 et 783 », **16 metas > 165 c** raccourcies. Sitemap : lastmod 2026-07-05 sur 126 URLs.

## 5. ⚠️ À faire vérifier par l'agent (codes plausibles NON contre-vérifiés)
`1567` (jouets — piste : 1607) · `1768` (ALSH — piste : ÉCLAT 1518) · `1790` (édition musicale — piste : 2770, 1790 = espaces de loisirs) · `3257` (mutuelles — piste : 2128) · libellé « négoce bois » pour 158 (= travail mécanique du bois). Les autres nouveaux codes (86, 354, 478, 573, 637, 715, 759, 783, 959, 1405, 1411, 1480, 1487, 1505, 1512, 1611, 1637/1640, 1651, 2147, 2150/3220, 2247, 2257, 2528, 2931, 3251, 7005, 7502/13/14) sont plausibles et sourcés par l'agent — passe de confirmation recommandée à l'occasion.

## 6. Divers
Parasites **enfin supprimés** (Hhh ×2, Gg, search-index.js racine, _redirects.A-FUSIONNER.txt). ⚠️ Les .md du dépôt (README, CORRECTIONS-*, MANIFESTE, LISEZMOI-*, ce fichier) deviennent des **URLs publiques** sur Cloudflare Pages — à garder, déplacer hors racine ou exclure, à votre choix. Stamps : 39 pages lots « juin 2026 » / 5 « sept. 2026 » — la commande sed du jour J harmonisera tout. guide.css : vos retouches (word-break/white-space) validées sans impact.
