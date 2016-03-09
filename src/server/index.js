// Enable sourceMaps in node
import 'source-map-support/register';
// Import Soundworks library modules (server side) and server side experience
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';


soundworks.server.init({ appName: 'Template' });

// Configure the services and create the experience.
//
// Activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map activities to additional client types (thus defining a
//   route (url) of the from: `/${clientType}`

const experience = new PlayerExperience('player');
experience.require('shared-config');

// Start the application with a given name.
soundworks.server.start();
