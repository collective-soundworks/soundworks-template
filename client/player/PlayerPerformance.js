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
      this.view = this.createView();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUN1QixtQkFBbUI7Ozs7QUFFMUMsSUFBTSxZQUFZLEdBQUcsOEJBQVcsWUFBWSxDQUFDO0FBQzdDLElBQU0sTUFBTSxHQUFHLDhCQUFXLE1BQU0sQ0FBQztBQUNqQyxJQUFNLGlCQUFpQixHQUFHLDhCQUFXLGlCQUFpQixDQUFDO0FBQ3ZELElBQU0sUUFBUSxHQUFHLDhCQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBTSxVQUFVLEdBQUcsOEJBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7SUFHM0MsbUJBQW1CO1lBQW5CLG1CQUFtQjs7QUFDWixXQURQLG1CQUFtQixDQUNYLEVBQUUsRUFBRSxFQUFFLEVBQUU7MEJBRGhCLG1CQUFtQjs7QUFFckIsK0JBRkUsbUJBQW1CLDZDQUVmLENBQUMsRUFBRTs7QUFFVCxRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztHQUNyQjs7ZUFORyxtQkFBbUI7O1dBUW5CLGdCQUFHO0FBQ0wsVUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDMUMsWUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztPQUM1QztLQUNGOzs7V0FFSyxnQkFBQyxFQUFFLEVBQUU7QUFDVCxVQUFJLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUFFLFlBQUksQ0FBQyxTQUFTLElBQUksQ0FB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LENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWCxXQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN2QixXQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQixXQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUMsV0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO09BQ2YsQ0FBQyxDQUFDOztBQUVILFVBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbEQsVUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7S0FNdEM7OztTQXBEa0IsaUJBQWlCO0dBQVMsaUJBQWlCOztxQkFBM0MsaUJBQWlCIiwiZmlsZSI6InNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbGlicmFyeSAoY2xpZW50IHNpZGUpXG5pbXBvcnQgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbmNvbnN0IGF1ZGlvQ29udGV4dCA9IHNvdW5kd29ya3MuYXVkaW9Db250ZXh0O1xuY29uc3QgY2xpZW50ID0gc291bmR3b3Jrcy5jbGllbnQ7XG5jb25zdCBDbGllbnRQZXJmb3JtYW5jZSA9IHNvdW5kd29ya3MuQ2xpZW50UGVyZm9ybWFuY2U7XG5jb25zdCBSZW5kZXJlciA9IHNvdW5kd29ya3MuZGlzcGxheS5SZW5kZXJlcjtcbmNvbnN0IENhbnZhc1ZpZXcgPSBzb3VuZHdvcmtzLmRpc3BsYXkuQ2FudmFzVmlldztcblxuXG5jbGFzcyBQZXJmb3JtYW5jZVJlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcbiAgICBzdXBlcigwKTtcblxuICAgIHRoaXMudmVsb2NpdHlYID0gdng7IC8vIHB4IHBlciBzZWNvbmRzXG4gICAgdGhpcy52ZWxvY2l0eVkgPSB2eTsgLy8gcHggcGVyIHNlY29uZHNcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLnggfHwgIXRoaXMueSkge1xuICAgICAgdGhpcy54ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuY2FudmFzV2lkdGg7XG4gICAgICB0aGlzLnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKGR0KSB7XG4gICAgaWYgKHRoaXMueCA+PSB0aGlzLmNhbnZhc1dpZHRoIHx8IHRoaXMueCA8PSAwKSB7IHRoaXMudmVsb2NpdHlYICo9IC0xOyB9XG4gICAgaWYgKHRoaXMueSA+PSB0aGlzLmNhbnZhc0hlaWdodCB8fCB0aGlzLnkgPD0gMCkgeyB0aGlzLnZlbG9jaXR5WSAqPSAtMTsgfVxuXG4gICAgdGhpcy54ICs9ICh0aGlzLnZlbG9jaXR5WCAqIGR0KTtcbiAgICB0aGlzLnkgKz0gKHRoaXMudmVsb2NpdHlZICogZHQpO1xuICB9XG5cbiAgcmVuZGVyKGN0eCkge1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNjtcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIDQsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGNhbnZhcyBjbGFzcz1cImJhY2tncm91bmRcIj48L2NhbnZhcz5cbiAgPGRpdiBjbGFzcz1cImZvcmVncm91bmRcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3AgZmxleC1taWRkbGVcIj5cbiAgICAgIDxwIGNsYXNzPVwiYmlnXCI+PCU9IHRpdGxlICU+PC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LW1pZGRsZVwiPjwvZGl2PlxuICA8L2Rpdj5cbmA7XG5cbi8qKlxuICogJ2BwbGF5ZXJgJyBwZXJmb3JtYW5jZSBtb2R1bGUgKGNsaWVudCBzaWRlKS5cbiAqIFRoaXMgcGVyZm9ybWFuY2UgcGxheXMgYSBzb3VuZCB3aGVuIGl0IHN0YXJ0cywgYW5kIHBsYXlzIGFub3RoZXIgc291bmQgd2hlblxuICogb3RoZXIgY2xpZW50cyBqb2luIHRoZSBwZXJmb3JtYW5jZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyUGVyZm9ybWFuY2UgZXh0ZW5kcyBDbGllbnRQZXJmb3JtYW5jZSB7XG4gIGNvbnN0cnVjdG9yKGxvYWRlciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLl9sb2FkZXIgPSBsb2FkZXI7IC8vIHRoZSBsb2FkZXIgbW9kdWxlXG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gRGVmaW5lIGVsZW1lbnRzIGZvciB0aGUgdmlld1xuICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLmNvbnRlbnQgPSB7IHRpdGxlOiBgTGV0J3MgZ28hYCB9O1xuICAgIHRoaXMudmlld0N0b3IgPSBDYW52YXNWaWV3O1xuICAgIHRoaXMudmlldyA9IHRoaXMuY3JlYXRlVmlldygpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcblxuICAgIC8vIFBsYXkgdGhlIHdlbGNvbWUgc291bmQgaW1tZWRpYXRlbHlcbiAgICBjb25zdCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgc3JjLmJ1ZmZlciA9IHRoaXMuX2xvYWRlci5idWZmZXJzWzBdOyAvLyBnZXQgZmlyc3QgYnVmZmVyIGZyb20gbG9hZGVyXG4gICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcblxuICAgIC8vIFBsYXkgYW5vdGhlciBzb3VuZCB3aGVuIHdlIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciAodGhhdFxuICAgIC8vIGluZGljYXRlcyB0aGF0IGFub3RoZXIgY2xpZW50IGpvaW5lZCB0aGUgcGVyZm9ybWFuY2UpXG4gICAgdGhpcy5yZWNlaXZlKCdwbGF5JywgKCkgPT4ge1xuICAgICAgY29uc3QgZGVsYXkgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3Qgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMuX2xvYWRlci5idWZmZXJzWzFdOyAvLyBnZXQgc2Vjb25kIGJ1ZmZlciBmcm9tIGxvYWRlclxuICAgICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkZWxheSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0aWFsaXplIHJlbmRlcmluZ1xuICAgIHRoaXMudmlldy5zZXRQcmVSZW5kZXIoZnVuY3Rpb24oY3R4LCBkdCkge1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMDU7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC53aWR0aCwgY3R4LmhlaWdodCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQZXJmb3JtYW5jZVJlbmRlcmVyKDEwMCwgMTAwKTtcbiAgICB0aGlzLnZpZXcuYWRkUmVuZGVyZXIodGhpcy5yZW5kZXJlcik7XG5cbiAgICAvLyBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlIGNhbiBoYW5kIG92ZXIgdGhlXG4gICAgLy8gY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsIGhvd2V2ZXIgc2luY2UgdGhlIHBlcmZvcm1hbmNlIGlzIHRoZSBsYXN0XG4gICAgLy8gbW9kdWxlIHRvIGJlIGNhbGxlZCBpbiB0aGlzIHNjZW5hcmlvLCB3ZSBkb24ndCBuZWVkIGl0IGhlcmUuXG4gICAgLy8gdGhpcy5kb25lKCk7XG4gIH1cbn1cbiJdfQ==