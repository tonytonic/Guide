/* ============================================================================
   CORE.JS — Noyau commun des pages /guides/
   ----------------------------------------------------------------------------
   Injecte les blocs identiques sur toutes les pages (topbar, boutons
   iPhone/Android, pied de page). Pour changer un lien partout : site-data.js.

   UTILISATION DANS UNE PAGE :
     <div id="hs-topbar" data-stamp="à jour juin 2026 · IDCC 16"></div>
     <div id="hs-hero-cta" data-label="Calculer mes heures sup"></div>
     <div id="hs-app-cta"></div>
     <div id="hs-prevnext-top" data-page="nom-du-fichier.html"></div>   (haut de page)
     <div id="hs-prevnext-bottom" data-page="nom-du-fichier.html"></div> (bas de page, avant le footer)
     <div id="hs-footer"></div>
     <script src="assets/search-index.js"></script>  (requis pour le prev/next — liste ordonnée des 850 pages)
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

  function escapeHtml(str) {
    return (str || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c];
    });
  }

  function renderPrevNext(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var list = window.HS_SEARCH_INDEX;
    if (!list || !list.length) return;
    var current = mount.getAttribute("data-page");
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].url === current) { idx = i; break; }
    }
    if (idx === -1) return;
    var prev = idx > 0 ? list[idx - 1] : null;
    var next = idx < list.length - 1 ? list[idx + 1] : null;

    var html = '<nav class="hs-prevnext" aria-label="Navigation entre guides">';
    html += prev
      ? '<a class="hs-pn prev" href="' + prev.url + '"><span class="hs-pn-arrow">←</span><span class="hs-pn-txt">' + escapeHtml(prev.title) + "</span></a>"
      : '<span class="hs-pn disabled"><span class="hs-pn-arrow">←</span><span class="hs-pn-txt">Début du guide</span></span>';
    html += '<a class="hs-pn home" href="index.html" title="Tous les guides">🦊</a>';
    html += next
      ? '<a class="hs-pn next" href="' + next.url + '"><span class="hs-pn-txt">' + escapeHtml(next.title) + '</span><span class="hs-pn-arrow">→</span></a>'
      : '<span class="hs-pn disabled next"><span class="hs-pn-txt">Fin du guide</span><span class="hs-pn-arrow">→</span></span>';
    html += "</nav>";

    mount.outerHTML = html;
  }

  [renderTopbar, renderHeroCta, renderAppCta, renderFooter].forEach(function (fn) {
    try { fn(); } catch (e) { /* une balise manquante ne doit jamais casser la page */ }
  });

  ["hs-prevnext-top", "hs-prevnext-bottom"].forEach(function (id) {
    try { renderPrevNext(id); } catch (e) { /* idem */ }
  });
})();
