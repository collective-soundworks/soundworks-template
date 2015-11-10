'use strict'

// Require the Soundworks library (server side)
;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverSide = require('soundworks')('server');
var server = serverSide.server;

// Setup the Express app
var express = require('express');
var app = express();

// Start the server with a given public directory and port
var path = require('path');
var dir = path.join(__dirname, '../../public');

server.start(app, dir, 3000);

// Performance module

var MyPerformance = (function (_serverSide$Performan) {
  (0, _inherits3.default)(MyPerformance, _serverSide$Performan);

  function MyPerformance() {
    (0, _classCallCheck3.default)(this, MyPerformance);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(MyPerformance).call(this));
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

  (0, _createClass3.default)(MyPerformance, [{
    key: 'enter',
    value: function enter(client) {
      (0, _get3.default)(Object.getPrototypeOf(MyPerformance.prototype), 'enter', this).call(this, client);
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

// Instantiate of the modules

var checkin = new serverSide.Checkin({
  maxClients: 100 });
// we accept a maximum of 100 clients
var performance = new MyPerformance();

// Map the server modules to the 'player' client type (and root URL)
server.map('player', checkin, performance);

// Map the server modules to the other client types (and corresponding /clientType URLs)
// server.map('env', audioPerformance);
// server.map('conductor', control, conductorPerformance);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHYixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakQsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU07OztBQUFDLEFBRy9CLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUU7OztBQUFDLEFBR3BCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQzs7QUFFL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQzs7O0FBQUM7SUFHdkIsYUFBYTswQkFBYixhQUFhOztBQUNqQixXQURJLGFBQWEsR0FDSDt3Q0FEVixhQUFhO2dGQUFiLGFBQWE7R0FHaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7NkJBSEcsYUFBYTs7MEJBMEJYLE1BQU0sRUFBRTtBQUNaLCtDQTNCRSxhQUFhLHVDQTJCSCxNQUFNLEVBQUU7QUFDcEIsWUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztBQUFDLEtBQ3RDOzs7Ozs7Ozs7Ozs7U0E3QkcsYUFBYTtHQUFTLFVBQVUsQ0FBQyxXQUFXOzs7O0FBMENsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUM7QUFDbkMsWUFBVSxFQUFFLEdBQUcsRUFDaEIsQ0FBQyxDQUFDOztBQUNILElBQUksV0FBVyxHQUFHLElBQUksYUFBYSxFQUFFOzs7QUFBQyxBQUd0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDOzs7OztBQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBSZXF1aXJlIHRoZSBTb3VuZHdvcmtzIGxpYnJhcnkgKHNlcnZlciBzaWRlKVxudmFyIHNlcnZlclNpZGUgPSByZXF1aXJlKCdzb3VuZHdvcmtzJykoJ3NlcnZlcicpO1xudmFyIHNlcnZlciA9IHNlcnZlclNpZGUuc2VydmVyO1xuXG4vLyBTZXR1cCB0aGUgRXhwcmVzcyBhcHBcbnZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xudmFyIGFwcCA9IGV4cHJlc3MoKTtcblxuLy8gU3RhcnQgdGhlIHNlcnZlciB3aXRoIGEgZ2l2ZW4gcHVibGljIGRpcmVjdG9yeSBhbmQgcG9ydFxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG52YXIgZGlyID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL3B1YmxpYycpO1xuXG5zZXJ2ZXIuc3RhcnQoYXBwLCBkaXIsIDMwMDApO1xuXG4vLyBQZXJmb3JtYW5jZSBtb2R1bGVcbmNsYXNzIE15UGVyZm9ybWFuY2UgZXh0ZW5kcyBzZXJ2ZXJTaWRlLlBlcmZvcm1hbmNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGNvbm5lY3RzIHRvIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSAnY29ubmVjdCcgbWV0aG9kLlxuICAgKi9cbiAgLy8gY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5jb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG5cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cblxuICAvKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBkaXNjb25uZWN0cyBmcm9tIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSAnZGlzY29ubmVjdCcgbWV0aG9kLlxuICAgKi9cbiAgLy8gZGlzY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5kaXNjb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG5cbiAgLyogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgc3RhcnRzIHRoZSBwZXJmb3JtYW5jZSxcbiAgICogd3JpdGUgaXQgaW4gdGhlICdlbnRlcicgbWV0aG9kLlxuICAgKi9cbiAgZW50ZXIoY2xpZW50KSB7XG4gICAgc3VwZXIuZW50ZXIoY2xpZW50KTtcbiAgICBjbGllbnQuYnJvYWRjYXN0KCdwZXJmb3JtYW5jZTpwbGF5Jyk7IC8vIHNlbmQgJ3BsYXknIHRvIGFsbCB0aGUgb3RoZXIgY2xpZW50c1xuICB9XG5cbiAgLyogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgbGVhdmVzIHRoZSBwZXJmb3JtYW5jZSxcbiAgICogd3JpdGUgaXQgaW4gdGhlICdleGl0JyBtZXRob2QuXG4gICAqL1xuICAvLyBleGl0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmV4aXQoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy9cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cbn1cblxuLy8gSW5zdGFudGlhdGUgb2YgdGhlIG1vZHVsZXNcbnZhciBjaGVja2luID0gbmV3IHNlcnZlclNpZGUuQ2hlY2tpbih7XG4gIG1heENsaWVudHM6IDEwMCwgLy8gd2UgYWNjZXB0IGEgbWF4aW11bSBvZiAxMDAgY2xpZW50c1xufSk7XG52YXIgcGVyZm9ybWFuY2UgPSBuZXcgTXlQZXJmb3JtYW5jZSgpO1xuXG4vLyBNYXAgdGhlIHNlcnZlciBtb2R1bGVzIHRvIHRoZSAncGxheWVyJyBjbGllbnQgdHlwZSAoYW5kIHJvb3QgVVJMKVxuc2VydmVyLm1hcCgncGxheWVyJywgY2hlY2tpbiwgcGVyZm9ybWFuY2UpO1xuXG4vLyBNYXAgdGhlIHNlcnZlciBtb2R1bGVzIHRvIHRoZSBvdGhlciBjbGllbnQgdHlwZXMgKGFuZCBjb3JyZXNwb25kaW5nIC9jbGllbnRUeXBlIFVSTHMpXG4vLyBzZXJ2ZXIubWFwKCdlbnYnLCBhdWRpb1BlcmZvcm1hbmNlKTtcbi8vIHNlcnZlci5tYXAoJ2NvbmR1Y3RvcicsIGNvbnRyb2wsIGNvbmR1Y3RvclBlcmZvcm1hbmNlKTtcbiJdfQ==