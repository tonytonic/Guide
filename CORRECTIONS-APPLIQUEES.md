# ✅ Corrections appliquées — récapitulatif

*Mise à jour SEO + conformité juridique du dossier de guides. À déployer **à la racine** du domaine (comme actuellement), surtout pas sous `/guides/`.*

---

## Ce qui a été corrigé automatiquement

**🔴 Bloquant SEO (le plus important)**
- **Préfixe `/guides/` supprimé** des `canonical`, du `sitemap.xml`, et de tout le JSON-LD (`url` des `Article` + `BreadcrumbList`) sur les **950 pages**. Les URLs déclarées correspondent désormais au déploiement réel (racine, sans `.html`). C'est ce qui empêchait Google d'indexer les pages.
- **Fil d'ariane (BreadcrumbList) simplifié** : le niveau « Guides » redondant (qui pointait deux fois vers l'accueil) a été retiré → `Accueil → Page`. JSON-LD revalidé sur l'ensemble.
- **`sitemap.xml`** : entrée `/guides/` redondante retirée, URLs remises à la racine, pages légales ajoutées (951 URLs).
- **Page 404 réelle** (`404.html`) créée (au lieu de servir l'accueil en code 200).

**🟠 Conformité juridique**
- **Mentions légales complétées** dans `conditions-utilisation.html` : ajout de l'**éditeur / directeur de publication**, de l'**hébergeur (Cloudflare, Inc.** avec adresse + téléphone) et d'un **contact**, conformément à l'article 6-III de la LCEN.
- **Politique de confidentialité dédiée** créée (`confidentialite.html`) : conforme RGPD et exploitable pour la fiche Google Play (responsable du traitement, données traitées site vs app, finalités, bases légales, durées, transferts hors UE, droits + CNIL).
- **Footer** mis à jour : liens « Mentions légales & CGU » + « Confidentialité » sur toutes les pages (`core.js` + `site-data.js`).

**🟡 SEO / technique / perf**
- **Carte Open Graph** 1200×630 créée (`assets/img/og-card.jpg`) + balises `og:image`, `og:url`, `twitter:card` injectées sur toutes les pages → aperçus corrects lors des partages.
- **Favicon, theme-color, apple-touch-icon, `manifest.json`** ajoutés → icône de marque dans les onglets/SERP + guide installable (utile pour ton canal iOS).
- **`search-index.js` (323 Ko) passé en `defer`** sur toutes les pages → interactivité plus rapide sur mobile.
- **7 titres buggés corrigés** (mot manquant avant « 2026 » : « du droit du travail 2026 », « calcul et taux 2026 », etc.).

---

## ⚠️ Ce qu'il te reste à faire manuellement (important)

1. **Remplir les 6 champs `[À COMPLÉTER]`** (recherche le texte `À COMPLÉTER` dans le code) dans :
   - `conditions-utilisation.html` → ton **nom/pseudo** (éditeur) + ton **e-mail** de contact (×2).
   - `confidentialite.html` → idem (responsable + e-mail, ×2).
   *Sans ça, les mentions légales restent incomplètes au sens de la loi.*

2. **Routing Cloudflare** — ouvre `_redirects.A-FUSIONNER.txt` et reporte ses lignes dans ton **vrai `_redirects`** à la racine du déploiement :
   - `/guides/*  /:splat  301` (redirige les anciennes URLs si elles ont fuité) ;
   - **retire ou restreins tout catch-all `/*  /index.html  200`** qui attrape les guides — c'est lui qui faisait renvoyer l'accueil (soft-404) sur les URLs inconnues. Limite-le aux routes de l'appli (`/menu*`, `/module*`…).
   *(Ce fichier `.A-FUSIONNER.txt` n'est PAS actif tel quel, exprès, pour ne pas écraser la config de l'appli.)*

3. **Après déploiement** : (re)soumets `https://simulateurheuressupfrance.fr/sitemap.xml` dans **Google Search Console** et demande une réindexation de quelques pages clés.

---

## Pistes optionnelles (non bloquantes)

- **Auto-héberger les 3 polices Google** (Cormorant Garamond, Outfit, DM Mono) pour supprimer le dernier appel tiers (IP transmise à Google) et gagner en vitesse.
- **Carte OG** : la version fournie utilise des polices système ; tu peux la régénérer avec tes polices de marque pour un rendu pixel-perfect.
- **Icônes** : fournir des PNG **192×192** et **512×512** (l'`app-icon.png` actuel fait 96 px) pour une installation PWA nette.
- **Images** : convertir les captures PNG lourdes (jusqu'à 554 Ko) en **WebP** (~−70 %).
- **Doublon** : `search-index.js` à la racine (295 Ko) n'est pas utilisé par les pages (elles chargent `assets/search-index.js`) — supprimable.
