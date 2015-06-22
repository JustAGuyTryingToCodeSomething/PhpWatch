/*!
 * Brackets PhpWatch Extension
 *
 * @author Anthony vick
 * @license http://opensource.org/licenses/MIT
 */

/*jslint browser: false, vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 10 */
/*global define, $, brackets, window, jQuery, console, require */


/* Useful resources:
 * https://github.com/adobe/brackets/wiki/How-to-write-extensions#working-with-preferences
 * https://github.com/adobe/brackets/wiki/Preferences-System
 */

define(function (require, exports, module) {
	"use strict";

	/**
	 * Load required modules
	 */
	var PreferencesManager =  brackets.getModule("preferences/PreferencesManager"),
		prefs = PreferencesManager.getExtensionPrefs("PhpWatch");


	/**
	 * Create Prefences object to handle all brackets preference interactions.
	 */
	function Preferences() {}

	/**
	 * Initialise preferences
	 */
	Preferences.prototype.init = function () {

		// Add preferences to brackets.json default file if not already included

		if (undefined === prefs.get("LogFilePath")) {

			// First, we define our preference so that Brackets knows about it.
			prefs.definePreference("LogFilePath", "string", 'C:/wamp/logs/php_error.log');

			// This will set the "enabled" pref in the same spot in which the user has set it.
			// Generally, this will be in the user's brackets.json file in their app info directory.
			prefs.set("LogFilePath", 'C:/wamp/logs/php_error.log');
		}

		if (undefined === prefs.get("LogFilePath")) {

			// First, we define our preference so that Brackets knows about it.
			prefs.definePreference("ShowOnChange", "boolean", true);

			// This will set the "enabled" pref in the same spot in which the user has set it.
			// Generally, this will be in the user's brackets.json file in their app info directory.
			prefs.set("ShowOnChange", true);
		}

		if (undefined === prefs.get("ReverseOutput")) {

			// First, we define our preference so that Brackets knows about it.
			prefs.definePreference("ReverseOutput", "boolean", true);

			// This will set the "enabled" pref in the same spot in which the user has set it.
			// Generally, this will be in the user's brackets.json file in their app info directory.
			prefs.set("ReverseOutput", true);
		}




		// Then save the change
		prefs.save();
	};

	/**
	 * Access reference to log file path
	 */
	Preferences.prototype.getPath = function () {

		return prefs.get("LogFilePath");
	};

	/**
	 * Access reference to log file path
	 */
	Preferences.prototype.getShowOnChange = function () {

		return prefs.get("ShowOnChange");
	};

	/**
	 * Access reference to log file path
	 */
	Preferences.prototype.getReverseOutput = function () {

		return prefs.get("ReverseOutput");
	};

	module.exports = Preferences;

});
