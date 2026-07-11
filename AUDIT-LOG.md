# Journal d'audit qualité — vérification totale du site

**IMPORTANT — reprise sur base fraîche (11 juillet 2026, 16h50)** : Anthony
a fourni une copie complète et à jour du site actuellement en ligne
(Guide-main_3.zip, 982 pages). Ce fichier remplace mon dossier de travail
local et devient la nouvelle source de vérité pour tout l'audit.

**Correction méthodologique importante** : lors des 3 premiers lots de cet
audit (session précédente), mes corrections étaient écrites dans un
dossier de travail séparé mais n'étaient jamais réappliquées au dossier
source que je consultais pour détecter les problèmes des lots suivants —
ce qui donnait l'illusion trompeuse de "régressions" alors qu'il
s'agissait simplement de corrections jamais effectivement persistées.
Ce problème est maintenant résolu : **toute correction est désormais
écrite directement dans le dossier source** (/home/claude/guide/Guide-main),
qui sert à la fois de référence de lecture et de destination d'écriture.
Les livraisons ZIP successives ne contiendront que les fichiers
effectivement modifiés à date, mais leur contenu reflète bien l'état
final réellement appliqué à la source.

Méthode inchangée par ailleurs : vérification systématique de chaque
page du périmètre (978 pages, ordre alphabétique) sur quatre axes :
exactitude du code IDCC, exactitude du numéro de brochure JO, exactitude
du texte juridique (dates, taux, seuils, articles cités),
orthographe/grammaire. Consultation prioritaire du référentiel IDCC
consolidé (référentiel_idcc.md) avant toute nouvelle recherche web.

## Lot 1/98 — pages 1 à 10 (ordre alphabétique) — repris sur base fraîche

Pages revues : abandon-de-poste-demission,
abattoir-industrie-viande-heures-supplementaires, accident-travail-droits,
accord-methode-negociation-guide, accord-performance-collective-guide,
acheteur-approvisionnement-heures-supplementaires,
acompte-avance-salaire-guide, action-de-groupe-hs-salaries-guide,
action-groupe-discrimination-guide, activite-partielle-chomage-partiel.

### 1 correction (appliquée directement à la source fraîche)

**abattoir-industrie-viande-heures-supplementaires** — la version en
ligne contenait déjà une partie de mes travaux antérieurs (FAQ enrichie
avec une question expliquant correctement IDCC 1534 vs 974), mais
souffrait de deux problèmes distincts : (1) une **duplication** des deux
premières questions FAQ (anciennes versions courtes ET nouvelles versions
longues coexistant, à la fois dans le JSON-LD et dans le HTML visible) —
nettoyée en conservant uniquement les 6 versions finales sans doublon ;
(2) un second bloc de contenu (tableau détaillé « Abattoir et industrie
de la viande : HS et cadences ») citait encore **IDCC 1747**, un code
obsolète déjà identifié à plusieurs reprises — corrigé vers **IDCC
1534** (le code déjà validé et utilisé ailleurs sur cette même page).

### 9 pages sans anomalie détectée

Les 9 autres pages du lot ne comportent pas de code IDCC (sujets
transversaux de droit du travail général). Contenu identique à celui
déjà vérifié lors du passage précédent sur ces mêmes pages : aucune
faute d'orthographe ou de grammaire, valeurs légales cohérentes.

Compteur : lot 1/98 terminé sur la base fraîche. **968 pages restantes**
à vérifier.

## Lot 2/98 — pages 11 à 20 (sur base fraîche)

Pages revues : addictions-travail-tests-depistage-guide,
aeronautique-spatial-heures-supplementaires,
aesh-accompagnant-eleve-handicap-heures-guide,
affichage-obligatoire-entreprise-guide,
agence-communication-publicite-heures-supplementaires,
agences-travail-temporaire-droits,
agent-collecte-dechets-heures-supplementaires,
agent-de-voyages-heures-supplementaires,
agent-escale-aeroportuaire-heures-supplementaires,
agent-funeraire-heures-supplementaires.

Cette relecture a aussi permis de vérifier et réappliquer **directement
dans le dossier source** plusieurs corrections identifiées lors de la
précédente session (méthode désormais fiable) : aeronautique-spatial
(1669→3248), agent-general-assurance-collaborateur (7018→2335),
agent-portuaire-docker (1763/1423→3017, y compris un titre de section
manqué lors du premier passage), agent-quai-manutentionnaire (les 4
erreurs : 1611→16, 1947→16, 1747→3109), agent-territorial-specialise-
ecoles-maternelles/ATSEM (2582→2691), et les deux coquilles
orthographiques (titre ASH tronqué, accents manquants sur
agent-funeraire-pompes-funebres-hs).

### Nouveau code confirmé correct

**agent-collecte-dechets-heures-supplementaires** — cite désormais
**IDCC 2149** (activités du déchet, brochure 3156), confirmé par de
multiples sources indépendantes comme le code le plus précis et
approprié pour ce métier (collecte des ordures ménagères, tri,
traitement) — plus spécifique encore que l'IDCC 3043 (propreté)
utilisé par ailleurs sur d'autres pages de nettoyage. Aucune correction
nécessaire.

### Pages sans nouvelle anomalie sur ce lot

agence-communication-publicite-heures-supplementaires (IDCC 86
confirmé), agences-travail-temporaire-droits (IDCC 1413 & 2378
confirmés), agent-de-voyages-heures-supplementaires (IDCC 1710 déjà
correct — confirmation que ce fix historique a bien été déployé),
agent-escale-aeroportuaire-heures-supplementaires (IDCC 275 confirmé),
agent-funeraire-heures-supplementaires (IDCC 759 confirmé).

Compteur : lots 1-2/98 terminés sur la base fraîche, avec réapplication
complète de tous les fixes identifiés lors des lots 1-3 de la session
précédente. **958 pages restantes** à vérifier.
