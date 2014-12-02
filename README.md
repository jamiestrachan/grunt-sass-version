# grunt-sass-version

> Confirm that a particular version of Sass is available to Grunt.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sass-version --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-version');
```

## The "sass_version" task

### Overview
In your project's Gruntfile, add a section named `sass_version` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sass_version: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.ignorePatch
Type: `Boolean`
Default value: `false`

Set to `true` if you wish to ignore differences in the patch version.

#### options.ignoreMinor
Type: `Boolean`
Default value: `false`

Set to `true` if you wish to ignore differences in the patch version.

### Usage Examples

#### Default Options
In this example, the default options are used to test the available version of Sass
against a desired version as specified in the `version` property. The build will fail
unless the Sass version as reported by `sass -v` matches exactly.

```js
grunt.initConfig({
  sass_version: {
    your_target: {
      version: "3.4.9"
    }
  }
});
```

#### Custom Options
In this example, custom options are used to test only a portion of the Sass version. If
`ignorePatch` is set to true, then only the major and minor parts of the version number
are required to match.

```js
grunt.initConfig({
  sass_version: {
    options: {
      ignorePatch: true
    },
    your_target: {
      version: "3.4.9"
    }
  }
});
```

If the `ignoreMinor` option is set to true, then only the major part of the version
number is required to match. The `ignoreMinor` option implies the `ignorePatch` option
so you don't need to set both.

```js
grunt.initConfig({
  sass_version: {
    options: {
      ignoreMinor: true
    },
    your_target: {
      version: "3.4.9"
    }
  }
});
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
