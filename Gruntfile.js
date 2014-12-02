/*
 * grunt-sass-version
 * https://github.com/jamiestrachan/grunt-sass-version
 *
 * Copyright (c) 2014 Jamie Strachan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    sass_version: {
      none: {
      },
      invalid: {
        version: '1'
      },
      correct: {
        version: '3.2.13'
      },
      correctMinor: {
        options: {
          ignorePatch: true
        },
        version: '3.2.0'
      },
      correctMajor: {
        options: {
          ignoreMinor: true
        },
        version: '3.0.0'
      },
      incorrect: {
        version: '0.0.1'
      },
      incorrectMinor: {
        options: {
          ignorePatch: true
        },
        version: '3.3.0'
      },
      incorrectMajor: {
        options: {
          ignoreMinor: true
        },
        version: '4.0.0'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
