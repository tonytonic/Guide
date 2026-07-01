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
/* Bouton flottant "retour en haut" : injecté automatiquement sur TOUTE page
   qui charge ce script — pas de balise à ajouter, rien à re-pousser. */

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

  function detectPlatform() {
    var ua = navigator.userAgent || navigator.vendor || window.opera || "";
    if (/android/i.test(ua)) return "android";
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "ios";
    return "other";
  }

  var appIconHtml = '<img class="plat-ic" src="assets/img/app-icon.png" alt="" loading="lazy">';

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
    var customSub = mount.getAttribute("data-sub") ||
      "iPhone via ce lien (web), Android sur le Play Store.";
    var platform = detectPlatform();

    var btnIosPrimary      = '<a class="btn" href="' + S.appUrl + '" target="_blank" rel="noopener">' + label + ' <span class="arr">→</span></a>';
    var btnAndroidPrimary  = '<a class="btn" href="' + S.playStoreUrl + '" target="_blank" rel="noopener">' + appIconHtml + ' Télécharger sur le Play Store <span class="arr">→</span></a>';
    var btnAndroidSecondary = '<a class="btn-outline" href="' + S.playStoreUrl + '" target="_blank" rel="noopener">' + appIconHtml + ' Version Android <span class="arr">→</span></a>';

    var buttons, sub;
    if (platform === "android") {
      buttons = btnAndroidPrimary;
      sub = "Gratuit — disponible sur le Play Store.";
    } else if (platform === "ios") {
      buttons = btnIosPrimary;
      sub = "Gratuit, sans compte — web app, ajoute-la à ton écran d'accueil.";
    } else {
      buttons = btnIosPrimary + btnAndroidSecondary;
      sub = customSub;
    }

    mount.outerHTML =
      '<div class="cta-row rise d3">' +
        '<div class="btn-group">' + buttons + "</div>" +
        '<span class="btn-sub"><b>Gratuit, sans compte</b> — ' + sub + "</span>" +
      "</div>";
  }

  function appCtaHtml() {
    var platform = detectPlatform();
    var btnIos             = '<a class="btn-light" href="' + S.appUrl + '" target="_blank" rel="noopener">' + appIconHtml + ' iPhone (web) <span class="arr">→</span></a>';
    var btnAndroidPrimary  = '<a class="btn-light" href="' + S.playStoreUrl + '" target="_blank" rel="noopener">' + appIconHtml + ' Télécharger sur le Play Store <span class="arr">→</span></a>';
    var btnAndroidOutline  = '<a class="btn-outline-light" href="' + S.playStoreUrl + '" target="_blank" rel="noopener">' + appIconHtml + ' Android (Play Store) <span class="arr">→</span></a>';

    if (platform === "android") return btnAndroidPrimary;
    if (platform === "ios") return btnIos;
    return btnIos + btnAndroidOutline;
  }
  window.HS_appCtaHtml = appCtaHtml; // réutilisable par d'autres scripts de la page (ex: switchTab dans index.html)

  function renderAppCta() {
    var mount = document.getElementById("hs-app-cta");
    if (!mount) return;
    mount.outerHTML = '<div class="btn-group" style="justify-content:center">' + appCtaHtml() + "</div>";
  }

  function renderFooter() {
    var mount = document.getElementById("hs-footer");
    if (!mount) return;
    var cgu = S.cguUrl || "conditions-utilisation.html";
    var privacy = S.privacyUrl || "confidentialite.html";
    mount.outerHTML =
      "<footer><div class=\"wrap\">" +
        S.brand + " · Simulateur indépendant du droit du travail français · " + S.year + "<br>" +
        "Informations à titre indicatif — " +
        "<a href=\"" + cgu + "\">Mentions légales &amp; CGU</a> · " +
        "<a href=\"" + privacy + "\">Confidentialité</a>." +
      "</div></footer>";
  }

  function renderBackToGuides() {
    if (document.getElementById("hs-back-guides")) return; // déjà présent
    var page = (location.pathname.split("/").pop() || "").toLowerCase();
    if (page === "" || page === "index.html") return; // déjà sur la liste des guides, inutile ici
    var a = document.createElement("a");
    a.id = "hs-back-guides";
    a.href = "index.html";
    a.innerHTML = '<span class="hs-bg-ic">🦊</span><span class="hs-bg-txt">Tous les guides</span>';
    document.body.appendChild(a);
  }

  function renderBackToTop() {
    if (document.getElementById("hs-back-to-top")) return; // déjà présent, ne pas dupliquer
    var btn = document.createElement("button");
    btn.id = "hs-back-to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Retour en haut de page");
    btn.innerHTML = "↑";
    document.body.appendChild(btn);

    function toggle() {
      if (window.scrollY > 400) btn.classList.add("visible");
      else btn.classList.remove("visible");
    }
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
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

  [renderTopbar, renderHeroCta, renderAppCta, renderFooter, renderBackToGuides, renderBackToTop].forEach(function (fn) {
    try { fn(); } catch (e) { /* une balise manquante ne doit jamais casser la page */ }
  });

  ["hs-prevnext-top", "hs-prevnext-bottom"].forEach(function (id) {
    try { renderPrevNext(id); } catch (e) { /* idem */ }
  });
})();
