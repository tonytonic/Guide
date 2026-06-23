/* ============================================================================
   SITE-DATA.JS — Constantes communes à toutes les pages du dossier /guides/
   ----------------------------------------------------------------------------
   POURQUOI CE FICHIER ?
   Le lien Play Store, le nom de l'appli, le SMIC affiché dans les bandeaux...
   tout ça était répété dans chaque page. Pour changer le lien Play Store
   demain, tu modifies UNIQUEMENT ce fichier et les 16 pages sont à jour.

   Même philosophie que articles-loi.js dans l'appli : pas de fetch, pas de
   JSON externe → fonctionne en file://, http(s)://, et si ce fichier est un
   jour servi dans une TWA. Aucune dépendance.
   ========================================================================== */

window.HS_SITE = {
  brand:        "Heures Supplémentaires France",
  appUrl:       "/menu",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.tonytonic.heuressup",
  stampDefault: "à jour juin 2026",
  smic: {
    horaire:  "12,31 €/h",
    mensuel:  "1 867,02 €",
    depuis:   "1er juin 2026"
  },
  year: 2026
};
