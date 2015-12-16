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

var audioContext = _soundworksClient2['default'].audioContext;
var client = _soundworksClient2['default'].client;
var ClientPerformance = _soundworksClient2['default'].ClientPerformance;
var SegmentedView = _soundworksClient2['default'].display.SegmentedView;

var template = '\n  <div class="section-top flex-middle">\n    <p class="big"><%= go %></p>\n  </div>\n  <div class="section-center flex-center">\n    <p class="big"><%= counter %></p>\n  </div>\n  <div class="section-bottom"></div>\n';

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

    // Define elements for the view
    this.template = template;
    this.content = { go: 'Let\'s go!', counter: 0 };
    this.events = { click: this.updateView.bind(this) };
    // Create the view
    this.view = new SegmentedView(this.template, this.content, this.events);
  }

  _createClass(PlayerPerformance, [{
    key: 'updateView',
    value: function updateView() {
      this.content.counter++;
      // partially update the view
      this.view.render('.section-center');
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      _get(Object.getPrototypeOf(PlayerPerformance.prototype), 'start', this).call(this); // don't forget this

      // Play the welcome sound immediately
      var src = audioContext.createBufferSource();
      src.buffer = this._loader.buffers[0]; // get first buffer from loader
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime);

      // Play another sound when we receive a message from the server (that
      // indicates that another client joined the performance)
      this.receive('play', function () {
        var delay = Math.random();
        var src = audioContext.createBufferSource();
        src.buffer = _this._loader.buffers[1]; // get second buffer from loader
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime + delay);
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
})(ClientPerformance);

exports['default'] = PlayerPerformance;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUN1QixtQkFBbUI7Ozs7QUFFMUMsSUFBTSxZQUFZLEdBQUcsOEJBQVcsWUFBWSxDQUFDO0FBQzdDLElBQU0sTUFBTSxHQUFHLDhCQUFXLE1BQU0sQ0FBQztBQUNqQyxJQUFNLGlCQUFpQixHQUFHLDhCQUFXLGlCQUFpQixDQUFDO0FBQ3ZELElBQU0sYUFBYSxHQUFHLDhCQUFXLE9BQU8sQ0FBQyxhQUFhLENBQUM7O0FBRXZELElBQU0sUUFBUSwrTkFRYixDQUFDOzs7Ozs7OztJQU9tQixpQkFBaUI7WUFBakIsaUJBQWlCOztBQUN6QixXQURRLGlCQUFpQixDQUN4QixNQUFNLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOzswQkFEYixpQkFBaUI7O0FBRWxDLCtCQUZpQixpQkFBaUIsNkNBRTVCLE9BQU8sRUFBRTs7QUFFZixRQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7O0FBR3RCLFFBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxFQUFFLGNBQWEsRUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDakQsUUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOztBQUVwRCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDekU7O2VBWmtCLGlCQUFpQjs7V0FjMUIsc0JBQUc7QUFDWCxVQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUV2QixVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3JDOzs7V0FFSSxpQkFBRzs7O0FBQ04saUNBckJpQixpQkFBaUIsdUNBcUJwQjs7O0FBR2QsVUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDOUMsU0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxTQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QyxTQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7OztBQUlwQyxVQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxZQUFNO0FBQ3pCLFlBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1QixZQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUM5QyxXQUFHLENBQUMsTUFBTSxHQUFHLE1BQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxXQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QyxXQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7T0FDN0MsQ0FBQyxDQUFDOzs7Ozs7Ozs7S0FTSjs7O1NBOUNrQixpQkFBaUI7R0FBUyxpQkFBaUI7O3FCQUEzQyxpQkFBaUIiLCJmaWxlIjoic3JjL2NsaWVudC9wbGF5ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBsaWJyYXJ5IChjbGllbnQgc2lkZSlcbmltcG9ydCBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY29uc3QgYXVkaW9Db250ZXh0ID0gc291bmR3b3Jrcy5hdWRpb0NvbnRleHQ7XG5jb25zdCBjbGllbnQgPSBzb3VuZHdvcmtzLmNsaWVudDtcbmNvbnN0IENsaWVudFBlcmZvcm1hbmNlID0gc291bmR3b3Jrcy5DbGllbnRQZXJmb3JtYW5jZTtcbmNvbnN0IFNlZ21lbnRlZFZpZXcgPSBzb3VuZHdvcmtzLmRpc3BsYXkuU2VnbWVudGVkVmlldztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG4gIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgIDxwIGNsYXNzPVwiYmlnXCI+PCU9IGdvICU+PC9wPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgPHAgY2xhc3M9XCJiaWdcIj48JT0gY291bnRlciAlPjwvcD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbVwiPjwvZGl2PlxuYDtcblxuLyoqXG4gKiAnYHBsYXllcmAnIHBlcmZvcm1hbmNlIG1vZHVsZSAoY2xpZW50IHNpZGUpLlxuICogVGhpcyBwZXJmb3JtYW5jZSBwbGF5cyBhIHNvdW5kIHdoZW4gaXQgc3RhcnRzLCBhbmQgcGxheXMgYW5vdGhlciBzb3VuZCB3aGVuXG4gKiBvdGhlciBjbGllbnRzIGpvaW4gdGhlIHBlcmZvcm1hbmNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJQZXJmb3JtYW5jZSBleHRlbmRzIENsaWVudFBlcmZvcm1hbmNlIHtcbiAgY29uc3RydWN0b3IobG9hZGVyLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjsgLy8gdGhlIGxvYWRlciBtb2R1bGVcblxuICAgIC8vIERlZmluZSBlbGVtZW50cyBmb3IgdGhlIHZpZXdcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgdGhpcy5jb250ZW50ID0geyBnbzogYExldCdzIGdvIWAsICAgY291bnRlcjogMCB9O1xuICAgIHRoaXMuZXZlbnRzID0geyBjbGljazogdGhpcy51cGRhdGVWaWV3LmJpbmQodGhpcykgfTtcbiAgICAvLyBDcmVhdGUgdGhlIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgU2VnbWVudGVkVmlldyh0aGlzLnRlbXBsYXRlLCB0aGlzLmNvbnRlbnQsIHRoaXMuZXZlbnRzKTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoKSB7XG4gICAgdGhpcy5jb250ZW50LmNvdW50ZXIrKztcbiAgICAvLyBwYXJ0aWFsbHkgdXBkYXRlIHRoZSB2aWV3XG4gICAgdGhpcy52aWV3LnJlbmRlcignLnNlY3Rpb24tY2VudGVyJyk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuXG4gICAgLy8gUGxheSB0aGUgd2VsY29tZSBzb3VuZCBpbW1lZGlhdGVseVxuICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzcmMuYnVmZmVyID0gdGhpcy5fbG9hZGVyLmJ1ZmZlcnNbMF07IC8vIGdldCBmaXJzdCBidWZmZXIgZnJvbSBsb2FkZXJcbiAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXG4gICAgLy8gUGxheSBhbm90aGVyIHNvdW5kIHdoZW4gd2UgcmVjZWl2ZSBhIG1lc3NhZ2UgZnJvbSB0aGUgc2VydmVyICh0aGF0XG4gICAgLy8gaW5kaWNhdGVzIHRoYXQgYW5vdGhlciBjbGllbnQgam9pbmVkIHRoZSBwZXJmb3JtYW5jZSlcbiAgICB0aGlzLnJlY2VpdmUoJ3BsYXknLCAoKSA9PiB7XG4gICAgICBjb25zdCBkZWxheSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICBzcmMuYnVmZmVyID0gdGhpcy5fbG9hZGVyLmJ1ZmZlcnNbMV07IC8vIGdldCBzZWNvbmQgYnVmZmVyIGZyb20gbG9hZGVyXG4gICAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGRlbGF5KTtcbiAgICB9KTtcblxuICAgIC8vIERpc3BsYXkgc29tZSBmZWVkYmFjayB0ZXh0IGluIHRoZSB2aWV3XG4gICAgLy8gdGhpcy5zZXRDZW50ZXJlZFZpZXdDb250ZW50KCdMZXTigJlzIGdvIScpO1xuXG4gICAgLy8gV2Ugd291bGQgdXN1YWxseSBjYWxsIHRoZSAnZG9uZScgbWV0aG9kIHdoZW4gdGhlIG1vZHVsZSBjYW4gaGFuZCBvdmVyIHRoZVxuICAgIC8vIGNvbnRyb2wgdG8gc3Vic2VxdWVudCBtb2R1bGVzLCBob3dldmVyIHNpbmNlIHRoZSBwZXJmb3JtYW5jZSBpcyB0aGUgbGFzdFxuICAgIC8vIG1vZHVsZSB0byBiZSBjYWxsZWQgaW4gdGhpcyBzY2VuYXJpbywgd2UgZG9uJ3QgbmVlZCBpdCBoZXJlLlxuICAgIC8vIHRoaXMuZG9uZSgpO1xuICB9XG59XG4iXX0=