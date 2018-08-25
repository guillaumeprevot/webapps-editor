# webapps-editor

A simple HTML editor using [document.execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) capabilities

## Présentation

[Cette application](https://techgp.fr/webapps/webapps-editor.html) écrite en HTML5, JavaScript et CSS3 est un éditeur de texte [WISIWYG](https://fr.wikipedia.org/wiki/What_you_see_is_what_you_get) pour l'HTML.

Les librairies suivantes ont été utilisées pour cette application :

- [jQuery 3.3.1](https://jquery.com/) sous licence MIT
- [Bootstrap 4.1.3](https://getbootstrap.com/) sous licence MIT
- [Bootstrap Colorpicker 2.5.3](https://github.com/farbelous/bootstrap-colorpicker) sous licence Apache 2.0
- [Popper.js 1.14.4](https://popper.js.org/) sous licence MIT
- [Font Awesome 5.2.0](https://fontawesome.com/) SIL OFL 1.1 (police) et MIT (code)
- [DryIcons](https://dryicons.com/) pour le favicon

L'application devrait fonctionner correctement en mode déconnecté grâce aux **Service Workers** intégrés aux navigateurs modernes : d'abord Chrome+Opera+Firefox puis récemment Safari+Edge ([détail ici](https://caniuse.com/#search=service+worker) ).

Plus d'infos sur les Services Workers chez [Google](https://developers.google.com/web/fundamentals/primers/service-workers/) ou [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

## Captures d'écran

### Présentation de l'IHM

![Présentation de l'IHM](./screenshots/webapps-editor-2.png)

## Licence

Ce projet est distribué sous licence MIT, reproduite dans le fichier LICENSE ici présent.

## Changelog

2016-03-15
- première version

2016-03-16
- passage en menu de toutes les actions non liées à la mise en forme (ouvrir, enregistrer, annuler, refaire, couper, copier, coller, supprimer)
- restauration de la taille des "dropdown-toggle" car plus facile pour viser en tactile
- réorganisation des actions restantes pour faciliter le dimensionnement
- ajouter d'un listener $(window).on('resize', ...) pour ajuster le début de la zone d'édition

2016-03-17
- ajout de la fonction "Ouvrir un fichier"
- ajout de la fonction "Sauvegarder le texte"
- ajout d'une capture(s) d'écran utilisée dans README
- correction d'un bug sur le surlignage sous Chrome

2016-03-18
- ajout du favicon

2016-03-25
- changement de favicon
- mise à jour de jQuery en 2.2.2

2016-05-22
- correction de la mise en cache de FontAwesome
- mise à jour de jquery 2.2.4
- ajout de la section ChangeLog

2016-06-28
- ajout du fichier LICENCE

2016-07-16
- mise à jour de Font Awesome (4.5.0 vers 4.6.3)

2017-05-21
- mise à jour de jQuery (2.2.4 en 3.2.1), Bootstrap (3.3.6 en 3.3.7), Bootstrap ColorPicker (2.3.0 en 2.5.0) et Font Awesome (4.6.3 en 4.7.0)

2018-08-12
- ajout d'un bouton pour l'insertion d'un tableau (3x3 par défaut) avec les contrôles du navigateur pour ajouter/supprimer des lignes/colonnes
- utilisation des Service Workers pour la mise en cache au lieu de [Application Cache](https://developer.mozilla.org/fr/docs/Utiliser_Application_Cache)
- utilisation de flexbox pour gérer la position de la barre en haut, du pied-de-page et de la partie centrale
- mise à jour de jQuery (3.2.1 en 3.3.1) + correction d'un bug suite à la suppression de "andSelf"
- mise à jour de Bootstrap (3.3.7 en 4.1.3) + correction du DOM, principalement pour les ".dropdown-menu"
- mise à jour de Bootstrap ColorPicker (2.5.0 en 2.5.3) mais la version 3.x a été écartée pour le moment
- mise à jour de Font Awesome (4.7.0 en 5.2.0) + correction des icônes video-camera => video, repeat => redo et remove => backspace
- intégration de Popper.js (1.14.4), dépendance de Bootstrap 4.x

2018-08-25
- accès plus direct aux couleurs personnalisées (texte et fond) et profitant de l'option "colorSelectors" du composant "colorpicker"
