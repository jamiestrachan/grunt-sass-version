/*
 * grunt-sass-version
 * https://github.com/jamiestrachan/grunt-sass-version
 *
 * Copyright (c) 2014 Jamie Strachan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _sass_version = require('./lib/_sass_version').init(grunt);

  grunt.registerMultiTask('sass_version', 'Confirm that a particular version of Sass is available to Grunt.', function() {
    
    var options = this.options({
      ignorePatch: false,
      ignoreMinor: false
    });
    var version = this.data.version;
    var result;

    if (version === undefined) {
      grunt.fail.fatal("You must specify a version for this task.\n");
    }

    result = _sass_version.test(version, options.ignorePatch, options.ignoreMinor);

    if (result && result.success) {
      grunt.log.writeln(result.message);
    } else {
      grunt.fail.warn(result.message);
    }
  });

};
