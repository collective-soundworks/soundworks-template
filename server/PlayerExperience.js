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

var PlayerExperience = (function (_ServerExperience) {
  _inherits(PlayerExperience, _ServerExperience);

  /**
   * Constructor, to instantiate the class.
   */

  function PlayerExperience(clientType) {
    _classCallCheck(this, PlayerExperience);

    _get(Object.getPrototypeOf(PlayerExperience.prototype), 'constructor', this).call(this, clientType);

    this.checkin = this.require('checkin');
  }

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
      // ...
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
  }]);

  return PlayerExperience;
})(_soundworksServer.ServerExperience);

exports['default'] = PlayerExperience;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvUGxheWVyRXhwZXJpZW5jZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Z0NBQ2lDLG1CQUFtQjs7Ozs7O0lBSy9CLGdCQUFnQjtZQUFoQixnQkFBZ0I7Ozs7OztBQUl4QixXQUpRLGdCQUFnQixDQUl2QixVQUFVLEVBQUU7MEJBSkwsZ0JBQWdCOztBQUtqQywrQkFMaUIsZ0JBQWdCLDZDQUszQixVQUFVLEVBQUU7O0FBRWxCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztHQUN4Qzs7Ozs7Ozs7ZUFSa0IsZ0JBQWdCOztXQWU5QixlQUFDLE1BQU0sRUFBRTtBQUNaLGlDQWhCaUIsZ0JBQWdCLHVDQWdCckIsTUFBTSxFQUFFOztBQUVwQixVQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzdDOzs7V0FFRyxjQUFDLE1BQU0sRUFBRTtBQUNYLGlDQXRCaUIsZ0JBQWdCLHNDQXNCdEIsTUFBTSxFQUFFOztLQUVwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0F4QmtCLGdCQUFnQjs7O3FCQUFoQixnQkFBZ0IiLCJmaWxlIjoic3JjL3NlcnZlci9QbGF5ZXJFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbW9kdWxlcyAoc2VydmVyIHNpZGUpXG5pbXBvcnQgeyBTZXJ2ZXJFeHBlcmllbmNlIH0gZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuXG4vKipcbiAqICdgcGxheWVyYCcgcGVyZm9ybWFuY2UgbW9kdWxlIChzZXJ2ZXIgc2lkZSkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckV4cGVyaWVuY2UgZXh0ZW5kcyBTZXJ2ZXJFeHBlcmllbmNlIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yLCB0byBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjbGllbnRUeXBlKSB7XG4gICAgc3VwZXIoY2xpZW50VHlwZSk7XG5cbiAgICB0aGlzLmNoZWNraW4gPSB0aGlzLnJlcXVpcmUoJ2NoZWNraW4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBlbnRlcnMgdGhlIHBlcmZvcm1hbmNlICgqaS5lLipcbiAgICogc3RhcnRzIHRoZSBwZXJmb3JtYW5jZSBtb2R1bGUgb24gdGhlIGNsaWVudCBzaWRlKSwgd3JpdGUgaXQgaW4gdGhlIGBlbnRlcmBcbiAgICogbWV0aG9kLlxuICAgKi9cbiAgZW50ZXIoY2xpZW50KSB7XG4gICAgc3VwZXIuZW50ZXIoY2xpZW50KTtcbiAgICAvLyBTZW5kIGEgbWVzc2FnZSB0byBhbGwgdGhlIG90aGVyIGNsaWVudHMgb2YgdGhlIHNhbWUgdHlwZVxuICAgIHRoaXMuYnJvYWRjYXN0KGNsaWVudC50eXBlLCBjbGllbnQsICdwbGF5Jyk7XG4gIH1cblxuICBleGl0KGNsaWVudCkge1xuICAgIHN1cGVyLmV4aXQoY2xpZW50KTtcbiAgICAvLyAuLi5cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBjb25uZWN0cyB0byB0aGUgc2VydmVyLFxuICAgKiB3cml0ZSBpdCBpbiB0aGUgYGNvbm5lY3RgIG1ldGhvZC5cbiAgICovXG4gIC8vIGNvbm5lY3QoY2xpZW50KSB7XG4gIC8vICAgc3VwZXIuY29ubmVjdChjbGllbnQpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuICAvL1xuICAvLyAgIC4uLiAvLyB5b3VyIGNvZGVcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBJZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBkaXNjb25uZWN0cyBmcm9tIHRoZSBzZXJ2ZXIsXG4gICAqIHdyaXRlIGl0IGluIHRoZSBgZGlzY29ubmVjdGAgbWV0aG9kLlxuICAgKi9cbiAgLy8gZGlzY29ubmVjdChjbGllbnQpIHtcbiAgLy8gICBzdXBlci5kaXNjb25uZWN0KGNsaWVudCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG4gIC8vXG4gIC8vICAgLi4uIC8vIHlvdXIgY29kZVxuICAvLyB9XG59XG4iXX0=