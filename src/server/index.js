// Enable sourceMaps in node
import 'source-map-support/register';

// Import Soundworks library (server side) and server side experience
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';

// Initialize application with configuration options.
soundworks.server.init({ appName: 'Template' });

// Create the experience activity.
//
// Activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` (see
// `src/server/PlayerExperience.js`) and the server side `PlayerExperience`.
// - we could also map activities to additional client types (thus defining a
//   route (url) of the from: `/${clientType}`
const experience = new PlayerExperience('player');

// Start the application.
soundworks.server.start();
