// Require the Soundworks library (server side)
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var serverSide = require('soundworks/server');
var server = serverSide.server;

// Setup the Express app
var express = require('express');
var app = express();

// Start the server with a given public directory and port
var path = require('path');
var dir = path.join(process.cwd(), 'public');

server.start(app, dir, 3000);

// Performance module

var MyPerformance = (function (_serverSide$Performance) {
  _inherits(MyPerformance, _serverSide$Performance);

  function MyPerformance() {
    _classCallCheck(this, MyPerformance);

    _get(Object.getPrototypeOf(MyPerformance.prototype), 'constructor', this).call(this);
  }

  // Instantiate of the modules

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

  _createClass(MyPerformance, [{
    key: 'enter',
    value: function enter(client) {
      _get(Object.getPrototypeOf(MyPerformance.prototype), 'enter', this).call(this, client);
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
  }]);

  return MyPerformance;
})(serverSide.Performance);

var checkin = new serverSide.Checkin({
  maxClients: 100 });
// we accept a maximum of 100 clients
var performance = new MyPerformance();

// Map the server modules to the 'player' client type (and root URL)
server.map('player', checkin, performance);

// Map the server modules to the other client types (and corresponding /clientType URLs)
// server.map('env', audioPerformance);
// server.map('conductor', control, conductorPerformance);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYXR1c3pld3NraS93d3cvbGliL3NvdW5kd29ya3MtdGVtcGxhdGUvc3JjL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzlDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7OztBQUcvQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsSUFBSSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7OztBQUdwQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7O0FBRTdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7OztJQUd2QixhQUFhO1lBQWIsYUFBYTs7QUFDTixXQURQLGFBQWEsR0FDSDswQkFEVixhQUFhOztBQUVmLCtCQUZFLGFBQWEsNkNBRVA7R0FDVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFIRyxhQUFhOztXQTBCWixlQUFDLE1BQU0sRUFBRTtBQUNaLGlDQTNCRSxhQUFhLHVDQTJCSCxNQUFNLEVBQUU7QUFDcEIsWUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0tBQ3RDOzs7Ozs7Ozs7Ozs7U0E3QkcsYUFBYTtHQUFTLFVBQVUsQ0FBQyxXQUFXOztBQTBDbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDO0FBQ25DLFlBQVUsRUFBRSxHQUFHLEVBQ2hCLENBQUMsQ0FBQzs7QUFDSCxJQUFJLFdBQVcsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDOzs7QUFHdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDIiwiZmlsZSI6Ii9Vc2Vycy9tYXR1c3pld3NraS93d3cvbGliL3NvdW5kd29ya3MtdGVtcGxhdGUvc3JjL3NlcnZlci9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlcXVpcmUgdGhlIFNvdW5kd29ya3MgbGlicmFyeSAoc2VydmVyIHNpZGUpXG52YXIgc2VydmVyU2lkZSA9IHJlcXVpcmUoJ3NvdW5kd29ya3Mvc2VydmVyJyk7XG52YXIgc2VydmVyID0gc2VydmVyU2lkZS5zZXJ2ZXI7XG5cbi8vIFNldHVwIHRoZSBFeHByZXNzIGFwcFxudmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG52YXIgYXBwID0gZXhwcmVzcygpO1xuXG4vLyBTdGFydCB0aGUgc2VydmVyIHdpdGggYSBnaXZlbiBwdWJsaWMgZGlyZWN0b3J5IGFuZCBwb3J0XG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbnZhciBkaXIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3B1YmxpYycpO1xuXG5zZXJ2ZXIuc3RhcnQoYXBwLCBkaXIsIDMwMDApO1xuXG4vLyBQZXJmb3JtYW5jZSBtb2R1bGVcbmNsYXNzIE15UGVyZm9ybWFuY2UgZXh0ZW5kcyBzZXJ2ZXJTaWRlLlBlcmZvcm1hbmNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGNvbm5lY3RzIHRvIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSAnY29ubmVjdCcgbWV0aG9kLlxuICAgKi9cbiAgLy8gY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5jb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG5cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cblxuICAvKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBkaXNjb25uZWN0cyBmcm9tIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSAnZGlzY29ubmVjdCcgbWV0aG9kLlxuICAgKi9cbiAgLy8gZGlzY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5kaXNjb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG5cbiAgLyogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgc3RhcnRzIHRoZSBwZXJmb3JtYW5jZSxcbiAgICogd3JpdGUgaXQgaW4gdGhlICdlbnRlcicgbWV0aG9kLlxuICAgKi9cbiAgZW50ZXIoY2xpZW50KSB7XG4gICAgc3VwZXIuZW50ZXIoY2xpZW50KTtcbiAgICBjbGllbnQuYnJvYWRjYXN0KCdwZXJmb3JtYW5jZTpwbGF5Jyk7IC8vIHNlbmQgJ3BsYXknIHRvIGFsbCB0aGUgb3RoZXIgY2xpZW50c1xuICB9XG5cbiAgLyogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgbGVhdmVzIHRoZSBwZXJmb3JtYW5jZSxcbiAgICogd3JpdGUgaXQgaW4gdGhlICdleGl0JyBtZXRob2QuXG4gICAqL1xuICAvLyBleGl0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmV4aXQoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy9cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cbn1cblxuLy8gSW5zdGFudGlhdGUgb2YgdGhlIG1vZHVsZXNcbnZhciBjaGVja2luID0gbmV3IHNlcnZlclNpZGUuQ2hlY2tpbih7XG4gIG1heENsaWVudHM6IDEwMCwgLy8gd2UgYWNjZXB0IGEgbWF4aW11bSBvZiAxMDAgY2xpZW50c1xufSk7XG52YXIgcGVyZm9ybWFuY2UgPSBuZXcgTXlQZXJmb3JtYW5jZSgpO1xuXG4vLyBNYXAgdGhlIHNlcnZlciBtb2R1bGVzIHRvIHRoZSAncGxheWVyJyBjbGllbnQgdHlwZSAoYW5kIHJvb3QgVVJMKVxuc2VydmVyLm1hcCgncGxheWVyJywgY2hlY2tpbiwgcGVyZm9ybWFuY2UpO1xuXG4vLyBNYXAgdGhlIHNlcnZlciBtb2R1bGVzIHRvIHRoZSBvdGhlciBjbGllbnQgdHlwZXMgKGFuZCBjb3JyZXNwb25kaW5nIC9jbGllbnRUeXBlIFVSTHMpXG4vLyBzZXJ2ZXIubWFwKCdlbnYnLCBhdWRpb1BlcmZvcm1hbmNlKTtcbi8vIHNlcnZlci5tYXAoJ2NvbmR1Y3RvcicsIGNvbnRyb2wsIGNvbmR1Y3RvclBlcmZvcm1hbmNlKTtcbiJdfQ==