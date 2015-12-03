// Require the Soundworks library (server side)
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var soundworks = require('soundworks/server');
var server = soundworks.server;

// Performance module

var MyPerformance = (function (_soundworks$ServerPerformance) {
  _inherits(MyPerformance, _soundworks$ServerPerformance);

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
  //   ... // your code
  // }

  /* If anything needs to happen when a client starts the performance,
   * write it in the 'enter' method.
   */

  _createClass(MyPerformance, [{
    key: 'enter',
    value: function enter(client) {
      _get(Object.getPrototypeOf(MyPerformance.prototype), 'enter', this).call(this, client);
      this.sendPeers(client, 'play'); // send 'play' to all the other clients
    }

    /* If anything needs to happen when a client leaves the performance,
     * write it in the 'exit' method.
     */
    // exit(client) {
    //   super.exit(client); // don't forget this
    //   ... // your code
    // }
  }]);

  return MyPerformance;
})(soundworks.ServerPerformance);

var checkin = new soundworks.ServerCheckin({
  maxClients: 100 });

// we accept a maximum of 100 clients
var performance = new MyPerformance();

server.start();
// Map the server modules to the 'player' client type (and root URL)
server.map('player', checkin, performance);

// Map the server modules to the other client types (and corresponding /clientType URLs)
// server.map('env', audioPerformance);
// server.map('conductor', control, conductorPerformance);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNoRCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDOzs7O0lBRzNCLGFBQWE7WUFBYixhQUFhOztBQUNOLFdBRFAsYUFBYSxHQUNIOzBCQURWLGFBQWE7O0FBRWYsK0JBRkUsYUFBYSw2Q0FFUDtHQUNUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFIRyxhQUFhOztXQXdCWixlQUFDLE1BQU0sRUFBRTtBQUNaLGlDQXpCRSxhQUFhLHVDQXlCSCxNQUFNLEVBQUU7QUFDcEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDaEM7Ozs7Ozs7Ozs7O1NBM0JHLGFBQWE7R0FBUyxVQUFVLENBQUMsaUJBQWlCOztBQXVDeEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDO0FBQzNDLFlBQVUsRUFBRSxHQUFHLEVBQ2hCLENBQUMsQ0FBQzs7O0FBRUgsSUFBTSxXQUFXLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQzs7QUFFeEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUVmLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyIsImZpbGUiOiJzcmMvc2VydmVyL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVxdWlyZSB0aGUgU291bmR3b3JrcyBsaWJyYXJ5IChzZXJ2ZXIgc2lkZSlcbmNvbnN0IHNvdW5kd29ya3MgPSByZXF1aXJlKCdzb3VuZHdvcmtzL3NlcnZlcicpO1xuY29uc3Qgc2VydmVyID0gc291bmR3b3Jrcy5zZXJ2ZXI7XG5cbi8vIFBlcmZvcm1hbmNlIG1vZHVsZVxuY2xhc3MgTXlQZXJmb3JtYW5jZSBleHRlbmRzIHNvdW5kd29ya3MuU2VydmVyUGVyZm9ybWFuY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgY29ubmVjdHMgdG8gdGhlIHNlcnZlcixcbiAgICogd3JpdGUgaXQgaW4gdGhlICdjb25uZWN0JyBtZXRob2QuXG4gICAqL1xuICAvLyBjb25uZWN0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmNvbm5lY3QoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cblxuICAvKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBkaXNjb25uZWN0cyBmcm9tIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSAnZGlzY29ubmVjdCcgbWV0aG9kLlxuICAgKi9cbiAgLy8gZGlzY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5kaXNjb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG5cbiAgLyogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgc3RhcnRzIHRoZSBwZXJmb3JtYW5jZSxcbiAgICogd3JpdGUgaXQgaW4gdGhlICdlbnRlcicgbWV0aG9kLlxuICAgKi9cbiAgZW50ZXIoY2xpZW50KSB7XG4gICAgc3VwZXIuZW50ZXIoY2xpZW50KTtcbiAgICB0aGlzLnNlbmRQZWVycyhjbGllbnQsICdwbGF5Jyk7IC8vIHNlbmQgJ3BsYXknIHRvIGFsbCB0aGUgb3RoZXIgY2xpZW50c1xuICB9XG5cbiAgLyogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgbGVhdmVzIHRoZSBwZXJmb3JtYW5jZSxcbiAgICogd3JpdGUgaXQgaW4gdGhlICdleGl0JyBtZXRob2QuXG4gICAqL1xuICAvLyBleGl0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmV4aXQoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cbn1cblxuLy8gSW5zdGFudGlhdGUgb2YgdGhlIG1vZHVsZXNcbmNvbnN0IGNoZWNraW4gPSBuZXcgc291bmR3b3Jrcy5TZXJ2ZXJDaGVja2luKHtcbiAgbWF4Q2xpZW50czogMTAwLCAvLyB3ZSBhY2NlcHQgYSBtYXhpbXVtIG9mIDEwMCBjbGllbnRzXG59KTtcblxuY29uc3QgcGVyZm9ybWFuY2UgPSBuZXcgTXlQZXJmb3JtYW5jZSgpO1xuXG5zZXJ2ZXIuc3RhcnQoKTtcbi8vIE1hcCB0aGUgc2VydmVyIG1vZHVsZXMgdG8gdGhlICdwbGF5ZXInIGNsaWVudCB0eXBlIChhbmQgcm9vdCBVUkwpXG5zZXJ2ZXIubWFwKCdwbGF5ZXInLCBjaGVja2luLCBwZXJmb3JtYW5jZSk7XG5cbi8vIE1hcCB0aGUgc2VydmVyIG1vZHVsZXMgdG8gdGhlIG90aGVyIGNsaWVudCB0eXBlcyAoYW5kIGNvcnJlc3BvbmRpbmcgL2NsaWVudFR5cGUgVVJMcylcbi8vIHNlcnZlci5tYXAoJ2VudicsIGF1ZGlvUGVyZm9ybWFuY2UpO1xuLy8gc2VydmVyLm1hcCgnY29uZHVjdG9yJywgY29udHJvbCwgY29uZHVjdG9yUGVyZm9ybWFuY2UpO1xuIl19