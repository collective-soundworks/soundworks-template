// Import Soundworks library modules (server side)
import { server, ServerCheckin } from 'soundworks/server';
// Import template modules (server side)
import PlayerPerformance from './PlayerPerformance.js';

// Instantiate the modules
const checkin = new ServerCheckin({ maxClients: 100 });
const performance = new PlayerPerformance();

// Launch server
server.start();

// Map modules to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map other modules to additional client types (who would take
//   part in the scenario by connecting to the server through the '/clientType'
//   URL).
server.map('player', checkin, performance);
// server.map('soloist', soloistPerformance);
// server.map('conductor', control, conductorPerformance);
