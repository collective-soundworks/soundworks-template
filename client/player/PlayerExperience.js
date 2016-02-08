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
 * `player` experience.
 * This experience plays a sound when it starts, and plays another sound when
 * other clients join the experience.
 */

var PlayerExperience = (function (_Experience) {
  _inherits(PlayerExperience, _Experience);

  function PlayerExperience(audioFiles) {
    _classCallCheck(this, PlayerExperience);

    _get(Object.getPrototypeOf(PlayerExperience.prototype), 'constructor', this).call(this);

    this.welcome = this.require('welcome', { fullScreen: false });
    this.loader = this.require('loader', { files: audioFiles });
    this.checkin = this.require('checkin', { showDialog: false });

    this.sharedConfig = this.require('shared-config');
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

      // Play the first loaded buffer immediately
      var src = audioContext.createBufferSource();
      src.buffer = this.loader.buffers[0];
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime);

      // Play the second loaded buffer when the message `play` is received from the server,
      // the message is send when another player joins the experience.
      this.receive('play', function () {
        var delay = Math.random();
        var src = audioContext.createBufferSource();
        src.buffer = _this.loader.buffers[1];
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime + delay);
      });

      // Initialize rendering
      this.renderer = new PerformanceRenderer(100, 100);
      this.view.addRenderer(this.renderer);
      // This given function is called before each update (`Renderer.render`) of the canvas
      this.view.setPreRender(function (ctx, dt) {
        ctx.save();
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, ctx.width, ctx.height);
        ctx.restore();
      });

      // We would usually call the 'done' method when the module can hand over the
      // control to subsequent modules, however since the experience is the last
      // module to be called in this scenario, we don't need it here.
      // this.done();
    }
  }]);

  return PlayerExperience;
})(Experience);

exports['default'] = PlayerExperience;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBQ3VCLG1CQUFtQjs7OztBQUUxQyxJQUFNLFlBQVksR0FBRyw4QkFBVyxZQUFZLENBQUM7QUFDN0MsSUFBTSxNQUFNLEdBQUcsOEJBQVcsTUFBTSxDQUFDO0FBQ2pDLElBQU0sVUFBVSxHQUFHLDhCQUFXLFVBQVUsQ0FBQztBQUN6QyxJQUFNLFFBQVEsR0FBRyw4QkFBVyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQzdDLElBQU0sVUFBVSxHQUFHLDhCQUFXLE9BQU8sQ0FBQyxVQUFVLENBQUM7O0lBRTNDLG1CQUFtQjtZQUFuQixtQkFBbUI7O0FBQ1osV0FEUCxtQkFBbUIsQ0FDWCxFQUFFLEVBQUUsRUFBRSxFQUFFOzBCQURoQixtQkFBbUI7O0FBRXJCLCtCQUZFLG1CQUFtQiw2Q0FFZixDQUFDLEVBQUU7O0FBRVQsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7R0FDckI7O2VBTkcsbUJBQW1COztXQVFuQixnQkFBRztBQUNMLFVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUN0QixZQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQzFDLFlBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7T0FDNUM7S0FDRjs7O1dBRUssZ0JBQUMsRUFBRSxFQUFFO0FBQ1QsVUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFBRSxZQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FB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QUFFLENBQUM7QUFDNUIsWUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDOUMsV0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsV0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEMsV0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO09BQzdDLENBQUMsQ0FBQzs7O0FBR0gsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsRCxVQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRXJDLFVBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVMsR0FBRyxFQUFFLEVBQUUsRUFBRTtBQUN2QyxXQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWCxXQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN2QixXQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQixXQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUMsV0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO09BQ2YsQ0FBQyxDQUFDOzs7Ozs7S0FNSjs7O1NBM0RrQixnQkFBZ0I7R0FBUyxVQUFVOztxQkFBbkMsZ0JBQWdCIiwiZmlsZSI6InNyYy9jbGllbnQvcGxheWVyL1BsYXllckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBsaWJyYXJ5IChjbGllbnQgc2lkZSlcbmltcG9ydCBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY29uc3QgYXVkaW9Db250ZXh0ID0gc291bmR3b3Jrcy5hdWRpb0NvbnRleHQ7XG5jb25zdCBjbGllbnQgPSBzb3VuZHdvcmtzLmNsaWVudDtcbmNvbnN0IEV4cGVyaWVuY2UgPSBzb3VuZHdvcmtzLkV4cGVyaWVuY2U7XG5jb25zdCBSZW5kZXJlciA9IHNvdW5kd29ya3MuZGlzcGxheS5SZW5kZXJlcjtcbmNvbnN0IENhbnZhc1ZpZXcgPSBzb3VuZHdvcmtzLmRpc3BsYXkuQ2FudmFzVmlldztcblxuY2xhc3MgUGVyZm9ybWFuY2VSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IodngsIHZ5KSB7XG4gICAgc3VwZXIoMCk7XG5cbiAgICB0aGlzLnZlbG9jaXR5WCA9IHZ4OyAvLyBweCBwZXIgc2Vjb25kc1xuICAgIHRoaXMudmVsb2NpdHlZID0gdnk7IC8vIHB4IHBlciBzZWNvbmRzXG4gIH1cblxuICBpbml0KCkge1xuICAgIGlmICghdGhpcy54IHx8ICF0aGlzLnkpIHtcbiAgICAgIHRoaXMueCA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhc1dpZHRoO1xuICAgICAgdGhpcy55ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuY2FudmFzSGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShkdCkge1xuICAgIGlmICh0aGlzLnggPj0gdGhpcy5jYW52YXNXaWR0aCB8fCB0aGlzLnggPD0gMCkgeyB0aGlzLnZlbG9jaXR5WCAqPSAtMTsgfVxuICAgIGlmICh0aGlzLnkgPj0gdGhpcy5jYW52YXNIZWlnaHQgfHwgdGhpcy55IDw9IDApIHsgdGhpcy52ZWxvY2l0eVkgKj0gLTE7IH1cblxuICAgIHRoaXMueCArPSAodGhpcy52ZWxvY2l0eVggKiBkdCk7XG4gICAgdGhpcy55ICs9ICh0aGlzLnZlbG9jaXR5WSAqIGR0KTtcbiAgfVxuXG4gIHJlbmRlcihjdHgpIHtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjY7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCA0LCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cblxuY29uc3QgdGVtcGxhdGUgPSBgXG4gIDxjYW52YXMgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9jYW52YXM+XG4gIDxkaXYgY2xhc3M9XCJmb3JlZ3JvdW5kXCI+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wIGZsZXgtbWlkZGxlXCI+XG4gICAgICA8cCBjbGFzcz1cImJpZ1wiPjwlPSB0aXRsZSAlPjwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b20gZmxleC1taWRkbGVcIj48L2Rpdj5cbiAgPC9kaXY+XG5gO1xuXG4vKipcbiAqIGBwbGF5ZXJgIGV4cGVyaWVuY2UuXG4gKiBUaGlzIGV4cGVyaWVuY2UgcGxheXMgYSBzb3VuZCB3aGVuIGl0IHN0YXJ0cywgYW5kIHBsYXlzIGFub3RoZXIgc291bmQgd2hlblxuICogb3RoZXIgY2xpZW50cyBqb2luIHRoZSBleHBlcmllbmNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJFeHBlcmllbmNlIGV4dGVuZHMgRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGF1ZGlvRmlsZXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53ZWxjb21lID0gdGhpcy5yZXF1aXJlKCd3ZWxjb21lJywgeyBmdWxsU2NyZWVuOiBmYWxzZSB9KTtcbiAgICB0aGlzLmxvYWRlciA9IHRoaXMucmVxdWlyZSgnbG9hZGVyJywgeyBmaWxlczogYXVkaW9GaWxlcyB9KTtcbiAgICB0aGlzLmNoZWNraW4gPSB0aGlzLnJlcXVpcmUoJ2NoZWNraW4nLCB7IHNob3dEaWFsb2c6IGZhbHNlIH0pO1xuXG4gICAgdGhpcy5zaGFyZWRDb25maWcgPSB0aGlzLnJlcXVpcmUoJ3NoYXJlZC1jb25maWcnKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgdmlld1xuICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLmNvbnRlbnQgPSB7IHRpdGxlOiBgTGV0J3MgZ28hYCB9O1xuICAgIHRoaXMudmlld0N0b3IgPSBDYW52YXNWaWV3O1xuICAgIHRoaXMudmlldyA9IHRoaXMuY3JlYXRlVmlldygpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcblxuICAgIGlmICghdGhpcy5oYXNTdGFydGVkKVxuICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICB0aGlzLnNob3coKTtcblxuICAgIC8vIFBsYXkgdGhlIGZpcnN0IGxvYWRlZCBidWZmZXIgaW1tZWRpYXRlbHlcbiAgICBjb25zdCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgc3JjLmJ1ZmZlciA9IHRoaXMubG9hZGVyLmJ1ZmZlcnNbMF07XG4gICAgc3JjLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcblxuICAgIC8vIFBsYXkgdGhlIHNlY29uZCBsb2FkZWQgYnVmZmVyIHdoZW4gdGhlIG1lc3NhZ2UgYHBsYXlgIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlcixcbiAgICAvLyB0aGUgbWVzc2FnZSBpcyBzZW5kIHdoZW4gYW5vdGhlciBwbGF5ZXIgam9pbnMgdGhlIGV4cGVyaWVuY2UuXG4gICAgdGhpcy5yZWNlaXZlKCdwbGF5JywgKCkgPT4ge1xuICAgICAgY29uc3QgZGVsYXkgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3Qgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMubG9hZGVyLmJ1ZmZlcnNbMV07XG4gICAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGRlbGF5KTtcbiAgICB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgcmVuZGVyaW5nXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQZXJmb3JtYW5jZVJlbmRlcmVyKDEwMCwgMTAwKTtcbiAgICB0aGlzLnZpZXcuYWRkUmVuZGVyZXIodGhpcy5yZW5kZXJlcik7XG4gICAgLy8gVGhpcyBnaXZlbiBmdW5jdGlvbiBpcyBjYWxsZWQgYmVmb3JlIGVhY2ggdXBkYXRlIChgUmVuZGVyZXIucmVuZGVyYCkgb2YgdGhlIGNhbnZhc1xuICAgIHRoaXMudmlldy5zZXRQcmVSZW5kZXIoZnVuY3Rpb24oY3R4LCBkdCkge1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMDU7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC53aWR0aCwgY3R4LmhlaWdodCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gV2Ugd291bGQgdXN1YWxseSBjYWxsIHRoZSAnZG9uZScgbWV0aG9kIHdoZW4gdGhlIG1vZHVsZSBjYW4gaGFuZCBvdmVyIHRoZVxuICAgIC8vIGNvbnRyb2wgdG8gc3Vic2VxdWVudCBtb2R1bGVzLCBob3dldmVyIHNpbmNlIHRoZSBleHBlcmllbmNlIGlzIHRoZSBsYXN0XG4gICAgLy8gbW9kdWxlIHRvIGJlIGNhbGxlZCBpbiB0aGlzIHNjZW5hcmlvLCB3ZSBkb24ndCBuZWVkIGl0IGhlcmUuXG4gICAgLy8gdGhpcy5kb25lKCk7XG4gIH1cbn1cbiJdfQ==