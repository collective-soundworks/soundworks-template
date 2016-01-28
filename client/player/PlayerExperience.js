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
var Experience = _soundworksClient2['default'].Experience;
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

var PlayerExperience = (function (_Experience) {
  _inherits(PlayerExperience, _Experience);

  function PlayerExperience(audioFiles) {
    _classCallCheck(this, PlayerExperience);

    _get(Object.getPrototypeOf(PlayerExperience.prototype), 'constructor', this).call(this);

    this.welcome = this.require('welcome', { fullScreen: false });
    this.loader = this.require('loader', { files: audioFiles });
    this.checkin = this.require('checkin', { showDialog: false });

    this.init();
  }

  _createClass(PlayerExperience, [{
    key: 'init',
    value: function init() {
      // Initialize the view
      this.template = template;
      this.content = { title: 'Let\'s go!' };
      this.viewCtor = CanvasView;
      this.view = this.createView();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      _get(Object.getPrototypeOf(PlayerExperience.prototype), 'start', this).call(this); // don't forget this

      if (!this.hasStarted) this.init();

      this.show();
      // Play the welcome sound immediately
      var src = audioContext.createBufferSource();
      src.buffer = this.loader.buffers[0]; // get first buffer from loader
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime);

      // Play another sound when we receive a message from the server (that
      // indicates that another client joined the performance)
      this.receive('play', function () {
        var delay = Math.random();
        var src = audioContext.createBufferSource();
        src.buffer = _this.loader.buffers[1]; // get second buffer from loader
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

  return PlayerExperience;
})(Experience);

exports['default'] = PlayerExperience;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBQ3VCLG1CQUFtQjs7OztBQUUxQyxJQUFNLFlBQVksR0FBRyw4QkFBVyxZQUFZLENBQUM7QUFDN0MsSUFBTSxNQUFNLEdBQUcsOEJBQVcsTUFBTSxDQUFDO0FBQ2pDLElBQU0sVUFBVSxHQUFHLDhCQUFXLFVBQVUsQ0FBQztBQUN6QyxJQUFNLFFBQVEsR0FBRyw4QkFBVyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQzdDLElBQU0sVUFBVSxHQUFHLDhCQUFXLE9BQU8sQ0FBQyxVQUFVLENBQUM7O0lBRTNDLG1CQUFtQjtZQUFuQixtQkFBbUI7O0FBQ1osV0FEUCxtQkFBbUIsQ0FDWCxFQUFFLEVBQUUsRUFBRSxFQUFFOzBCQURoQixtQkFBbUI7O0FBRXJCLCtCQUZFLG1CQUFtQiw2Q0FFZixDQUFDLEVBQUU7O0FBRVQsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7R0FDckI7O2VBTkcsbUJBQW1COztXQVFuQixnQkFBRztBQUNMLFVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUN0QixZQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQzFDLFlBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7T0FDNUM7S0FDRjs7O1dBRUssZ0JBQUMsRUFBRSxFQUFFO0FBQ1QsVUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFBRSxZQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FB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QVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzlDLFdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLFdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQztPQUM3QyxDQUFDLENBQUM7OztBQUdILFVBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVMsR0FBRyxFQUFFLEVBQUUsRUFBRTtBQUN2QyxXQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWCxXQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN2QixXQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQixXQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUMsV0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO09BQ2YsQ0FBQyxDQUFDOztBQUVILFVBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbEQsVUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7S0FNdEM7OztTQTFEa0IsZ0JBQWdCO0dBQVMsVUFBVTs7cUJBQW5DLGdCQUFnQiIsImZpbGUiOiJzcmMvY2xpZW50L3BsYXllci9QbGF5ZXJFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbGlicmFyeSAoY2xpZW50IHNpZGUpXG5pbXBvcnQgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbmNvbnN0IGF1ZGlvQ29udGV4dCA9IHNvdW5kd29ya3MuYXVkaW9Db250ZXh0O1xuY29uc3QgY2xpZW50ID0gc291bmR3b3Jrcy5jbGllbnQ7XG5jb25zdCBFeHBlcmllbmNlID0gc291bmR3b3Jrcy5FeHBlcmllbmNlO1xuY29uc3QgUmVuZGVyZXIgPSBzb3VuZHdvcmtzLmRpc3BsYXkuUmVuZGVyZXI7XG5jb25zdCBDYW52YXNWaWV3ID0gc291bmR3b3Jrcy5kaXNwbGF5LkNhbnZhc1ZpZXc7XG5cbmNsYXNzIFBlcmZvcm1hbmNlUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xuICAgIHN1cGVyKDApO1xuXG4gICAgdGhpcy52ZWxvY2l0eVggPSB2eDsgLy8gcHggcGVyIHNlY29uZHNcbiAgICB0aGlzLnZlbG9jaXR5WSA9IHZ5OyAvLyBweCBwZXIgc2Vjb25kc1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMueCB8fCAhdGhpcy55KSB7XG4gICAgICB0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXNXaWR0aDtcbiAgICAgIHRoaXMueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoZHQpIHtcbiAgICBpZiAodGhpcy54ID49IHRoaXMuY2FudmFzV2lkdGggfHwgdGhpcy54IDw9IDApIHsgdGhpcy52ZWxvY2l0eVggKj0gLTE7IH1cbiAgICBpZiAodGhpcy55ID49IHRoaXMuY2FudmFzSGVpZ2h0IHx8IHRoaXMueSA8PSAwKSB7IHRoaXMudmVsb2NpdHlZICo9IC0xOyB9XG5cbiAgICB0aGlzLnggKz0gKHRoaXMudmVsb2NpdHlYICogZHQpO1xuICAgIHRoaXMueSArPSAodGhpcy52ZWxvY2l0eVkgKiBkdCk7XG4gIH1cblxuICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC42O1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgNCwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG59XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuICA8Y2FudmFzIGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvY2FudmFzPlxuICA8ZGl2IGNsYXNzPVwiZm9yZWdyb3VuZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgICAgPHAgY2xhc3M9XCJiaWdcIj48JT0gdGl0bGUgJT48L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcblxuLyoqXG4gKiAnYHBsYXllcmAnIHBlcmZvcm1hbmNlIG1vZHVsZSAoY2xpZW50IHNpZGUpLlxuICogVGhpcyBwZXJmb3JtYW5jZSBwbGF5cyBhIHNvdW5kIHdoZW4gaXQgc3RhcnRzLCBhbmQgcGxheXMgYW5vdGhlciBzb3VuZCB3aGVuXG4gKiBvdGhlciBjbGllbnRzIGpvaW4gdGhlIHBlcmZvcm1hbmNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJFeHBlcmllbmNlIGV4dGVuZHMgRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGF1ZGlvRmlsZXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53ZWxjb21lID0gdGhpcy5yZXF1aXJlKCd3ZWxjb21lJywgeyBmdWxsU2NyZWVuOiBmYWxzZSB9KTtcbiAgICB0aGlzLmxvYWRlciA9IHRoaXMucmVxdWlyZSgnbG9hZGVyJywgeyBmaWxlczogYXVkaW9GaWxlcyB9KTtcbiAgICB0aGlzLmNoZWNraW4gPSB0aGlzLnJlcXVpcmUoJ2NoZWNraW4nLCB7IHNob3dEaWFsb2c6IGZhbHNlIH0pO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIHZpZXdcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgdGhpcy5jb250ZW50ID0geyB0aXRsZTogYExldCdzIGdvIWAgfTtcbiAgICB0aGlzLnZpZXdDdG9yID0gQ2FudmFzVmlldztcbiAgICB0aGlzLnZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG5cbiAgICBpZiAoIXRoaXMuaGFzU3RhcnRlZClcbiAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5zaG93KCk7XG4gICAgLy8gUGxheSB0aGUgd2VsY29tZSBzb3VuZCBpbW1lZGlhdGVseVxuICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzcmMuYnVmZmVyID0gdGhpcy5sb2FkZXIuYnVmZmVyc1swXTsgLy8gZ2V0IGZpcnN0IGJ1ZmZlciBmcm9tIGxvYWRlclxuICAgIHNyYy5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG5cbiAgICAvLyBQbGF5IGFub3RoZXIgc291bmQgd2hlbiB3ZSByZWNlaXZlIGEgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXIgKHRoYXRcbiAgICAvLyBpbmRpY2F0ZXMgdGhhdCBhbm90aGVyIGNsaWVudCBqb2luZWQgdGhlIHBlcmZvcm1hbmNlKVxuICAgIHRoaXMucmVjZWl2ZSgncGxheScsICgpID0+IHtcbiAgICAgIGNvbnN0IGRlbGF5ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgIHNyYy5idWZmZXIgPSB0aGlzLmxvYWRlci5idWZmZXJzWzFdOyAvLyBnZXQgc2Vjb25kIGJ1ZmZlciBmcm9tIGxvYWRlclxuICAgICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkZWxheSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbml0aWFsaXplIHJlbmRlcmluZ1xuICAgIHRoaXMudmlldy5zZXRQcmVSZW5kZXIoZnVuY3Rpb24oY3R4LCBkdCkge1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMDU7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC53aWR0aCwgY3R4LmhlaWdodCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQZXJmb3JtYW5jZVJlbmRlcmVyKDEwMCwgMTAwKTtcbiAgICB0aGlzLnZpZXcuYWRkUmVuZGVyZXIodGhpcy5yZW5kZXJlcik7XG5cbiAgICAvLyBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlIGNhbiBoYW5kIG92ZXIgdGhlXG4gICAgLy8gY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsIGhvd2V2ZXIgc2luY2UgdGhlIHBlcmZvcm1hbmNlIGlzIHRoZSBsYXN0XG4gICAgLy8gbW9kdWxlIHRvIGJlIGNhbGxlZCBpbiB0aGlzIHNjZW5hcmlvLCB3ZSBkb24ndCBuZWVkIGl0IGhlcmUuXG4gICAgLy8gdGhpcy5kb25lKCk7XG4gIH1cbn1cbiJdfQ==