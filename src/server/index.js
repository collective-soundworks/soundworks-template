import '@babel/polyfill';
import 'source-map-support/register'; // enable sourcemaps in node

import path from 'path';
import soundworks from '@soundworks/core/server';

import PlayerExperience from './PlayerExperience';

// import servicePlatform from '@soundworks/service-platform/server';
// import serviceLiveCoding from '@soundworks/service-live-coding/server';
// import serviceSync from '@soundworks/service-sync/server';

// import ControllerExperience from './ControllerExperience';
// import ThingExperience from './ThingExperience';

// import * as schemas from './schemas/index';

// soundworks.registerService(servicePlatform);
// soundworks.registerService(serviceSync);
// soundworks.registerService(serviceLiveCoding);

function getConfig(configName) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'dist', 'config', configName);
  let config = null;

  try {
    // rely on node `require` as the path is dynamic
    // @todo - replace with dynamic import
    config = require(configPath);
  } catch(err) {
    console.error(`Invalid ENV "${configName}", file "${configPath}.js" not found`);
    process.exit(1);
  }

  return config;
}

const configName = process.env.ENV || 'default';
const config = getConfig(configName);
// set NODE_ENV to the value defined in config file
process.env.NODE_ENV = config.env;
// if PORT is defined in command (aka allow `sudo PORT=80 node/dist/server/index.js`)
if (process.env.PORT) {
  config.port = process.env.PORT;
}

// launch application
(async function launch() {
  try {
    await soundworks.init(config, (clientType, config, httpRequest) => {
      return {
        clientType: clientType,
        env: config.env,
        appName: config.appName,
        websockets: config.websockets,
        defaultType: config.defaultClient,
        assetsDomain: config.assetsDomain,
      };
    });

    // for (let name in schemas) {
    //   soundworks.stateManager.registerSchema(name, schemas[name]);
    // }

    const player = new PlayerExperience(soundworks, 'player');
    // const globalsState = soundworks.stateManager.create('globals');
    // const auditState = soundworks.stateManager.create('audit');
    // const controller = new ControllerExperience(soundworks, 'controller');
    // const thing = new ThingExperience(soundworks, 'thing', auditState);

    await soundworks.start();
    // controller.start();
    // thing.start();
  } catch (err) {
    console.error(err.stack);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('> Unhandled Promise Rejection');
  console.log(reason);
});
