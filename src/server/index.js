import '@babel/polyfill';
import 'source-map-support/register';

import * as soundworks from '@soundworks/core/server';
import getConfig from './utils/getConfig';
import path from 'path';
import serveStatic from 'serve-static';
import compile from 'template-literal';

console.log(compile(`ab`)());

import delayServiceFactory from '@soundworks/service-delay/server';
import PlayerExperience from './PlayerExperience';

const ENV = process.env.ENV || 'default';
const config = getConfig(ENV);

console.log(`
--------------------------------------------------------
- running "${config.app.name}" in "${ENV}" environment -
--------------------------------------------------------
`);

(async function launch() {
  try {
    const server = new soundworks.Server();

    server.registerService('delay-1', delayServiceFactory, { delayTime: 1 }, []);
    server.registerService('delay-2', delayServiceFactory, { delayTime: 2 }, ['delay-1']);

    await server.init(config, (clientType, config, httpRequest) => {
      return {
        clientType: clientType,
        appName: config.app.name,
        env: config.env.env,
        websockets: config.env.websockets,
        assetsDomain: config.env.assetsDomain,
        // services: config.services,
      };
    });

    // for (let name in schemas) {
    //   server.stateManager.registerSchema(name, schemas[name]);
    // }

    // const globalsState = server.stateManager.create('globals');
    // const auditState = server.stateManager.create('audit');
    // const controller = new ControllerExperience(server, 'controller');
    // const thing = new ThingExperience(server, 'thing', auditState);

    // html template and static files (in most case, this should not be modified)
    server.configureHtmlTemplates({ compile }, path.join('.build', 'server', 'tmpl'))
    server.router.use(serveStatic('public'));
    server.router.use('build', serveStatic(path.join('.build', 'public')));

    const playerExperience = new PlayerExperience(server, 'player');

    await server.start();
    playerExperience.start();

  } catch (err) {
    console.error(err.stack);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('> Unhandled Promise Rejection');
  console.log(reason);
});
