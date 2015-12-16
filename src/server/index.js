// Import Soundworks library modules (server side)
import { server, ServerCheckin } from 'soundworks/server';
// Import template modules (server side)
import PlayerPerformance from './PlayerPerformance.js';

import soundworks from 'soundworks/server';
import { generateMatrix } from 'soundworks/utils/setup';
// import appConfig from './config/app.json';
// import envConfig from './config/env.json';
const setup = generateMatrix({ rows: 8, cols: 8 });
// Launch server
server.start();

// Instantiate the modules
const checkin = new ServerCheckin({ capacity: 100 });
const performance = new PlayerPerformance();

const locator = new soundworks.ServerLocator({ setup });
const placer = new soundworks.ServerPlacer({ setup })

// Map modules to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map other modules to additional client types (who would take
//   part in the scenario by connecting to the server through the '/clientType'
//   URL).
server.map('player', placer, /* checkin, */ performance);
// server.map('soloist', soloistPerformance);
// server.map('conductor', control, conductorPerformance);
