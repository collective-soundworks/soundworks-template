import '@babel/polyfill';
import 'source-map-support/register';

import soundworks from '@soundworks/core/server';
import fs from 'fs';
import JSON5 from 'json5';
import path from 'path';
import PlayerExperience from './PlayerExperience';

const ENV = process.env.ENV || 'default';
let envConfig = null;
let appConfig = null;
// parse env config
try {
  const envConfigPath = path.join('config', 'env', `${ENV}.json`);
  envConfig = JSON5.parse(fs.readFileSync(envConfigPath, 'utf-8'));

  if (process.env.PORT) {
    envConfig.port = process.env.PORT;
  }
} catch(err) {
  console.log(`Invalid "${ENV}" env config file`);
  process.exit(0);
}
// parse app config
try {
  const appConfigPath = path.join('config', 'application.json');
  appConfig = JSON5.parse(fs.readFileSync(appConfigPath, 'utf-8'));
} catch(err) {
  console.log(`Invalid app config file`);
  process.exit(0);
}

console.log(`
-------------------------------------------------------
- running "${appConfig.name}" in "${ENV}" environment -
-------------------------------------------------------
`);

(async function launch() {
  try {
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
