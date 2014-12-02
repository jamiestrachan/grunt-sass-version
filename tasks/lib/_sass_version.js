'use strict';
var shell = require('shelljs'); // use shelljs for its synchronous exec function

exports.init = function(grunt) {

  var exports = {};
  
  exports.test = function (version, ignorePatch, ignoreMinor) {
    var result = {};
    var versionPieces, major, minor, patch, versionRegex, versionDisplay, availableVersion;

    // make sure we have a valid version
    versionPieces = version.split(".");
    if (versionPieces.length === 3) {
      major = versionPieces[0];
      minor = versionPieces[1];
      patch = versionPieces[2];      
    } else {
      return { "success": false, "message": "The Sass version must be of the form #.#.#" };
    }

    if (ignoreMinor === true) {
      versionRegex = new RegExp("\\b" + major + "\\.[0-9]+\\.[0-9]+\\b");
      versionDisplay = major + ".#.#";
    } else if (ignorePatch === true) {
      versionRegex = new RegExp("\\b" + major + "\\." + minor + "\\.[0-9]+\\b");
      versionDisplay = major + "." + minor + ".#";
    } else {
      versionRegex = new RegExp("\\b" + version + "\\b");
      versionDisplay = version;
    }

    availableVersion = shell.exec('sass -v', {silent: true}).output;

    if (versionRegex.test(availableVersion)) {
      return {
        "success": true,
        "message": "Expected Sass version " + versionDisplay + ". Found version " + availableVersion + "."
      };
    } else {
      return {
        "success": false,
        "message": "Incorrect Sass version.\nExpected " + versionDisplay + ", you have " + availableVersion + "\nTo install, try 'gem install sass -v" + version + "'.\nYou may have to uninstall other versions with 'gem uninstall sass'.\n\n"
      };
    }

  };

  return exports;
  
};