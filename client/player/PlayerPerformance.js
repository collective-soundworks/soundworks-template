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

var PlayerPerformance = (function (_ClientPerformance) {
  _inherits(PlayerPerformance, _ClientPerformance);

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
      this.receive('play', function () {
        var delay = Math.random();
        var src = _soundworksClient.audioContext.createBufferSource();
        src.buffer = _this._loader.buffers[1]; // get second buffer from loader
        src.connect(_soundworksClient.audioContext.destination);
        src.start(_soundworksClient.audioContext.currentTime + delay);
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
})(_soundworksClient.ClientPerformance);

exports['default'] = PlayerPerformance;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztnQ0FDd0QsbUJBQW1COzs7Ozs7OztJQU90RCxpQkFBaUI7WUFBakIsaUJBQWlCOztBQUN6QixXQURRLGlCQUFpQixDQUN4QixNQUFNLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOzswQkFEYixpQkFBaUI7O0FBRWxDLCtCQUZpQixpQkFBaUIsNkNBRTVCLE9BQU8sRUFBRTs7QUFFZixRQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztHQUN2Qjs7ZUFMa0IsaUJBQWlCOztXQU8vQixpQkFBRzs7O0FBQ04saUNBUmlCLGlCQUFpQix1Q0FRcEI7OztBQUdkLFVBQUksR0FBRyxHQUFHLCtCQUFhLGtCQUFrQixFQUFFLENBQUM7QUFDNUMsU0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxTQUFHLENBQUMsT0FBTyxDQUFDLCtCQUFhLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLFNBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQWEsV0FBVyxDQUFDLENBQUM7Ozs7QUFJcEMsVUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBTTtBQUN6QixZQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDNUIsWUFBSSxHQUFHLEdBQUcsK0JBQWEsa0JBQWtCLEVBQUUsQ0FBQztBQUM1QyxXQUFHLENBQUMsTUFBTSxHQUFHLE1BQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxXQUFHLENBQUMsT0FBTyxDQUFDLCtCQUFhLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLFdBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQWEsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO09BQzdDLENBQUMsQ0FBQzs7O0FBR0gsVUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7S0FNMUM7OztTQWpDa0IsaUJBQWlCOzs7cUJBQWpCLGlCQUFpQiIsImZpbGUiOiJzcmMvY2xpZW50L3BsYXllci9QbGF5ZXJQZXJmb3JtYW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBTb3VuZHdvcmtzIGxpYnJhcnkgKGNsaWVudCBzaWRlKVxuaW1wb3J0IHsgY2xpZW50LCBhdWRpb0NvbnRleHQsIENsaWVudFBlcmZvcm1hbmNlIH0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG4vKipcbiAqICdgcGxheWVyYCcgcGVyZm9ybWFuY2UgbW9kdWxlIChjbGllbnQgc2lkZSkuXG4gKiBUaGlzIHBlcmZvcm1hbmNlIHBsYXlzIGEgc291bmQgd2hlbiBpdCBzdGFydHMsIGFuZCBwbGF5cyBhbm90aGVyIHNvdW5kIHdoZW5cbiAqIG90aGVyIGNsaWVudHMgam9pbiB0aGUgcGVyZm9ybWFuY2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllclBlcmZvcm1hbmNlIGV4dGVuZHMgQ2xpZW50UGVyZm9ybWFuY2Uge1xuICBjb25zdHJ1Y3Rvcihsb2FkZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyOyAvLyB0aGUgbG9hZGVyIG1vZHVsZVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcblxuICAgIC8vIFBsYXkgdGhlIHdlbGNvbWUgc291bmQgaW1tZWRpYXRlbHlcbiAgICBsZXQgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHNyYy5idWZmZXIgPSB0aGlzLl9sb2FkZXIuYnVmZmVyc1swXTsgLy8gZ2V0IGZpcnN0IGJ1ZmZlciBmcm9tIGxvYWRlclxuICAgIHNyYy5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG5cbiAgICAvLyBQbGF5IGFub3RoZXIgc291bmQgd2hlbiB3ZSByZWNlaXZlIGEgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXIgKHRoYXRcbiAgICAvLyBpbmRpY2F0ZXMgdGhhdCBhbm90aGVyIGNsaWVudCBqb2luZWQgdGhlIHBlcmZvcm1hbmNlKVxuICAgIHRoaXMucmVjZWl2ZSgncGxheScsICgpID0+IHtcbiAgICAgIGNvbnN0IGRlbGF5ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIGxldCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICBzcmMuYnVmZmVyID0gdGhpcy5fbG9hZGVyLmJ1ZmZlcnNbMV07IC8vIGdldCBzZWNvbmQgYnVmZmVyIGZyb20gbG9hZGVyXG4gICAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGRlbGF5KTtcbiAgICB9KTtcblxuICAgIC8vIERpc3BsYXkgc29tZSBmZWVkYmFjayB0ZXh0IGluIHRoZSB2aWV3XG4gICAgdGhpcy5zZXRDZW50ZXJlZFZpZXdDb250ZW50KCdMZXTigJlzIGdvIScpO1xuXG4gICAgLy8gV2Ugd291bGQgdXN1YWxseSBjYWxsIHRoZSAnZG9uZScgbWV0aG9kIHdoZW4gdGhlIG1vZHVsZSBjYW4gaGFuZCBvdmVyIHRoZVxuICAgIC8vIGNvbnRyb2wgdG8gc3Vic2VxdWVudCBtb2R1bGVzLCBob3dldmVyIHNpbmNlIHRoZSBwZXJmb3JtYW5jZSBpcyB0aGUgbGFzdFxuICAgIC8vIG1vZHVsZSB0byBiZSBjYWxsZWQgaW4gdGhpcyBzY2VuYXJpbywgd2UgZG9uJ3QgbmVlZCBpdCBoZXJlLlxuICAgIC8vIHRoaXMuZG9uZSgpO1xuICB9XG59XG4iXX0=