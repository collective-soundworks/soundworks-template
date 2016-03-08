var colors = require('colors');
var fse = require('fs-extra');
var path = require('path');
var childProcess = require('child_process');

'use strict';

var cwd = process.cwd();

/**
 * Path to the server index
 */
var serverIndex = path.join(cwd, 'server/index.js');

/**
 * Process hosting the server
 */
var server = null;

/**
 * Run the `serverIndex` in a forked process
 */
function start() {
  if (fse.statSync(serverIndex).isFile()) {
    console.log('=> START SERVER'.cyan);
    server = childProcess.fork(serverIndex);
  }
}

/**
 * Kill the forked process hosting the server
 */
function stop() {
  if (server) {
    console.log('=> STOP SERVER'.cyan);
    server.kill();
    server = null;
  }
}

/**
 *
 */
function restart() {
  stop();
  start();
}

/**
 * Kill server on uncaughtException
 */
process.on('uncaughtException', function (err) {
  console.log('Uncaught Exception: '.red);
  console.error(err.stack);

  stop();
  process.exit();
});

module.exports = {
  start: start,
  stop: stop,
  restart: restart,
};

