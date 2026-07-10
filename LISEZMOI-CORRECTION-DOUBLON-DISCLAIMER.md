# Correction : doublon du disclaimer pédagogique

## Constat

229 pages sur 982 (23 %) affichaient **deux blocs de disclaimer** ("Outil
pédagogique indépendant...") au lieu d'un seul, comme repéré par Anthony
sur une capture d'écran du site en production (page « preuve illicite de
l'employeur »).

## Cause identifiée

Chaque page concernée contenait deux `<div class="disc">` distincts :
- un premier disclaimer, souvent une variante courte ou spécifique à la
  page (parfois mentionnant un secteur précis, ex. Pajemploi pour les
  assistantes maternelles, ou la branche HCR pour la restauration) ;
- un second disclaimer, quasi toujours le texte standardisé complet
  (« sans affiliation à un organisme officiel [...] rapproche-toi d'un
  avocat en droit du travail, d'un syndicat, ou de l'inspection du
  travail »).

Cette duplication provient très probablement d'une passe antérieure au
chantier d'agrément actuel (avant le lot 20) — un script a dû insérer le
disclaimer standardisé sur l'ensemble du site sans vérifier qu'un
disclaimer existait déjà sur certaines pages. **Ce n'est pas lié au
chantier d'agrément lot par lot en cours** : aucune des pages déjà
enrichies dans les lots 20 à 60 n'a été affectée par une introduction de
doublon liée à mon propre processus de construction — la plupart des cas
détectés préexistaient à mon intervention (à l'exception de deux pages
déjà enrichies dans un lot précédent qui portaient elles aussi ce
doublon pré-existant : `data-analyst-heures-supplementaires` et
`plongeur-commis-cuisine-heures-supplementaires`, toutes deux corrigées
dans ce lot de correction).

## Méthode de correction

- 217 pages : le doublon suivait un schéma texte identique et prévisible
  (bloc standardisé multi-lignes) → correction automatisée par motif
  exact.
- 12 pages : variante courte du premier disclaimer, également identique
  entre elles → deuxième passe de correction ciblée.
- 1 page (`conditions-utilisation.html`) : fausse alerte, la mention
  provenait de la méta-description SEO et non d'un second bloc visible —
  aucune action nécessaire.

Dans tous les cas, le bloc **conservé** est toujours celui qui contient
le plus d'information (texte le plus complet et le plus protecteur
juridiquement, ou le texte spécifique à la page quand il existe). Le
bloc générique redondant est retiré.

## Résultat

**229 pages corrigées.** Vérification finale sur l'ensemble des 982
pages du site : zéro doublon restant.

## Livraison

Ce ZIP contient uniquement les 229 pages corrigées (nom de fichier
identique à l'original), prêtes à être déployées par-dessus les fichiers
existants sur Cloudflare Pages.
