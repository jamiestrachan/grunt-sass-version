'use strict';

var grunt = require('grunt');
var exec = require('child_process').exec;
var _sass_version = require('../tasks/lib/_sass_version').init(grunt);

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.sass_version = {
  setUp: function(done) {
    var that = this;
    var cp = exec('sass -v', function (err, stdout, stderr) {
      that.version = stdout.match(/([0-9]+\.[0-9]+\.[0-9]+)/)[1];
      that.major = that.version.split(".")[0];
      that.minor = that.version.split(".")[1];
      that.patch = that.version.split(".")[2];
      that.badValue = "999";
      that.badVersion = that.badValue + "." + that.badValue + "." + that.badValue;
      done();
    });  
  },
  invalid: function(test) {
    var result;

    test.expect(2);

    result = _sass_version.test("1");
    test.equal(result.success, false);
    test.equal(result.message, "The Sass version must be of the form #.#.#");

    test.done();
  },
  correct: function(test) {
    var result;

    test.expect(1);

    result = _sass_version.test(this.version);
    test.equal(result.success, true);

    test.done();
  },
  correctMinor: function(test) {
    var result;

    test.expect(1);

    result = _sass_version.test(this.major + "." + this.minor + "." + this.badValue, true);
    test.equal(result.success, true);

    test.done();
  },
  correctMajor: function(test) {
    var result;

    test.expect(1);

    result = _sass_version.test(this.major + "." + this.badValue + "." + this.badValue, true, true);
    test.equal(result.success, true);

    test.done();
  },
  incorrect: function(test) {
    var result;

    test.expect(1);

    result = _sass_version.test(this.badVersion);
    test.equal(result.success, false);

    test.done();
  },
  incorrectMinor: function(test) {
    var result;

    test.expect(1);

    result = _sass_version.test(this.badVersion, true);
    test.equal(result.success, false);

    test.done();
  },
  incorrectMajor: function(test) {
    var result;

    test.expect(1);

    result = _sass_version.test(this.badVersion, true, true);
    test.equal(result.success, false);

    test.done();
  }
};
