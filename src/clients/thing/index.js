import '@babel/polyfill';
import 'source-map-support/register'; // enable sourcemaps in node

import path from 'path';
import soundworks from '@soundworks/core/client';
import ThingExperience from './ThingExperience';

// ----------------------------------------------------
// CONFIG STUFF ---------------------------------------
// ----------------------------------------------------

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

// ----------------------------------------------------
// APP ------------------------------------------------
// ----------------------------------------------------

soundworks.registerService(syncService);
soundworks.registerService(liveCodingService);

const initialized = pd.init({
  numInputChannels: 0,
  numOutputChannels: 2,
  sampleRate: 44100,
  ticks: 2,
});

function exitHandler(msg) {
  console.log('-------------------------', msg);
  pd.clear();

  console.log('------------------------- TERM');
  process.kill(process.pid, 'SIGKILL');
}

(async function launch() {
  try {
    await soundworks.init({ clientType: 'thing', ...config });
    const thing = new ThingExperience(soundworks, pd, config);

    await soundworks.start();
    thing.start();

  } catch(err) {
    console.error(err);
  }

  soundworks.client.socket.addListener('close', () => {
    exitHandler('socket disconnected');
  });
})();

process.on('exit', () => exitHandler('none'));
process.on('uncaughtException', (err) => exitHandler(err));
process.on('unhandledRejection', (err) => exitHandler(err));
