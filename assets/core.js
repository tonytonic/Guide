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
    cguUrl:       "conditions-utilisation",
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
        '<a class="brand" href="/"><span class="mark">🦊</span> ' + brandHtml() + "</a>" +
        '<div class="stamp">' + stamp + "</div>" +
      "</div></div>";
  }

  function renderHeroCta() {
    var mount = document.getElementById("hs-hero-cta");
    if (!mount) return;
    var label = mount.getAttribute("data-label") || "Ouvrir le simulateur";
    var platform = detectPlatform();

    var btnIosPrimary      = '<a class="btn" href="' + S.appUrl + '" target="_blank" rel="noopener">' + label + ' <span class="arr">→</span></a>';
    var btnAndroidPrimary  = '<a class="btn" href="' + S.playStoreUrl + '" target="_blank" rel="noopener">' + appIconHtml + ' Télécharger sur le Play Store <span class="arr">→</span></a>';

    var buttons, sub;
    if (platform === "android") {
      buttons = btnAndroidPrimary;
      sub = "disponible sur le Play Store.";
    } else if (platform === "ios") {
      buttons = btnIosPrimary;
      sub = "web app, ajoute-la à ton écran d'accueil.";
    } else {
      // PC/Mac : pas de lien direct vers l'appli, optimisée mobile uniquement.
      buttons = '<span class="btn-outline" style="cursor:default">📱 Optimisée mobile</span>';
      sub = "ouvre cette page sur iPhone ou Android pour accéder au simulateur.";
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
    var desktopNotice      = '<span class="btn-outline-light" style="cursor:default">📱 Optimisée mobile — ouvre cette page sur iPhone ou Android</span>';

    if (platform === "android") return btnAndroidPrimary;
    if (platform === "ios") return btnIos;
    return desktopNotice; // PC/Mac : pas de lien direct vers l'appli, optimisée mobile uniquement.
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
    var cgu = S.cguUrl || "conditions-utilisation";
    var privacy = S.privacyUrl || "confidentialite";
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
    a.href = "/";
    a.innerHTML = '<span class="hs-bg-ic">🦊</span><span class="hs-bg-txt">Tous les guides</span>';
    document.body.appendChild(a);
  }

  /* Bouton "← Retour" : revient à la page précédente dans l'historique du
     navigateur (recherche, sommaire, guide précédent...) au lieu de toujours
     ramener à l'accueil. Ne s'affiche que s'il y a réellement un historique
     de navigation à consulter ; sinon on laisse uniquement "Tous les guides". */
  function renderBackPrev() {
    if (document.getElementById("hs-back-prev")) return; // déjà présent
    var page = (location.pathname.split("/").pop() || "").toLowerCase();
    if (page === "" || page === "index.html") return; // pas utile sur l'accueil
    if (!(window.history && window.history.length > 1)) return; // rien à quoi revenir

    var btn = document.createElement("button");
    btn.id = "hs-back-prev";
    btn.type = "button";
    btn.setAttribute("aria-label", "Retour à la page précédente");
    btn.innerHTML = '<span class="hs-bp-ic">←</span><span class="hs-bp-txt">Retour</span>';
    document.body.appendChild(btn);

    btn.addEventListener("click", function () {
      // Un referrer externe (ex: résultat Google) doit quand même ramener
      // au sommaire du site plutôt que de faire sortir l'utilisateur du site.
      var ref = document.referrer;
      var sameOrigin = ref && ref.indexOf(location.origin) === 0;
      if (sameOrigin || window.history.length > 2) {
        window.history.back();
      } else {
        location.href = "/";
      }
    });
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
    html += '<a class="hs-pn home" href="/" title="Tous les guides">🦊</a>';
    html += next
      ? '<a class="hs-pn next" href="' + next.url + '"><span class="hs-pn-txt">' + escapeHtml(next.title) + '</span><span class="hs-pn-arrow">→</span></a>'
      : '<span class="hs-pn disabled next"><span class="hs-pn-txt">Fin du guide</span><span class="hs-pn-arrow">→</span></span>';
    html += "</nav>";

    mount.outerHTML = html;
  }

  /* Bandeau promotionnel MonLegiTexte — ÉPHÉMÈRE : visible jusqu'au 30/09/2026
     inclus, puis n'apparaît plus (disparaît le 1er octobre). Fermable par
     l'utilisateur (mémorisé). Annonce le lancement de l'appli, réservé aux
     utilisateurs de l'application (non disponible en ligne). */
  function renderPromoMLT() {
    // 1) Fin de vie : plus rien à partir du 1er octobre 2026.
    if (new Date() >= new Date("2026-10-01T00:00:00")) return;
    // 2) Déjà fermé par l'utilisateur ?
    try { if (localStorage.getItem("mlt_promo_dismissed") === "1") return; } catch (e) {}
    // 3) Insertion en tête du contenu principal.
    var main = document.querySelector("main.wrap") || document.querySelector("main");
    if (!main) return;
    var el = document.createElement("aside");
    el.className = "mlt-promo";
    el.setAttribute("role", "complementary");
    el.setAttribute("aria-label", "Annonce MonLegiTexte");
    el.innerHTML =
      '<button class="mlt-promo-close" type="button" aria-label="Fermer l\'annonce">\u00d7</button>' +
      '<div class="mlt-promo-media"><img src="/assets/img/promo-mlt.webp" alt="Aper\u00e7u de l\'application MonLegiTexte" loading="lazy" width="492" height="528"></div>' +
      '<div class="mlt-promo-body">' +
        '<span class="mlt-promo-badge">Nouveau \u00b7 rentr\u00e9e septembre</span>' +
        '<h3 class="mlt-promo-title">Mon<span class="mlt-gold">LegiTexte</span> \u2014 moteur de recherche juridique</h3>' +
        '<p class="mlt-promo-lead">Les <b>vraies sources</b> \u2014 API <span class="mlt-gold">L\u00e9gifrance</span> &amp; <span class="mlt-gold">Judilibre</span>. Conventions collectives, Code du travail, S\u00e9curit\u00e9 sociale, jurisprudence, Journal Officiel &amp; accords d\'entreprise.</p>' +
        '<p class="mlt-promo-free">\u2713 <b>100\u202f% gratuit</b>, pens\u00e9 pour les salari\u00e9s.</p>' +
        '<p class="mlt-promo-note">Lancement \u00e0 la <b>rentr\u00e9e, septembre 2026</b> \u2014 r\u00e9serv\u00e9 aux utilisateurs de l\'application (non disponible en ligne). Un peu de patience.</p>' +
      '</div>';
    main.insertBefore(el, main.firstChild);
    var close = el.querySelector(".mlt-promo-close");
    if (close) close.addEventListener("click", function () {
      if (el.parentNode) el.parentNode.removeChild(el);
      try { localStorage.setItem("mlt_promo_dismissed", "1"); } catch (e) {}
    });
  }

  [renderTopbar, renderHeroCta, renderAppCta, renderFooter, renderBackToGuides, renderBackPrev, renderBackToTop, renderPromoMLT].forEach(function (fn) {
    try { fn(); } catch (e) { /* une balise manquante ne doit jamais casser la page */ }
  });

  ["hs-prevnext-top", "hs-prevnext-bottom"].forEach(function (id) {
    try { renderPrevNext(id); } catch (e) { /* idem */ }
  });
})();
