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

var PlayerExperience = (function (_Pier) {
  _inherits(PlayerExperience, _Pier);

  /**
   * Constructor, to instantiate the class.
   */

  function PlayerExperience() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PlayerExperience);

    _get(Object.getPrototypeOf(PlayerExperience.prototype), 'constructor', this).call(this, options);
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

  _createClass(PlayerExperience, [{
    key: 'enter',
    value: function enter(client) {
      _get(Object.getPrototypeOf(PlayerExperience.prototype), 'enter', this).call(this, client);
      // Send a message to all the other clients of the same type
      this.broadcast(client.type, client, 'play');
    }
  }, {
    key: 'exit',
    value: function exit(client) {
      _get(Object.getPrototypeOf(PlayerExperience.prototype), 'exit', this).call(this, client);
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

  return PlayerExperience;
})(_soundworksServer.Pier);

exports['default'] = PlayerExperience;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O2dDQUNxQixtQkFBbUI7Ozs7OztJQUtuQixnQkFBZ0I7WUFBaEIsZ0JBQWdCOzs7Ozs7QUFJeEIsV0FKUSxnQkFBZ0IsR0FJVDtRQUFkLE9BQU8seURBQUcsRUFBRTs7MEJBSkwsZ0JBQWdCOztBQUtqQywrQkFMaUIsZ0JBQWdCLDZDQUszQixPQUFPLEVBQUU7R0FDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFOa0IsZ0JBQWdCOztXQWlDOUIsZUFBQyxNQUFNLEVBQUU7QUFDWixpQ0FsQ2lCLGdCQUFnQix1Q0FrQ3JCLE1BQU0sRUFBRTs7QUFFcEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3Qzs7O1dBRUcsY0FBQyxNQUFNLEVBQUU7QUFDWCxpQ0F4Q2lCLGdCQUFnQixzQ0F3Q3RCLE1BQU0sRUFBRTtLQUNwQjs7Ozs7Ozs7Ozs7OztTQXpDa0IsZ0JBQWdCOzs7cUJBQWhCLGdCQUFnQiIsImZpbGUiOiJzcmMvc2VydmVyL1BsYXllclBlcmZvcm1hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbW9kdWxlcyAoc2VydmVyIHNpZGUpXG5pbXBvcnQgeyBQaWVyIH0gZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuXG4vKipcbiAqICdgcGxheWVyYCcgcGVyZm9ybWFuY2UgbW9kdWxlIChzZXJ2ZXIgc2lkZSkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckV4cGVyaWVuY2UgZXh0ZW5kcyBQaWVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yLCB0byBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBjb25uZWN0cyB0byB0aGUgc2VydmVyLFxuICAgKiB3cml0ZSBpdCBpbiB0aGUgYGNvbm5lY3RgIG1ldGhvZC5cbiAgICovXG4gIC8vIGNvbm5lY3QoY2xpZW50KSB7XG4gIC8vICAgc3VwZXIuY29ubmVjdChjbGllbnQpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuICAvL1xuICAvLyAgIC4uLiAvLyB5b3VyIGNvZGVcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBkaXNjb25uZWN0cyBmcm9tIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSBgZGlzY29ubmVjdGAgbWV0aG9kLlxuICAgKi9cbiAgLy8gZGlzY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5kaXNjb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG5cbiAgLyoqXG4gICAqIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGVudGVycyB0aGUgcGVyZm9ybWFuY2UgKCppLmUuKlxuICAgKiBzdGFydHMgdGhlIHBlcmZvcm1hbmNlIG1vZHVsZSBvbiB0aGUgY2xpZW50IHNpZGUpLCB3cml0ZSBpdCBpbiB0aGUgYGVudGVyYFxuICAgKiBtZXRob2QuXG4gICAqL1xuICBlbnRlcihjbGllbnQpIHtcbiAgICBzdXBlci5lbnRlcihjbGllbnQpO1xuICAgIC8vIFNlbmQgYSBtZXNzYWdlIHRvIGFsbCB0aGUgb3RoZXIgY2xpZW50cyBvZiB0aGUgc2FtZSB0eXBlXG4gICAgdGhpcy5icm9hZGNhc3QoY2xpZW50LnR5cGUsIGNsaWVudCwgJ3BsYXknKTtcbiAgfVxuXG4gIGV4aXQoY2xpZW50KSB7XG4gICAgc3VwZXIuZXhpdChjbGllbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGFueXRoaW5nIG5lZWRzIHRvIGhhcHBlbiB3aGVuIGEgY2xpZW50IGxlYXZlcyB0aGUgcGVyZm9ybWFuY2UsXG4gICAqIHdyaXRlIGl0IGluIHRoZSAnZXhpdCcgbWV0aG9kLlxuICAgKi9cbiAgLy8gZXhpdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5leGl0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG59XG4iXX0=