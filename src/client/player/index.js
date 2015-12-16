// Import Soundworks library modules (client side)
import { client, ClientCheckin, Welcome, Loader } from 'soundworks/client';
// Import Soundfield modules (client side)
import PlayerPerformance from './PlayerPerformance.js';

import soundworks from 'soundworks/client';

// Files to load
const audioFiles = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];


const app = () => {
  // Initialize the client
  client.init('player');

  // const definitions = [
  //   { label: 'test_1', state: 'selected' },
  //   { label: 'test_2', state: 'disabled' },
  //   { label: 'test_3', state: 'unselected' },
  // ]

  // const $container = document.querySelector('#container');
  // const squaredView = new soundworks.display.SquaredView();

  // const onSelect = (label, index) => { console.log('select', label, index); }
  // const onUnselect = (label, index) => { console.log('unselect', label, index); }

  // const selector = new soundworks.display.SelectorView(definitions, onSelect, onUnselect, {
  //   maxSelected: 2,
  //   defaultState: 'unselected',
  // });

  // squaredView.setViewComponent('.section-square', selector);

  // squaredView.render();
  // squaredView.appendTo($container);

  // window.selector = selector;

  // return;

  // Instantiate the modules
  const welcome = new Welcome({
    // activateAudio: true, // activate audio on user event (needed on iOS devices)
    wakeLock: true, // hack to prevent screen to go to sleep
    // requireMobile: false,
  });

  const checkin = new ClientCheckin({ showDialog: false });
  const loader = new Loader({ files: audioFiles });
  const performance = new PlayerPerformance(loader);

  const placer = new soundworks.ClientPlacer({ mode: 'list' });
  const locator = new soundworks.ClientLocator();
  // const orientation = new soundworks.Orientation();

  // Start the scenario and order the modules
  client.start((serial, parallel) =>
    serial(
      placer,
      // Initialization step: we launch in parallel the welcome module,
      // the loading of the files, and the checkin
      parallel(welcome, loader, /* checkin */),
      // locator,
      // orientation,
      // When the initialization step is done, we launch the performance
      performance
    )
  );
}

// Where the magic happens
window.addEventListener('load', app);
