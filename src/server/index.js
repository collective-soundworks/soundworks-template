// Enable sourceMaps in node
import 'source-map-support/register';
// Import Soundworks library modules (server side) and server side experience
import soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';

const setup = {
  coordinates: [],
  area: {
    width: 1,
    height: 1,
  }
}

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const x = (i + 1) / 3 - (1/6);
    const y = (j + 1) / 3 - (1/6);
    setup.coordinates.push([x, y]);
  }
}

soundworks.server.init({ appName: 'Template', setup });

// Configure the services and create the experience.
//
// Activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map activities to additional client types (thus defining a
//   route (url) of the from: `'/' + clientType`

const checkin = soundworks.server.require('checkin');
checkin.addClientType('player');

// const placer = soundworks.server.require('placer');
// placer.addClientType('player');

// const locator = soundworks.server.require('locator');
// locator.addClientType('player');

const experience = new PlayerExperience();
experience.addClientType('player');

// Start the application with a given name.
soundworks.server.start();
