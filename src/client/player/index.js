// import soundworks client side
import * as soundworks from 'soundworks/client';

// import player experience
import PlayerExperience from './PlayerExperience.js';

// list of files to load (passed to the experience)
const files = [
  'sounds/sound-welcome.mp3',
  'sounds/sound-others.mp3'
];

// launch application when document is fully loaded
window.addEventListener('load', () => {
  // mandatory configuration options received from the server through the html/default.ejs template
  const socketIO = window.CONFIG && window.CONFIG.SOCKET_CONFIG;
  const appName = window.CONFIG && window.CONFIG.APP_NAME;

  // initialize the 'player' client
  soundworks.client.init('player', { socketIO, appName });

  // create client side (player) experience
  const experience = new PlayerExperience(files);

  // start the client
  soundworks.client.start();
});
