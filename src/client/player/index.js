// Import Soundworks library modules (client side)
import { client, Checkin, Dialog, Loader } from 'soundworks/client';

// Import Soundfield modules (client side)
import PlayerPerformance from './PlayerPerformance.js';

// Files to load
const audioFiles = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];

// Initiliaze the client type
client.init('player');

// Where the magic happens
window.addEventListener('load', () => {
  // Instantiate the modules
  const welcome = new Dialog({
    name: 'welcome',
    text: `<p>Welcome to <b>My Scenario</b>.</p>
           <p>Touch the screen to join!</p>`,
    activateAudio: true
  });
  const checkin = new Checkin();
  const loader = new Loader({ files: audioFiles });
  const performance = new PlayerPerformance(loader);

  // Start the scenario and order the modules
  client.start((serial, parallel) =>
    serial(
      // Initialization step: we launch in parallel the welcome module,
      // the loading of the files, and the checkin
      parallel(welcome, loader, checkin),
      // When the initialization step is done, we launch the performance
      performance
    )
  );
});
