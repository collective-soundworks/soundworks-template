// Import Soundworks library modules (server side)
import soundworks from 'soundworks/server';
// Import matrix module
import { generateMatrix } from 'soundworks/utils/setup';
// Import server side performance module
import PlayerPerformance from './PlayerPerformance';

const server = soundworks.server;
const ServerCheckin = soundworks.ServerCheckin;
const setup = generateMatrix({ rows: 8, cols: 8 });

// Launch server
server.start();

// Instantiate the modules
const checkin = new ServerCheckin({ capacity: 100 });
const performance = new PlayerPerformance();

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
