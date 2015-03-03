'use strict';

// Soundworks library
var serverSide = require('soundworks/server');
var server = serverSide.server;

// Express application
var express = require('express');
var app = express();
var path = require('path');
var dir = path.join(__dirname, '../../public');

// Performance module
class MyPerformance extends serverSide.Module {
  constructor() {}

  connect(client) {
    client.receive('perf_start', () => {
      client.send('play_sound');
    });
  }

  disconnect(client) {}
}

// Instantiate of the modules
var checkin = new serverSide.Checkin({
  numPlaces: 1000, // we accept a maximum of 1000 players
  order: 'ascending' // we assign the indices in ascending order
});
var performance = new MyPerformance();

// Launch server with the application app, using the public directory dir, on port 8000
server.start(app, dir, 8000);
// Map the modules required by the clients in each namespace
server.map('/player', 'My Scenario', checkin, performance);
// server.map('/env', 'My Performance - Environment', audioPerformance);
// server.map('/conductor', 'My Performance - Conductor', control, conductorPerformance);
