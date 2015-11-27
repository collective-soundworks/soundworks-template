// Import external libraries
const express = require('express');
const path = require('path');

// Import Soundworks library modules (server side)
import { server, Checkin } from 'soundworks/server';

// Import template modules (server side)
import PlayerPerformance from './PlayerPerformance.js';

// Instantiate the modules
const checkin = new Checkin({ maxClients: 100 });
const performance = new PlayerPerformance();

// Launch server
const app = express();
const dir = path.join(process.cwd(), 'public');
server.start(app, dir, process.env.PORT || 3000);

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
