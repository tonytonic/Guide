# 📁 Dossier `guides/` — Heures Supplémentaires France

Des pages web statiques, pensées pour le référencement Google (SEO). Chacune attrape les gens sur une recherche précise, leur explique leur cas, et les renvoie vers le simulateur.

**Important :** ce ne sont PAS des écrans de l'appli. Ce sont des « panneaux sur la route » qui mènent au simulateur. Elles vivent à côté de l'appli, pas dedans.

---

## 🎨 v2 — Nouveau décor : la charte « Cabinet Exécutif »

Les pages reprennent maintenant la palette **Ivoire · Charbon · Champagne** et les polices **Cormorant Garamond + Outfit** déjà utilisées dans le module M6 (Cadres) de l'appli — cohérence visuelle entre le guide et l'appli, plutôt qu'une charte inventée à part.

**Le décor :** ta photo (`assets/img/fox-bg.jpg`, le renard qui écrit) est posée en **arrière-plan fixe** (`position:fixed`) derrière toute la page. Le contenu, lui, vit dans un **encart ivoire** (`.page-shell`) qui défile par-dessus — comme une feuille posée sur le bureau du renard. Sur iPhone, l'encart prend toute la largeur et la photo apparaît en bandeau au-dessus avant que le contenu commence ; sur grand écran, elle reste visible sur les côtés pendant tout le défilement.

Si tu veux ajuster le cadrage de la photo (zoom, position du visage), c'est une seule ligne dans `assets/guide.css` :
```css
.bg-fixed{ background-position: center 18%; }
```

⚠️ **Poids de l'image :** le PNG d'origine pesait ~2 Mo. Je l'ai converti en JPEG optimisé (~185 Ko) dans `assets/img/fox-bg.jpg` — assez léger pour ne pas pénaliser le référencement (vitesse de chargement), tout en gardant une bonne qualité visuelle. Si tu changes la photo plus tard, repasse-la par un export JPEG qualité ~80 avant de la déposer ici.

---

## 🧩 Le noyau commun (`assets/core.js` + `assets/site-data.js`)

Avant la v2, chaque page contenait sa propre copie du bandeau du haut, des boutons iPhone/Android, et du pied de page — 16 copies du même HTML. Si tu changeais le lien Play Store, il fallait modifier 16 fichiers.

Maintenant, ces blocs sont **injectés automatiquement** par `core.js` à partir de simples balises dans le HTML :

```html
<div id="hs-topbar" data-stamp="à jour juin 2026 · IDCC 16"></div>
<div id="hs-hero-cta" data-label="Calculer mes heures sup" data-sub="..."></div>
<div id="hs-app-cta"></div>
<div id="hs-footer"></div>
```

Pour changer le lien Play Store, le nom de l'appli, ou le SMIC affiché en haut de page : **un seul fichier à modifier**, `assets/site-data.js`. Pour changer l'apparence ou le texte du pied de page partout : `assets/core.js`.

Même philosophie que `articles-loi.js` dans l'appli : **pas de fetch, pas de JSON externe**, aucune dépendance. Ça fonctionne en `file://`, en `http(s)://`, et dans une TWA si un jour le guide en a besoin. Chaque injection est protégée par un `try/catch` : si une balise manque sur une page, le reste de la page s'affiche normalement (important pour débugger depuis iPhone sans console).

**Ce qui reste volontairement dans chaque page** (pas centralisé) : le titre, les meta SEO, le H1, le texte d'intro, les tableaux/exemples chiffrés, la FAQ, le texte et les arguments du bloc appli (icône, titre, paragraphe), le disclaimer (chaque page a sa nuance propre), et les liens « à lire aussi ». Centraliser ce contenu lui ferait perdre sa spécificité — seul le mécanique répétitif a été extrait.

---

## 📦 Référentiel juridique de l'appli — utilisé pour vérifier ce guide

En comparant ce dossier à `outils/articles-loi.js` et `ccn/conventions-collectives.js` de l'appli (transmis dans le zip), les chiffres des pages CCN déjà publiées (HCR 360h, Syntec 130h, Transport 195h/130h, etc.) sont **cohérents avec la base interne de l'appli** — pas de divergence à corriger sur celles-ci.

**11 nouvelles pages** ont été générées à partir des 14 régimes distincts (`g:"..."`) repérés dans `conventions-collectives.js` au-delà du droit commun : Assurance, Boulangerie-pâtisserie, Propreté, Hospitalisation privée, Coiffure, Médico-social (CCNT 66), Sécurité privée, Pharmacie (officine + industrie), Industries chimiques, Centres sociaux, Animation (ECLAT).

⚠️ **Deux anomalies repérées dans `conventions-collectives.js` en vérifiant ces données — à corriger dans l'appli :**

1. **Propreté (groupe `PROP190`)** : la base indique « IDCC 3186 (brochure 3405) ». Plusieurs sources indépendantes (Légifrance, code.travail.gouv.fr, Legisocial, Skello…) confirment que la convention propreté est en réalité **IDCC 3043, brochure 3173**. J'ai utilisé le bon numéro dans la page du guide, mais l'entrée de l'appli mérite une correction.
2. **Pétrole (groupe `PETRO`)** : la base indique « IDCC 669 » avec un taux unique de +30 %. Or l'IDCC 669 correspond aux *industries de fabrication du verre*, pas au pétrole — la convention « Industrie du pétrole » est en réalité l'**IDCC 1388 (brochure 3001)**, avec des taux de majoration standards (25 %/50 %) selon convention.fr. Vu l'incertitude, **je n'ai pas créé de page Pétrole** ce tour-ci — à vérifier et corriger dans l'appli avant d'en faire une.

Pour les brochures (numéros secondaires, moins critiques que l'IDCC), j'ai par prudence évité de les citer dans les nouvelles pages quand un doute subsistait — autant ne pas propager une erreur si l'app en contient une.

Pour les prochaines pages, je repartirai de ces fichiers en priorité avant de chercher sur le web : ça accélère la rédaction et garantit que le guide ne raconte jamais autre chose que l'appli — sous réserve de ces deux points à vérifier.

---

## 📱 iPhone vs Android : deux liens, pas un

Chaque bouton « ouvrir le simulateur » existe en **deux versions** :

- **iPhone (web)** → `/menu` (l'appli web sur Cloudflare, pas de Play Store sur iOS).
- **Android (Play Store)** → `https://play.google.com/store/apps/details?id=com.tonytonic.heuressup`.

Si l'app ID change un jour, un seul endroit à corriger : remplace `com.tonytonic.heuressup` dans toutes les pages (`grep -rl "tonytonic.heuressup" guides/` pour les retrouver).

---

## 🚀 Mise en ligne (3 minutes)

1. Glisse le dossier `guides/` complet à la racine de ta **branche `android`** (celle que Cloudflare déploie).
2. `git add . && git commit && git push`.
3. Cloudflare reconstruit tout seul. Tes pages sont en ligne :
   - `simulateurheuressupfrance.pages.dev/guides` (l'accueil)
   - `simulateurheuressupfrance.pages.dev/guides/restauration-hcr`
   - etc.

Rien à mettre dans `main`. Comme ça, les guides n'existent qu'à un seul endroit → pas de doublon, ils peuvent ranker proprement.

> ⚠️ **Vérifie ton système de déploiement progressif.** Tes modules attendent un fichier sentinelle `ok.txt`. Les guides ne sont pas des modules — assure-toi que ta logique de rollout ne les met pas de côté. En cas de doute, traite `guides/` comme un dossier statique normal, hors du mécanisme des modules.

---

## 📄 Contenu du dossier

| Fichier | Rôle | Requête visée |
|---|---|---|
| `index.html` | Accueil des guides (relie tout) | « guides droit du travail » |
| `heures-supplementaires-guide.html` | **Page pilier** (droit commun 35 h, 25 %/50 %, contingent) | « calcul heures supplémentaires » |
| `restauration-hcr.html` | HCR / restauration (39 h, 10/20/50) | « heures supplémentaires restauration » |
| `temps-partiel-heures-complementaires.html` | Temps partiel (10/25, règle 12 semaines) | « heures complémentaires temps partiel » |
| `forfait-jours-cadres.html` | Forfait jours (218 j, validité, nullité) | « forfait jours convention nulle » |
| `heures-non-payees.html` | Litige / preuve / rappel de salaire | « heures supplémentaires non payées » |
| `grille-salaire-convention.html` | Grilles & minima (Lumina) | « grille salaire convention » |
| `defiscalisation-heures-supplementaires.html` | Exonération 7 500 € + réduction 11,31 % | « heures supplémentaires impôts » |
| `transport-routier-heures-supplementaires.html` | Transport (IDCC 16) — plusieurs régimes selon poste | « heures supplémentaires transport routier » |
| `btp-heures-supplementaires.html` | BTP (IDCC 1596/1597) — contingent réduit 180h | « heures supplémentaires BTP » |
| `metallurgie-heures-supplementaires.html` | Métallurgie (IDCC 3248) — convention unique 2024 | « heures supplémentaires métallurgie » |
| `syntec-heures-supplementaires.html` | Syntec (IDCC 1486) — 3 modalités, forfait jours | « heures supplémentaires Syntec » |
| `rtt-calcul-2026.html` | RTT — calcul, acquisition, rachat | « calcul RTT 2026 » |
| `travail-de-nuit-majoration.html` | Travail de nuit — pas de taux légal | « majoration travail de nuit » |
| `dimanche-jours-feries.html` | Dimanche &amp; jours fériés — 1er mai, ZTI | « travail dimanche jours fériés » |
| `astreinte-guide.html` | Astreinte — définition, indemnisation | « astreinte définition » |
| `assurance-heures-supplementaires.html` | Assurance (IDCC 1672) — contingent 70h | « heures supplémentaires assurance » |
| `boulangerie-heures-supplementaires.html` | Boulangerie (IDCC 843) — contingent 329h | « heures supplémentaires boulangerie » |
| `proprete-heures-supplementaires.html` | Propreté (IDCC 3043, corrigé) — contingent 190h | « heures supplémentaires propreté » |
| `hospitalisation-privee-heures-supplementaires.html` | Hospitalisation privée (IDCC 2264) — 130h/70h | « heures supplémentaires clinique » |
| `coiffure-heures-supplementaires.html` | Coiffure (IDCC 1040) — contingent 200h | « heures supplémentaires coiffure » |
| `medico-social-heures-supplementaires.html` | Médico-social CCNT66 (IDCC 1921) — contingent 110h | « heures supplémentaires médico-social » |
| `securite-privee-heures-supplementaires.html` | Sécurité privée (IDCC 1351) — contingent 329h | « heures supplémentaires sécurité » |
| `pharmacie-heures-supplementaires.html` | Pharmacie — officine (IDCC 2104) + industrie (IDCC 216) | « heures supplémentaires pharmacie » |
| `chimie-heures-supplementaires.html` | Industries chimiques (IDCC 44) — contingent 130h | « heures supplémentaires chimie » |
| `centres-sociaux-heures-supplementaires.html` | Centres sociaux (IDCC 1261) — contingent 100h | « heures supplémentaires centre social » |
| `animation-heures-supplementaires.html` | Animation ECLAT (IDCC 1518) — contingent 70h/140h | « heures supplémentaires animation » |
| `assets/guide.css` | **Style partagé** (palette Ivoire/Charbon/Champagne, décor fixe) | — |
| `assets/core.js` | **Noyau commun** — injecte topbar/boutons/footer | — |
| `assets/site-data.js` | Constantes (lien Play Store, SMIC, nom appli) | — |
| `assets/img/fox-bg.jpg` | Photo de décor (renard, arrière-plan fixe) | — |
| `sitemap.xml` | Liste des pages pour Google | — |

Une seule modif dans `assets/guide.css` = toutes les pages changent d'un coup.

---

## ✅ Vérification de fraîcheur (faite le 23 juin 2026)

Avant d'enrichir ce dossier, j'ai vérifié sur le web si des changements étaient prévus d'ici septembre 2026 sur les sujets couverts. Résultat :

- **SMIC** : dernière revalorisation au 1ᵉʳ juin 2026 (1 867,02 €). Prochaine revalorisation prévue le 1ᵉʳ janvier 2027, sauf nouveau déclenchement automatique si l'inflation dépasse 2 % d'ici là — rien d'annoncé en ce sens à ce jour.
- **Contingent HCR (360 h/an)** confirmé par une seconde source indépendante.
- **Défiscalisation des heures sup (7 500 €/an)** : une tentative de suppression totale a été débattue au budget 2026 (automne 2025) mais n'a pas été retenue. Le plafond reste stable — c'est cette info que j'ai ajoutée dans les guides.
- **Forfait jours** : jurisprudence récente (Cass. soc., 9 avril 2026) confirmant la nullité d'une convention qui ne fixe pas un nombre de jours précis — déjà intégrée dans le guide.
- Aucun changement identifié, pour septembre 2026, sur les heures supplémentaires, complémentaires, le contingent ou le forfait jours. Les seules réformes repérées pour septembre (durée des arrêts maladie, retraite anticipée) ne concernent pas ces sujets.
- **4 nouvelles pages CCN ajoutées** (Transport routier, BTP, Métallurgie, Syntec), avec chiffres croisés sur plusieurs sources indépendantes pour chacune. Point de vigilance : le **Transport routier** est la convention la plus complexe (plusieurs régimes selon le poste — sédentaire / courte distance / longue distance). La page reste volontairement prudente sur ce sujet plutôt que de simplifier à l'excès ; si tu affines cette page plus tard, vérifie bien la catégorie de personnel concernée avant de changer un chiffre.

À revérifier toi-même si tu republies après septembre 2026, au cas où une actualité m'aurait échappé.

---

## ➕ Ajouter une convention (le gabarit)

C'est là qu'est ton avantage : tes 477 CCN. Tu ne réécris pas une page à la main, tu **dupliques le gabarit**.

1. Copie `restauration-hcr.html` → `transport-routier.html` (par ex.).
2. Change dans le `<head>` : le `<title>`, la `<meta name="description">`, la balise `canonical`, et le bloc FAQ (`application/ld+json`).
3. Change le contenu : seuil, taux de majoration, contingent, exemple chiffré. Le reste de la structure ne bouge pas.
4. Ajoute la page dans `sitemap.xml` et dans la grille de `index.html`.
5. Remplace les liens `href="#"` des « autres conventions » par les vraies pages au fur et à mesure.

À terme, tu peux même **générer ces pages automatiquement** depuis ta base CCN (`conventions-collectives.js`) : un script qui remplit le gabarit avec seuil + taux + contingent de chaque IDCC. C'est ton terrain, t'es dev — c'est le plus gros levier SEO que personne d'autre n'a.

⚠️ **Vérifie chaque chiffre par convention.** Les taux et contingents varient (HCR ≠ Transport ≠ Métallurgie). Ne mets jamais un taux que tu n'as pas vérifié sur une source fiable (Légifrance, BOCC, code du travail) — une page de droit du travail avec un chiffre faux décrédibilise tout le reste.

---

## ✅ 8ᵉ module + navigation Précédent/Suivant (28 juin 2026)

**Carte module Lumina ajoutée** dans le grid (entre Zenji et Mimizuku) — elle manquait. Le guide passe de 7 à 8 modules affichés (texte mis à jour partout dans `index.html`). Images remplacées : M4/DTE (renard scientifique), Lumina (renard avocat/CCN), Trousse·Carnet de frais (renard bricoleur).

**Navigation Précédent/Suivant** ajoutée en haut ET en bas des **850 pages** (placeholders `hs-prevnext-top` / `hs-prevnext-bottom`, rendus par `core.js`). L'ordre suit l'index alphabétique de `search-index.js` — donc toute nouvelle page ajoutée à l'avenir doit être présente dans `assets/search-index.js` (régénéré côté script Python) pour apparaître dans la séquence. Chaque page charge maintenant aussi `assets/search-index.js` (~300 Ko, mis en cache par le navigateur après la première page visitée).

---

## ✅ Migration de domaine effectuée (28 juin 2026)

Le find-replace annoncé plus bas a été fait : `https://simulateurheuressupfrance.pages.dev` → `https://simulateurheuressupfrance.fr` dans les balises `canonical` des **851 pages** et dans `sitemap.xml` (672 URLs). C'est ce décalage de domaine (sitemap soumis sous la propriété `.fr` dans Search Console, mais qui listait encore des URLs `.pages.dev`) qui causait les 672 erreurs « URL non autorisée » dans Search Console.

`assets/core.js` et `assets/site-data.js` gardent volontairement `appUrl: "https://simulateurheuressupfrance.pages.dev/menu"` — c'est le lien vers l'**appli**, qui reste sur `.pages.dev`. Ne pas toucher.

**À faire côté toi :** dans Search Console, va dans Sitemaps → soumets à nouveau `sitemap.xml` (sous la propriété `.fr`). Les 672 erreurs devraient se résorber au prochain crawl (quelques jours).

**Recherche d'accueil refaite :** le moteur ne cherchait que parmi les ~410 cartes affichées sur la page d'accueil. Il indexe maintenant les 850 pages du dossier (titre + h1 + meta description, via `assets/search-index.js`) et affiche les résultats en menu déroulant sous la barre de recherche au lieu de filtrer les cartes plus bas dans la page.

---

## 🔍 Dire à Google de venir (à faire une fois)

1. Crée un compte **Google Search Console** (gratuit) et vérifie ton site.
2. Soumets le sitemap : `simulateurheuressupfrance.fr/sitemap.xml`.
3. Reviens dans quelques semaines voir pour quelles requêtes tu ressors, et quelles pages Google lit bien.

Le SEO est lent : compte **3 à 6 mois** avant que ça bouge vraiment sur un domaine neuf. C'est normal.

---

## 🌐 Le nom de domaine, et le nouveau repo séparé

Comme l'appli est gratuite, pas de domaine payant pour **elle** — `simulateurheuressupfrance.pages.dev` reste son adresse, c'est très bien pour le SEO de l'appli elle-même.

Pour le **guide**, en revanche, tu veux acheter un `.fr` et le mettre dans son **propre repo GitHub**, séparé de celui de l'appli, avec son propre projet Cloudflare. C'est une bonne séparation : le guide est un site de contenu, l'appli est un produit ; ils n'ont pas besoin de partager un repo.

Ce dossier `guides/` est déjà **autonome** (CSS, JS, images en relatif, sitemap dédié) — aucune dépendance vers le reste de ton repo `hs-Android-cloudfare-production`. Tu peux le déposer tel quel à la racine d'un nouveau repo.

**Le jour où tu as le nom de domaine**, trois choses à faire (dis-moi le nom choisi, je peux le faire avec toi) :
1. Chercher-remplacer `simulateurheuressupfrance.pages.dev/guides` → `tondomaine.fr` dans les balises `canonical` de chaque page, et dans `sitemap.xml`.
2. **Important :** les boutons « iPhone (web) » du guide pointent vers `/menu` en chemin relatif. Une fois le guide sur un domaine séparé de l'appli, ce lien relatif casserait (il chercherait `/menu` sur le domaine du *guide*, qui n'existe pas). Il faut le passer en absolu **avant** de basculer : dans `assets/site-data.js`, remplace `appUrl: "/menu"` par `appUrl: "https://simulateurheuressupfrance.pages.dev/menu"`. Comme c'est centralisé dans le noyau commun, c'est une seule ligne à changer pour les 16 pages.
3. Re-soumets le nouveau domaine dans Google Search Console (nouvelle propriété).

---

## 🛠️ Deux corrections à reporter dans l'appli

En vérifiant les chiffres pour ces pages, deux écarts repérés dans ton livre blanc / tes données :

1. **Contingent HCR** : ton tableau indique 220 h pour la HCR. Le vrai contingent HCR est **360 h/an** (établissements permanents) ou **90 h par trimestre** (saisonniers). Les 220 h, c'est le droit commun par défaut.
2. **SMIC du livre blanc** : encore à 1 823,03 € (janvier). Depuis le 1ᵉʳ juin 2026, c'est **1 867,02 €** (12,31 €/h). Les pages guides utilisent déjà le bon chiffre.

---

## 🔄 Tenir à jour

Chaque page affiche sa date et le SMIC en cours (en haut). Quand le SMIC change ou qu'un taux évolue :

- mets à jour la **page pilier** en priorité (c'est le hub),
- puis les pages concernées,
- et la date `<lastmod>` dans `sitemap.xml`.

Le SMIC change parfois en cours d'année (revalorisation automatique liée à l'inflation) — surveille ça.

---

*Pages à but pédagogique et indicatif. Seul le bulletin de paie fait foi.*
