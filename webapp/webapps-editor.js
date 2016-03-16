// document.designMode = "on";

$(function() {
	document.execCommand('styleWithCSS', null, true); // true par défaut

	// Ajuster le début de page en fonction de la hauteur de la barre d'outil
	$(window).on('resize', function() {
		$(document.body).css('padding-top', $('#editor-toolbar').outerHeight() + 'px');		
	}).triggerHandler('resize');
	
	// Désactiver les boutons non supportés
	$('#editor-toolbar button[data-command]').each(function(index, element) {
		var self = $(element);
		if (!document.queryCommandSupported(self.attr('data-command'))) {
			self.prop('disabled', true).attr('title', self.attr('title') + ' [Non supporté par votre navigateur]');
		}
	});

	// Désactiver les entrées de menu non supportées
	$('#editor-toolbar li[data-command]').each(function(index, element) {
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
	$('#editor-toolbar').on('click', 'li.command > a', function(event) {
		event.preventDefault();
		document.execCommand($(event.target).closest('.command').attr('data-command'));
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
	}).on('click', 'ul > li:not(:last-child) > a', function(event) {
		// Clic sur une police dans le menu déroulant
		var self = $(event.target).closest('a'),
			fontFamily = self.attr('data-font-family');
		document.execCommand('fontName', null, fontFamily);
		// Cette police passe sur le bouton principal, comme dernière police utilisée
		fontFamilyMenu.children('button:first-child').attr('data-font-family', fontFamily).text(fontFamily);
		// Eviter le # dans l'URL
		event.preventDefault();
	}).on('click', 'ul > li:last-child > a', function(event) {
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
		document.execCommand('fontSize', null, fontSize);
	}).on('click', 'ul > li > a', function(event) {
		// Clic sur une taille dans le menu déroulant
		var self = $(event.target).closest('a'),
			fontSize = self.attr('data-font-size');
		document.execCommand('fontSize', null, fontSize);
		// Cette taille passe sur le bouton principal, comme dernière taille utilisée
		fontSizeMenu.children('button:first-child').attr('data-font-size', fontSize).text(fontSize);
		// Eviter le # dans l'URL
		event.preventDefault();
	});

	// Modification de la couleur du texte
	var colorMenu = $('#color-menu');
	colorMenu.on('click', 'button:first-child', function(event) {
		// Clic sur le bouton indiquant la dernière couleur utilisée
		var self = $(event.target),
			color = self.css('color');
		document.execCommand('foreColor', null, color);
	}).on('click', 'ul > li:not(:last-child) > a', function(event) {
		// Clic sur une couleur dans le menu déroulant
		var self = $(event.target),
			color = self.css('color');
		document.execCommand('foreColor', null, color);
		// Cette couleur passe sur le bouton principal, comme dernière couleur utilisée
		colorMenu.children('button:first-child').css('color', color);
		// Eviter le # dans l'URL
		event.preventDefault();
	});
	// Rechercher l'entrée "..." dans le sous-menu
	colorMenu.find('ul > li:last-child > a').colorpicker({
		color: '#000000'
	}).on('changeColor', function(event) {
		// Choix d'une couleur personnalisée
		var color = event.color.toHex();
		document.execCommand('foreColor', null, color);
	}).on('hidePicker', function(event) {
		var color = event.color.toHex();
		// Cette couleur passe sur le bouton principal, comme dernière couleur utilisée
		colorMenu.children('button:first-child').css('color', color);
		// Ajouter une entrée de menu pour la retrouver facilement
		$('<li><a href="#" style="color: ' + color + ';">Abc def</a></li>').prependTo(colorMenu.children('ul'));
	});

	// Modification de la couleur de fond
	var backgroundColorMenu = $('#background-color-menu');
	backgroundColorMenu.on('click', 'button:first-child', function(event) {
		// Clic sur le bouton indiquant la dernière couleur utilisée
		var self = $(event.target).children(),
			color = self.css('background-color');
		document.execCommand('backColor', null, color);
	}).on('click', 'ul > li:not(:last-child) > a', function(event) {
		// Clic sur une couleur dans le menu déroulant
		var self = $(event.target),
			color = self.css('background-color');
		document.execCommand('backColor', null, color);
		// Cette couleur passe sur le bouton principal, comme dernière couleur utilisée
		backgroundColorMenu.children('button:first-child').children().css('background-color', color);
		// Eviter le # dans l'URL
		event.preventDefault();
	});
	// Rechercher l'entrée "..." dans le sous-menu
	backgroundColorMenu.find('ul > li:last-child > a').colorpicker({
		color: '#FFFFFF'
	}).on('changeColor', function(event) {
		// Choix d'une couleur personnalisée
		var color = event.color.toHex();
		document.execCommand('backColor', null, color);
	}).on('hidePicker', function(event) {
		var color = event.color.toHex();
		// Cette couleur passe sur le bouton principal, comme dernière couleur utilisée
		backgroundColorMenu.children('button:first-child').children().css('background-color', color);
		// Ajouter une entrée de menu pour la retrouver facilement
		$('<li><a href="#" style="background-color: ' + color + ';">&nbsp;</a></li>').prependTo(backgroundColorMenu.children('ul'));
	});

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
	 * - enableInlineTableEditing <bool>
	 * - enableObjectResizing <bool>
	 * - formatBlock <tag>
	 * - forwardDelete
	 * - heading <h1..h6>
	 * - hiliteColor <color>
	 * - insertBrOnReturn <bool>
	 * - insertParagraph
	 * - insertText <text>
	 * - selectAll
	 */

});