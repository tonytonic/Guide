/* ============================================================================
   CORE.JS — Noyau commun des pages /guides/
   ----------------------------------------------------------------------------
   Injecte les blocs identiques sur toutes les pages (topbar, boutons
   iPhone/Android, pied de page). Pour changer un lien partout : site-data.js.

   UTILISATION DANS UNE PAGE :
     <div id="hs-topbar" data-stamp="à jour juin 2026 · IDCC 16"></div>
     <div id="hs-hero-cta" data-label="Calculer mes heures sup"></div>
     <div id="hs-app-cta"></div>
     <div id="hs-footer"></div>
     <script src="assets/site-data.js"></script>
     <script src="assets/core.js"></script>
   ========================================================================== */

(function () {
  "use strict";

  var S = window.HS_SITE || {
    brand:        "Heures Supplémentaires France",
    appUrl:       "https://simulateurheuressupfrance.pages.dev/menu",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.tonytonic.heuressup",
    cguUrl:       "conditions-utilisation.html",
    stampDefault: "à jour juin 2026",
    year:         2026
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
        '<a class="brand" href="index.html"><span class="mark">🦊</span> ' + brandHtml() + "</a>" +
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
          '<a class="btn" href="' + S.appUrl + '" target="_blank" rel="noopener">' + label + ' <span class="arr">→</span></a>' +
          '<a class="btn-outline" href="' + S.playStoreUrl + '" target="_blank" rel="noopener"><span class="plat-ic">🤖</span> Version Android <span class="arr">→</span></a>' +
        "</div>" +
        '<span class="btn-sub"><b>Gratuit, sans compte</b> — ' + sub + "</span>" +
      "</div>";
  }

  function renderAppCta() {
    var mount = document.getElementById("hs-app-cta");
    if (!mount) return;
    mount.outerHTML =
      '<div class="btn-group" style="justify-content:center">' +
        '<a class="btn-light" href="' + S.appUrl + '" target="_blank" rel="noopener"><span class="plat-ic">📱</span> iPhone (web) <span class="arr">→</span></a>' +
        '<a class="btn-outline-light" href="' + S.playStoreUrl + '" target="_blank" rel="noopener"><span class="plat-ic">🤖</span> Android (Play Store) <span class="arr">→</span></a>' +
      "</div>";
  }

  function renderFooter() {
    var mount = document.getElementById("hs-footer");
    if (!mount) return;
    var cgu = S.cguUrl || "conditions-utilisation.html";
    mount.outerHTML =
      "<footer><div class=\"wrap\">" +
        S.brand + " · Simulateur indépendant du droit du travail français · " + S.year + "<br>" +
        "Informations à titre indicatif — <a href=\"" + cgu + "\">conditions d'utilisation</a>." +
      "</div></footer>";
  }

  [renderTopbar, renderHeroCta, renderAppCta, renderFooter].forEach(function (fn) {
    try { fn(); } catch (e) { /* une balise manquante ne doit jamais casser la page */ }
  });
})();
