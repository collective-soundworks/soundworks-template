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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O2dDQUNrQyxtQkFBbUI7Ozs7OztJQUtoQyxpQkFBaUI7WUFBakIsaUJBQWlCOzs7Ozs7QUFJekIsV0FKUSxpQkFBaUIsR0FJVjtRQUFkLE9BQU8seURBQUcsRUFBRTs7MEJBSkwsaUJBQWlCOztBQUtsQywrQkFMaUIsaUJBQWlCLDZDQUs1QixPQUFPLEVBQUU7R0FDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFOa0IsaUJBQWlCOztXQWlDL0IsZUFBQyxNQUFNLEVBQUU7QUFDWixpQ0FsQ2lCLGlCQUFpQix1Q0FrQ3RCLE1BQU0sRUFBRTs7O0FBR3BCLFVBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7Ozs7Ozs7U0F0Q2tCLGlCQUFpQjs7O3FCQUFqQixpQkFBaUIiLCJmaWxlIjoic3JjL3NlcnZlci9QbGF5ZXJQZXJmb3JtYW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBTb3VuZHdvcmtzIG1vZHVsZXMgKHNlcnZlciBzaWRlKVxuaW1wb3J0IHsgU2VydmVyUGVyZm9ybWFuY2UgfSBmcm9tICdzb3VuZHdvcmtzL3NlcnZlcic7XG5cbi8qKlxuICogJ2BwbGF5ZXJgJyBwZXJmb3JtYW5jZSBtb2R1bGUgKHNlcnZlciBzaWRlKS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyUGVyZm9ybWFuY2UgZXh0ZW5kcyBTZXJ2ZXJQZXJmb3JtYW5jZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciwgdG8gaW5zdGFudGlhdGUgdGhlIGNsYXNzLlxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgY29ubmVjdHMgdG8gdGhlIHNlcnZlcixcbiAgICogd3JpdGUgaXQgaW4gdGhlIGBjb25uZWN0YCBtZXRob2QuXG4gICAqL1xuICAvLyBjb25uZWN0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmNvbm5lY3QoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy9cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgZGlzY29ubmVjdHMgZnJvbSB0aGUgc2VydmVyLFxuICAgKiB3cml0ZSBpdCBpbiB0aGUgYGRpc2Nvbm5lY3RgIG1ldGhvZC5cbiAgICovXG4gIC8vIGRpc2Nvbm5lY3QoY2xpZW50KSB7XG4gIC8vICAgc3VwZXIuZGlzY29ubmVjdChjbGllbnQpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuICAvL1xuICAvLyAgIC4uLiAvLyB5b3VyIGNvZGVcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBlbnRlcnMgdGhlIHBlcmZvcm1hbmNlICgqaS5lLipcbiAgICogc3RhcnRzIHRoZSBwZXJmb3JtYW5jZSBtb2R1bGUgb24gdGhlIGNsaWVudCBzaWRlKSwgd3JpdGUgaXQgaW4gdGhlIGBlbnRlcmBcbiAgICogbWV0aG9kLlxuICAgKi9cbiAgZW50ZXIoY2xpZW50KSB7XG4gICAgc3VwZXIuZW50ZXIoY2xpZW50KTtcblxuICAgIC8vIFNlbmQgYSBtZXNzYWdlIHRvIGFsbCB0aGUgb3RoZXIgY2xpZW50cyBvZiB0aGUgc2FtZSB0eXBlXG4gICAgdGhpcy5icm9hZGNhc3QoY2xpZW50LmNsaWVudFR5cGUsIGNsaWVudCwgJ3BsYXknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBsZWF2ZXMgdGhlIHBlcmZvcm1hbmNlLFxuICAgKiB3cml0ZSBpdCBpbiB0aGUgJ2V4aXQnIG1ldGhvZC5cbiAgICovXG4gIC8vIGV4aXQoY2xpZW50KSB7XG4gIC8vICAgc3VwZXIuZXhpdChjbGllbnQpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuICAvL1xuICAvLyAgIC4uLiAvLyB5b3VyIGNvZGVcbiAgLy8gfVxufVxuIl19