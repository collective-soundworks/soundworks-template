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
  },
  maxClientsPerPosition: 2,
}

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const x = (i + 1) / 3 - (1/6);
    const y = (j + 1) / 3 - (1/6);
    setup.coordinates.push([x, y]);
  }
}

const dummy = {
  test: {
    niap: true,
    bidule: [0, 1, 2],
  },
  test2: 42,
}

soundworks.server.init({ appName: 'Template', setup, dummy });

// Configure the services and create the experience.
//
// Activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map activities to additional client types (thus defining a
//   route (url) of the from: `'/' + clientType`

const experience = new PlayerExperience('player');
experience.require('shared-config');

// Start the application with a given name.
soundworks.server.start();
