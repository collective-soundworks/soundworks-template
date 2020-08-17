import '@babel/polyfill';
import 'source-map-support/register';

import { Server } from '@soundworks/core/server';
import getConfig from './utils/getConfig';
import path from 'path';
import serveStatic from 'serve-static';
import compile from 'template-literal';

// import services
import PlayerExperience from './PlayerExperience';
import ControllerExperience from './ControllerExperience';

const ENV = process.env.ENV || 'default';
const config = getConfig(ENV);
const server = new Server();

console.log(`
--------------------------------------------------------
- launching "${config.app.name}" in "${ENV}" environment
- [pid: ${process.pid}]
--------------------------------------------------------
`);

// -------------------------------------------------------------------
// register services
// -------------------------------------------------------------------
// server.pluginHandler.register(pluginName, pluginFactory, [pluginOptions], [dependencies])

// -------------------------------------------------------------------
// register schemas
// -------------------------------------------------------------------
// server.stateHandler.register(name, schema);

// register schemas and init shared states

// html template and static files (in most case, this should not be modified)
server.configureHtmlTemplates({ compile }, path.join('.build', 'server', 'tmpl'))
server.router.use(serveStatic('public'));
server.router.use('build', serveStatic(path.join('.build', 'public')));
server.router.use('vendors', serveStatic(path.join('.vendors', 'public')));

(async function launch() {
  try {
    // -------------------------------------------------------------------
    // launch application
    // -------------------------------------------------------------------
    // don't do much but keep it for paralellism andpossibly future entry point
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
          assetsDomain: config.env.assetsDomain,
        }
      };
    });

    const playerExperience = new PlayerExperience(server, 'player');
    const controllerExperience = new ControllerExperience(server, 'controller');

    await server.start();

    playerExperience.start();
    controllerExperience.start();

  } catch (err) {
    console.error(err.stack);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('> Unhandled Promise Rejection');
  console.log(reason);
});
