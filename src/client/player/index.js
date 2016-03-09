// import soundworks library (client side) and custom experience
import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience.js';

// files to load
const audioFiles = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];

const init = () => {
  // configuration options shared by the server (cf. `views/default.ejs`)
  const socketIO = window.CONFIG && window.CONFIG.SOCKET_CONFIG;
  const appName = window.CONFIG && window.CONFIG.APP_NAME;

  // configure client application
  soundworks.client.init('player', { socketIO, appName });
  const experience = new PlayerExperience(audioFiles);

  // start the application
  soundworks.client.start();
}

// initialize application when document is fully loaded
window.addEventListener('load', init);
