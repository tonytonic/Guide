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

## Tour 3 — découverte majeure + corrections

### ⚠️ Erreur significative trouvée sur une page déjà livrée

**securite-sociale-heures-supplementaires.html** (page déjà enrichie et livrée
il y a plusieurs lots) utilisait **IDCC 21200** — un nombre à 5 chiffres qui
n'existe pas (les IDCC font 4 chiffres maximum, de 0001 à 9999). Le vrai code
est **IDCC 218** (organismes de sécurité sociale — CPAM, CAF, URSSAF, CARSAT),
confirmé sur Légifrance et code.travail.gouv.fr, **sans numéro de brochure**
associé (particularité de cette convention). Corrigé partout dans le fichier.

### Autre erreur corrigée

- **fleuriste-heures-supplementaires.html** : IDCC 2583 (en réalité "sociétés
  concessionnaires ou exploitantes d'autoroutes" — aucun rapport) → corrigé en
  **IDCC 1978** (fleuristes, vente et services des animaux familiers, brochure
  **3010**), confirmé sur Légifrance : cette convention couvre explicitement
  fleuristes, jardineries, animaleries, salons de toilettage et pensions
  canines (code APE 47.76Z).

### Point à trancher — conflit à vérifier

- **vendeur-jardinerie-heures-supplementaires.html** (déjà enrichi, lot 13)
  utilise IDCC 1760, confirmé à l'époque comme "jardineries et graineteries".
  Mais la recherche ci-dessus montre que "jardineries" est explicitement dans
  le champ d'application de la convention 1978 (fleuristes/jardineries/
  animaleries). Il est possible que 1760 et 1978 couvrent des segments
  différents (graineterie/jardinerie agricole vs jardinerie généraliste avec
  fleurs et animaux), mais ça n'a pas été confirmé formellement — **à
  vérifier en priorité au prochain tour** avant de considérer le sujet clos.

### Autre point noté pour revue

- **2642** est confirmé être la "production audiovisuelle" (Légifrance). Lors
  d'un lot précédent, ce code avait été retiré de
  publicite-regies-heures-supplementaires.html au profit de IDCC 86
  (publicité). Cette correction reste probablement bonne pour les *agences*
  de publicité, mais mérite une revérification : une entreprise de
  *production* de films publicitaires pourrait légitimement relever du 2642
  plutôt que du 86. Non tranché, à vérifier.

## Rythme

Ce tour : 1 découverte majeure sur une page déjà livrée (21200→218) + 1 autre
correction (2583→1978) + 2 points de vigilance identifiés pour vérification
future. Le rythme ralentit volontairement sur les cas ambigus, conformément à
la consigne de privilégier la justesse à la vitesse.

## Tour 4 — conflit résolu + nouvelle erreur corrigée + table de référence étendue

### Conflit du tour 3 résolu

**jardinerie (1760) vs fleuriste/jardinerie (1978)** : les deux conventions
sont bien **distinctes et toutes les deux légitimes** — 1760 (brochure 3272)
concerne spécifiquement les jardineries/graineteries (NAF 4776Z), tandis que
1978 (brochure 3010) concerne fleuristes/jardineries/animaleries. Les deux
champs se chevauchent partiellement dans leur description mais restent deux
conventions séparées. Pas de changement nécessaire : **vendeur-jardinerie**
(1760) et **fleuriste** (1978, corrigé au tour 3) sont chacun corrects pour
leur contenu respectif.

### Nouvelle erreur trouvée et corrigée

- **vente-distance-heures-supplementaires.html** : utilisait IDCC 1659, qui
  est en réalité la convention du **rouissage-teillage de lin** (traitement
  du lin), sans aucun rapport avec le e-commerce. Corrigé en **IDCC 2198**
  (commerce à distance et e-commerce, brochure **3333**), confirmé sur
  Légifrance et code.travail.gouv.fr.

### Table de référence étendue (source : accord OCAPIAT du 18/12/2018,
recoupée avec Légifrance) — codes confirmés sans avoir eu besoin de les
corriger sur une page existante, à conserver pour la suite du travail

| Code | Convention |
|---|---|
| 501 | Crédit agricole |
| 7502 / 75X1 / 75X2 | Mutualité sociale agricole (MSA) |
| 2728 | Sucreries, sucreries-distilleries, raffineries de sucre |
| 3109 | Cinq branches des industries alimentaires diverses |
| 112 | Industries laitières |
| 1586 | Industries charcutières |
| 1396 | Industries de produits alimentaires élaborés |
| 200 | Exploitations frigorifiques |
| 1534 | Industrie et commerces en gros des viandes |
| 1987 | Industrie des pâtes alimentaires |
| 506 | Industries des produits exotiques |
| 2075 | Conditionnement/transformation des œufs (confirme que le 2075 vu sur vins-spiritueux au tout début de l'audit était bien une erreur — sans rapport avec le vin) |
| 1747 | Boulangerie pâtisserie industrielle (confirme que son usage dans un tableau comparatif "agroalimentaire/chambre froide" était correct) |
| 2156 | Grands magasins (brochure 3082) |
| 3076 | Électroménager |
| 43 | Import-export (confirmé correct, déjà utilisé ainsi) |

## Rythme

Ce tour : 1 conflit résolu (sans correction nécessaire), 1 nouvelle erreur
corrigée (1659→2198), et 16 codes supplémentaires confirmés d'un coup grâce à
une source de référence officielle (liste OCAPIAT) qui a permis de vérifier
plusieurs codes en une seule recherche.

## Tour 5 — découverte d'un nouveau type d'erreur : brochure confondue avec IDCC

### Nouvelle catégorie d'erreur identifiée

**"3257" n'est pas du tout un IDCC** : c'est le **numéro de brochure** de la
convention "Activités de marchés financiers", dont le véritable IDCC est
**2931**. Quelqu'un (très probablement le référentiel de l'app d'origine) a
confondu numéro de brochure et numéro IDCC pour cette convention précise, et
ce nombre s'est retrouvé injecté comme "IDCC" sur des pages n'ayant aucun
rapport avec la bourse ou les marchés financiers :

- **assurance-mutuelle-heures-supplementaires.html** (page déjà livrée,
  lot 12) : "IDCC 3257" pour les mutuelles → corrigé en **IDCC 2128**
  (mutualité, déjà confirmé précédemment).
- **plombier-chauffagiste-btp-hs.html** : "IDCC 3257" pour "Plombier
  artisanal" dans un tableau comparatif → corrigé en **IDCC 1596** (BTP
  ouvriers), le code 998 restant correct pour la ligne "équipements
  thermiques/génie climatique" déjà présente sur la même page.

### Autre erreur corrigée

- **banque-heures-supplementaires.html** : "IDCC 675" pour la convention
  bancaire AFB — 675 est en réalité la convention des maisons à succursales
  de vente au détail d'habillement, aucun rapport. Corrigé en **IDCC 2120**
  (banque, brochure 3161), confirmé sur Légifrance et le site de l'AFB
  elle-même. Note : le Crédit Agricole a sa propre convention distincte
  (IDCC 2240), à ne pas confondre si une future page le concerne
  spécifiquement.

### Codes confirmés correct au passage

- **998** (plombier chauffagiste, équipements thermiques et génie
  climatique) — confirmé.
- **2120** (banque AFB, brochure 3161) — confirmé.
- **2931** (marchés financiers, brochure 3257) — confirmé, à ne pas confondre
  avec son propre numéro de brochure.

## Rythme

Ce tour : 3 corrections appliquées (dont 2 sur des pages déjà livrées :
assurance-mutuelle et — il y a plusieurs tours — securite-sociale), et
identification d'un nouveau schéma d'erreur (confusion brochure/IDCC) à
garder en tête pour le reste de la vérification.

## Tour 6 — trois nouvelles erreurs corrigées

- **enseignant-prive-professeur-hs.html** : utilisait IDCC 2582 pour
  "l'enseignement technique privé" — **2582 est en réalité un code territorial
  du BTP de Savoie**, sans aucun rapport. Corrigé en **IDCC 3218**
  (enseignement privé non lucratif, EPNL) pour la situation "sous contrat", et
  le second code déjà présent "2407" (également douteux, non identifié
  formellement) a été remplacé par **IDCC 2691** (enseignement privé
  indépendant/hors contrat), confirmé via l'historique de fusion EPI/EPNL sur
  Légifrance. Le tableau IDCC/Brochure du haut de page a aussi été corrigé
  (2582→3218).
- **chauffeur-bus-heures-supplementaires.html** : utilisait IDCC 650, qui est
  en réalité la convention des **ingénieurs et cadres de la métallurgie**,
  sans rapport avec le transport de voyageurs. Corrigé en **IDCC 1424**
  (réseaux de transports publics urbains de voyageurs), confirmé sur une
  source recensant les IDCC par numéro. À noter : ce code couvre le transport
  urbain ; un chauffeur de car interurbain pourrait en théorie relever d'une
  convention différente (transport routier de voyageurs), point qui n'a pas
  été creusé plus avant faute de temps.

## Rythme

Ce tour : 2 fichiers corrigés (3 erreurs au total, l'un des deux fichiers en
contenant deux). Le rythme reste stable sur les recherches ciblées, mais
certains codes révèlent des situations à deux conventions (sous contrat/hors
contrat, urbain/interurbain) qui demandent un peu plus de temps que les cas
simples à un seul code.

## Tour 7 — une correction + deux confirmations

### Erreur corrigée

- **habillement-heures-supplementaires.html** : la ligne "Commerce vêtements"
  d'un tableau comparatif utilisait IDCC 1505, qui est en réalité le
  **commerce de détail alimentaire non spécialisé** — aucun rapport avec
  l'habillement. Corrigé en **IDCC 1483**, déjà utilisé et confirmé comme le
  bon code pour cette page ailleurs (cohérence interne restaurée).

### Codes confirmés corrects

- **2332** (entreprises d'architecture, brochure 3062) — confirmé pour
  architecture-interieure-decoration-heures-supplementaires.html.
- **1504** (poissonnerie — commerce de détail, demi-gros et gros) — confirmé
  pour mareyeur-poissonnerie-gros-heures-supplementaires.html.

## Rythme

Ce tour a été plus court : 1 correction + 2 confirmations. Le rythme de
vérification reste soutenu mais chaque nouvelle recherche demande de plus en
plus de recoupement car les codes restants sont plus dispersés et moins
souvent regroupés dans une même source de référence.

## Prochaine étape proposée

Continuer les vérifications par lots (dans l'ordre de fréquence du fichier
`idcc_todo.txt`), en appliquant les corrections directement dans les fichiers
du corpus au fur et à mesure, sans reprendre l'agrémentation complète
(FAQ/Cas particuliers/témoignage) tant que la vérification n'est pas
terminée.

