import '@babel/polyfill';
import 'source-map-support/register';

import soundworks from '@soundworks/core/server';
import serveStatic from 'serve-static';
import getConfig from './utils/getConfig';

import delayServiceFactory from '@soundworks/service-delay/server';
// import delayService2 from '@soundworks/service-delay/server';
import PlayerExperience from './PlayerExperience';

const ENV = process.env.ENV || 'default';
const { envConfig, appConfig } = getConfig(ENV);

console.log(`
-------------------------------------------------------
- running "${appConfig.name}" in "${ENV}" environment -
-------------------------------------------------------
`);

(async function launch() {
  try {
    // const soundworks = new Soundworks();
    soundworks.registerService('delay-1', delayServiceFactory);
    soundworks.registerService('delay-2', delayServiceFactory);

    await soundworks.init(envConfig, (clientType, config, httpRequest) => {
      return {
        clientType: clientType,
        appName: appConfig.name,
        env: envConfig.env,
        websockets: envConfig.websockets,
        defaultType: envConfig.defaultClient,
        assetsDomain: envConfig.assetsDomain,
      };
    });

    // for (let name in schemas) {
    //   soundworks.stateManager.registerSchema(name, schemas[name]);
    // }

    const playerExperience = new PlayerExperience(soundworks, 'player');
    // const globalsState = soundworks.stateManager.create('globals');
    // const auditState = soundworks.stateManager.create('audit');
    // const controller = new ControllerExperience(soundworks, 'controller');
    // const thing = new ThingExperience(soundworks, 'thing', auditState);

    // static files
    await soundworks.server.router.use(serveStatic('public'));
    await soundworks.server.router.use('build', serveStatic('.build/public'));

    await soundworks.start();
    playerExperience.start(); // -> called automatically when

  } catch (err) {
    console.error(err.stack);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('> Unhandled Promise Rejection');
  console.log(reason);
});
