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
      ctx.beginPath();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#ffffff';
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return PerformanceRenderer;
})(Renderer);

var template = '\n  <canvas class="background"></canvas>\n  <div class="foreground">\n    <div class="section-top flex-middle">\n      <p class="big"><%= go %></p>\n    </div>\n    <div class="section-center flex-center"></div>\n    <div class="section-bottom flex-middle"></div>\n  </div>\n';

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
      this.content = { go: 'Let\'s go!' };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUN1QixtQkFBbUI7Ozs7QUFFMUMsSUFBTSxZQUFZLEdBQUcsOEJBQVcsWUFBWSxDQUFDO0FBQzdDLElBQU0sTUFBTSxHQUFHLDhCQUFXLE1BQU0sQ0FBQztBQUNqQyxJQUFNLGlCQUFpQixHQUFHLDhCQUFXLGlCQUFpQixDQUFDO0FBQ3ZELElBQU0sUUFBUSxHQUFHLDhCQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBTSxVQUFVLEdBQUcsOEJBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7SUFHM0MsbUJBQW1CO1lBQW5CLG1CQUFtQjs7QUFDWixXQURQLG1CQUFtQixDQUNYLEVBQUUsRUFBRSxFQUFFLEVBQUU7MEJBRGhCLG1CQUFtQjs7QUFFckIsK0JBRkUsbUJBQW1CLDZDQUVmLENBQUMsRUFBRTs7QUFFVCxRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztHQUNyQjs7ZUFORyxtQkFBbUI7O1dBUW5CLGdCQUFHO0FBQ0wsVUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDMUMsWUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztPQUM1QztLQUNGOzs7V0FFSyxnQkFBQyxFQUFFLEVBQUU7QUFDVCxVQUFJLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3QyxZQUFJLENBQUMsU0FBUyxJQUFJLENB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O0FBQ3ZCLFdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLFdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxXQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDZixDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsRCxVQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztLQU10Qzs7O1NBcERrQixpQkFBaUI7R0FBUyxpQkFBaUI7O3FCQUEzQyxpQkFBaUIiLCJmaWxlIjoic3JjL2NsaWVudC9wbGF5ZXIvUGxheWVyUGVyZm9ybWFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBsaWJyYXJ5IChjbGllbnQgc2lkZSlcbmltcG9ydCBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY29uc3QgYXVkaW9Db250ZXh0ID0gc291bmR3b3Jrcy5hdWRpb0NvbnRleHQ7XG5jb25zdCBjbGllbnQgPSBzb3VuZHdvcmtzLmNsaWVudDtcbmNvbnN0IENsaWVudFBlcmZvcm1hbmNlID0gc291bmR3b3Jrcy5DbGllbnRQZXJmb3JtYW5jZTtcbmNvbnN0IFJlbmRlcmVyID0gc291bmR3b3Jrcy5kaXNwbGF5LlJlbmRlcmVyO1xuY29uc3QgQ2FudmFzVmlldyA9IHNvdW5kd29ya3MuZGlzcGxheS5DYW52YXNWaWV3O1xuXG5cbmNsYXNzIFBlcmZvcm1hbmNlUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xuICAgIHN1cGVyKDApO1xuXG4gICAgdGhpcy52ZWxvY2l0eVggPSB2eDsgLy8gcHggcGVyIHNlY29uZHNcbiAgICB0aGlzLnZlbG9jaXR5WSA9IHZ5OyAvLyBweCBwZXIgc2Vjb25kc1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMueCB8fCAhdGhpcy55KSB7XG4gICAgICB0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXNXaWR0aDtcbiAgICAgIHRoaXMueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoZHQpIHtcbiAgICBpZiAodGhpcy54ID49IHRoaXMuY2FudmFzV2lkdGggfHwgdGhpcy54IDw9IDApIHtcbiAgICAgIHRoaXMudmVsb2NpdHlYICo9IC0xO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnkgPj0gdGhpcy5jYW52YXNIZWlnaHQgfHwgdGhpcy55IDw9IDApIHtcbiAgICAgIHRoaXMudmVsb2NpdHlZICo9IC0xO1xuICAgIH1cblxuICAgIHRoaXMueCArPSAodGhpcy52ZWxvY2l0eVggKiBkdCk7XG4gICAgdGhpcy55ICs9ICh0aGlzLnZlbG9jaXR5WSAqIGR0KTtcbiAgfVxuXG4gIHJlbmRlcihjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC42O1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgNCwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxufVxuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGNhbnZhcyBjbGFzcz1cImJhY2tncm91bmRcIj48L2NhbnZhcz5cbiAgPGRpdiBjbGFzcz1cImZvcmVncm91bmRcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3AgZmxleC1taWRkbGVcIj5cbiAgICAgIDxwIGNsYXNzPVwiYmlnXCI+PCU9IGdvICU+PC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LW1pZGRsZVwiPjwvZGl2PlxuICA8L2Rpdj5cbmA7XG5cbi8qKlxuICogJ2BwbGF5ZXJgJyBwZXJmb3JtYW5jZSBtb2R1bGUgKGNsaWVudCBzaWRlKS5cbiAqIFRoaXMgcGVyZm9ybWFuY2UgcGxheXMgYSBzb3VuZCB3aGVuIGl0IHN0YXJ0cywgYW5kIHBsYXlzIGFub3RoZXIgc291bmQgd2hlblxuICogb3RoZXIgY2xpZW50cyBqb2luIHRoZSBwZXJmb3JtYW5jZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyUGVyZm9ybWFuY2UgZXh0ZW5kcyBDbGllbnRQZXJmb3JtYW5jZSB7XG4gIGNvbnN0cnVjdG9yKGxvYWRlciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLl9sb2FkZXIgPSBsb2FkZXI7IC8vIHRoZSBsb2FkZXIgbW9kdWxlXG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gRGVmaW5lIGVsZW1lbnRzIGZvciB0aGUgdmlld1xuICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLmNvbnRlbnQgPSB7IGdvOiBgTGV0J3MgZ28hYCB9O1xuICAgIHRoaXMudmlld0N0b3IgPSBDYW52YXNWaWV3O1xuICAgIHRoaXMudmlldyA9IHRoaXMuY3JlYXRlRGVmYXVsdFZpZXcoKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG5cbiAgICAvLyBQbGF5IHRoZSB3ZWxjb21lIHNvdW5kIGltbWVkaWF0ZWx5XG4gICAgY29uc3Qgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHNyYy5idWZmZXIgPSB0aGlzLl9sb2FkZXIuYnVmZmVyc1swXTsgLy8gZ2V0IGZpcnN0IGJ1ZmZlciBmcm9tIGxvYWRlclxuICAgIHNyYy5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG5cbiAgICAvLyBQbGF5IGFub3RoZXIgc291bmQgd2hlbiB3ZSByZWNlaXZlIGEgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXIgKHRoYXRcbiAgICAvLyBpbmRpY2F0ZXMgdGhhdCBhbm90aGVyIGNsaWVudCBqb2luZWQgdGhlIHBlcmZvcm1hbmNlKVxuICAgIHRoaXMucmVjZWl2ZSgncGxheScsICgpID0+IHtcbiAgICAgIGNvbnN0IGRlbGF5ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgIHNyYy5idWZmZXIgPSB0aGlzLl9sb2FkZXIuYnVmZmVyc1sxXTsgLy8gZ2V0IHNlY29uZCBidWZmZXIgZnJvbSBsb2FkZXJcbiAgICAgIHNyYy5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZGVsYXkpO1xuICAgIH0pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSByZW5kZXJpbmdcbiAgICB0aGlzLnZpZXcuc2V0UHJlUmVuZGVyKGZ1bmN0aW9uKGN0eCwgZHQpIHtcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjA1O1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjdHgud2lkdGgsIGN0eC5oZWlnaHQpO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUGVyZm9ybWFuY2VSZW5kZXJlcigxMDAsIDEwMCk7XG4gICAgdGhpcy52aWV3LmFkZFJlbmRlcmVyKHRoaXMucmVuZGVyZXIpO1xuXG4gICAgLy8gV2Ugd291bGQgdXN1YWxseSBjYWxsIHRoZSAnZG9uZScgbWV0aG9kIHdoZW4gdGhlIG1vZHVsZSBjYW4gaGFuZCBvdmVyIHRoZVxuICAgIC8vIGNvbnRyb2wgdG8gc3Vic2VxdWVudCBtb2R1bGVzLCBob3dldmVyIHNpbmNlIHRoZSBwZXJmb3JtYW5jZSBpcyB0aGUgbGFzdFxuICAgIC8vIG1vZHVsZSB0byBiZSBjYWxsZWQgaW4gdGhpcyBzY2VuYXJpbywgd2UgZG9uJ3QgbmVlZCBpdCBoZXJlLlxuICAgIC8vIHRoaXMuZG9uZSgpO1xuICB9XG59XG4iXX0=