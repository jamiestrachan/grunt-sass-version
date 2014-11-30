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
    var version = this.data.version;
    var cp;

    if (version === undefined) {
      grunt.fail.warn("You must specify a version for this task.\n");
    } else {
      grunt.log.writeln(["Testing for Sass version " + version]);

      cp = exec('sass -v', function (err, stdout, stderr) {
        var sassRegex = new RegExp("\\b" + version + "\\b");

        if (sassRegex.test(stdout)) {
          grunt.log.writeln(["Found Sass version " + version]);
        } else {
            grunt.fail.warn("Incorrect Sass version.\nExpected " + version + ", you have " + stdout + "\nTo install, try 'gem install sass -v" + version + "'.\nYou may have to uninstall other versions with 'gem uninstall sass'.\n\n");
        }

        done();
      });      
    }

  });

};
