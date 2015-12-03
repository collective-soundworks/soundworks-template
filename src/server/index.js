// Require the Soundworks library (server side)
const soundworks = require('soundworks/server');
const server = soundworks.server;

// Performance module
class MyPerformance extends soundworks.ServerPerformance {
  constructor() {
    super();
  }

  /* If anything needs to happen when a client connects to the server,
   * write it in the 'connect' method.
   */
  // connect(client) {
  //   super.connect(client); // don't forget this
  //   ... // your code
  // }

  /* If anything needs to happen when a client disconnects from the server,
   * write it in the 'disconnect' method.
   */
  // disconnect(client) {
  //   super.disconnect(client); // don't forget this
  //   ... // your code
  // }

  /* If anything needs to happen when a client starts the performance,
   * write it in the 'enter' method.
   */
  enter(client) {
    super.enter(client);
    this.sendPeers(client, 'play'); // send 'play' to all the other clients
  }

  /* If anything needs to happen when a client leaves the performance,
   * write it in the 'exit' method.
   */
  // exit(client) {
  //   super.exit(client); // don't forget this
  //   ... // your code
  // }
}

// Instantiate of the modules
const checkin = new soundworks.ServerCheckin({
  maxClients: 100, // we accept a maximum of 100 clients
});

const performance = new MyPerformance();

server.start();
// Map the server modules to the 'player' client type (and root URL)
server.map('player', checkin, performance);

// Map the server modules to the other client types (and corresponding /clientType URLs)
// server.map('env', audioPerformance);
// server.map('conductor', control, conductorPerformance);
