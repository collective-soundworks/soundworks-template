// Enable sourceMaps in node
import 'source-map-support/register';
// Import Soundworks library modules (server side)
import soundworks from 'soundworks/server';
// Import server side experience
import PlayerExperience from './PlayerExperience';

// Configure the services and create the experience.
//
// Activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map activities to additional client types (thus defining a
//   route (url) of the from: `'/' + clientType`
const checkin = soundworks.serverServiceManager.require('checkin', {
  capacity: 100,
  clientType: 'player'
});

const experience = new PlayerExperience();
experience.addClientType('player');

// alternative to define client types for each activities:
// checkin.addClientType('player');

// Start the application with a given name.
soundworks.server.start({ appName: 'Template' });
