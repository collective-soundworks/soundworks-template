'use strict';

// Require the Soundworks library (server side)
var serverSide = require('soundworks/server');
var server = serverSide.server;

// Setup the Express app
var express = require('express');
var app = express();

// Start the server with a given public directory and port
var path = require('path');
var dir = path.join(__dirname, '../../public');
server.start(app, dir, 3000);

// Performance module
class MyPerformance extends serverSide.Performance {
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
  //
  //   ... // your code
  // }

  /* If anything needs to happen when a client starts the performance,
   * write it in the 'enter' method.
   */
  enter(client) {
    super.enter(client);

    client.broadcast('performance:play'); // send 'play' to all the other clients
  }

  /* If anything needs to happen when a client leaves the performance,
   * write it in the 'exit' method.
   */
  // exit(client) {
  //   super.exit(client); // don't forget this
  //
  //   ... // your code
  // }
}

// Instantiate of the modules
var checkin = new serverSide.Checkin({
  maxClients: 100, // we accept a maximum of 100 clients
});
var performance = new MyPerformance();

// Map the server modules to the 'player' client type (and root URL)
server.map('player', checkin, performance);

// Map the server modules to the other client types (and corresponding /clientType URLs)
// server.map('env', audioPerformance);
// server.map('conductor', control, conductorPerformance);
