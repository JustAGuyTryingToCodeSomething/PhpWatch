/*!
 * Brackets PhpWatch Extension
 *
 * @author Anthony vick
 * @license http://opensource.org/licenses/MIT
 */

/*jslint browser: false, vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 10 */
/*global define, $, brackets, window, jQuery, console */

/**
 * Preferences:
 *
 * Preferences are stored in the brackets.json file as default settings.
 *
 *    ShowOnChange determines whether the PhPWatch window appears when changes happen to the file.
 *    LogFilePath is the path of the file to watch.
 *	  ReverseOutput Prints error log entries in reverse.
 *
 * Example:
 *	  "PhpWatch.ShowOnChange": true,
 *    "PhpWatch.LogFilePath": "C:/wamp/logs/php_error.log"
 *    "PhpWatch.ReverseOutput": false
 *
 **/

/**
 * BUG: Duplicate Error log entry lines are displayed in PHPWatch output panel.
 *      This may be related to refreshig Brackets. Closing brackets and repopenig removes duplicates.
 *      Suggest look to Node and Tail code for fix.
 */

/**
 * Useful resources:
 * https://github.com/adobe/brackets/wiki/How-to-write-extensions
 * https://github.com/adobe/brackets/wiki/Brackets-Node-Process:-Overview-for-Developers
 */

define(function (require, exports, module) {
	"use strict";

	// Brackets modules
	var ExtensionUtils      = brackets.getModule("utils/ExtensionUtils"),
		WorkspaceManager    = brackets.getModule("view/WorkspaceManager"),
		NodeDomain          = brackets.getModule("utils/NodeDomain");

	// Project modules
	var _panelHtml      = require("text!templates/panel.html"),
		Preferences     = require("prefs");

	// Preference initialisation
	var _prefs = new Preferences();
	console.assert(typeof (_prefs) !== null && typeof (_prefs) === "object");
	_prefs.init();

	// Node JS tail module initialisation
	var tailDomain = new NodeDomain("tail", ExtensionUtils.getModulePath(module, "node/node_modules/tail/tail.js"));

	// Visibility
	var visible = false;

	var panel;

	/*
	 * Toggle visibility of PhpWatch's panel
	 */
	function _toggleVisibility() {

		visible = !visible;

		if (true === visible) {
			panel.show();
			$("#phpviewlog-preview-icon").addClass("active");
			WorkspaceManager.recomputeLayout();
		} else {
			panel.hide();
			$("#phpviewlog-preview-icon").removeClass("active");
		}
	}


	/*
	 * Catch icon click events. Use to display or hide panel, turn of tail if hidden.
	 */
	function _iconClickEvent() {

		_toggleVisibility();

		// Turn of file watching when not using it
		if (false === visible) {
			tailDomain.exec("quitTail")
				.done(function () {
					console.log("[brackets-tail-node] quitTail done event");
				}).fail(function (err) {
					console.error("[brackets-tail-node] quitTail error event", err);
				});
		}
	}


	/*
	 * Add the phpviewlog plugin icon to the brackets toolbar
	 */
	function _iconAddToToolbar() {

		var $icon = $("<a>")
			.attr({
				id: "phpviewlog-preview-icon",
				href: "#"
			})
			.css({
				display: "block"
			})
			.click(_iconClickEvent)
			.appendTo($("#main-toolbar .buttons"));
	}


	/*
	 * PHPWatch Inititialisation
	 *
	 * @param path the path of the php log file to tail
	 */
	function _init(path) {

		//
		// CSS Styles (mostly for Icon display)
		//
		ExtensionUtils.loadStyleSheet(module, "styles.css");

		//
		// Create plugin display panel
		//
		panel = WorkspaceManager.createBottomPanel("plugin_viewphperrorlog", $(_panelHtml), 20);

		// output new panel string
		var _text = '<p>Watching ' + path + ' </p>';
		$('#phpview-logevents').append(_text);

		//
		// Close button handling
		//
		$("#phpwatch-close").on("click", function () {
			_toggleVisibility();
		});


		// Add toolbar icon
		_iconAddToToolbar();

		// Call getTail command (of tail.js).
		tailDomain.exec("getTail", path)
			.done(function () {
				console.log(
					"[brackets-tail-node] logging done event"
				);
			}).fail(function (err) {
				console.error("[brackets-tail-node] logging error event", err);
			});

		//
		// Register fot getTail messages (of tail.js).
		//
		tailDomain.on("msg", function (type, message) {

			// output new panel string
			if (true === _prefs.getReverseOutput()) {
				$('#phpview-logevents').prepend('<br/>');
				$('#phpview-logevents').prepend(message);
			} else {
				$('#phpview-logevents').append(message);
				$('#phpview-logevents').append('<br/>');
			}

			// show the panel on events
			if (true === _prefs.getShowOnChange()) {
				panel.show();
				$("#phpviewlog-preview-icon").addClass("active");
				WorkspaceManager.recomputeLayout();
			}

		});

	}

	// Get the ball rolling...
	_init(_prefs.getPath());
});
