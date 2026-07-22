# Tour 43 — Trois erreurs de contenu corrigées + synchronisation massive du search-index

## Contexte

En reprenant l'audit là où le Tour 42 s'était arrêté, deux types de problèmes
distincts ont été trouvés et traités séparément :

1. **De vraies erreurs de contenu** sur 3 pages esthétique/onglerie (l'IDCC
   affiché dans le corps de la page était faux).
2. **Un désynchronisme massif entre `search-index.js` et les pages** :
   `search-index.js` est un cache généré au moment de la création de chaque
   page (titre/H1/extrait figés à cet instant-là). Quand une page a été
   corrigée *après coup* — par exemple lors des tours 1 à 42 de ce même
   audit — la correction n'a jamais été répercutée dans l'index, qui a
   continué d'afficher l'ancien code IDCC dans les résultats de recherche
   et les cartes d'accueil.

## Partie 1 — Corrections de contenu (3 pages)

Erreur récurrente : la convention **coiffure (IDCC 2596)** était utilisée par
erreur sur des pages qui décrivent en réalité l'**esthétique-cosmétique
(IDCC 3032)** — deux conventions distinctes.

| Fichier | Avant | Après |
| --- | --- | --- |
| `manucure-prothesiste-ongulaire-heures-supplementaires.html` | IDCC 2596 (×5) | IDCC 3032 |
| `estheticienne-domicile-heures-supplementaires.html` | IDCC 2596 (×4) | IDCC 3032 |
| `coiffure-esthetique-heures-supplementaires.html` | IDCC 2596 (×10) | IDCC 3032 (le chip de lien croisé vers la page coiffure pure a été **volontairement laissé à 2596**, car il pointe vers `coiffure-heures-supplementaires.html` qui est légitimement en 2596) |

Les pages purement coiffure (`coiffure-heures-supplementaires.html`,
`coiffeur-domicile-independant-hs.html`, `coiffeur-estheticien-hs.html`,
`franchise-commerce-heures-supplementaires.html`) n'ont pas été touchées :
2596 y est correct.

**Point non tranché, à ta discrétion :** `coiffeur-estheticien-hs.html`
(page combinée coiffeur+esthéticien) affiche uniquement IDCC 2596 (coiffure)
sans mentionner 3032 pour le volet esthéticien. Contrairement aux 3 pages
ci-dessus, celle-ci est centrée sur le contingent coiffure (200 h) — je l'ai
laissée telle quelle plutôt que de la modifier sans certitude sur l'intention
éditoriale, mais elle mériterait un second regard.

## Partie 2 — Synchronisation search-index.js ↔ pages

### Méthode

Chaque page qui a un tag `data-stamp="… · IDCC XXXX"` dans son topbar (420
pages sur 982) porte un code IDCC canonique unique, injecté par `core.js`.
Ce code a servi de référence de vérité, comparé aux mentions "IDCC" trouvées
dans le titre/H1/extrait de l'entrée correspondante de `search-index.js`.

### Résultat du scan

- **121 pages** avec divergence entre leur `data-stamp` et leur entrée
  `search-index.js`.
- **3 codes malformés** trouvés au passage (5 chiffres, donc invalides) :
  `IDCC 25960` sur `portage-salarial-heures-supplementaires` (→ 3219, vérifié
  sur Légifrance/code.travail.gouv.fr) et `IDCC 21200` sur
  `securite-sociale-heures-supplementaires` (déjà identifié comme le même bug
  au Tour 3, mais visiblement jamais propagé à l'index).

### Corrections appliquées : 111 entrées de search-index.js

- **105 cas à un seul code divergent** : synchronisés mécaniquement sur le
  `data-stamp` de la page. Confirmé par recoupement avec ce rapport sur
  plusieurs échantillons (ex. `transport-aerien` : l'index citait encore le
  412 — le code "guides touristiques" que le Tour 9 avait justement retiré
  de la page).
- **2 cas à codes multiples partiellement corrigés**, avec confirmation
  explicite de ce rapport :
  - `assurance-mutuelle-heures-supplementaires` : `3257` (bug brochure/IDCC
    déjà documenté Tour 5) → `2128`. Le second code de l'extrait (`2615`,
    courtage assurance) n'est pas concerné et reste en l'état.
  - `enseignement-prive-heures-supplementaires` : `2582` (code territorial
    BTP Savoie, déjà documenté Tour 6) → `2691`. Le second code (`2409`,
    "sous contrat") reste en l'état, faute de confirmation explicite.

Liste complète des 111 changements (URL, code avant, code après) :
`idcc_search_index_delta.csv`, fourni à côté de ce rapport.

### 14 cas laissés en l'état (extraits à codes multiples, non tranchés)

Ces extraits citent 2 ou 3 IDCC différents dans un contexte de comparaison
(ex. "Ardoises IDCC 1637, marbre IDCC 1640, chaux IDCC 87"). Le `data-stamp`
de la page ne correspond à aucun des codes cités, mais je n'ai pas de
confirmation qu'un des chiffres cités soit faux plutôt que simplement absent
du texte du stamp — donc pas de correction à l'aveugle, par prudence (même
principe que ce rapport applique déjà ailleurs) :

`ardoises-marbre-materiaux`, `btp-etam`, `congres-salons`,
`electronique-electrique`, `instruments-mesure-precision`,
`location-vehicules`, `maisons-familiales-rurales`,
`maraichage-horticulture`, `meubles-bois`, `pneumatique-aluminium`,
`pneumatique-caoutchouc-plastique`, `publicite-regies`,
`toiletteur-animalier` (celui-ci semble en fait correct — hedge légitime
jardinerie/vétérinaire, à confirmer), `vins-spiritueux`.

## Point de méthode pour la suite

Le search-index n'a **aucune protection contre ce désynchronisme** : rien
n'empêche une future correction de page de laisser à nouveau l'entrée
d'index périmée. Si le script Python qui génère `search-index.js` peut être
relancé sur l'ensemble du dossier à chaque session de corrections (plutôt
qu'uniquement à la création d'une page), ce type d'écart ne pourra plus se
reproduire.
