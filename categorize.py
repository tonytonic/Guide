# -*- coding: utf-8 -*-
"""
categorize.py — Attribue/complète le champ "cat" de assets/search-index.js
pour alimenter automatiquement le sommaire à tiroirs (assets/sommaire.js).

UTILISATION :
    python3 categorize.py

Par défaut, le script ne touche QUE les entrées qui n'ont pas encore de
"cat" (donc tes corrections manuelles éventuelles ne sont jamais écrasées
par une nouvelle exécution). Pour reclasser TOUTES les entrées depuis zéro
(par ex. après avoir beaucoup enrichi les mots-clés ci-dessous), passe
FORCE_RECLASSIFY = True juste avant l'appel de classify_all().

Le script lit assets/search-index.js, reclasse, et réécrit le même fichier
(en gardant l'ordre des entrées intact — important pour la nav Précédent/
Suivant de core.js, qui dépend de l'ordre du tableau).
"""
import json, re, unicodedata, os
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
SEARCH_INDEX_PATH = os.path.join(HERE, 'assets', 'search-index.js')
FORCE_RECLASSIFY = False  # mets True pour reclasser même les pages qui ont déjà un "cat"

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

def norm(s):
    return strip_accents(s.lower())

def load_search_index(path):
    raw = open(path, encoding='utf-8').read()
    m = re.search(r'var HS_SEARCH_INDEX\s*=\s*(\[.*\]);', raw, re.S)
    if not m:
        raise SystemExit("Impossible de trouver 'var HS_SEARCH_INDEX = [...]' dans " + path)
    return json.loads(m.group(1))

def save_search_index(path, data):
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    out = ('/* HS_SEARCH_INDEX -- %d pages -- regenere par categorize.py */\n'
           'var HS_SEARCH_INDEX = %s;\n') % (len(data), body)
    open(path, 'w', encoding='utf-8').write(out)

data = load_search_index(SEARCH_INDEX_PATH)

FONDAMENTAUX_WHITELIST = {
    "heures-supplementaires-guide.html","defiscalisation-heures-supplementaires.html",
    "heures-non-payees.html","grille-salaire-convention.html",
    "chiffres-cles-heures-supplementaires-france.html","calcul-taux-horaire-pret-a-payer.html",
    "depassement-contingent-refus-salarie.html","depassement-contingent-refus-salarie-avance.html",
    "declaration-impots-heures-supplementaires-guide.html","heures-supplementaires-foyer-fiscal-guide.html",
    "taux-marginal-imposition-hs-guide.html","loi-hs-2025-nouveautes-guide.html",
    "reference-chiffres-cles-2026-guide.html","questions-frequentes-hs-guide.html",
    "declaration-fiscale-hs-guide.html",
}

CATEGORIES = [
    ("outremer", "🌴", "Outre-mer", [
        "guadeloupe","martinique","guyane","reunion-guide","mayotte","nouvelle-caledonie",
        "polynesie","saint-martin","saint-barthelemy","saint-pierre-miquelon",
        "wallis-et-futuna","wallis-futuna","smic-outre-mer","conges-bonifies-dom",
        "heures-supplementaires-dom-guide"
    ]),
    ("lexique", "📚", "Lexique, outils & checklists", [
        "lexique-sigles-rh","glossaire-conventions-collectives","checklist-embauche",
        "checklist-depart-retraite","checklist-fin-contrat","tableau-recapitulatif-indemnites-rupture",
        "guide-redaction-lettre-mise-en-demeure","lettre-demission-modele","lettre-licenciement-motivation",
        "mise-en-demeure-hs"
    ]),
    ("retraite", "🏛️", "Retraite & fin de carrière", [
        "retraite-calcul-trimestres","mise-a-la-retraite","preretraite","retraite-progressive",
        "rachat-trimestres","carriere-longue","retraite-supplementaire-per","preavis-depart-volontaire-retraite",
        "cumul-emploi-retraite","senior-approche-retraite"
    ]),
    ("conges", "🏖️", "Congés & absences", [
        "conge-paye-calcul","conges-payes-maladie-report","conge-parental-educatif","conge-paternite",
        "conge-sabbatique","conge-sans-solde","conge-creation-entreprise","conge-solidarite-familiale",
        "conge-menstruel","conges-evenements-familiaux","compte-epargne-temps","don-jours-repos-solidarite",
        "conge-proche-aidant","maladie-enfant-conges","demande-conges-payes-refus","rtt-calcul-2026",
        "rtt-utilisation-report","visite-medicale-reprise-apres-absence","conges-maternite-paternite",
        "amenagement-temps-partiel-aidant","arret-maladie-salarie","attestation-salaire-employeur-ijss",
        "don-sang-organes-temps-travail","maintien-salaire-maladie-maternite","prevoyance-arret-maladie-hs",
        "calcul-conges-payes-hs"
    ]),
    ("sante-securite", "🩺", "Santé, sécurité & handicap au travail", [
        "syndrome-epuisement-professionnel-burnout","risques-psychosociaux","rps-stress-travail",
        "droit-de-retrait","harcelement-moral","harcelement-sexuel","accident-travail-droits",
        "maladie-professionnelle","rqth-reconnaissance-handicap","oeth-obligation-emploi-handicapes",
        "inaptitude","addictions-travail-tests-depistage","visite-medicale","medecin-travail-role",
        "duerp-document-unique","bruit-vibrations-travail","risques-chimiques-cmr",
        "troubles-musculosquelettiques","travail-hauteur-reglementation","risque-routier-professionnel",
        "obligation-securite-employeur","plan-prevention-coactivite","surveillance-vie-privee-travail",
        "geolocalisation-vehicules","videosurveillance-travail","donnees-biometriques-travail",
        "rgpd-dossier-salarie","allaitement-travail-droits","protection-grossesse-licenciement",
        "transidentite-travail-droits","discrimination-embauche-recrutement","egalite-professionnelle-fh",
        "egalite-salariale-fh-index","action-groupe-discrimination","ia-recrutement-discrimination",
        "religion-laicite-entreprise","prevention-addictions-travail","handicap-travail-protege",
        "temps-partiel-therapeutique","travailleur-esat-statut","amenagement-poste-inaptitude",
        "preuve-illicite-employeur","faute-inexcusable-employeur","prejudice-anxiete-amiante",
        "index-egalite-seniors","travail-egal-salaire-egal"
    ]),
    ("representation", "🗳️", "Représentation du personnel & dialogue social", [
        "cse-droits-salaries","nao-negociation-annuelle","negociation-annuelle-obligatoire",
        "accord-methode-negociation","accord-performance-collective","protection-lanceur-alerte",
        "heures-delegation-cse","delegation-syndicale-heures","delegue-syndical-heures-delegation",
        "protection-representants-personnel","elections-cse-protocole-electoral","referendum-entreprise",
        "bdese-base-donnees","droit-greve-hs","greve-droits-salaries","expert-cse-recours",
        "defenseur-syndical-procedure","charte-ethique-deontologie","section-syndicale-representativite",
        "negociation-collective-accord-entreprise","negociation-individuelle-avenant","negociation-amiable-hs",
        "elu-local-salarie-credit-heures"
    ]),
    ("contentieux", "⚖️", "Contentieux, contrôle & procédures", [
        "prud-hommes-procedure","refere-prudhommal","refere-prudhommes-urgence","bareme-macron-indemnites",
        "inspection-travail-signalement","jurisprudence-hs","peremption-instance-prudhommes",
        "attestation-prudhommes-temoignage","honoraires-avocat-prudhommes","appel-jugement-prudhommal",
        "departage-prudhommes","execution-provisoire-jugement","mediation-conventionnelle-mard",
        "defenseur-droits-saisine","controle-redressement-urssaf","preuve-heures-travail",
        "preuve-temps-travail-partagee","bureau-conciliation-orientation","prescription-salaires-rappel"
    ]),
    ("remuneration", "💶", "Rémunération, salaire & paie", [
        "salaire-variable-commissions-bonus","avantages-nature-vehicule-logement","avantages-nature-numerique",
        "avantage-nature-repas-cantine","titre-restaurant-guide","ticket-restaurant-titres-avantages",
        "csg-crds-salaire","bulletin-paie-comprendre","net-social-bulletin-paie","saisie-sur-salaire",
        "saisie-salaire-hs","pension-alimentaire-saisie","acompte-avance-salaire",
        "avance-commission-salaire-variable","frais-professionnels-remboursement",
        "optimisation-fiscale-remuneration","forfait-social-interessement","interessement-mise-en-place",
        "participation-salaries","epargne-salariale","bspce-actionnariat-salarie",
        "plafond-securite-sociale-tranches","taux-cotisations-2026","treizieme-mois",
        "indemnite-kilometrique-bareme","indemnite-transport","indemnite-salissure-outillage",
        "frais-mission-internationale","frais-representation-cadres","salaire-minimum-garanti",
        "salaire-cout-employeur","negociation-salaire","augmentation-salaire-negotiation",
        "clause-objectifs-remuneration-variable","prime-anciennete","prime-vacances","prime-precarite-cdd",
        "prime-partage-valeur","fiche-paie-dematerialisee","regles-paie-bulletins-specifiques",
        "credit-impot-services-personne","mutuelle-entreprise-obligatoire","prevoyance-incapacite-invalidite",
        "patron-paie-hs-bons-cadeaux","retraite-supplementaire-per-entreprise","hs-salaires-nets-bruts",
        "gestionnaire-paie-hs","ifc-indemnite-fin-cdd","portabilite-droits-mobilite"
    ]),
    ("contrat-rupture", "📄", "Contrat de travail & rupture", [
        "abandon-de-poste-demission","demission-droits-preavis","demission-legitime-are",
        "rupture-conventionnelle","periode-essai","preavis-licenciement","preavis-dispense-indemnite",
        "preavis-legal-duree","preavis-recherche-emploi-heures","indemnite-licenciement-calcul",
        "licenciement-economique","licenciement-faute","licenciement-nul-causes",
        "licenciement-particulier-employeur","transaction-accord-rupture","transaction-apres-licenciement",
        "mise-a-pied-disciplinaire-conservatoire","retrogradation-disciplinaire","sanctions-disciplinaires",
        "dossier-disciplinaire-salarie","convocation-entretien-prealable","modification-contrat-travail-refus",
        "clause-mobilite-geographique","clause-non-concurrence","clause-non-sollicitation",
        "clause-dedit-formation","clause-confidentialite","clause-exclusivite-temps-partiel",
        "clause-cession-journaliste","changement-lieu-travail-secteur-geographique","prise-acte-rupture",
        "resiliation-judiciaire-contrat","certificat-travail-contenu","solde-tout-compte",
        "transfert-entreprise-l1224","mentions-obligatoires-contrat-travail",
        "signature-electronique-contrat-travail","cdi-chantier-operation","cdd-usage",
        "cdd-motifs-requalification","contrat-apprentissage","contrat-professionnalisation",
        "dpae-formalites-embauche","mobilite-volontaire-securisee","coemploi-guide",
        "cession-fonds-commerce-salarie","rupture-anticipee-cdd-faute-grave","plan-sauvegarde-emploi-pse",
        "restructuration-plan-sauvegarde-hs","activite-partielle-chomage-partiel","chomage-are-calcul",
        "chomage-partiel-hs","interim-vs-cdd-vs-cdi-comparatif","periode-essai-rupture",
        "periode-essai-droits-obligations","execution-loyale-contrat-travail","reglement-interieur-entreprise",
        "seuils-effectifs","entretien-professionnel","reconversion-professionnelle","vae-validation-acquis",
        "plan-developpement-competences","gpec-gepp","bilan-competences","csp-contrat-securisation",
        "formation-cpf","attestation-france-travail-erreurs","anciennete-calcul"
    ]),
    ("statuts", "🧩", "Statuts particuliers & situations spécifiques", [
        "agences-travail-temporaire-droits","interim-cdd-droits-specifiques","interim-longue-duree-hs",
        "interim-longue-mission-hs","interim-agence-emploi","auto-entrepreneur-salarie-deguise",
        "groupement-employeurs-temps-partage","hs-groupement-employeurs","cumul-emplois-obligation-loyaute",
        "hs-travail-a-distance-international","hs-fonctionnaires-agents-publics","apprenti-alternant-hs",
        "vie-volontariat-international","hs-mandataire-social-dirigeant","portage-salarial",
        "hs-cdd-remplacement","hs-cdi-intermittent","hs-sous-effectif-impose","hs-teletravail-partiel",
        "salarie-detache-en-france-employeur-etranger","detachement-salarie-ue","expatriation-vs-detachement",
        "salarie-impatrie-regime-fiscal","salarie-etranger-titre-travail","teletravail-international-frontalier",
        "plateformes-livreurs-qualification","service-civique-statut","premier-emploi-hs",
        "job-etudiant-cdd-etudiant","travail-dissimule-travail-noir","tese-titre-emploi-service-entreprise",
        "travail-mineurs-regles-generales","stage-droits-stagiaire",
        "profession-liberale-independant-converti-salarie","professions-liberales-heures-supplementaires",
        "cadre-dirigeant-vs-cadre-autonome","interprete-lsf-statut","mandataire-judiciaire-protection-majeurs",
        "travail-saisonnier-droits","chauffeur-vtc-statut","hs-pendant-conge-paye","hs-pendant-preavis",
        "retour-maternite-hs","maladie-professionnelle-hs-reconstitution","hs-non-pris-en-compte-entreprise-rachetee",
        "hs-meme-groupe-entreprises","hs-horaires-variables-imposees","hs-horaires-variables-imposes",
        "sous-traitance-donneur-ordre","pret-main-oeuvre-illicite-marchandage","droit-auteur-salarie-creatif",
        "travailleur-frontalier","monaco-travailleurs-frontaliers","micro-entrepreneur-freelance-conversion",
        "eleve-ingenieur-stagiaire","salarie-multi-employeurs","salarie-saisonnier-double-activite",
        "jeune-travailleur-mineur","salarie-prive-emploi-senior","cdd-senior-tremplin",
        "artisan-patron-salarie-mixte","travail-interimaire"
    ]),
    ("temps-travail", "🗓️", "Temps de travail & organisation", [
        "temps-partiel-heures-complementaires","forfait-jours-cadres","astreinte-guide",
        "modulation-annualisation","travail-de-nuit-majoration","dimanche-jours-feries",
        "durees-maximales-travail","teletravail-droits","teletravail-sante-securite",
        "horaires-individualises","badgeage-obligation-controle-temps","badgeage-pointage-obligatoire",
        "carnet-pointage-heures-supplementaires","habillage-deshabillage-temps-travail","temps-pause-legale",
        "temps-trajet-domicile-travail","forfait-heures-cadre","forfait-mobilites-durables-velo",
        "organisation-temps-travail","repos-dominical-derogations","jour-solidarite-lundi-pentecote",
        "pont-jour-ferie","travail-equipe-feu-continu","forfait-annuel-heures",
        "travail-dominical-zones-touristiques","equivalences-horaires-transport-hotellerie",
        "temps-plein-vers-temps-partiel","byod-equipement-personnel","cybersecurite-responsabilite-salarie",
        "droit-deconnexion","charte-informatique-entreprise","c2p-penibilite",
        "surveillant-nuit-etablissement-social","hs-jour-ferie-travaille","travailleur-nuit-permanent",
        "chef-equipe-nuit"
    ]),
]

METIER_SUBCATS = [
    ("metiers-transport", "🚚", "Transport, logistique & livraison", [
        "chauffeur","transport-routier","magasinier","cariste","livreur","coursier","ambulancier",
        "messagerie-heures","quai","manutentionnaire","aerien","maritime","portuaire","ferroviaire",
        "benne-ordures","demenagement","taxi","navigation-interieure","marin-pecheur",
        "personnel-navigant-commercial","hotesse-air","agent-ratp","porteur-courrier","facteur",
        "agent-tri-postal","location-vehicules","loueur-courte-duree","transport-voyageurs"
    ]),
    ("metiers-sante", "🩺", "Santé & médico-social", [
        "aide-soignant","infirmier","medical","hopital","clinique","ehpad","handicap",
        "kinesitherapeute","sage-femme","pharmacie","brancardier","amp-aes","educateur-specialise",
        "orthophoniste","puericulture","medico-social","laboratoire","anesthesiste","psychologue",
        "dietetique","centres-medico-psychologiques","veterinaire","osteopathe","podologue",
        "orthoptiste","orthopediste-orthesiste","manipulateur-radio","audioprothesiste",
        "assistante-dentaire","ash-agent-service-hospitalier","hospitalisation-privee"
    ]),
    ("metiers-services-personne", "🏠", "Services à la personne & aide à domicile", [
        "aide-a-domicile","aide-domicile","auxiliaire-vie","garde-enfants","nounou",
        "assistante-maternelle","employe-maison","particuliers-employeurs","services-personne",
        "foyers-jeunes-travailleurs","conciergerie-gardien-residence","hlm-bailleurs",
        "toiletteur","gardiennage-immeuble","gestionnaire-copropriete"
    ]),
    ("metiers-education", "🎓", "Éducation, animation & petite enfance", [
        "aesh-accompagnant-eleve-handicap","enseignant","enseignement-prive","ecole-musique-danse",
        "animateur-periscolaire","animateur-bafa","alsh-centres-loisirs","atsem",
        "educateur-jeunes-enfants","surveillant-examen","formation-professionnelle",
        "formateur-organisme-formation","mediateur-social","assistant-social-entreprise",
        "centres-sociaux"
    ]),
    ("metiers-btp-industrie", "🏗️", "BTP, industrie & artisanat", [
        "btp-heures","plombier","charpentier","couvreur","zingueur","metallurgie","chimie-heures",
        "industries-chimiques","verre-heures","cuir","maroquinerie","industrie-bois","grutier",
        "soudeur","cordiste","ramonage","fumisterie","controleur-technique-auto","instruments-mesure",
        "huissier-commissaire-justice","demolition-desamiantage","fonderie-forge","plasturgie",
        "pneumatique-caoutchouc-plastique","minerais-carrieres","electronique-electrique",
        "frigoriste-climaticien","ascensoriste","monteur-reseaux-electriques","eau-assainissement",
        "energie-renouvelable","telecoms-heures","imprimeur-technicien","carrossier-peintre-auto",
        "mecanicien-auto","conducteur-engins-travaux-publics","travaux-publics","aeronautique-spatial",
        "energie-gaz","boulang","caoutchouc","carreleur","ceramique-porcelaine","ciment-heures",
        "etancheur","facadier-ravaleur","macon-coffreur","menuisier-atelier","ouvrier-qualifie-chantier",
        "peintre-batiment","technicien-bureau-controle","ardoises-marbre","papier-carton",
        "industrie-papier-emballage","textile-heures","industrie-textile-habillement","habillement-heures",
        "industries-mode-chapellerie","pneumatique-aluminium","sucrerie-distillerie",
        "industrie-pharmaceutique","pharma-industrie","petrole-heures","industrie-electronique-composants",
        "industries-agroalimentaires-diverses","agroalimentaire-heures","chef-chantier",
        "conducteur-travaux","btp-etam","imprimerie-heures","responsable-qualite-industrie",
        "technicien-maintenance-industrielle","manager-equipe-production"
    ]),
    ("metiers-commerce", "🛍️", "Commerce, vente & distribution", [
        "vendeur","boutique","animalerie","jardinerie","bijouterie","boucherie","fleuriste",
        "optique-heures","vente-distance","poissonnier","mareyeur","grande-distribution",
        "hypermarche-supermarche","maxi-discount-hard-discount","employe-libre-service",
        "caissier-grande-surface","gerant-supermarche","responsable-rayon","librairie","immobilier",
        "agent-immobilier","promotion-immobiliere","vrp-representants","acheteur-approvisionnement",
        "agent-de-voyages","black-friday","tourisme-agences","commerce-detail","commerce-gros",
        "magasin-populaire","solderie-destockage","alimentation-succursales","alimentation-biere-chocolat",
        "fromager-cremier","bricolage-heures","meubles-bois","opticien","optique"
    ]),
    ("metiers-hcr", "🍽️", "Hôtellerie, restauration & tourisme", [
        "restauration-hcr","hotellerie-plein-air","camping-tourisme","sommelier-barman",
        "restauration-collective","restauration-gastronomique","restauration-rapide",
        "cuisinier","plongeur-commis-cuisine","traiteurs-reception","thermalisme-thalasso",
        "hote-accueil","femme-valet-chambre","manager-fast-food","guide-touristique","casino",
        "croupier-casino","congres-salons","chef-reception-hotel","gouvernante-hotel","maitre-hotel",
        "receptionniste-hotel","voiturier-hotel","hotellerie-chaine","serveur-salle",
        "conducteur-autocar-tourisme","barman-sommelier"
    ]),
    ("metiers-agri", "🌾", "Agriculture & agroalimentaire", [
        "agricole","agriculture","boulangerie-heures","abattoir","industrie-viande",
        "fruits-legumes","centres-equestres","horticulteur","horticulture","pepiniere",
        "jardinier","paysagiste","paysage-jardinage","maraichage","vigneron","viticulture",
        "ouvrier-viticole","caves-cooperatives-viticoles","apiculteur","meunerie-semoulerie",
        "operateur-production-agroalimentaire","conducteur-de-ligne-agroalimentaire"
    ]),
    ("metiers-bureau", "💼", "Bureau, juridique, finance & numérique", [
        "juriste-entreprise","comptable","expertise-comptable","office-manager","avocats-heures",
        "finance-societes","assurance-mutuelle","assurance-heures","securite-sociale-heures",
        "redacteur-web-seo","chef-projet-it","ia-data-cyber","developpeur-web","secretaire-medicale",
        "secretaire-variantes-ccn","gestionnaire-paie","vendeur-automobile","notaire","clerc-de-notaire",
        "notariat","geometre-expert","expert-judiciaire","data-analyst","data-scientist",
        "devops-ingenieur","product-owner-scrum-master","ux-designer","graphiste-designer",
        "creation-graphisme","community-manager","controleur-gestion","consultant-independant-portage",
        "cabinet-conseil-management","dpo-rssi","technicien-informatique-helpdesk",
        "technicien-bureau-etudes","esn-ssii","rh-conseil","assistant-rh-paie",
        "assistant-ressources-humaines","architecte-salarie","architecture-heures",
        "architecture-interieure-decoration","recherche-scientifique","centre-contact-outsourcing",
        "operateur-centre-appel","commercial-telephone","conseiller-clientele-mutuelle",
        "ingenieur-etudes","ingenieur-securite-systemes","technicien-intervention-sociale-familiale",
        "cabinet-medical","expertise-comptable-heures","banque-heures","bancaire","assurance",
        "analyste-credit","convoyeur-fonds","courtier-assurance","charge-clientele-assurance",
        "agent-general-assurance","informatique-heures","jeux-video-studio","edition-jeux",
        "editeurs-logiciels","musique-enregistrement","import-export","franchise-commerce",
        "secretaire-syntec","syntec-heures","assistant-juridique-avocat","avocat-salarie-cabinet",
        "mandataire-judiciaire-collaborateur","charge-de-mission-association",
        "merchandiser-commercial-terrain","directeur-magasin","graphiste-studio",
        "responsable-logistique","drive-logistique-ecommerce","logistique-heures","pilote-drone-salarie"
    ]),
    ("metiers-securite-defense", "🛡️", "Sécurité, défense & services funéraires", [
        "securite-privee","agent-securite-ronde","agent-protection-rapprochee",
        "technicien-alarme-securite-electronique","maitre-chien-securite","securite-defense",
        "militaire-gendarmerie","pompier-sapeur","surveillant-penitentiaire","surveillant-etablissement",
        "responsable-hse","agent-funeraire","pompes-funebres","services-funeraires-cremation",
        "agent-collecte-dechets","proprete-services","nettoyage-entretien","services-proprete",
        "agent-nettoyage","blanchisserie-pressing","technicien-hygiene-proprete"
    ]),
    ("metiers-autres", "🎭", "Culture, sport, médias & autres métiers", [
        "spectacle-vivant","sport-heures","sport-professionnel","educateur-sportif",
        "coach-sportif-salarie","maitre-nageur-sauveteur","moniteur-ski","moniteur-auto-ecole",
        "auto-ecole-conduite","tatoueur","manucure-prothesiste-ongulaire","coiffeur","coiffure-esthetique",
        "coiffur","esthetique","estheticien",
        "audiovisuel-radio","cinema-production","musicien-salarie-orchestre","edition-musicale",
        "editeur-livre","presse-media","presse-journaliste","journaliste-salarie","pigiste-journaliste",
        "photographe-salarie","doublage-audiovisuel","radio-television-technicien",
        "monteur-audiovisuel","directeur-artistique-spectacle","intermittent-spectacle",
        "mannequin-salarie","traducteur-interprete","agence-communication-publicite",
        "publicite-regies","tapissier-decorateur","agent-territorial","moniteur-atelier-esat",
        "cooperatives-consommation","association-insertion","clcc-lutte-cancer"
    ]),
]

DEFAULT_CAT = ("autres", "🦊", "Autres ressources")

cat_lookup = {cid: (icon, label) for cid, icon, label, _ in CATEGORIES}
for cid, icon, label, _ in METIER_SUBCATS:
    cat_lookup[cid] = (icon, label)
cat_lookup['fondamentaux'] = ("⏱️", "Les fondamentaux des heures supplémentaires")
cat_lookup[DEFAULT_CAT[0]] = (DEFAULT_CAT[1], DEFAULT_CAT[2])

def classify(entry):
    if entry['url'] in FONDAMENTAUX_WHITELIST:
        return 'fondamentaux'
    text = norm(entry['url'] + ' ' + entry.get('title','') + ' ' + entry.get('h1','') + ' ' + entry.get('excerpt',''))
    text = text.replace('_','-')
    for cid, icon, label, kws in CATEGORIES:
        for kw in kws:
            if norm(kw) in text:
                return cid
    u = entry['url']
    for cid, icon, label, kws in METIER_SUBCATS:
        for kw in kws:
            if norm(kw) in text:
                return cid
    is_metierish = (u.endswith('heures-supplementaires.html') or u.endswith('-hs.html')
                     or u.endswith('hs-supplementaires.html') or 'heures-supplementaires' in u)
    if is_metierish:
        return 'metiers-autres'
    return DEFAULT_CAT[0]

counts = Counter()
result = []
for e in data:
    if not FORCE_RECLASSIFY and e.get('cat'):
        cid = e['cat']  # déjà classé (ou corrigé à la main) -> on ne touche pas
    else:
        cid = classify(e)
    counts[cid] += 1
    result.append({**e, 'cat': cid})

for cid, n in counts.most_common():
    icon, label = cat_lookup.get(cid, ("📄", cid))
    print(f"{n:4d}  {icon}  {label}  ({cid})")

save_search_index(SEARCH_INDEX_PATH, result)
print('TOTAL', len(result), '-> écrit dans', SEARCH_INDEX_PATH)
