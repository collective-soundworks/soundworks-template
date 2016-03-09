# Soundworks Template

This is a template of a [*Soundworks*](https://github.com/collective-soundworks/soundworks/) application.
The template includes comprehensive comments in the code.

For a complete documentation of the *Soundworks* framework, please refer to http://collective-soundworks.github.io/soundworks/.

## Creating a New Application

To start the development of a new *Soundworks* application, we recommend the following sequence of commands:

```sh
# clone the repo
$ git clone https://github.com/collective-soundworks/soundworks-template.git my-app
$ cd my-app

# remove git history in order to make your own one
$ rm -Rf .git

# install dependencies
$ npm install

# bootstrap the project
$ npm run transpile

# start to hack
$ npm run watch
```

## Scripts

The template includes a set of scripts to support the development of an application.
The scripts can be invoked through the `npm run` command:
 * `transpile` - creates an executable application from the ES2016 (ES6) sources
 * `start` - starts the application (i.e. its server).
 * `watch` - starts the server and watches the file system to do the necessary operations while developing

```shell
$ npm run transpile
$ npm run start
$ npm run watch
```

In detail, the `transpile` script implies the following operations:
 * *transpile* all source files (located in `src`) from ES2016 to ES5
 * rebundle (i.e. *browserify*) the client Javascript (ES5) sources
 * recreate the *CSS* files from their *SASS* source templates

The following operations may be performed by the `watch` script depending on the modification of source files:
 * recreate a *CSS* file when a corresponding *SASS* file in the `sass` folder is modified
 * re-*transpile* a modified server source file in the `src/server` folder
 * re-*transpile* and *browserify* a modified client source file in the `src/client` folder
 * re-*transpile* a modified source file used on both, client and server, in the `src/common` folder

## Structure of an Application
