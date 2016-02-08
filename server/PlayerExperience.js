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

  function PlayerExperience() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PlayerExperience);

    _get(Object.getPrototypeOf(PlayerExperience.prototype), 'constructor', this).call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYXR1c3pld3NraS9kZXYvY29zaW1hL2xpYi9zb3VuZHdvcmtzLXRlbXBsYXRlL3NyYy9zZXJ2ZXIvUGxheWVyRXhwZXJpZW5jZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Z0NBQ2lDLG1CQUFtQjs7Ozs7O0lBSy9CLGdCQUFnQjtZQUFoQixnQkFBZ0I7Ozs7OztBQUl4QixXQUpRLGdCQUFnQixHQUlUO1FBQWQsT0FBTyx5REFBRyxFQUFFOzswQkFKTCxnQkFBZ0I7O0FBS2pDLCtCQUxpQixnQkFBZ0IsNkNBS3pCO0dBQ1Q7Ozs7Ozs7O2VBTmtCLGdCQUFnQjs7V0FhOUIsZUFBQyxNQUFNLEVBQUU7QUFDWixpQ0FkaUIsZ0JBQWdCLHVDQWNyQixNQUFNLEVBQUU7O0FBRXBCLFVBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDN0M7OztXQUVHLGNBQUMsTUFBTSxFQUFFO0FBQ1gsaUNBcEJpQixnQkFBZ0Isc0NBb0J0QixNQUFNLEVBQUU7O0tBRXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXRCa0IsZ0JBQWdCOzs7cUJBQWhCLGdCQUFnQiIsImZpbGUiOiIvVXNlcnMvbWF0dXN6ZXdza2kvZGV2L2Nvc2ltYS9saWIvc291bmR3b3Jrcy10ZW1wbGF0ZS9zcmMvc2VydmVyL1BsYXllckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBtb2R1bGVzIChzZXJ2ZXIgc2lkZSlcbmltcG9ydCB7IFNlcnZlckV4cGVyaWVuY2UgfSBmcm9tICdzb3VuZHdvcmtzL3NlcnZlcic7XG5cbi8qKlxuICogJ2BwbGF5ZXJgJyBwZXJmb3JtYW5jZSBtb2R1bGUgKHNlcnZlciBzaWRlKS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyRXhwZXJpZW5jZSBleHRlbmRzIFNlcnZlckV4cGVyaWVuY2Uge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IsIHRvIGluc3RhbnRpYXRlIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgZW50ZXJzIHRoZSBwZXJmb3JtYW5jZSAoKmkuZS4qXG4gICAqIHN0YXJ0cyB0aGUgcGVyZm9ybWFuY2UgbW9kdWxlIG9uIHRoZSBjbGllbnQgc2lkZSksIHdyaXRlIGl0IGluIHRoZSBgZW50ZXJgXG4gICAqIG1ldGhvZC5cbiAgICovXG4gIGVudGVyKGNsaWVudCkge1xuICAgIHN1cGVyLmVudGVyKGNsaWVudCk7XG4gICAgLy8gU2VuZCBhIG1lc3NhZ2UgdG8gYWxsIHRoZSBvdGhlciBjbGllbnRzIG9mIHRoZSBzYW1lIHR5cGVcbiAgICB0aGlzLmJyb2FkY2FzdChjbGllbnQudHlwZSwgY2xpZW50LCAncGxheScpO1xuICB9XG5cbiAgZXhpdChjbGllbnQpIHtcbiAgICBzdXBlci5leGl0KGNsaWVudCk7XG4gICAgLy8gLi4uXG4gIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgY29ubmVjdHMgdG8gdGhlIHNlcnZlcixcbiAgICogd3JpdGUgaXQgaW4gdGhlIGBjb25uZWN0YCBtZXRob2QuXG4gICAqL1xuICAvLyBjb25uZWN0KGNsaWVudCkge1xuICAvLyAgIHN1cGVyLmNvbm5lY3QoY2xpZW50KTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcbiAgLy9cbiAgLy8gICAuLi4gLy8geW91ciBjb2RlXG4gIC8vIH1cblxuICAvKipcbiAgICogSWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgZGlzY29ubmVjdHMgZnJvbSB0aGUgc2VydmVyLFxuICAgKiB3cml0ZSBpdCBpbiB0aGUgYGRpc2Nvbm5lY3RgIG1ldGhvZC5cbiAgICovXG4gIC8vIGRpc2Nvbm5lY3QoY2xpZW50KSB7XG4gIC8vICAgc3VwZXIuZGlzY29ubmVjdChjbGllbnQpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuICAvL1xuICAvLyAgIC4uLiAvLyB5b3VyIGNvZGVcbiAgLy8gfVxufVxuIl19