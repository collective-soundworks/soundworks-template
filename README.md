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
 * `transpile` - creates an executable application from the ES2015 (ES6) sources
 * `start` - starts the application (i.e. its server).
 * `watch` - starts the server and watches the file system to do the necessary operations while developing

```shell
$ npm run transpile
$ npm run start
$ npm run watch
```

In detail, the `transpile` script implies the following operations:
 * *transpile* all source files (located in `src`) from ES2015 to ES5
 * rebundle (i.e. *browserify*) the client Javascript (ES5) sources
 * recreate the *CSS* files from their *SASS* sources

The following operations may be performed by the `watch` script depending on the modification of source files:
 * recreate a *CSS* file when a corresponding *SASS* file in the `sass` folder is modified
 * re-*transpile* a modified server source file in the `src/server` folder
 * re-*transpile* and *browserify* a modified client source file in the `src/client` folder
 * re-*transpile* a modified source file used on both, client and server, in the `src/common` folder

## Application Template Structure

The template consists of the following files and directories you should know about:
 * `bin` - the Node.js scripts (no need to touch these)
 * `public` - everything the clients need to run the application
   * `fonts` - fonts used by the application template (this is your folder)
   * `sounds` - sounds used by the application template (this is your folder)
   * `js` - transpiled Javascript files (do not touch)
   * `css` - *CSS* stylesheets automatically created from *SASS* sources (do not touch)
   * . . . add the assets (images, movies, etc.) used by the clients of your application here
 * `sass` - *SASS* stylesheet sources
   * `main.scss` - includes all other *SASS* files in the directory (the provided files are described in comments)
   * . . . add your styles here (as *SASS* files) and include them into the `main.scss` file
 * `src` - javascript (ES2015) sources (this is all yours)
   * `client` - sources of the application's client side (contains one directory per client type)
     * `player` - sources of the *player* client
       * `index.js` - main file of the *player* client
       * . . . files imported by the `index.js` main file
   * `server` - sources of the application's server side
     * `index.js` - server side main file (for all client types)
     * . . . files imported by the `index.js` server side main file
 * `html` - template files to generate the application's `index.html` files (no need to touch)
