// enable sourcemaps in node
import 'source-map-support/register';
// import soundworks library (server side) and server side experience
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';

// initialize application with configuration options
soundworks.server.init({ appName: 'Template' });

// create the experience
// activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root url) need to communicate with the `checkin` (see
// `src/server/playerExperience.js`) and the server side `playerExperience`.
// - we could also map activities to additional client types (thus defining a
//   route (url) of the following form: `/${clientType}`)
const experience = new PlayerExperience('player');

// start application
soundworks.server.start();
