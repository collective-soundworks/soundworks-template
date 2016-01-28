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

var PlayerPerformance = (function (_Experience) {
  _inherits(PlayerPerformance, _Experience);

  function PlayerPerformance(loader) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, PlayerPerformance);

    _get(Object.getPrototypeOf(PlayerPerformance.prototype), 'constructor', this).call(this, options);

    this.welcome = this.require('welcome', { fullScreen: false });
    this.loader = this.require('loader', { files: audioFiles });
    this.checkin = this.require('checkin', { showDialog: false });

    this.init();
  }

  _createClass(PlayerPerformance, [{
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

      _get(Object.getPrototypeOf(PlayerPerformance.prototype), 'start', this).call(this); // don't forget this

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

  return PlayerPerformance;
})(Experience);

exports['default'] = PlayerPerformance;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUN1QixtQkFBbUI7Ozs7QUFFMUMsSUFBTSxZQUFZLEdBQUcsOEJBQVcsWUFBWSxDQUFDO0FBQzdDLElBQU0sTUFBTSxHQUFHLDhCQUFXLE1BQU0sQ0FBQztBQUNqQyxJQUFNLFVBQVUsR0FBRyw4QkFBVyxVQUFVLENBQUM7QUFDekMsSUFBTSxRQUFRLEdBQUcsOEJBQVcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUM3QyxJQUFNLFVBQVUsR0FBRyw4QkFBVyxPQUFPLENBQUMsVUFBVSxDQUFDOztJQUUzQyxtQkFBbUI7WUFBbkIsbUJBQW1COztBQUNaLFdBRFAsbUJBQW1CLENBQ1gsRUFBRSxFQUFFLEVBQUUsRUFBRTswQkFEaEIsbUJBQW1COztBQUVyQiwrQkFGRSxtQkFBbUIsNkNBRWYsQ0FBQyxFQUFFOztBQUVULFFBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0dBQ3JCOztlQU5HLG1CQUFtQjs7V0FRbkIsZ0JBQUc7QUFDTCxVQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDdEIsWUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUMxQyxZQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO09BQzVDO0tBQ0Y7OztXQUVLLGdCQUFDLEVBQUUsRUFBRTtBQUNULFVBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQUUsWUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENB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QU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsV0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEMsV0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO09BQzdDLENBQUMsQ0FBQzs7O0FBR0gsVUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBUyxHQUFHLEVBQUUsRUFBRSxFQUFFO0FBQ3ZDLFdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNYLFdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLFdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxXQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDZixDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsRCxVQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztLQU10Qzs7O1NBdERrQixpQkFBaUI7R0FBUyxVQUFVOztxQkFBcEMsaUJBQWlCIiwiZmlsZSI6InNyYy9jbGllbnQvcGxheWVyL1BsYXllclBlcmZvcm1hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbGlicmFyeSAoY2xpZW50IHNpZGUpXG5pbXBvcnQgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbmNvbnN0IGF1ZGlvQ29udGV4dCA9IHNvdW5kd29ya3MuYXVkaW9Db250ZXh0O1xuY29uc3QgY2xpZW50ID0gc291bmR3b3Jrcy5jbGllbnQ7XG5jb25zdCBFeHBlcmllbmNlID0gc291bmR3b3Jrcy5FeHBlcmllbmNlO1xuY29uc3QgUmVuZGVyZXIgPSBzb3VuZHdvcmtzLmRpc3BsYXkuUmVuZGVyZXI7XG5jb25zdCBDYW52YXNWaWV3ID0gc291bmR3b3Jrcy5kaXNwbGF5LkNhbnZhc1ZpZXc7XG5cbmNsYXNzIFBlcmZvcm1hbmNlUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xuICAgIHN1cGVyKDApO1xuXG4gICAgdGhpcy52ZWxvY2l0eVggPSB2eDsgLy8gcHggcGVyIHNlY29uZHNcbiAgICB0aGlzLnZlbG9jaXR5WSA9IHZ5OyAvLyBweCBwZXIgc2Vjb25kc1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMueCB8fCAhdGhpcy55KSB7XG4gICAgICB0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXNXaWR0aDtcbiAgICAgIHRoaXMueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoZHQpIHtcbiAgICBpZiAodGhpcy54ID49IHRoaXMuY2FudmFzV2lkdGggfHwgdGhpcy54IDw9IDApIHsgdGhpcy52ZWxvY2l0eVggKj0gLTE7IH1cbiAgICBpZiAodGhpcy55ID49IHRoaXMuY2FudmFzSGVpZ2h0IHx8IHRoaXMueSA8PSAwKSB7IHRoaXMudmVsb2NpdHlZICo9IC0xOyB9XG5cbiAgICB0aGlzLnggKz0gKHRoaXMudmVsb2NpdHlYICogZHQpO1xuICAgIHRoaXMueSArPSAodGhpcy52ZWxvY2l0eVkgKiBkdCk7XG4gIH1cblxuICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC42O1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgNCwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG59XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuICA8Y2FudmFzIGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvY2FudmFzPlxuICA8ZGl2IGNsYXNzPVwiZm9yZWdyb3VuZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgICAgPHAgY2xhc3M9XCJiaWdcIj48JT0gdGl0bGUgJT48L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcblxuLyoqXG4gKiAnYHBsYXllcmAnIHBlcmZvcm1hbmNlIG1vZHVsZSAoY2xpZW50IHNpZGUpLlxuICogVGhpcyBwZXJmb3JtYW5jZSBwbGF5cyBhIHNvdW5kIHdoZW4gaXQgc3RhcnRzLCBhbmQgcGxheXMgYW5vdGhlciBzb3VuZCB3aGVuXG4gKiBvdGhlciBjbGllbnRzIGpvaW4gdGhlIHBlcmZvcm1hbmNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJQZXJmb3JtYW5jZSBleHRlbmRzIEV4cGVyaWVuY2Uge1xuICBjb25zdHJ1Y3Rvcihsb2FkZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy53ZWxjb21lID0gdGhpcy5yZXF1aXJlKCd3ZWxjb21lJywgeyBmdWxsU2NyZWVuOiBmYWxzZSB9KTtcbiAgICB0aGlzLmxvYWRlciA9IHRoaXMucmVxdWlyZSgnbG9hZGVyJywgeyBmaWxlczogYXVkaW9GaWxlcyB9KTtcbiAgICB0aGlzLmNoZWNraW4gPSB0aGlzLnJlcXVpcmUoJ2NoZWNraW4nLCB7IHNob3dEaWFsb2c6IGZhbHNlIH0pO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIHZpZXdcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgdGhpcy5jb250ZW50ID0geyB0aXRsZTogYExldCdzIGdvIWAgfTtcbiAgICB0aGlzLnZpZXdDdG9yID0gQ2FudmFzVmlldztcbiAgICB0aGlzLnZpZXcgPSB0aGlzLmNyZWF0ZVZpZXcoKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7IC8vIGRvbid0IGZvcmdldCB0aGlzXG5cbiAgICAvLyBQbGF5IHRoZSB3ZWxjb21lIHNvdW5kIGltbWVkaWF0ZWx5XG4gICAgY29uc3Qgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHNyYy5idWZmZXIgPSB0aGlzLmxvYWRlci5idWZmZXJzWzBdOyAvLyBnZXQgZmlyc3QgYnVmZmVyIGZyb20gbG9hZGVyXG4gICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcblxuICAgIC8vIFBsYXkgYW5vdGhlciBzb3VuZCB3aGVuIHdlIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciAodGhhdFxuICAgIC8vIGluZGljYXRlcyB0aGF0IGFub3RoZXIgY2xpZW50IGpvaW5lZCB0aGUgcGVyZm9ybWFuY2UpXG4gICAgdGhpcy5yZWNlaXZlKCdwbGF5JywgKCkgPT4ge1xuICAgICAgY29uc3QgZGVsYXkgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3Qgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMubG9hZGVyLmJ1ZmZlcnNbMV07IC8vIGdldCBzZWNvbmQgYnVmZmVyIGZyb20gbG9hZGVyXG4gICAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGRlbGF5KTtcbiAgICB9KTtcblxuICAgIC8vIGluaXRpYWxpemUgcmVuZGVyaW5nXG4gICAgdGhpcy52aWV3LnNldFByZVJlbmRlcihmdW5jdGlvbihjdHgsIGR0KSB7XG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4wNTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY3R4LndpZHRoLCBjdHguaGVpZ2h0KTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFBlcmZvcm1hbmNlUmVuZGVyZXIoMTAwLCAxMDApO1xuICAgIHRoaXMudmlldy5hZGRSZW5kZXJlcih0aGlzLnJlbmRlcmVyKTtcblxuICAgIC8vIFdlIHdvdWxkIHVzdWFsbHkgY2FsbCB0aGUgJ2RvbmUnIG1ldGhvZCB3aGVuIHRoZSBtb2R1bGUgY2FuIGhhbmQgb3ZlciB0aGVcbiAgICAvLyBjb250cm9sIHRvIHN1YnNlcXVlbnQgbW9kdWxlcywgaG93ZXZlciBzaW5jZSB0aGUgcGVyZm9ybWFuY2UgaXMgdGhlIGxhc3RcbiAgICAvLyBtb2R1bGUgdG8gYmUgY2FsbGVkIGluIHRoaXMgc2NlbmFyaW8sIHdlIGRvbid0IG5lZWQgaXQgaGVyZS5cbiAgICAvLyB0aGlzLmRvbmUoKTtcbiAgfVxufVxuIl19