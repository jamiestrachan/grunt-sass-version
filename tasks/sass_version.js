/*
 * grunt-sass-version
 * https://github.com/jamiestrachan/grunt-sass-version
 *
 * Copyright (c) 2014 Jamie Strachan
 * Licensed under the MIT license.
 */

'use strict';
var exec = require('child_process').exec;

module.exports = function(grunt) {

  grunt.registerMultiTask('sass_version', 'Confirm that a particular version of Sass is available to Grunt.', function() {
    var done = this.async();
    var options = this.options({
      ignorePatch: false,
      ignoreMinor: false
    });
    var version = this.data.version;
    var cp, versionPieces, major, minor, patch, versionRegex, versionDisplay;

    if (version === undefined) {
      grunt.fail.fatal("You must specify a version for this task.\n");
    }

    versionPieces = version.split(".");
    if (versionPieces.length === 3) {
      major = versionPieces[0];
      minor = versionPieces[1];
      patch = versionPieces[2];      
    } else {
      grunt.fail.fatal("The Sass version must be of the form #.#.#");
    }

    cp = exec('sass -v', function (err, stdout, stderr) {
      if (options.ignoreMinor === true) {
        versionRegex = new RegExp("\\b" + major + "\.[0-9]+\.[0-9]+\\b");
        versionDisplay = major + ".#.#";
      } else if (options.ignorePatch === true) {
        versionRegex = new RegExp("\\b" + major + "\." + minor + "\.[0-9]+\\b");
        versionDisplay = major + "." + minor + ".#";
      } else {
        versionRegex = new RegExp("\\b" + version + "\\b");
        versionDisplay = version;
      }

      grunt.log.writeln(["Testing for Sass version " + versionDisplay]);

      if (versionRegex.test(stdout)) {
        grunt.log.writeln(["Found Sass version " + stdout]);
      } else {
        grunt.fail.warn("Incorrect Sass version.\nExpected " + versionDisplay + ", you have " + stdout + "\nTo install, try 'gem install sass -v" + version + "'.\nYou may have to uninstall other versions with 'gem uninstall sass'.\n\n");
      }

      done();
    });      

  });

};
