import '@babel/polyfill';
import 'source-map-support/register'; // enable sourcemaps in node
import path from 'path';
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';
import ControllerExperience from './ControllerExperience';
import ThingExperience from './ThingExperience';

function getConfig(configName) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'dist', 'shared', 'config', configName);
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

soundworks.server.init(config);

soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    websockets: config.websockets,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

const sharedParams = soundworks.server.require('shared-params');
sharedParams.addText('numPlayers', '# players', '0');
sharedParams.addText('numThings', '# things', '0');

const player = new PlayerExperience('player');
const thing = new ThingExperience('thing');
const controller = new ControllerExperience('controller', { auth: false });


soundworks.server.start();
