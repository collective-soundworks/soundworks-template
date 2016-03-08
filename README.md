# Soundworks template

Use this template to start writing a [`soundworks`](https://github.com/collective-soundworks/soundworks) application.

You can find a tutorial in the [*Soundworks* documentation](http://collective-soundworks.github.io/soundworks/).


## Scripts

```shell
$ npm run watch
```

This command watches the file system to do necessary operations while developping:
- recreate the `css` files when a `sass` file is updated (located in `sass` folder)
- transpile from es6 to es5 when a server file is updated (located in `src/server` folder).
- transpile from es6 to es5 and recreate the public browserified file when a client file (located in `src/client` folder) is updated.
- transpile from es6 to es5 files to be used both server-side and client-side, located in `src/common`.

```shell
$ npm run transpile
```

This command triggers the following operations:
- transpile all source files (located in `src`) from es6 to es5.
- rebundle (browserify) client javascript sources.
- recreate the `css` files from their `sass` sources.

```shell
$ npm run start
```

This command starts the application



