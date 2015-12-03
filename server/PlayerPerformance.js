// Import Soundworks modules (server side)
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _soundworksServer = require('soundworks/server');

/**
 * '`player`' performance module (server side).
 */

var PlayerPerformance = (function (_ServerPerformance) {
  _inherits(PlayerPerformance, _ServerPerformance);

  /**
   * Constructor, to instantiate the class.
   */

  function PlayerPerformance() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PlayerPerformance);

    _get(Object.getPrototypeOf(PlayerPerformance.prototype), 'constructor', this).call(this, options);
  }

  /**
   * If anything needs to happen when a client connects to the server,
   * write it in the `connect` method.
   */
  // connect(client) {
  //   super.connect(client); // don't forget this
  //
  //   ... // your code
  // }

  /**
   * If anything needs to happen when a client disconnects from the server,
   * write it in the `disconnect` method.
   */
  // disconnect(client) {
  //   super.disconnect(client); // don't forget this
  //
  //   ... // your code
  // }

  /**
   * If anything needs to happen when a client enters the performance (*i.e.*
   * starts the performance module on the client side), write it in the `enter`
   * method.
   */

  _createClass(PlayerPerformance, [{
    key: 'enter',
    value: function enter(client) {
      _get(Object.getPrototypeOf(PlayerPerformance.prototype), 'enter', this).call(this, client);

      // Send a message to all the other clients
      this.sendPeers(client, 'play');
    }

    /**
     * If anything needs to happen when a client leaves the performance,
     * write it in the 'exit' method.
     */
    // exit(client) {
    //   super.exit(client); // don't forget this
    //
    //   ... // your code
    // }
  }]);

  return PlayerPerformance;
})(_soundworksServer.ServerPerformance);

exports['default'] = PlayerPerformance;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O2dDQUNrQyxtQkFBbUI7Ozs7OztJQUtoQyxpQkFBaUI7WUFBakIsaUJBQWlCOzs7Ozs7QUFJekIsV0FKUSxpQkFBaUIsR0FJVjtRQUFkLE9BQU8seURBQUcsRUFBRTs7MEJBSkwsaUJBQWlCOztBQUtsQywrQkFMaUIsaUJBQWlCLDZDQUs1QixPQUFPLEVBQUU7R0FDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFOa0IsaUJBQWlCOztXQWlDL0IsZUFBQyxNQUFNLEVBQUU7QUFDWixpQ0FsQ2lCLGlCQUFpQix1Q0FrQ3RCLE1BQU0sRUFBRTs7O0FBR3BCLFVBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hDOzs7Ozs7Ozs7Ozs7O1NBdENrQixpQkFBaUI7OztxQkFBakIsaUJBQWlCIiwiZmlsZSI6InNyYy9zZXJ2ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBtb2R1bGVzIChzZXJ2ZXIgc2lkZSlcbmltcG9ydCB7IFNlcnZlclBlcmZvcm1hbmNlIH0gZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuXG4vKipcbiAqICdgcGxheWVyYCcgcGVyZm9ybWFuY2UgbW9kdWxlIChzZXJ2ZXIgc2lkZSkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllclBlcmZvcm1hbmNlIGV4dGVuZHMgU2VydmVyUGVyZm9ybWFuY2Uge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IsIHRvIGluc3RhbnRpYXRlIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGNvbm5lY3RzIHRvIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSBgY29ubmVjdGAgbWV0aG9kLlxuICAgKi9cbiAgLy8gY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5jb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGRpc2Nvbm5lY3RzIGZyb20gdGhlIHNlcnZlcixcbiAgICogd3JpdGUgaXQgaW4gdGhlIGBkaXNjb25uZWN0YCBtZXRob2QuXG4gICAqL1xuICAvLyBkaXNjb25uZWN0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmRpc2Nvbm5lY3QoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy9cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgZW50ZXJzIHRoZSBwZXJmb3JtYW5jZSAoKmkuZS4qXG4gICAqIHN0YXJ0cyB0aGUgcGVyZm9ybWFuY2UgbW9kdWxlIG9uIHRoZSBjbGllbnQgc2lkZSksIHdyaXRlIGl0IGluIHRoZSBgZW50ZXJgXG4gICAqIG1ldGhvZC5cbiAgICovXG4gIGVudGVyKGNsaWVudCkge1xuICAgIHN1cGVyLmVudGVyKGNsaWVudCk7XG5cbiAgICAvLyBTZW5kIGEgbWVzc2FnZSB0byBhbGwgdGhlIG90aGVyIGNsaWVudHNcbiAgICB0aGlzLnNlbmRQZWVycyhjbGllbnQsICdwbGF5Jyk7XG4gIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgbGVhdmVzIHRoZSBwZXJmb3JtYW5jZSxcbiAgICogd3JpdGUgaXQgaW4gdGhlICdleGl0JyBtZXRob2QuXG4gICAqL1xuICAvLyBleGl0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmV4aXQoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy9cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cbn1cbiJdfQ==