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
var Renderer = _soundworksClient2['default'].display.Renderer;
var CanvasView = _soundworksClient2['default'].display.CanvasView;

var PerformanceRenderer = (function (_Renderer) {
  _inherits(PerformanceRenderer, _Renderer);

  function PerformanceRenderer(vx, vy) {
    _classCallCheck(this, PerformanceRenderer);

    _get(Object.getPrototypeOf(PerformanceRenderer.prototype), 'constructor', this).call(this, 0);

    this.velocityX = vx; // px per seconds
    this.velocityY = vy; // px per seconds
  }

  _createClass(PerformanceRenderer, [{
    key: 'init',
    value: function init() {
      if (!this.x || !this.y) {
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
      }
    }
  }, {
    key: 'update',
    value: function update(dt) {
      if (this.x >= this.canvasWidth || this.x <= 0) {
        this.velocityX *= -1;
      }
      if (this.y >= this.canvasHeight || this.y <= 0) {
        this.velocityY *= -1;
      }

      this.x += this.velocityX * dt;
      this.y += this.velocityY * dt;
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#ffffff';
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }]);

  return PerformanceRenderer;
})(Renderer);

var template = '\n  <canvas class="background"></canvas>\n  <div class="foreground">\n    <div class="section-top flex-middle">\n      <p class="big"><%= title %></p>\n    </div>\n    <div class="section-center flex-center"></div>\n    <div class="section-bottom flex-middle"></div>\n  </div>\n';

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

    this.init();
  }

  _createClass(PlayerPerformance, [{
    key: 'init',
    value: function init() {
      // Define elements for the view
      this.template = template;
      this.content = { title: 'Let\'s go!' };
      this.viewCtor = CanvasView;
      this.view = this.createDefaultView();
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

      // initialize rendering
      this.view.setPreRender(function (ctx, dt) {
        ctx.save();
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, ctx.width, ctx.height);
        ctx.restore();
      });

      this.renderer = new PerformanceRenderer(100, 100);
      this.view.addRenderer(this.renderer);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUN1QixtQkFBbUI7Ozs7QUFFMUMsSUFBTSxZQUFZLEdBQUcsOEJBQVcsWUFBWSxDQUFDO0FBQzdDLElBQU0sTUFBTSxHQUFHLDhCQUFXLE1BQU0sQ0FBQztBQUNqQyxJQUFNLGlCQUFpQixHQUFHLDhCQUFXLGlCQUFpQixDQUFDO0FBQ3ZELElBQU0sUUFBUSxHQUFHLDhCQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBTSxVQUFVLEdBQUcsOEJBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7SUFHM0MsbUJBQW1CO1lBQW5CLG1CQUFtQjs7QUFDWixXQURQLG1CQUFtQixDQUNYLEVBQUUsRUFBRSxFQUFFLEVBQUU7MEJBRGhCLG1CQUFtQjs7QUFFckIsK0JBRkUsbUJBQW1CLDZDQUVmLENBQUMsRUFBRTs7QUFFVCxRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztHQUNyQjs7ZUFORyxtQkFBbUI7O1dBUW5CLGdCQUFHO0FBQ0wsVUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDMUMsWUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztPQUM1QztLQUNGOzs7V0FFSyxnQkFBQyxFQUFFLEVBQUU7QUFDVCxVQUFJLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUFFLFlBQUksQ0FBQyxTQUFTLElBQUksQ0FB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QUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNYLFdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLFdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxXQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDZixDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsRCxVQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztLQU10Qzs7O1NBcERrQixpQkFBaUI7R0FBUyxpQkFBaUI7O3FCQUEzQyxpQkFBaUIiLCJmaWxlIjoic3JjL2NsaWVudC9wbGF5ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBsaWJyYXJ5IChjbGllbnQgc2lkZSlcbmltcG9ydCBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY29uc3QgYXVkaW9Db250ZXh0ID0gc291bmR3b3Jrcy5hdWRpb0NvbnRleHQ7XG5jb25zdCBjbGllbnQgPSBzb3VuZHdvcmtzLmNsaWVudDtcbmNvbnN0IENsaWVudFBlcmZvcm1hbmNlID0gc291bmR3b3Jrcy5DbGllbnRQZXJmb3JtYW5jZTtcbmNvbnN0IFJlbmRlcmVyID0gc291bmR3b3Jrcy5kaXNwbGF5LlJlbmRlcmVyO1xuY29uc3QgQ2FudmFzVmlldyA9IHNvdW5kd29ya3MuZGlzcGxheS5DYW52YXNWaWV3O1xuXG5cbmNsYXNzIFBlcmZvcm1hbmNlUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xuICAgIHN1cGVyKDApO1xuXG4gICAgdGhpcy52ZWxvY2l0eVggPSB2eDsgLy8gcHggcGVyIHNlY29uZHNcbiAgICB0aGlzLnZlbG9jaXR5WSA9IHZ5OyAvLyBweCBwZXIgc2Vjb25kc1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMueCB8fCAhdGhpcy55KSB7XG4gICAgICB0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXNXaWR0aDtcbiAgICAgIHRoaXMueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoZHQpIHtcbiAgICBpZiAodGhpcy54ID49IHRoaXMuY2FudmFzV2lkdGggfHwgdGhpcy54IDw9IDApIHsgdGhpcy52ZWxvY2l0eVggKj0gLTE7IH1cbiAgICBpZiAodGhpcy55ID49IHRoaXMuY2FudmFzSGVpZ2h0IHx8IHRoaXMueSA8PSAwKSB7IHRoaXMudmVsb2NpdHlZICo9IC0xOyB9XG5cbiAgICB0aGlzLnggKz0gKHRoaXMudmVsb2NpdHlYICogZHQpO1xuICAgIHRoaXMueSArPSAodGhpcy52ZWxvY2l0eVkgKiBkdCk7XG4gIH1cblxuICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC42O1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgNCwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG59XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuICA8Y2FudmFzIGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvY2FudmFzPlxuICA8ZGl2IGNsYXNzPVwiZm9yZWdyb3VuZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgICAgPHAgY2xhc3M9XCJiaWdcIj48JT0gdGl0bGUgJT48L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcblxuLyoqXG4gKiAnYHBsYXllcmAnIHBlcmZvcm1hbmNlIG1vZHVsZSAoY2xpZW50IHNpZGUpLlxuICogVGhpcyBwZXJmb3JtYW5jZSBwbGF5cyBhIHNvdW5kIHdoZW4gaXQgc3RhcnRzLCBhbmQgcGxheXMgYW5vdGhlciBzb3VuZCB3aGVuXG4gKiBvdGhlciBjbGllbnRzIGpvaW4gdGhlIHBlcmZvcm1hbmNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJQZXJmb3JtYW5jZSBleHRlbmRzIENsaWVudFBlcmZvcm1hbmNlIHtcbiAgY29uc3RydWN0b3IobG9hZGVyLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjsgLy8gdGhlIGxvYWRlciBtb2R1bGVcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBEZWZpbmUgZWxlbWVudHMgZm9yIHRoZSB2aWV3XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIHRoaXMuY29udGVudCA9IHsgdGl0bGU6IGBMZXQncyBnbyFgIH07XG4gICAgdGhpcy52aWV3Q3RvciA9IENhbnZhc1ZpZXc7XG4gICAgdGhpcy52aWV3ID0gdGhpcy5jcmVhdGVEZWZhdWx0VmlldygpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcblxuICAgIC8vIFBsYXkgdGhlIHdlbGNvbWUgc291bmQgaW1tZWRpYXRlbHlcbiAgICBjb25zdCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgc3JjLmJ1ZmZlciA9IHRoaXMuX2xvYWRlci5idWZmZXJzWzBdOyAvLyBnZXQgZmlyc3QgYnVmZmVyIGZyb20gbG9hZGVyXG4gICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcblxuICAgIC8vIFBsYXkgYW5vdGhlciBzb3VuZCB3aGVuIHdlIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciAodGhhdFxuICAgIC8vIGluZGljYXRlcyB0aGF0IGFub3RoZXIgY2xpZW50IGpvaW5lZCB0aGUgcGVyZm9ybWFuY2UpXG4gICAgdGhpcy5yZWNlaXZlKCdwbGF5JywgKCkgPT4ge1xuICAgICAgY29uc3QgZGVsYXkgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3Qgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMuX2xvYWRlci5idWZmZXJzWzFdOyAvLyBnZXQgc2Vjb25kIGJ1ZmZlciBmcm9tIGxvYWRlclxuICAgICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkZWxheSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0aWFsaXplIHJlbmRlcmluZ1xuICAgIHRoaXMudmlldy5zZXRQcmVSZW5kZXIoZnVuY3Rpb24oY3R4LCBkdCkge1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMDU7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC53aWR0aCwgY3R4LmhlaWdodCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQZXJmb3JtYW5jZVJlbmRlcmVyKDEwMCwgMTAwKTtcbiAgICB0aGlzLnZpZXcuYWRkUmVuZGVyZXIodGhpcy5yZW5kZXJlcik7XG5cbiAgICAvLyBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlIGNhbiBoYW5kIG92ZXIgdGhlXG4gICAgLy8gY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsIGhvd2V2ZXIgc2luY2UgdGhlIHBlcmZvcm1hbmNlIGlzIHRoZSBsYXN0XG4gICAgLy8gbW9kdWxlIHRvIGJlIGNhbGxlZCBpbiB0aGlzIHNjZW5hcmlvLCB3ZSBkb24ndCBuZWVkIGl0IGhlcmUuXG4gICAgLy8gdGhpcy5kb25lKCk7XG4gIH1cbn1cbiJdfQ==