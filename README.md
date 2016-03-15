# webapps-editor

A simple HTML editor using `document.execCommand` capabilities
https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand

## Pr�sentation

[Cette application](http://techgp.fr/webapps/webapps-editor.html) �crite en HTML5, JavaScript et CSS3 est un �diteur de texte [WISIWYG](https://fr.wikipedia.org/wiki/What_you_see_is_what_you_get) pour l'HTML.

Les librairies suivantes ont �t� utilis�es pour cette application :

- [jQuery 2.2.1](http://jquery.com/) sous licence MIT
- [Bootstrap 3.3.6](http://getbootstrap.com/css/) sous licence MIT
- [Bootstrap Colorpicker 2.3.0](https://github.com/mjolnic/bootstrap-colorpicker/) sous licence Apache 2.0
- [Font Awesome 4.5.0](http://fortawesome.github.io/Font-Awesome/) SIL OFL 1.1 (police) et MIT (code)

L'application est fournie avec un fichier manifest `webapps-editor.appcache` permettant la mise en cache et l'utilisation en mode d�connect�. Plus d'info chez Mozilla [en fran�ais](https://developer.mozilla.org/fr/docs/Utiliser_Application_Cache) ou [en anglais](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache).

NB : quand le certificat HTTPS est incorrect, la mise en cache �chouera sous Chrome avec l'erreur `Manifest fetch Failed (9)`. Dans ce cas, faites les tests en HTTP et/ou utilisez un certificat valide en production.

## Captures d'�cran

### Pr�sentation de l'IHM

![Pr�sentation de l'IHM](./screenshots/webapps-editor-1.png)

