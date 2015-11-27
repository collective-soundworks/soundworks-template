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

var PlayerPerformance = (function (_Performance) {
  _inherits(PlayerPerformance, _Performance);

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
      client.broadcast('performance:play');
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
})(_soundworksServer.Performance);

exports['default'] = PlayerPerformance;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yb2JpL0Rldi9jb2xsZWN0aXZlLXNvdW5kd29ya3MtZGV2ZWxvcC90ZW1wbGF0ZS9zcmMvc2VydmVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztnQ0FDNEIsbUJBQW1COzs7Ozs7SUFLMUIsaUJBQWlCO1lBQWpCLGlCQUFpQjs7Ozs7O0FBSXpCLFdBSlEsaUJBQWlCLEdBSVY7UUFBZCxPQUFPLHlEQUFHLEVBQUU7OzBCQUpMLGlCQUFpQjs7QUFLbEMsK0JBTGlCLGlCQUFpQiw2Q0FLNUIsT0FBTyxFQUFFO0dBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBTmtCLGlCQUFpQjs7V0FpQy9CLGVBQUMsTUFBTSxFQUFFO0FBQ1osaUNBbENpQixpQkFBaUIsdUNBa0N0QixNQUFNLEVBQUU7OztBQUdwQixZQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDdEM7Ozs7Ozs7Ozs7Ozs7U0F0Q2tCLGlCQUFpQjs7O3FCQUFqQixpQkFBaUIiLCJmaWxlIjoiL1VzZXJzL3JvYmkvRGV2L2NvbGxlY3RpdmUtc291bmR3b3Jrcy1kZXZlbG9wL3RlbXBsYXRlL3NyYy9zZXJ2ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBtb2R1bGVzIChzZXJ2ZXIgc2lkZSlcbmltcG9ydCB7IFBlcmZvcm1hbmNlIH0gZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuXG4vKipcbiAqICdgcGxheWVyYCcgcGVyZm9ybWFuY2UgbW9kdWxlIChzZXJ2ZXIgc2lkZSkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllclBlcmZvcm1hbmNlIGV4dGVuZHMgUGVyZm9ybWFuY2Uge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IsIHRvIGluc3RhbnRpYXRlIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGNvbm5lY3RzIHRvIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSBgY29ubmVjdGAgbWV0aG9kLlxuICAgKi9cbiAgLy8gY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5jb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGRpc2Nvbm5lY3RzIGZyb20gdGhlIHNlcnZlcixcbiAgICogd3JpdGUgaXQgaW4gdGhlIGBkaXNjb25uZWN0YCBtZXRob2QuXG4gICAqL1xuICAvLyBkaXNjb25uZWN0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmRpc2Nvbm5lY3QoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy9cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgZW50ZXJzIHRoZSBwZXJmb3JtYW5jZSAoKmkuZS4qXG4gICAqIHN0YXJ0cyB0aGUgcGVyZm9ybWFuY2UgbW9kdWxlIG9uIHRoZSBjbGllbnQgc2lkZSksIHdyaXRlIGl0IGluIHRoZSBgZW50ZXJgXG4gICAqIG1ldGhvZC5cbiAgICovXG4gIGVudGVyKGNsaWVudCkge1xuICAgIHN1cGVyLmVudGVyKGNsaWVudCk7XG5cbiAgICAvLyBTZW5kIGEgbWVzc2FnZSB0byBhbGwgdGhlIG90aGVyIGNsaWVudHNcbiAgICBjbGllbnQuYnJvYWRjYXN0KCdwZXJmb3JtYW5jZTpwbGF5Jyk7XG4gIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgbGVhdmVzIHRoZSBwZXJmb3JtYW5jZSxcbiAgICogd3JpdGUgaXQgaW4gdGhlICdleGl0JyBtZXRob2QuXG4gICAqL1xuICAvLyBleGl0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmV4aXQoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy9cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cbn1cbiJdfQ==