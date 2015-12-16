// Import Soundworks library (client side)
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _soundworksClient = require('soundworks/client');

var _soundworksClient2 = _interopRequireDefault(_soundworksClient);

var SegmentedView = _soundworksClient2['default'].display.SegmentedView;

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
    this._counter = 0;
    // rename to this.content
    this.content = {
      top: '<p class="big">Let\'s go!</p>',
      center: '<p class="big">' + this._counter + '</p>',
      bottom: ''
    };

    this.events = { click: this.updateView.bind(this) };
    this.view = new SegmentedView(null, this.content, this.events);
  }

  _createClass(PlayerPerformance, [{
    key: 'updateView',
    value: function updateView() {
      this._counter++;
      this.content.center = '<p class="big">' + this._counter + '</p>';
      this.view.render();
    }
  }, {
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
      // this.setCenteredViewContent('Let’s go!');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUN3RCxtQkFBbUI7Ozs7QUFFM0UsSUFBTSxhQUFhLEdBQUcsOEJBQVcsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7Ozs7Ozs7SUFPbEMsaUJBQWlCO1lBQWpCLGlCQUFpQjs7QUFDekIsV0FEUSxpQkFBaUIsQ0FDeEIsTUFBTSxFQUFnQjtRQUFkLE9BQU8seURBQUcsRUFBRTs7MEJBRGIsaUJBQWlCOztBQUVsQywrQkFGaUIsaUJBQWlCLDZDQUU1QixPQUFPLEVBQUU7O0FBRWYsUUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDdEIsUUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7O0FBRWxCLFFBQUksQ0FBQyxPQUFPLEdBQUc7QUFDYixTQUFHLGlDQUFnQztBQUNuQyxZQUFNLHNCQUFvQixJQUFJLENBQUMsUUFBUSxTQUFNO0FBQzdDLFlBQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQzs7QUFFRixRQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDcEQsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDaEU7O2VBZmtCLGlCQUFpQjs7V0FpQjFCLHNCQUFHO0FBQ1gsVUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2hCLFVBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSx1QkFBcUIsSUFBSSxDQUFDLFFBQVEsU0FBTSxDQUFDO0FBQzVELFVBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDcEI7OztXQUVJLGlCQUFHOzs7QUFDTixpQ0F4QmlCLGlCQUFpQix1Q0F3QnBCOzs7QUFHZCxVQUFJLEdBQUcsR0FBRywrQkFBYSxrQkFBa0IsRUFBRSxDQUFDO0FBQzVDLFNBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsU0FBRyxDQUFDLE9BQU8sQ0FBQywrQkFBYSxXQUFXLENBQUMsQ0FBQztBQUN0QyxTQUFHLENBQUMsS0FBSyxDQUFDLCtCQUFhLFdBQVcsQ0FBQyxDQUFDOzs7O0FBSXBDLFVBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFlBQU07QUFDekIsWUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzVCLFlBQUksR0FBRyxHQUFHLCtCQUFhLGtCQUFrQixFQUFFLENBQUM7QUFDNUMsV0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsV0FBRyxDQUFDLE9BQU8sQ0FBQywrQkFBYSxXQUFXLENBQUMsQ0FBQztBQUN0QyxXQUFHLENBQUMsS0FBSyxDQUFDLCtCQUFhLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQztPQUM3QyxDQUFDLENBQUM7Ozs7Ozs7OztLQVNKOzs7U0FqRGtCLGlCQUFpQjs7O3FCQUFqQixpQkFBaUIiLCJmaWxlIjoic3JjL2NsaWVudC9wbGF5ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBsaWJyYXJ5IChjbGllbnQgc2lkZSlcbmltcG9ydCB7IGNsaWVudCwgYXVkaW9Db250ZXh0LCBDbGllbnRQZXJmb3JtYW5jZSB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmNvbnN0IFNlZ21lbnRlZFZpZXcgPSBzb3VuZHdvcmtzLmRpc3BsYXkuU2VnbWVudGVkVmlldztcblxuLyoqXG4gKiAnYHBsYXllcmAnIHBlcmZvcm1hbmNlIG1vZHVsZSAoY2xpZW50IHNpZGUpLlxuICogVGhpcyBwZXJmb3JtYW5jZSBwbGF5cyBhIHNvdW5kIHdoZW4gaXQgc3RhcnRzLCBhbmQgcGxheXMgYW5vdGhlciBzb3VuZCB3aGVuXG4gKiBvdGhlciBjbGllbnRzIGpvaW4gdGhlIHBlcmZvcm1hbmNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJQZXJmb3JtYW5jZSBleHRlbmRzIENsaWVudFBlcmZvcm1hbmNlIHtcbiAgY29uc3RydWN0b3IobG9hZGVyLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjsgLy8gdGhlIGxvYWRlciBtb2R1bGVcbiAgICB0aGlzLl9jb3VudGVyID0gMDtcbiAgICAvLyByZW5hbWUgdG8gdGhpcy5jb250ZW50XG4gICAgdGhpcy5jb250ZW50ID0ge1xuICAgICAgdG9wOiBgPHAgY2xhc3M9XCJiaWdcIj5MZXQncyBnbyE8L3A+YCxcbiAgICAgIGNlbnRlcjogYDxwIGNsYXNzPVwiYmlnXCI+JHt0aGlzLl9jb3VudGVyfTwvcD5gLFxuICAgICAgYm90dG9tOiAnJyxcbiAgICB9O1xuXG4gICAgdGhpcy5ldmVudHMgPSB7IGNsaWNrOiB0aGlzLnVwZGF0ZVZpZXcuYmluZCh0aGlzKSB9O1xuICAgIHRoaXMudmlldyA9IG5ldyBTZWdtZW50ZWRWaWV3KG51bGwsIHRoaXMuY29udGVudCwgdGhpcy5ldmVudHMpO1xuICB9XG5cbiAgdXBkYXRlVmlldygpIHtcbiAgICB0aGlzLl9jb3VudGVyKys7XG4gICAgdGhpcy5jb250ZW50LmNlbnRlciA9IGA8cCBjbGFzcz1cImJpZ1wiPiR7dGhpcy5fY291bnRlcn08L3A+YDtcbiAgICB0aGlzLnZpZXcucmVuZGVyKCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuXG4gICAgLy8gUGxheSB0aGUgd2VsY29tZSBzb3VuZCBpbW1lZGlhdGVseVxuICAgIGxldCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgc3JjLmJ1ZmZlciA9IHRoaXMuX2xvYWRlci5idWZmZXJzWzBdOyAvLyBnZXQgZmlyc3QgYnVmZmVyIGZyb20gbG9hZGVyXG4gICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcblxuICAgIC8vIFBsYXkgYW5vdGhlciBzb3VuZCB3aGVuIHdlIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciAodGhhdFxuICAgIC8vIGluZGljYXRlcyB0aGF0IGFub3RoZXIgY2xpZW50IGpvaW5lZCB0aGUgcGVyZm9ybWFuY2UpXG4gICAgdGhpcy5yZWNlaXZlKCdwbGF5JywgKCkgPT4ge1xuICAgICAgY29uc3QgZGVsYXkgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgbGV0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgIHNyYy5idWZmZXIgPSB0aGlzLl9sb2FkZXIuYnVmZmVyc1sxXTsgLy8gZ2V0IHNlY29uZCBidWZmZXIgZnJvbSBsb2FkZXJcbiAgICAgIHNyYy5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZGVsYXkpO1xuICAgIH0pO1xuXG4gICAgLy8gRGlzcGxheSBzb21lIGZlZWRiYWNrIHRleHQgaW4gdGhlIHZpZXdcbiAgICAvLyB0aGlzLnNldENlbnRlcmVkVmlld0NvbnRlbnQoJ0xldOKAmXMgZ28hJyk7XG5cbiAgICAvLyBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlIGNhbiBoYW5kIG92ZXIgdGhlXG4gICAgLy8gY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsIGhvd2V2ZXIgc2luY2UgdGhlIHBlcmZvcm1hbmNlIGlzIHRoZSBsYXN0XG4gICAgLy8gbW9kdWxlIHRvIGJlIGNhbGxlZCBpbiB0aGlzIHNjZW5hcmlvLCB3ZSBkb24ndCBuZWVkIGl0IGhlcmUuXG4gICAgLy8gdGhpcy5kb25lKCk7XG4gIH1cbn1cbiJdfQ==