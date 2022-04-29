import 'source-map-support/register.js';
import { Server } from '@soundworks/core/server.js';
import path from 'path';
import serveStatic from 'serve-static';
import compile from 'template-literal';

import experiencesLoader from './experiences/loader.js';
import { schemasLoader } from './schemas/loader.js';

import getConfig from '../utils/getConfig.js';
const ENV = process.env.ENV || 'default';
const config = getConfig(ENV);
const server = new Server();

// html template and static files (in most case, this should not be modified)
server.templateEngine = { compile };
server.templateDirectory = path.join('.build', 'server', 'tmpl');
server.router.use(serveStatic('public'));
server.router.use('build', serveStatic(path.join('.build', 'public')));

console.log(`
--------------------------------------------------------
- launching "${config.app.name}" in "${ENV}" environment
- [pid: ${process.pid}]
--------------------------------------------------------
`);

// -------------------------------------------------------------------
// register plugins
// -------------------------------------------------------------------
// server.pluginManager.register(pluginName, pluginFactory, [pluginOptions], [dependencies])

(async function launch() {
  // load all declared schemas
  await schemasLoader(server);

  try {
    await server.init(config, (clientType, config, httpRequest) => {
      return {
        clientType: clientType,
        app: {
          name: config.app.name,
          author: config.app.author,
        },
        env: {
          type: config.env.type,
          websockets: config.env.websockets,
          subpath: config.env.subpath,
        }
      };
    });

    // create some global states here
    // const globals = await server.stateManager.create('globals');

    // instanciate all `${clientType}Experience` according to client types
    // declared in `config/application.json`. Use the third argument to pass
    // arbitrary data or objects to the experiences.
    await experiencesLoader.init(server, config, {});

    // start all the things
    await server.start();
    await experiencesLoader.start();

  } catch (err) {
    console.error(err.stack);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('> Unhandled Promise Rejection');
  console.log(reason);
});
