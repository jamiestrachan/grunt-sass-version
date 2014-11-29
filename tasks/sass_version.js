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

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sass_version', 'Confirm that a particular version of Sass is available to Grunt.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      sassVersion: "3.4.9"
    });

    var cp = exec('sass -v', function (err, stdout, stderr) {
      var sassRegex = new RegExp("\\b" + options.sassVersion + "\\b");

      /*
      if (!sassVersion) {
          grunt.fail.fatal("Please define the version of Sass you are using as the 'sassVersion' property in /src/config/spore.json.");
      }
      */

      if (!sassRegex.test(stdout)) {
          grunt.fail.warn("Incorrect Sass Version.\nExpected " + options.sassVersion + ", you have\n" + stdout + "\nTo install, try 'gem install sass -v" + options.sassVersion + "'.\nYou may have to uninstall other versions with 'gem uninstall sass'.");
      }
    });

    /*
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
    */
  });

};
