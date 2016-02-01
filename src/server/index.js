// Handle sourceMaps in node
import 'source-map-support/register';
// Import Soundworks library modules (server side)
import soundworks from 'soundworks/server';
// Import server side experience
import PlayerExperience from './PlayerExperience';

// Launch server
soundworks.server.start({ appName: 'Template' });

// Instantiate the modules
const checkin = new soundworks.ServerCheckin({ capacity: 100 });
const experience = new PlayerExperience();

// Map modules to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map other modules to additional client types (who would take
//   part in the scenario by connecting to the server through the `'/' + clientType`
//   URL).
soundworks.server.map('player', checkin, experience);
// server.map('soloist', soloistPerformance);
