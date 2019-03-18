import 'source-map-support/register';
import * as soundworks from 'soundworks/thing';
import path from 'path';
import ThingExperience from './ThingExperience';

const configName = process.env.ENV || 'default';
const configPath = path.join(process.cwd(), 'dist', 'shared', 'config', configName);
let config = null;

// rely on node `require` as the path is dynamic
try {
  config = require(configPath).default;
} catch(err) {
  console.error(`Invalid ENV "${configName}", file "${configPath}.js" not found`);
  process.exit(1);
}

process.env.NODE_ENV = config.env;

if (process.env.PORT) {
  config.port = process.env.PORT;
}

if (process.env.SERVER_IP) {
  config.ip = process.env.SERVER_IP;
}

const serverUrl = `${(config.userHttps ? 'https' : 'http')}://${config.ip}:${config.port}`;

console.log(`
------------------------------------------------
> connecting to server: ${serverUrl}
------------------------------------------------
`);

config.websockets.url = serverUrl;


// const initialized = pd.init({
//   numInputChannels: 0,
//   numOutputChannels: 1,
//   sampleRate: 48000,
//   ticks: 1,
// });

// console.log('[pd initialized]');

function exitHandler(msg) {
  // https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html
  // "It is the normal way to politely ask a program to terminate."
  console.log('> kill process:', msg);
  process.kill(process.pid, 'SIGKILL');
}

soundworks.client.init('thing', config).then(() => {
  const experience = new ThingExperience();
  soundworks.client.start();
  // soundworks.client.start(experience.start);

  soundworks.client.socket.addStateListener(eventName => {
    if (eventName === 'disconnect') {
      exitHandler('Disconnected from server');
    }
  });

  process.on('exit', () => exitHandler('none'));
  process.on('uncaughtException', (err) => exitHandler(err));
}).catch(err => {
  exitHandler(err.message);
});
