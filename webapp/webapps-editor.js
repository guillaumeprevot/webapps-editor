// document.designMode = "on";

function encodeBase64(text) {
	// https://developer.mozilla.org/fr/docs/D%C3%A9coder_encoder_en_base64#The_.22Unicode_Problem.22
	return window.btoa(unescape(encodeURIComponent(text)));
}

$(function() {
	document.execCommand('styleWithCSS', null, false); // true par défaut. cf font-size-menu

	// Permettre à l'utilisateur de pouvoir ouvrir un fichier
	$('#open-file-button').on('click', function(event) {
		event.preventDefault();
		$('#open-file-input').click();
	});
	$('#open-file-input').on('change', function(event) {
		if (this.files && this.files.length > 0) {
			var file = this.files[0];
			var reader = new FileReader();
			reader.onload = function(event) {
				$('#save-file-button').attr('download', file.name);
				$('#editor-content').html(event.target.result);
			};
			reader.readAsText(file);
		}
	});

	// Sauvegarder le contenu
	$('#save-file-button').on('click', function(event) {
		var text = $('#editor-content').html();
		//event.preventDefault();
		$(this).attr('href', 'data:text/plain;base64,' + encodeBase64(text));
	});

	// Désactiver les boutons non supportés
	$('#editor-toolbar button[data-command]').each(function(index, element) {
		var self = $(element);
		if (!document.queryCommandSupported(self.attr('data-command'))) {
			self.prop('disabled', true).attr('title', self.attr('title') + ' [Non supporté par votre navigateur]');
		}
	});

	// Désactiver les entrées de menu non supportées
	$('#editor-toolbar a.dropdown-item[data-command]').each(function(index, element) {
		var self = $(element);
		if (!document.queryCommandSupported(self.attr('data-command'))) {
			self.addClass('disabled').attr('title', 'Non supporté par votre navigateur');
		}
	});

	// Gérer automatiquement le clic sur les boutons simples
	$('#editor-toolbar').on('click', 'button.command', function(event) {
		document.execCommand($(event.target).attr('data-command'));
	});

	// Gérer automatiquement le clic sur les entrées de menu simples
	$('#editor-toolbar').on('click', 'a.dropdown-item.command', function(event) {
		event.preventDefault();
		document.execCommand($(event.target).attr('data-command'));
	});

	// Gérer automatiquement le clic sur les boutons "block-command"
	$('#editor-toolbar').on('click', 'button.block-command', function(event) {
		var self = $(event.target);
		document.execCommand(self.attr('data-command'), null, self.attr('data-tag') || 'P');
	});

	// Gérer automatiquement le clic sur les boutons "prompt-command"
	$('#editor-toolbar').on('click', 'button.prompt-command', function(event) {
		var self = $(event.target),
			value = window.prompt(self.attr('data-prompt'), self.attr('data-default'));
		if (value)
			document.execCommand(self.attr('data-command'), null, (self.attr('data-format') || '%VALUE%').replace('%VALUE%', value));
	});

	// Modification de la propriété "font-family"
	var fontFamilyMenu = $('#font-family-menu');
	fontFamilyMenu.on('click', 'button:first-child', function(event) {
		// Clic sur le bouton indiquant la dernière police utilisée
		var self = $(event.target),
			fontFamily = self.attr('data-font-family');
		document.execCommand('fontName', null, fontFamily);
	}).on('click', '.dropdown-item:not(:last-child)', function(event) {
		// Clic sur une police dans le menu déroulant
		var self = $(event.target).closest('a'),
			fontFamily = self.attr('data-font-family');
		document.execCommand('fontName', null, fontFamily);
		// Cette police passe sur le bouton principal, comme dernière police utilisée
		fontFamilyMenu.children('button:first-child').attr('data-font-family', fontFamily).text(fontFamily);
		// Eviter le # dans l'URL
		event.preventDefault();
	}).on('click', '.dropdown-item:last-child', function(event) {
		// Clic sur l'entrée "..." qui permet de choisir une police au choix
		var fontFamily = prompt('Famille', '');
		if (fontFamily) {
			document.execCommand('fontName', null, fontFamily);
			// Cette police passe sur le bouton principal, comme dernière police utilisée
			fontFamilyMenu.children('button:first-child').attr('data-font-family', fontFamily).text(fontFamily);
		}
		// Eviter le # dans l'URL
		event.preventDefault();
	});

	// Modification de la propriété "font-size"
	var fontSizeMenu = $('#font-size-menu');
	fontSizeMenu.on('click', 'button:first-child', function(event) {
		// Clic sur le bouton indiquant la dernière taille utilisée
		var self = $(event.target),
			fontSize = self.attr('data-font-size');
		// La commande "fontSize ne prend que les valeurs 1 à 7 de HTML.
		//   document.execCommand('fontSize', null, fontSize);
		// La page suivante propose une idée pour manipuler des valeurs en pixels, comme on en a l'habitude
		//   https://stackoverflow.com/questions/5868295/document-execcommand-fontsize-in-pixels
		// Attention, ne fonctionne pas si on appelle : document.execCommand('styleWithCSS', null, true); D'où l'appel avec "false" pour être sûr
		document.execCommand('fontSize', false, 7);
		$('#editor-content').find('font[size=7]').removeAttr('size').css('font-size', fontSize + 'pt');
	}).on('click', '.dropdown-item', function(event) {
		// Clic sur une taille dans le menu déroulant
		var fontSize = $(event.target).closest('button').attr('data-font-size');
		// Envoyer la taille sélectionnée dans le bouton principal et lancer l'action
		fontSizeMenu.children('button:first-child').attr('data-font-size', fontSize).text(fontSize).click();
	});

	// Modification de la couleur du texte
	var colorMenu = $('#color-menu');
	var colorMenuButton = colorMenu.children().first().on('click', function(event) {
		// Clic sur le bouton indiquant la dernière couleur utilisée
		var self = $(event.target),
			color = self.css('color');
		document.execCommand('foreColor', null, color);
	});
	var colorMenuPicker = colorMenu.children().last().colorpicker({
		// Couleur du texte par défaut
		color: '#000000',
		// Palette de couleurs prédéfinies
		colorSelectors: {
			'black': '#000000',
			'white': '#ffffff',
			'color1': '#337ab7',
			'color2': '#5cb85c',
			'color3': '#5bc0de',
			'color4': '#f0ad4e',
			'color5': '#d9534f'
		}
	}).on('changeColor', function(event) {
		// Récupération de la couleur
		var color = event.color.toHex();
		// Modification de la couleur du texte sélectionné
		document.execCommand('foreColor', null, color);
		// Changement du bouton principal pour proposer la dernière couleur utilisée
		colorMenuButton.css('color', color);
	});

	// Modification de la couleur de fond
	var backgroundColorMenu = $('#background-color-menu');
	var backgroundColorMenuButton = backgroundColorMenu.children().first().on('click', function(event) {
		// Clic sur le "button" ou son fils "b" indiquant la dernière couleur utilisée
		var self = $(event.target).closest('button').children('b'),
			color = self.css('background-color');
		document.execCommand('backColor', null, color);
	});
	var backgroundColorMenuPicker = backgroundColorMenu.children().last().colorpicker({
		// Couleur de fond par défaut
		color: '#FFFFFF',
		// Palette de couleurs prédéfinies
		colorSelectors: {
			'transparent': 'rgba(255,255,255,0)',
			'red': '#ff0000',
			'yellow': '#ffff00',
			'green': '#00ff00',
			'cyan': '#00ffff',
			'blue': '#0000ff',
			'magenta': '#ff00ff'
		}
	}).on('changeColor', function(event) {
		// Récupération de la couleur
		var color = event.color.toHex();
		// Modification de la couleur de fond du texte sélectionné
		document.execCommand('backColor', null, color);
		// Changement du bouton principal pour proposer la dernière couleur utilisée
		backgroundColorMenuButton.children().css('background-color', color);
	});

	// Insertion d'un tableau
	$('#insert-table-button').on('click', function() {
		// activé par défaut
		// document.execCommand('enableObjectResizing', null, true); // les carrés pour changer les dimensions
		// document.execCommand('enableInlineTableEditing', null, true); // les flèches pour ajouter et la croix pour supprimer
		document.execCommand('insertHTML', null, '<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table>');
	});

	// Une fois la page chargée, on met en place le service worker qui gère le cache
	if ('serviceWorker' in navigator && navigator.onLine) {
		var href = window.location.href.replace('webapps-editor.html', 'webapps-editor-sw.js');
		navigator.serviceWorker.register(href).then(function(registration) {
			console.log('ServiceWorker registration success');
		}, function(err) {
			console.log('ServiceWorker registration failed: ', err);
		});
	}

	/**
	 * Raccourcis
	 * - Ctrl + O : Ouvrir (Open)
	 * - Ctrl + S : Enregistrer (Save)
	 * - Ctrl + B : Gras (Bold)
	 * - Ctrl + I : Italic (Italic)
	 * - Ctrl + U : Souligné (Underline)
	 * - Ctrl + Maj + B : Indice (Base)
	 * - Ctrl + Maj + P : Exposant (Power)
	 * - Ctrl + M : Retirer le formatage
	 * - Ctrl + L : Aligné à gauche (Left)
	 * - Ctrl + E : Centré (??)
	 * - Ctrl + R : Aligné à droite (Right)
	 * - Ctrl + J : Justifié (Justified)
	 * - Ctrl + K : Créer un lien
	 * - Ctrl + X : Couper (Cut)
	 * - Ctrl + C : Copier (Copy)
	 * - Ctrl + V : Coller (Paste)
	 * - Ctrl + F12 : Insérer un tableau
	 * - F12 : Liste numérotée
	 * - Maj + F12 : Liste à puces
	 * 
	 * Autres commandes dispo
	 * - forwardDelete : équivalent de backspace (supprimr le caractère avant le curseur)
	 * - heading <h1..h6>
	 * - hiliteColor <color>
	 * - insertBrOnReturn <bool>
	 * - insertParagraph
	 * - insertText <text>
	 * - selectAll
	 */

});