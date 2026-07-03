# MANIFESTE — fichiers modifiés (audit du 3 juillet 2026)

Ce zip contient **uniquement les 268 fichiers modifiés ou ajoutés**, avec leur chemin relatif exact (à copier par-dessus votre dossier `Guide-main` existant).

## Répartition
- 264 pages `.html`
- `assets/search-index.js`
- `_redirects`
- `sitemap.xml`
- `CORRECTIONS-AUDIT-2026-07-03.md` (nouveau — changelog détaillé)

## ⚠️ 5 fichiers à SUPPRIMER manuellement (absents de ce zip, donc pas écrasés)
Ces fichiers existent dans votre dossier original et doivent être retirés — ils n'apparaissent pas ici puisqu'un zip ne peut pas « supprimer » un fichier automatiquement :
- `Hhh`
- `assets/Hhh`
- `assets/img/Gg`
- `search-index.js` (celui à la **racine** — doublon obsolète ; **ne pas confondre** avec `assets/search-index.js`, inclus et modifié dans ce zip)
- `_redirects.A-FUSIONNER.txt`

## Comment appliquer
```
# Depuis la racine de votre dossier Guide-main existant :
unzip -o modifications.zip -d .
rm -f Hhh assets/Hhh assets/img/Gg search-index.js _redirects.A-FUSIONNER.txt
```

Détail complet de chaque correction : voir `CORRECTIONS-AUDIT-2026-07-03.md` dans ce même zip.
