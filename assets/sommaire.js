/* ============================================================================
   SOMMAIRE.JS — Table des matières auto-générée du dossier /guides/
   ----------------------------------------------------------------------------
   Construit un sommaire "à tiroirs" (gros titre de catégorie -> clic -> liste
   des pages) directement depuis assets/search-index.js. Rien n'est codé en
   dur : toute page ajoutée à search-index.js (avec son champ "cat") rejoint
   automatiquement la bonne catégorie ici, sans toucher à index.html.

   CÔTÉ PYTHON (script qui régénère search-index.js) : chaque entrée doit
   porter un champ "cat" en plus de url/title/h1/excerpt, ex :
     {"url":"...","title":"...","h1":"...","excerpt":"...","cat":"metiers-sante"}
   Si "cat" est absent ou inconnu de CAT_META ci-dessous, la page atterrit
   automatiquement dans une catégorie générique "Autres pages" — elle ne
   disparaît donc jamais du sommaire, même mal étiquetée.

   UTILISATION DANS UNE PAGE :
     <div id="hs-sommaire"></div>
     <script src="assets/search-index.js"></script>
     <script src="assets/sommaire.js"></script>
   ========================================================================== */

(function () {
  "use strict";

  /* Icône + libellé + ordre d'affichage pour chaque identifiant de catégorie.
     Pour créer une nouvelle catégorie : choisis un id (ex "metiers-sport"),
     mets-le dans le champ "cat" des pages concernées, et ajoute une ligne ici
     si tu veux choisir son icône/libellé/position — sinon elle s'affichera
     quand même, avec une icône et un nom par défaut dérivés de l'id. */
  var CAT_META = {
    "fondamentaux":            { ic: "⏱️", label: "Les fondamentaux des heures supplémentaires" },
    "temps-travail":           { ic: "🗓️", label: "Temps de travail & organisation" },
    "remuneration":            { ic: "💶", label: "Rémunération, salaire & paie" },
    "contrat-rupture":         { ic: "📄", label: "Contrat de travail & rupture" },
    "conges":                  { ic: "🏖️", label: "Congés & absences" },
    "sante-securite":          { ic: "🩺", label: "Santé, sécurité & handicap au travail" },
    "representation":          { ic: "🗳️", label: "Représentation du personnel & dialogue social" },
    "contentieux":             { ic: "⚖️", label: "Contentieux, contrôle & procédures" },
    "statuts":                 { ic: "🧩", label: "Statuts particuliers & situations spécifiques" },
    "retraite":                { ic: "🏛️", label: "Retraite & fin de carrière" },
    "outremer":                { ic: "🌴", label: "Outre-mer" },
    "metiers-transport":       { ic: "🚚", label: "Métiers — Transport, logistique & livraison" },
    "metiers-sante":           { ic: "🩺", label: "Métiers — Santé & médico-social" },
    "metiers-services-personne": { ic: "🏠", label: "Métiers — Services à la personne & aide à domicile" },
    "metiers-education":       { ic: "🎓", label: "Métiers — Éducation, animation & petite enfance" },
    "metiers-btp-industrie":   { ic: "🏗️", label: "Métiers — BTP, industrie & artisanat" },
    "metiers-commerce":        { ic: "🛍️", label: "Métiers — Commerce, vente & distribution" },
    "metiers-hcr":             { ic: "🍽️", label: "Métiers — Hôtellerie, restauration & tourisme" },
    "metiers-agri":            { ic: "🌾", label: "Métiers — Agriculture & agroalimentaire" },
    "metiers-bureau":          { ic: "💼", label: "Métiers — Bureau, juridique, finance & numérique" },
    "metiers-securite-defense": { ic: "🛡️", label: "Métiers — Sécurité, défense & services funéraires" },
    "metiers-autres":          { ic: "🎭", label: "Métiers — Culture, sport, médias & autres" },
    "lexique":                 { ic: "📚", label: "Lexique, outils & checklists" },
    "autres":                  { ic: "🦊", label: "Autres pages" }
  };

  /* Ordre d'affichage souhaité. Tout id absent de cette liste (catégorie
     future non prévue ici) est simplement ajouté à la fin, par ordre
     alphabétique de son libellé — il n'est donc jamais perdu. */
  var ORDER = [
    "fondamentaux","temps-travail","remuneration","contrat-rupture","conges",
    "sante-securite","representation","contentieux","statuts","retraite","outremer",
    "metiers-transport","metiers-sante","metiers-services-personne","metiers-education",
    "metiers-btp-industrie","metiers-commerce","metiers-hcr","metiers-agri",
    "metiers-bureau","metiers-securite-defense","metiers-autres","lexique","autres"
  ];

  function escapeHtml(str) {
    return (str || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c];
    });
  }

  function prettifyId(id) {
    var s = (id || "page").replace(/^metiers?-/, "Métiers — ").replace(/-/g, " ");
    return "📄 " + s.charAt(0).toUpperCase() + s.slice(1);
  }

  function render() {
    var mount = document.getElementById("hs-sommaire");
    if (!mount) return;
    var list = window.HS_SEARCH_INDEX;
    if (!list || !list.length) {
      mount.innerHTML = '<p class="som-empty">Le sommaire se charge… recharge la page si rien n\'apparaît.</p>';
      return;
    }

    // Regroupe les pages par catégorie
    var groups = {};
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      var cid = p.cat || "autres";
      if (!groups[cid]) groups[cid] = [];
      groups[cid].push(p);
    }

    // Construit l'ordre final : ORDER d'abord (catégories présentes), puis
    // toute catégorie inconnue restante, triée par libellé.
    var ids = Object.keys(groups);
    var ordered = ORDER.filter(function (id) { return groups[id]; });
    var rest = ids.filter(function (id) { return ORDER.indexOf(id) === -1; });
    rest.sort(function (a, b) {
      var la = (CAT_META[a] ? CAT_META[a].label : prettifyId(a));
      var lb = (CAT_META[b] ? CAT_META[b].label : prettifyId(b));
      return la.localeCompare(lb, "fr");
    });
    ordered = ordered.concat(rest);

    var total = list.length;
    var html = '<div class="som-toolbar">' +
      '<span class="som-total">' + total + ' pages · ' + ordered.length + ' catégories</span>' +
      '<button type="button" id="som-toggle-all" class="som-toggle-all">Tout déplier</button>' +
      '</div>';

    ordered.forEach(function (cid) {
      var pages = groups[cid].slice().sort(function (a, b) {
        return (a.title || a.url).localeCompare(b.title || b.url, "fr");
      });
      var meta = CAT_META[cid] || { ic: "📄", label: prettifyId(cid).replace(/^📄\s*/, "") };

      html += '<details class="som-cat">' +
        '<summary><span class="som-ic">' + meta.ic + '</span>' +
        '<span class="som-label">' + escapeHtml(meta.label) + '</span>' +
        '<span class="som-count">' + pages.length + '</span></summary>' +
        '<div class="som-list">';

      pages.forEach(function (p) {
        html += '<a class="som-link" href="' + p.url + '">' + escapeHtml(p.title || p.h1 || p.url) + '</a>';
      });

      html += '</div></details>';
    });

    mount.innerHTML = html;

    var toggleBtn = document.getElementById("som-toggle-all");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        var allDetails = mount.querySelectorAll(".som-cat");
        var anyClosed = Array.prototype.some.call(allDetails, function (d) { return !d.open; });
        allDetails.forEach(function (d) { d.open = anyClosed; });
        toggleBtn.textContent = anyClosed ? "Tout replier" : "Tout déplier";
      });
    }
  }

  try { render(); } catch (e) { /* une page mal formée ne doit jamais casser le sommaire entier */ }
})();
