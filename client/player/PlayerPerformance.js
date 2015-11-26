// Import Soundworks library (client side)
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _soundworksClient = require('soundworks/client');

/**
 * '`player`' performance module (client side).
 * This performance plays a sound when it starts, and plays another sound when
 * other clients join the performance.
 */

var PlayerPerformance = (function (_Performance) {
  _inherits(PlayerPerformance, _Performance);

  function PlayerPerformance(loader) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, PlayerPerformance);

    _get(Object.getPrototypeOf(PlayerPerformance.prototype), 'constructor', this).call(this, options);

    this._loader = loader; // the loader module
  }

  _createClass(PlayerPerformance, [{
    key: 'start',
    value: function start() {
      var _this = this;

      _get(Object.getPrototypeOf(PlayerPerformance.prototype), 'start', this).call(this); // don't forget this

      // Play the welcome sound immediately
      var src = _soundworksClient.audioContext.createBufferSource();
      src.buffer = this._loader.buffers[0]; // get first buffer from loader
      src.connect(_soundworksClient.audioContext.destination);
      src.start(_soundworksClient.audioContext.currentTime);

      // Play another sound when we receive a message from the server (that
      // indicates that another client joined the performance)
      _soundworksClient.client.receive('performance:play', function () {
        var src = _soundworksClient.audioContext.createBufferSource();
        src.buffer = _this._loader.buffers[1]; // get second buffer from loader
        src.connect(_soundworksClient.audioContext.destination);
        src.start(_soundworksClient.audioContext.currentTime);
      });

      // Display some feedback text in the view
      this.setCenteredViewContent('Let’s go!');

      // We would usually call the 'done' method when the module can hand over the
      // control to subsequent modules, however since the performance is the last
      // module to be called in this scenario, we don't need it here.
      // this.done();
    }
  }]);

  return PlayerPerformance;
})(_soundworksClient.Performance);

exports['default'] = PlayerPerformance;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztnQ0FDa0QsbUJBQW1COzs7Ozs7OztJQU9oRCxpQkFBaUI7WUFBakIsaUJBQWlCOztBQUN6QixXQURRLGlCQUFpQixDQUN4QixNQUFNLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOzswQkFEYixpQkFBaUI7O0FBRWxDLCtCQUZpQixpQkFBaUIsNkNBRTVCLE9BQU8sRUFBRTs7QUFFZixRQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztHQUN2Qjs7ZUFMa0IsaUJBQWlCOztXQU8vQixpQkFBRzs7O0FBQ04saUNBUmlCLGlCQUFpQix1Q0FRcEI7OztBQUdkLFVBQUksR0FBRyxHQUFHLCtCQUFhLGtCQUFrQixFQUFFLENBQUM7QUFDNUMsU0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxTQUFHLENBQUMsT0FBTyxDQUFDLCtCQUFhLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLFNBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQWEsV0FBVyxDQUFDLENBQUM7Ozs7QUFJcEMsK0JBQU8sT0FBTyxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDdkMsWUFBSSxHQUFHLEdBQUcsK0JBQWEsa0JBQWtCLEVBQUUsQ0FBQztBQUM1QyxXQUFHLENBQUMsTUFBTSxHQUFHLE1BQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxXQUFHLENBQUMsT0FBTyxDQUFDLCtCQUFhLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLFdBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQWEsV0FBVyxDQUFDLENBQUM7T0FDckMsQ0FBQyxDQUFDOzs7QUFHSCxVQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7OztLQU0xQzs7O1NBaENrQixpQkFBaUI7OztxQkFBakIsaUJBQWlCIiwiZmlsZSI6InNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbGlicmFyeSAoY2xpZW50IHNpZGUpXG5pbXBvcnQgeyBjbGllbnQsIGF1ZGlvQ29udGV4dCwgUGVyZm9ybWFuY2UgfSBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbi8qKlxuICogJ2BwbGF5ZXJgJyBwZXJmb3JtYW5jZSBtb2R1bGUgKGNsaWVudCBzaWRlKS5cbiAqIFRoaXMgcGVyZm9ybWFuY2UgcGxheXMgYSBzb3VuZCB3aGVuIGl0IHN0YXJ0cywgYW5kIHBsYXlzIGFub3RoZXIgc291bmQgd2hlblxuICogb3RoZXIgY2xpZW50cyBqb2luIHRoZSBwZXJmb3JtYW5jZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyUGVyZm9ybWFuY2UgZXh0ZW5kcyBQZXJmb3JtYW5jZSB7XG4gIGNvbnN0cnVjdG9yKGxvYWRlciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLl9sb2FkZXIgPSBsb2FkZXI7IC8vIHRoZSBsb2FkZXIgbW9kdWxlXG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuXG4gICAgLy8gUGxheSB0aGUgd2VsY29tZSBzb3VuZCBpbW1lZGlhdGVseVxuICAgIGxldCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgc3JjLmJ1ZmZlciA9IHRoaXMuX2xvYWRlci5idWZmZXJzWzBdOyAvLyBnZXQgZmlyc3QgYnVmZmVyIGZyb20gbG9hZGVyXG4gICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcblxuICAgIC8vIFBsYXkgYW5vdGhlciBzb3VuZCB3aGVuIHdlIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciAodGhhdFxuICAgIC8vIGluZGljYXRlcyB0aGF0IGFub3RoZXIgY2xpZW50IGpvaW5lZCB0aGUgcGVyZm9ybWFuY2UpXG4gICAgY2xpZW50LnJlY2VpdmUoJ3BlcmZvcm1hbmNlOnBsYXknLCAoKSA9PiB7XG4gICAgICBsZXQgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMuX2xvYWRlci5idWZmZXJzWzFdOyAvLyBnZXQgc2Vjb25kIGJ1ZmZlciBmcm9tIGxvYWRlclxuICAgICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuICAgIH0pO1xuXG4gICAgLy8gRGlzcGxheSBzb21lIGZlZWRiYWNrIHRleHQgaW4gdGhlIHZpZXdcbiAgICB0aGlzLnNldENlbnRlcmVkVmlld0NvbnRlbnQoJ0xldOKAmXMgZ28hJyk7XG5cbiAgICAvLyBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlIGNhbiBoYW5kIG92ZXIgdGhlXG4gICAgLy8gY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsIGhvd2V2ZXIgc2luY2UgdGhlIHBlcmZvcm1hbmNlIGlzIHRoZSBsYXN0XG4gICAgLy8gbW9kdWxlIHRvIGJlIGNhbGxlZCBpbiB0aGlzIHNjZW5hcmlvLCB3ZSBkb24ndCBuZWVkIGl0IGhlcmUuXG4gICAgLy8gdGhpcy5kb25lKCk7XG4gIH1cbn1cbiJdfQ==