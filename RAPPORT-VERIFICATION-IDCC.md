# Vérification IDCC / numéros de brochure — rapport d'étape

## Méthode

Scan de l'intégralité des 982 pages du corpus (Guide-main_4.zip) pour recenser
toutes les mentions IDCC et numéro de brochure. Résultat : **265 codes IDCC
uniques mentionnés sur 504 pages**. Chaque code est vérifié sur deux sources
officielles (Légifrance + code.travail.gouv.fr, complétées par des agrégateurs
fiables comme legisocial.fr, convention.fr, editions-tissot.fr qui citent tous
la source officielle).

## Codes vérifiés CORRECTS dans cette session (en plus de tous ceux déjà
confirmés lors des lots d'agrémentation précédents — liste complète en annexe)

| Code | Brochure | Convention | Fichiers concernés (exemples) |
|---|---|---|---|
| 1483 | 3241 | Commerce de détail habillement/textile | habillement-heures-supplementaires.html |
| 3017 | 3375 | Ports et manutention | agent-quai-manutentionnaire-hs.html |
| 2128 | 3300 | Mutualité | conseiller-clientele-mutuelle-heures-supplementaires.html |
| 1351 | 3196 | Prévention et sécurité privée | technicien-alarme-securite-electronique-heures-supplementaires.html (déjà confirmé lot 6, reconfirmé ici) |

## Erreur trouvée et corrigée dans cette session

- **technicien-alarme-securite-electronique-heures-supplementaires.html** :
  la page utilisait IDCC 948 comme "convention des installateurs de sécurité"
  — **948 est en réalité un code territorial obsolète de la métallurgie de
  l'Orne**, sans aucun rapport avec la sécurité. Corrigé : le tableau
  "Paramètre/Valeur" affiche maintenant IDCC 1351 / brochure 3196 (au lieu de
  948/948), et le texte explicatif a été reformulé pour ne plus inventer une
  "convention des installateurs de sécurité" inexistante — l'alternative
  légitime pour les entreprises d'installation électrotechnique est la
  métallurgie (IDCC 3248), déjà mentionnée ailleurs sur la même page.

## Cas repéré nécessitant une décision (non tranché)

- **horticulteur-pepiniere-heures-supplementaires.html** : la page affirme
  IDCC 7018 (entreprises du paysage) pour la production de plants en
  pépinière, alors que le paysage (7018) concerne l'entretien d'espaces verts
  et non la production horticole. Le texte mentionne lui-même "IDCC 7024 ou
  horticulture IDCC 8255" en alternative. Nécessite une vérification dédiée
  avant de trancher (pas fait dans cette session, faute de temps).

## Ampleur restante

**191 codes** n'ont pas encore été vérifiés dans cette session (voir
`idcc_todo.txt` généré, trié par fréquence décroissante — les codes les plus
utilisés en premier pour maximiser l'impact de chaque vérification).

Points de vigilance déjà identifiés par simple lecture du scan, à vérifier en
priorité lors de la prochaine session :
- **agent-quai-manutentionnaire-hs.html** empile plusieurs codes dans un même
  tableau comparatif (1611, 3017, 1747, 1947, 2216, 16) — 1611 déjà confirmé
  faux (routage postal) à trois reprises sur d'autres pages, 3017 confirmé
  correct ci-dessus ; 1747, 1947 et le "16" restent à vérifier dans ce
  contexte précis (le 1747 est par ailleurs le bon code pour la librairie —
  s'il est réutilisé ici pour un magasinier, c'est très probablement une
  erreur de réutilisation du même type que celles déjà rencontrées).
- **franchise-commerce-heures-supplementaires.html** : 1501 non vérifié,
  apparaît dans 10 pages.

## Tour 2 — codes vérifiés et corrections appliquées

| Code | Brochure | Convention | Statut |
|---|---|---|---|
| 1090 | 3034 | Services de l'automobile (contrôle technique inclus) | Confirmé correct |
| 16 | 3085 | Transports routiers (couvre aussi messagerie/fret express/coursiers urbains, confirmé à 99,7% des salariés du code APE messagerie) | Confirmé correct |
| 1672 | 3265 | Sociétés d'assurances (assureurs directs — PAS les mutuelles) | Confirmé correct pour son usage propre |
| 2002 | - | Teinturerie/nettoyage (pressing) | Confirmé correct dans habillement-heures-supplementaires.html |

### Erreurs trouvées et corrigées

- **coursier-velo-livreur-hs.html** : utilisait IDCC 1694 pour "messagerie" —
  **1694 ne correspond à rien**. Corrigé en **IDCC 16** (transports routiers),
  qui couvre explicitement la messagerie, le fret express et les coursiers
  urbains selon les statistiques officielles du code APE 5229A (99,7% des
  salariés de ce code relèvent de cette convention).
- **conseiller-clientele-mutuelle-heures-supplementaires.html** : incohérence
  interne — le texte affirmait correctement IDCC 2128 (mutualité) partout,
  mais la ligne de calcul du taux horaire utilisait par erreur IDCC 1672
  (sociétés d'assurances, une convention différente pour les assureurs
  directs, pas les mutuelles). Corrigé pour cohérence avec le reste de la
  page.

## Rythme

4 codes vérifiés + 2 nouvelles erreurs corrigées dans ce tour. Il reste
environ 185 codes à vérifier.

## Prochaine étape proposée

Continuer les vérifications par lots (dans l'ordre de fréquence du fichier
`idcc_todo.txt`), en appliquant les corrections directement dans les fichiers
du corpus au fur et à mesure, sans reprendre l'agrémentation complète
(FAQ/Cas particuliers/témoignage) tant que la vérification n'est pas
terminée.

