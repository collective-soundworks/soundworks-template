# `soundworks-template`

> Project template for developing [*soundworks*](https://github.com/collective-soundworks/soundworks/) applications.  

_For a complete documentation of *soundworks*, please refer to [http://collective-soundworks.github.io/soundworks/](http://collective-soundworks.github.io/soundworks/)_

## Creating a new application

To start the development of a new *soundworks* application, we recommend the following sequence of commands:

```sh
git clone https://github.com/collective-soundworks/soundworks-template.git my-soundworks-application
cd my-soundworks-application
rm -Rf .git
npm install
# to start development
npm run watch
```

## Commands

```shell
# build es-next sources to node and browser compliant files
npm run build
# starts the server and watches the file system re-build application
npm run watch
# re-build and creates minified version of browser clients
npm run minify
# starts the server
npm run start
```

## Files structure

The template consists of the following files and directories you should know about:
* `dist` - transpiled version of the server and node clients
* `public` - public directory, accessible through http
  + `dist` - transpiled version of the browsers clients
* `src` - javascript sources
  + `clients` - sources of every clients,  
    each folder should be dedicated to a specific client, for example:
    - `player`
    - `controller`
    - `...`
  + `server` - sources of the server
  + `config` - environnement config files
* `application.json` - application config file

This structure is required by the helper scripts, modify at your own risks.

# License 

BSD-3-Clause
