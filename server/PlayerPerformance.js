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
      // Send a message to all the other clients of the same type
      this.broadcast(client.clientType, client, 'play');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O2dDQUNrQyxtQkFBbUI7Ozs7OztJQUtoQyxpQkFBaUI7WUFBakIsaUJBQWlCOzs7Ozs7QUFJekIsV0FKUSxpQkFBaUIsR0FJVjtRQUFkLE9BQU8seURBQUcsRUFBRTs7MEJBSkwsaUJBQWlCOztBQUtsQywrQkFMaUIsaUJBQWlCLDZDQUs1QixPQUFPLEVBQUU7R0FDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFOa0IsaUJBQWlCOztXQWlDL0IsZUFBQyxNQUFNLEVBQUU7QUFDWixpQ0FsQ2lCLGlCQUFpQix1Q0FrQ3RCLE1BQU0sRUFBRTs7QUFFcEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNuRDs7Ozs7Ozs7Ozs7OztTQXJDa0IsaUJBQWlCOzs7cUJBQWpCLGlCQUFpQiIsImZpbGUiOiJzcmMvc2VydmVyL1BsYXllclBlcmZvcm1hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbW9kdWxlcyAoc2VydmVyIHNpZGUpXG5pbXBvcnQgeyBTZXJ2ZXJQZXJmb3JtYW5jZSB9IGZyb20gJ3NvdW5kd29ya3Mvc2VydmVyJztcblxuLyoqXG4gKiAnYHBsYXllcmAnIHBlcmZvcm1hbmNlIG1vZHVsZSAoc2VydmVyIHNpZGUpLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJQZXJmb3JtYW5jZSBleHRlbmRzIFNlcnZlclBlcmZvcm1hbmNlIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yLCB0byBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBjb25uZWN0cyB0byB0aGUgc2VydmVyLFxuICAgKiB3cml0ZSBpdCBpbiB0aGUgYGNvbm5lY3RgIG1ldGhvZC5cbiAgICovXG4gIC8vIGNvbm5lY3QoY2xpZW50KSB7XG4gIC8vICAgc3VwZXIuY29ubmVjdChjbGllbnQpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuICAvL1xuICAvLyAgIC4uLiAvLyB5b3VyIGNvZGVcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBkaXNjb25uZWN0cyBmcm9tIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSBgZGlzY29ubmVjdGAgbWV0aG9kLlxuICAgKi9cbiAgLy8gZGlzY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5kaXNjb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGVudGVycyB0aGUgcGVyZm9ybWFuY2UgKCppLmUuKlxuICAgKiBzdGFydHMgdGhlIHBlcmZvcm1hbmNlIG1vZHVsZSBvbiB0aGUgY2xpZW50IHNpZGUpLCB3cml0ZSBpdCBpbiB0aGUgYGVudGVyYFxuICAgKiBtZXRob2QuXG4gICAqL1xuICBlbnRlcihjbGllbnQpIHtcbiAgICBzdXBlci5lbnRlcihjbGllbnQpO1xuICAgIC8vIFNlbmQgYSBtZXNzYWdlIHRvIGFsbCB0aGUgb3RoZXIgY2xpZW50cyBvZiB0aGUgc2FtZSB0eXBlXG4gICAgdGhpcy5icm9hZGNhc3QoY2xpZW50LmNsaWVudFR5cGUsIGNsaWVudCwgJ3BsYXknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBsZWF2ZXMgdGhlIHBlcmZvcm1hbmNlLFxuICAgKiB3cml0ZSBpdCBpbiB0aGUgJ2V4aXQnIG1ldGhvZC5cbiAgICovXG4gIC8vIGV4aXQoY2xpZW50KSB7XG4gIC8vICAgc3VwZXIuZXhpdChjbGllbnQpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuICAvL1xuICAvLyAgIC4uLiAvLyB5b3VyIGNvZGVcbiAgLy8gfVxufVxuIl19