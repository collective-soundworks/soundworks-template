// Import Soundworks library modules (client side)
// import { client, ClientCheckin, Welcome, Loader, ClientControl } from 'soundworks/client';
// Import Soundfield modules (client side)
import PlayerExperience from './PlayerExperience.js';
import soundworks from 'soundworks/client';

// Files to load
const audioFiles = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];

const init = () => {
  // shared by server (cf .ejs template) - @todo move to template
  const socketIO = window.CONFIG && window.CONFIG.SOCKET_CONFIG;
  const appName = window.CONFIG && window.CONFIG.APP_NAME;

  // configure client / app
  soundworks.client.init('player', { socketIO, appName });
  const performance = new PlayerExperience(audioFiles);

  // @warning: no views should be created before this call
  // implies to remove init and make it a `start` sub-routine
  soundworks.client.start();

}

// Init app when document id ready
window.addEventListener('load', init);
