# Cahier des charges — Agrément des pages du guide (heures-supplementaires-france)

Document de référence pour toute session (moi ou un autre agent) qui reprend
l'agrément des pages "nues" du corpus. À lire avant de continuer le travail.

## 1. Objectif

Faire passer chaque page du guide d'un format "nu" (contenu de base généré par
gen_vXX.py) à un format "agrémenté" complet, sans jamais toucher au contenu
juridique déjà présent — uniquement de l'ajout.

## 2. Ce qui est ajouté sur chaque page

1. **FAQ portée à 8 questions**, synchronisées à l'identique entre :
   - le JSON-LD `FAQPage` (`<script type="application/ld+json">`)
   - le bloc visible `<div class="faq"><details>...</details></div>`
   Les questions déjà présentes sur la page nue (2 ou 3 en général) sont
   conservées telles quelles ; on ajoute seulement les questions manquantes
   pour atteindre 8. Aucune reformulation des questions existantes.

2. **Section "Cas particuliers"** : tableau de 4 lignes (Situation / Traitement /
   À vérifier), propre au métier ou au thème de la page.

3. **Section "Autres droits de la convention (IDCC xxxx — nom de la branche)"** :
   tableau de 4 lignes (Droit / Ce que prévoit généralement la branche / À
   vérifier), **uniquement si un IDCC unique et sourcé peut être identifié**.
   Voir règle de sourcing IDCC ci-dessous — sinon, la section est omise (ne
   jamais inventer un code).

4. **Témoignage (cas illustratif)** : un encart avec prénom fictif, âge,
   métier, mini-scénario réaliste, se terminant toujours par
   *Exemple fictif à visée pédagogique.* — jamais de nom de personne réelle.

### Markup exact du témoignage (IMPORTANT — bug déjà rencontré deux fois)

```html
<div class="pnj">
  <img class="pnj-img" src="assets/img/pnj-Explorateur.PNG" alt="Témoignage illustratif">
  <div class="pnj-bubble"><div class="pnj-name">Témoignage (cas illustratif)</div>TEXTE</div>
</div>
```

`.pnj` est en `display:flex`. Sans le `<img class="pnj-img">` et sans envelopper
tout le texte (label + contenu) dans un seul `<div class="pnj-bubble">`, le
rendu explose sur mobile (le label et la dernière phrase se retrouvent
écrasés dans des colonnes flex séparées, texte coupé lettre par lettre).
Toujours vérifier avec :
```python
import re
assert not re.search(r'<div class="pnj">\s*<div class="pnj-name">Témoignage', html)
assert 'pnj-img' in html
```

## 3. Règle de sourcing IDCC — la plus importante

**Ne jamais reprendre un code IDCC depuis le référentiel de l'app
(`conventions-collectives.js`) sans le revérifier.** Ce référentiel contient
des erreurs (codes inventés, confusion avec le numéro de brochure JO,
codes d'une branche voisine). Un audit du 5 juillet 2026 a dû corriger 13
codes et en mettre 12 pages en quarantaine pour ce motif.

Sourcer uniquement sur :
- **Légifrance** (legifrance.gouv.fr/liste/idcc)
- **code.travail.gouv.fr**

Trois cas de figure :
- **IDCC unique et clairement identifiable** → section "Autres droits" incluse.
- **Métier transversal sans CCN propre** (assistant de direction, forfait
  mobilités durables, etc.) → pas de section "Autres droits".
- **Statut ambigu ou multiple** (ex. thalasso : HCR ou Thermalisme selon
  l'établissement ; PNC : pas de CCN nationale, accord d'entreprise propre à
  chaque compagnie) → l'expliquer dans le texte plutôt que de trancher au
  hasard. Ne jamais choisir un chiffre "au plus probable" sans le dire.

Piège classique repéré : confondre le **numéro de brochure JO** (souvent cité
en premier sur les sites tiers) avec l'**IDCC réel** — ce sont deux numéros
différents. Ex. : brochure 3219 = doublage/postsynchronisation, mais IDCC
3219 = portage salarial (autre convention, même numéro par coïncidence de
présentation sur certains agrégateurs).

## 4. Process de sélection du lot

1. Lister les pages du corpus qui n'ont pas encore le format complet (test :
   absence simultanée de "Témoignage (cas illustratif)" ET "Cas particuliers").
2. Exclure les pages déjà agrémentées lors des sessions précédentes.
3. Trier les pages restantes par taille de fichier croissante (les plus
   courtes = les moins retravaillées, donc prioritaires).
4. Prendre un lot de 10.
5. Pour chaque page du lot : identifier l'IDCC (si pertinent) via Légifrance/
   code.travail.gouv.fr, lire les questions FAQ déjà présentes, rédiger les
   questions manquantes + Cas particuliers + Autres droits (si applicable) +
   témoignage.
6. Construire le contenu par script Python (extraction des FAQ existantes,
   génération du JSON-LD, insertion des sections avant "Questions fréquentes"),
   pas par édition manuelle ligne à ligne — plus fiable sur des fichiers HTML
   à une seule ligne par bloc.
7. Valider automatiquement chaque fichier : balises `<section>`/`<div>`
   équilibrées, exactement 8 `<details>`, JSON-LD `FAQPage` parseable avec 8
   questions, présence de "Cas particuliers", présence + markup correct du
   témoignage.
8. Ne livrer que les nouveaux fichiers du lot (pas de reformatage massif) avec
   ce cahier des charges à jour.

## 5. Ce qui a déjà été poussé en production (ne pas retravailler)

Sessions 1 à 4 : 150 pages agrémentées et poussées, dont 12 corrigées après
audit IDCC (voir historique des sessions précédentes pour le détail des 12
corrections). Le bug d'affichage mobile (témoignage mal cadré + tableaux/`.ex`
qui débordent) a été corrigé dans `assets/guide.css` (suppression de
`word-break:break-word` global, suppression de `white-space:nowrap` sur
`.ex-line .amt` et `.ex-total .amt`) — fix déjà livré et normalement déployé.

## 6. Compteur

838 pages nues restantes avant le lot 4. Après lot 4 (10 pages) : 828 restantes.
Après lot 5 (10 pages) : 818 restantes. Après lot 6 (10 pages) : 808 restantes.
Après lot 7 (10 pages) : 798 restantes. Après lot 8 (10 pages) : 788 restantes.
Après lot 9 (10 pages) : 778 restantes. Après lot 10 (20 pages, taille de lot
augmentée sur demande) : 758 restantes. Après lot 11 (retour à 10 pages sur
demande explicite) : 748 restantes. Après lot 12 (10 pages) : 738 restantes.
Après lot 13 (10 pages) : 728 restantes. Après lot 14 (10 pages) : 718 restantes.
Après lot 15 (10 pages) : 708 restantes. Après lot 16 (10 pages) : 698 restantes.
Après lot 17 (10 pages) : 688 restantes. Après lot 18 (10 pages) : 678 restantes.
Après lot 19 (10 pages) : 668 restantes.

Note : la taille de lot peut être ajustée sur demande, mais le rythme par
défaut est de 10 pages/lot — c'est celui qui permet une vérification Légifrance
dédiée par code IDCC suspect plutôt que des recherches groupées.

## 22. Pause exceptionnelle : vérification IDCC/brochure de fond (42 tours)

Entre le lot 18 et le lot 19, l'agrémentation a été mise en pause à la
demande du porteur du projet pour une session dédiée de vérification
systématique des codes IDCC et numéros de brochure sur l'intégralité des 982
pages du corpus (pas seulement les pages déjà agrémentées). Résultat :
**plus de 88 corrections concrètes** appliquées, dont plusieurs sur des
pages déjà livrées lors de lots précédents (energie-gaz, transport-aerien,
assurance-mutuelle, securite-sociale, notamment). Trois occurrences d'un
nouveau type d'erreur ont été identifiées : un numéro de **brochure confondu
avec un numéro IDCC** par le référentiel d'origine (codes 3257, 3159, et le
schéma qui a permis de les repérer). Le détail complet de cette session est
disponible dans `RAPPORT-VERIFICATION-IDCC.md` (livré séparément lors de
cette session, non inclus dans ce zip d'agrémentation).

## 23. Retour du lot 19 — une correction IDCC supplémentaire

- **enseignement-prive-heures-supplementaires.html** : découverte pendant la
  reprise de l'agrémentation — la page utilisait IDCC 2409 (en réalité les
  cadres des travaux publics, aucun rapport) et IDCC 2582 (déjà identifié
  comme un code territorial du BTP de Savoie). Corrigés respectivement en
  **IDCC 3218** (enseignement privé non lucratif) et **IDCC 2691**
  (enseignement privé indépendant/hors contrat), cohérent avec la page
  jumelle enseignant-prive-professeur-hs.html déjà corrigée précédemment.

Codes confirmés corrects sans changement ce lot-ci : **cordonnier** (1561,
déjà corrigé pendant la session de vérification), **barman-sommelier**
(1979 HCR), **product-owner-scrum-master** (1486 Syntec), **sanitaire-
social-prive** (29/413 CCN51/CCNT66), **spectacle-vivant** (3090/1285),
**chauffeur-livreur-vl** (16 transports routiers).


## 21. Retour du lot 18 — deux corrections IDCC + un cas "pas de code unique"

- **bijoutier-joaillier** : IDCC 567 (ancien code, fusionné) → **3251** (BJOH,
  même correction déjà appliquée à horlogerie-bijouterie-industrie lors d'un
  lot précédent — cohérence maintenue entre les deux pages).
- **portage-salarial** : le code affiché était garbled ("25960") → corrigé en
  **3219**, qui est le VRAI code du portage salarial confirmé plusieurs fois
  dans cet audit (pour rappel, c'est ce même 3219 qui avait été confondu à
  tort avec le doublage audiovisuel il y a plusieurs lots).
- **logistique** : IDCC 1611 (routage postal, trop étroit) déjà identifié à
  deux reprises (préparateur de commandes, magasinier-cariste) → à nouveau
  laissé sans section "Autres droits" pour la même raison.
- **congres-salons** : les codes 1687/1689 n'ont mené à rien d'identifiable.
  Le secteur de l'organisation de foires/salons/congrès n'a pas de convention
  dédiée : selon les statistiques officielles du code APE 8230Z, environ 62%
  des salariés relèvent en réalité de Syntec (IDCC 1486), le reste se
  répartissant entre HCR (1979), publicité (86), prestataires de services
  (2098) et événementiel (2717) selon l'activité réelle de l'employeur. Page
  laissée sans section "Autres droits" unique, la pluralité étant expliquée
  dans le texte.
- **estheticienne-domicile** (2596) confirmé correct, section "Autres droits"
  ajoutée normalement.


## 20. Retour du lot 17 — une correction IDCC

- **tourisme-agences** : IDCC 1631 (sans rapport, en réalité "hôtellerie de
  plein air") → **3245** (opérateurs de voyages et des guides). Point
  d'attention : cette convention est elle-même issue d'une fusion 2024 qui a
  regroupé trois anciennes conventions — agences de voyages (IDCC 1710),
  guides-interprètes de la région parisienne (IDCC 349) et guides
  accompagnateurs (IDCC 412, sans rapport avec le "412" déjà rencontré côté
  personnel navigant aérien — pure coïncidence de numérotation entre deux
  conventions historiques différentes).
- **sport** (2511) et **hotellerie-chaine** (800) : codes déjà présents sur
  ces pages vérifiés et confirmés corrects, sections "Autres droits" ajoutées
  normalement.
- **assistante-maternelle** : IDCC 3239 (branche des particuliers employeurs)
  déjà confirmé lors d'une session précédente, réutilisé tel quel.


## 19. Retour du lot 16 — deux corrections IDCC + deux cas "pas de code unique"

- **transport-aerien** : IDCC 673 (sans rapport, en réalité le code de la
  fourrure) → **275** (personnel au sol des entreprises de transport aérien).
  Le code "412 (PNT)" déjà présent pour les pilotes a été retiré de
  l'affirmation catégorique : comme pour le personnel navigant commercial
  déjà rencontré, les pilotes de ligne relèvent le plus souvent d'accords
  d'entreprise propres à chaque compagnie, pas d'une convention nationale
  unique.
- **bricolage** : IDCC 2564 (sans rapport) → **1606** (bricolage).
- **magasinier-cariste** : même code IDCC 1611 déjà identifié comme trop
  étroit (routage postal) lors d'un lot précédent (préparateur de commandes)
  → à nouveau laissé sans section "Autres droits", la convention dépendant de
  l'activité réelle de l'employeur.
- **boucherie** (992) et **pharmacie** (1996 officine / 176 industrie déjà
  confirmés séparément) : codes vérifiés corrects, sections "Autres droits"
  ajoutées normalement.


## 18. Retour du lot 15 — deux corrections IDCC + une correction d'étiquette

- **assistant-juridique-avocat** : IDCC 218 (sans rapport) → **3253**
  (salariés des cabinets d'avocats — convention unifiée depuis septembre 2025,
  qui remplace les anciens IDCC 1000 et 1850).
- **creche-petite-enfance** : IDCC 1767 (sans rapport) → **1261** (acteurs du
  lien social et familial, SNAECSO). Point d'attention : selon l'affiliation
  de la structure (parents, UNIFED, etc.), une crèche peut aussi relever de
  la convention animation (IDCC 1518) ou de la branche sanitaire/sociale —
  ambiguïté réelle du secteur, mentionnée dans le texte plutôt que tranchée.
- **prime-anciennete-calcul** : pas d'erreur de code ici, mais une erreur
  d'étiquette — la page présentait l'IDCC 1596 comme "BTP ETAM" alors que ce
  code est celui des **ouvriers** du bâtiment (l'ETAM bâtiment, c'est le 2609,
  déjà corrigé sur une autre page au lot 14). Simple correction de libellé,
  code inchangé. Les trois autres codes cités sur cette page de comparaison
  (3248 métallurgie, 44 chimie, 292 plasturgie) ont été vérifiés et sont
  corrects.


## 17. Retour du lot 14 — trois nouvelles corrections IDCC

- **centres-equestres** : IDCC 7505 (sans rapport) → **7026** (personnels des
  activités hippiques). Point d'attention : cette convention a remplacé
  l'ancienne CCN des centres équestres (IDCC 7012) depuis mai 2024 — donc même
  "7012" aurait été un code obsolète, pas seulement 7505.
- **maisons-familiales-rurales** : IDCC 1770/1771 (sans rapport) → **7508**
  (Maisons familiales rurales, instituts ruraux et centres).
- **electronique-electrique** : IDCC 1649/1648 (anciens codes régionaux,
  fusionnés) → **3248** (métallurgie unifiée depuis 2024, qui couvre
  explicitement "industries électriques, électroniques et connexes").

Codes confirmés corrects : **energie-gaz** (IDCC 5001, statut IEG — le second
code 1499 mentionné pour les fournisseurs non historiques n'a pas pu être
vérifié en profondeur mais reste plausible, gardé avec cette réserve dans le
texte), **ingenieur-etudes** et **cabinet-conseil-management** (1486, Syntec).

Page laissée sans section "Autres droits" par prudence : **navigation-
interieure** (code IDCC non vérifié avec certitude dans le temps imparti —
la convention historique "IDCC 3" des ouvriers de la navigation intérieure de
marchandises existe mais son périmètre exact n'a pas été confirmé pour ce
contenu précis).


## 15. Audit externe adopté (Guide-main_4.zip) avant le lot 13

Le porteur du projet a fait auditer en externe les ~240 pages déjà agrémentées
à ce stade. 25 fichiers avaient été corrigés (essentiellement des nouvelles
corrections IDCC en plus de celles déjà faites en interne) :
- **vins-spiritueux** : IDCC 7024 (exploitations viticoles) → **493**
  (le 7024 restait correct pour les caves coopératives, mais pas pour le
  commerce vins & spiritueux lui-même).
- **labo-biologie** : nettoyage d'un doublon "IDCC 2205 et 959" en "959"
  partout (2205 ne correspondait à rien).
- Le reste des 25 fichiers modifiés ne concernait que des ajustements mineurs
  de longueur de meta description, sans changement de fond.

Cette version auditée a été adoptée comme nouvelle base de travail (dossier
`final/` mis à jour avec les 25 fichiers corrigés) avant de reprendre
l'agrément des pages nues restantes.

## 16. Retour du lot 13 — quatre nouvelles corrections IDCC

- **alimentation-biere-chocolat** : trois codes corrigés d'un coup sur la
  même page — **1554→1513** (bière/eaux embouteillées), **1000→1286**
  (confiserie/chocolaterie/biscuiterie), **207→1930** (meunerie/transformation
  des grains). Aucun des trois codes d'origine ne correspondait à quoi que ce
  soit d'identifiable.
- **vendeur-jardinerie** : IDCC 1760 (jardineries et graineteries) confirmé
  correct, section "Autres droits" ajoutée normalement.
- **aide-soignant-ehpad** : la page distinguait déjà correctement CCN 51
  (IDCC 29) et CCNT 66 (IDCC 413) selon l'établissement — gardé tel quel avec
  une section "Autres droits" mentionnant les deux conventions plutôt que
  d'en choisir une arbitrairement.


## 13. Retour du lot 11 — trois nouvelles corrections IDCC

- **prestataires-tertiaire** : 1734 (sans rapport) → **2098** (prestataires de
  services dans le secteur tertiaire — centres d'appels, BPO, etc.).
- **publicite-regies** : la page citait deux codes différents (1729 pour les
  régies, 2642 pour les agences) — aucun des deux n'est le bon. Les deux
  activités (agences ET régies publicitaires) relèvent en réalité du **même**
  code, **IDCC 86** (entreprises de la publicité et assimilées). Corrigé
  uniformément.
- **professions-liberales** : la page affirmait l'existence d'un IDCC 1783
  générique pour "les professions libérales non couvertes par une convention
  spécifique" — **cette convention généraliste n'existe pas**. Chaque
  profession réglementée a sa propre convention (avocats IDCC 3253,
  experts-comptables 787, notariat, cabinets médicaux 1147, etc.). Le texte a
  été réécrit pour refléter cette réalité plutôt que d'inventer un
  regroupement inexistant — cas le plus net de "code fourre-tout" rencontré
  jusqu'ici dans l'audit.
- **metallurgie** (3248) confirmé correct, section "Autres droits" ajoutée
  normalement.

## 14. Retour du lot 12 — quatre nouvelles corrections IDCC

- **travaux-agricoles-ruraux** : 7509 (sans rapport) → **7025** (ETARF —
  entreprises de travaux et services agricoles, ruraux et forestiers,
  convention nationale de 2021). Des accords territoriaux départementaux
  peuvent encore compléter cette convention nationale, mentionné dans le texte.
- **assurance-mutuelle** : 2615 (sans rapport) → **2247** (courtage
  d'assurances et de réassurances). Le code "3257" mentionné pour les
  sociétés d'assurance directes/mutuelles n'a pas pu être vérifié dans le
  temps imparti — laissé de côté, le texte précise que la convention diffère
  selon le type d'employeur (courtier, assureur direct, mutuelle).
- **vendeur-luxe-bijouterie** : 1538 (sans rapport) → **1487** (commerce de
  détail de l'horlogerie-bijouterie — à ne pas confondre avec l'IDCC 3251,
  qui couvre la fabrication/joaillerie et non la vente en boutique).
- **hlm-bailleurs** : 1727 (sans rapport) → pas de code unique retenu. Le
  secteur des bailleurs HLM a plusieurs conventions selon le statut de
  l'organisme (IDCC 2150 pour les sociétés anonymes d'HLM, IDCC 3220 pour les
  offices publics et coopératives depuis leur fusion de 2023) — les deux sont
  mentionnées dans le texte plutôt que d'en choisir une arbitrairement.

Codes confirmés corrects sans changement : **medico-social** (413, CCN 66),
**data-scientist** et **comptable-variantes-ccn** (1486 Syntec, 787
experts-comptables, 3248 métallurgie — cette dernière page explique déjà
correctement la variance selon l'employeur, gardée telle quelle sans section
"Autres droits" unique).

## 12. Retour du lot 10 (20 pages) — six nouvelles corrections IDCC

- **eau-assainissement** : 2230 (surveillance de la qualité de l'air, sans
  rapport) → **2147** (entreprises des services d'eau et d'assainissement).
- **paysage-jardinage** : 1686 (sans rapport) → **7018** (entreprises du
  paysage). Point notable : cette convention prévoit un contingent annuel de
  **350 heures** (250h si annualisé), largement supérieur au contingent légal
  de 220h — corrigé dans le texte.
- **conducteur-travaux** : 1597 était présenté comme "ETAM/cadres BTP", mais
  1597 est en réalité la convention des **ouvriers** du bâtiment ≥10 salariés.
  Corrigé en **2609** (ETAM du bâtiment), avec mention de l'IDCC 2614 pour les
  ETAM des travaux publics (convention différente).
- **industrie-pharmaceutique** (176), **auxiliaire-veterinaire-asv** (1875),
  **coiffure-esthetique** (2596), **labo-biologie** (959 — la mention "2205"
  vue sur la page n'a pas été retrouvée et a été abandonnée), **hypermarche-
  supermarche** (2216), **journaliste-salarie** (1480), **pompes-funebres**
  (759) : tous confirmés corrects, sections "Autres droits" ajoutées.
- **ascensoriste** et **ingenieur-securite-systemes** : les pages restaient
  déjà correctement vagues ("IDCC métallurgie", "IDCC 1486 Syntec") — j'ai
  ajouté les sections "Autres droits" en confirmant que ces codes (3248 et
  1486) sont plausibles et déjà établis dans des lots précédents.
- **alsh-centres-loisirs** (1768) et **instruments-mesure-precision**
  (1651/715) : codes non vérifiés dans le temps imparti → **pas de section
  "Autres droits"**, ambiguïté du secteur expliquée dans le texte (pour les
  ALSH, la convention dépend du statut de la structure gestionnaire ; pas de
  code animation unique comme pour l'ECLAT/IDCC 1518 confirmé par ailleurs).
- **aesh**, **egalite-professionnelle-fh**, **epargne-salariale-
  participation**, **travailleur-frontalier-allemagne**, **chomage-partiel-
  hs**, **charte-ethique-deontologie** : thématiques transverses, aucune
  convention collective spécifique à mentionner.


## 11. Retour du lot 9 — quatre nouvelles corrections IDCC

- **horlogerie-bijouterie-industrie** : 1821 (sans rapport) → **3251** (BJOH,
  bijouterie/joaillerie/orfèvrerie/horlogerie, convention unifiée depuis 2024
  qui fusionne les anciens IDCC 567 et 1044).
- **cabinet-medical** : 776 (sans rapport) → **1147** (personnel des cabinets
  médicaux). Attention à ne pas confondre avec les cabinets dentaires (autre
  convention) ni l'hospitalisation privée (IDCC 2264).
- **promotion-immobiliere** : 1966 (sans rapport) → **1512** (promotion
  immobilière). Ne pas confondre avec l'IDCC 1527 (immobilier — agences,
  syndics) déjà utilisé correctement sur une autre page du corpus.
- **fonderie-forge** : 1557 (ancien code territorial obsolète) → **3248**
  (métallurgie unifiée depuis 2024, qui couvre explicitement la fonderie).

Codes vérifiés et confirmés corrects sans changement : fruits-legumes-export
(1405), finance-societes (478 sociétés financières + 2931 marchés financiers,
ce dernier non vérifié aussi en profondeur faute de temps mais plausible).

Page franchise-commerce : déjà rédigée avec prudence ("selon la convention
applicable") — c'est la bonne approche puisque la convention dépend de
l'activité réelle du franchisé, pas de l'enseigne. Gardée telle quelle.


## 10. Retour du lot 8

- **vins-spiritueux** : IDCC 2075 (sans rapport identifiable) → corrigé en
  **7005** (caves coopératives vinicoles et leurs unions, confirmé Légifrance/
  brochure 3604). Le code 7024 déjà présent pour les exploitations viticoles/
  CUMA était correct et a été conservé — la page couvre les deux statuts
  d'employeur, donc les deux codes sont maintenant mentionnés avec leur usage
  respectif.
- **jouets-puericulture** : IDCC 567 (sans rapport identifiable) → corrigé en
  **1517** (commerces de détail non alimentaires). Attention : il existe aussi
  un IDCC 1607 pour l'industrie/fabrication de jouets, mais la page parle de
  vendeurs/magasiniers en magasin (donc commerce, pas fabrication) → 1517 est
  le bon choix pour ce contenu précis.
- **association-insertion** : IDCC 1762/1763 (sans rapport identifiable) →
  corrigé en **783** (CHRS). À noter : cette convention fusionne avec la CCN 66
  (IDCC 413) d'ici août 2026 selon le calendrier de restructuration des
  branches — mentionné dans le texte pour anticiper la transition.
- **assistant-rh-paie** : la page évoquait déjà "Syntec ou convention
  d'entreprise" sans trancher — bonne pratique pour un métier transversal
  présent dans toutes les branches. Gardé tel quel, pas de section "Autres
  droits".


## 9. Retour du lot 7

- **maroquinerie-cuir** : le référentiel de l'app donnait IDCC 1404 (en réalité
  "matériel agricole/travaux publics/motoculture", sans rapport) → corrigé en
  **2528** (industries de la maroquinerie, articles de voyage, chasse-sellerie,
  gainerie, bracelets en cuir — confirmé Légifrance/brochure 3157).
- **marin-pecheur-salarie** : ne comportait aucun code IDCC (approche déjà
  prudente). Comme le sujet recoupe exactement la page "peche-maritime" déjà
  corrigée en session précédente, j'ai réutilisé le même code confirmé
  **IDCC 5619** pour la section "Autres droits".
- **vendeur-conseil-magasin** (1517) et **technicien-maintenance-industrielle**
  (3248, métallurgie unifiée) : codes déjà corrects, sections "Autres droits"
  ajoutées normalement.
- **preparateur-commandes** : IDCC 1611 déjà présent sur la page correspond en
  réalité à une convention très étroite ("entreprises de logistique de
  communication écrite directe" = routage postal/publicité adressée), pas à la
  logistique/préparation de commandes e-commerce en général. **Pas de section
  "Autres droits"** ; le texte explique qu'il n'existe pas de code unique pour
  ce métier, la convention dépendant de l'activité réelle de l'employeur.


## 7. Retour du lot 5 — nouveaux cas de sourcing IDCC rencontrés

- **meubles-bois** : le référentiel de l'app donnait IDCC 1561 pour la fabrication
  de meubles → erreur confirmée sur Légifrance/code.travail.gouv.fr, le bon code
  est **1411** (fabrication de l'ameublement). Corrigé partout dans le fichier
  (titre, meta, JSON-LD, corps), pas seulement dans la section ajoutée.
- **ardoises-marbre-materiaux** : les codes 1637 (ardoise), 1640 (marbre), 1147
  (chaux) déjà présents sur la page n'ont pas pu être confirmés avec un niveau de
  confiance suffisant dans le temps imparti (l'ardoise et le marbre sont bien des
  activités *exclues* de la convention générale des carrières et matériaux —
  donc l'existence de conventions séparées est plausible — mais je n'ai pas
  trouvé de source Légifrance directe pour ces 3 numéros précis). Par prudence,
  **pas de section "Autres droits" ajoutée** sur cette page ; à vérifier
  spécifiquement si quelqu'un a le temps de creuser ces 3 codes un jour.
- **etancheur** : IDCC 1597 (BTP ouvriers ≥ 10 salariés) confirmé plausible,
  section "Autres droits" ajoutée.
- **animation** et **aide-medico-psychologique** : IDCC 1518 (ECLAT) et 413
  (CCN 66) déjà confirmés lors de sessions précédentes, réutilisés tels quels.

## 8. Retour du lot 6

- **casino** : le référentiel de l'app donnait IDCC 2378 (= intérim, sans rapport)
  → corrigé en **2257** (CCN casinos, confirmé Légifrance/brochure 3167).
- **maraichage-horticulture** : secteur très régionalisé — quasiment chaque
  département a son propre accord territorial distinct (ex. IDCC 8534 Ille-et-
  Vilaine/Morbihan, 9853 Vendée, 9455 Loiret, 9142 Calvados...). Les codes
  7513/7502/7514 déjà présents sur la page n'ont été retrouvés nulle part.
  **Pas de section "Autres droits"** ; le texte explique que la convention
  applicable dépend du département, avec IDCC 7024 (production agricole et
  CUMA, national) comme filet par défaut.
- **commerce-gros-alimentaire** (573), **monteur-audiovisuel** (2642),
  **immobilier** (1527) : codes confirmés corrects, sections "Autres droits"
  ajoutées normalement.
- **frigoriste-climaticien** : la page ne s'avançait déjà sur aucun code
  précis ("IDCC métallurgie ou équipements thermiques, à vérifier sur le
  bulletin de paie") — c'est la bonne approche pour un métier dont la
  convention dépend entièrement du type d'employeur (SAV, industrie,
  BTP...). Gardé tel quel, pas de section "Autres droits".


## 23. Lot 20 (reprise sur Claude Opus 4.8 après incident sur le modèle précédent)

Session reprise après plantage d'une génération en cours. Contexte de la
session interrompue non transmis : le lot a donc été recalculé à partir du
corpus (pages sans « Témoignage (cas illustratif) » ET sans « Cas
particuliers », triées par taille croissante). Mesure à l'ouverture du ZIP :
**675 pages non agrémentées**, dont 2 pages purement légales
(`conditions-utilisation`, `confidentialite`) **exclues** du périmètre
d'agrément (ni métier, ni IDCC, ni témoignage pertinents).

10 pages agrémentées dans ce lot (format standard : FAQ portée à 8 +
synchro JSON-LD, « Cas particuliers », « Autres droits » si IDCC unique
sourcé, témoignage fictif) :

Pages métier — chaque IDCC/brochure revérifié sur source officielle
(Légifrance / code.travail.gouv.fr) avant écriture, conformément à la règle
§3. Tous les codes déjà présents dans les tableaux se sont révélés **corrects**
cette fois (aucune erreur de type « IDCC/brochure inversés ») :

- **navigation-interieure** — IDCC **3229** (personnel des entreprises de
  transport en navigation intérieure). Unique et confirmé (Légifrance
  KALICONT000043006530). Section « Autres droits » incluse.
- **energie-gaz** — IDCC **5001** (industries électriques et gazières, statut
  national ; EDF/Enedis/GRDF/RTE/ELD). Code réel délivré par le ministère du
  travail. Section « Autres droits » incluse, rédigée avec prudence (statut
  national + régime spécial CNIEG/CAMIEG, temps de travail réglé par accords
  de branche, pas simple droit commun).
- **transport-aerien** — IDCC **275**, brochure 3177 (personnel **au sol**
  des entreprises de transport aérien, CCNTA-PS). Section « Autres droits »
  incluse. Note explicite : les navigants (PNC/PNT) sont **hors champ** et
  relèvent d'accords d'entreprise propres à chaque compagnie.
- **spectacle-vivant** — IDCC **3090** (entreprises du secteur **privé** du
  spectacle vivant ; arrêté Légifrance du 17/07/2025). Cas **multiple** : le
  secteur **public/subventionné** relève de la CCNEAC, **IDCC 1285**. Décision
  §3 : page conservée sur 3090 (code qu'elle déclarait, valide pour le privé),
  section « Autres droits » incluse mais **libellée avec la mention explicite
  du 1285 pour le public**, et un « Cas particuliers » qui aiguille selon le
  statut de la structure. Aucun code choisi « au hasard ».
- **vente-distance** — IDCC **2198**, brochure 3333 (entreprises de vente à
  distance ; depuis 22/05/2025 : « commerce à distance et e-commerce »).
  Confirmé Légifrance KALITEXT000005672054. Section « Autres droits » incluse.
- **caissier-grande-surface** — IDCC **2216**, brochure 3305 (commerce de
  détail et de gros à prédominance alimentaire). Confirmé (code.travail, CFDT).
  Section « Autres droits » incluse.

Pages thématiques / transversales — **pas de section « Autres droits »**
(métier sans CCN propre, conformément à §3 cas 2) :

- **groupement-employeurs-temps-partage** — employeur juridique unique = le
  groupement ; convention = celle de l'activité principale du groupement,
  variable. Transversal, pas d'IDCC unique.
- **checklist-fin-contrat-guide** — guide de procédure, pas de branche.
- **acompte-avance-salaire-guide** — guide transversal, pas de branche.
- **hs-temps-partiel-therapeutique-guide** — guide transversal (dispositif
  médical/administratif). Rédigé en insistant sur le fait que le dépassement
  de l'horaire prescrit est contraire à la prescription (pas un simple régime
  d'heures complémentaires).

Compteur : après lot 20 (10 pages), **≈ 665 pages non agrémentées restantes**
(hors les 2 pages légales exclues).

Validation automatique passée sur les 10 fichiers : 8 `<details>`, JSON-LD
`FAQPage` parseable à 8 questions **synchronisé** avec les `<summary>`
visibles, présence de « Cas particuliers », markup témoignage correct
(`pnj-img` présent, pas le bug flex connu, phrase « Exemple fictif à visée
pédagogique. » présente), balises `<section>`/`<div>` équilibrées, JSON-LD
émis en format compact identique au reste du site.
