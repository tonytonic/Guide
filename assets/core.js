/* ============================================================================
   CORE.JS — Noyau commun des pages /guides/
   ----------------------------------------------------------------------------
   Injecte les blocs identiques sur toutes les pages (topbar, boutons
   iPhone/Android, pied de page) à partir de simples balises <div id="...">
   placées dans le HTML. Pour changer le lien Play Store, le logo ou le
   pied de page partout : un seul fichier à toucher (site-data.js + ici),
   plus besoin de modifier 16 fichiers HTML.

   COMMENT ÇA MARCHE DANS UNE PAGE ?
     <div id="hs-topbar" data-stamp="à jour juin 2026 · IDCC 16"></div>
     <div id="hs-hero-cta" data-label="Calculer mes heures sup"></div>
     <div id="hs-app-cta"></div>
     <div id="hs-footer"></div>
     ...
     <script src="assets/site-data.js"></script>
     <script src="assets/core.js"></script>

   Placé en fin de <body>, donc les mounts existent déjà : pas de fetch,
   pas d'écouteur DOMContentLoaded nécessaire — même logique que
   articles-loi.js dans l'appli (fonctionne en file://, http(s)://, TWA).
   Chaque rendu est protégé par try/catch : une balise manquante sur une
   page ne casse jamais le reste de la page (debug possible sans console
   sur iPhone — si un bloc n'apparaît pas, le reste s'affiche normalement).
   ========================================================================== */

(function () {
  "use strict";

  var S = window.HS_SITE || {
    brand: "Heures Supplémentaires France",
    appUrl: "/menu",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.tonytonic.heuressup",
    stampDefault: "à jour juin 2026",
    year: 2026
  };

  function brandHtml() {
    return S.brand.replace(/ /g, "&nbsp;");
  }

  function renderTopbar() {
    var mount = document.getElementById("hs-topbar");
    if (!mount) return;
    var stamp = mount.getAttribute("data-stamp") || S.stampDefault;
    mount.outerHTML =
      '<div class="topbar"><div class="wrap">' +
        '<a class="brand" href="' + S.appUrl + '"><span class="mark">🦊</span> ' + brandHtml() + "</a>" +
        '<div class="stamp">' + stamp + "</div>" +
      "</div></div>";
  }

  function renderHeroCta() {
    var mount = document.getElementById("hs-hero-cta");
    if (!mount) return;
    var label = mount.getAttribute("data-label") || "Ouvrir le simulateur";
    var sub = mount.getAttribute("data-sub") ||
      "iPhone via ce lien (web), Android sur le Play Store.";
    mount.outerHTML =
      '<div class="cta-row rise d3">' +
        '<div class="btn-group">' +
          '<a class="btn" href="' + S.appUrl + '">' + label + ' <span class="arr">→</span></a>' +
          '<a class="btn-outline" href="' + S.playStoreUrl + '"><span class="plat-ic">🤖</span> Version Android <span class="arr">→</span></a>' +
        "</div>" +
        '<span class="btn-sub"><b>Gratuit, sans compte</b> — ' + sub + "</span>" +
      "</div>";
  }

  function renderAppCta() {
    var mount = document.getElementById("hs-app-cta");
    if (!mount) return;
    mount.outerHTML =
      '<div class="btn-group" style="justify-content:center">' +
        '<a class="btn-light" href="' + S.appUrl + '"><span class="plat-ic">📱</span> iPhone (web) <span class="arr">→</span></a>' +
        '<a class="btn-outline-light" href="' + S.playStoreUrl + '"><span class="plat-ic">🤖</span> Android (Play Store) <span class="arr">→</span></a>' +
      "</div>";
  }

  function renderFooter() {
    var mount = document.getElementById("hs-footer");
    if (!mount) return;
    mount.outerHTML =
      "<footer><div class=\"wrap\">" +
        S.brand + " · Simulateur indépendant du droit du travail français · " + S.year + "<br>" +
        "Informations à titre indicatif — <a href=\"#\">conditions d'utilisation</a>." +
      "</div></footer>";
  }

  [renderTopbar, renderHeroCta, renderAppCta, renderFooter].forEach(function (fn) {
    try { fn(); } catch (e) { /* une balise manquante ne doit jamais casser la page */ }
  });
})();
