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
      // console.log(this.canvasWidth, this.canvasHeight);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBQ3VCLG1CQUFtQjs7OztBQUUxQyxJQUFNLFlBQVksR0FBRyw4QkFBVyxZQUFZLENBQUM7QUFDN0MsSUFBTSxNQUFNLEdBQUcsOEJBQVcsTUFBTSxDQUFDO0FBQ2pDLElBQU0sVUFBVSxHQUFHLDhCQUFXLFVBQVUsQ0FBQztBQUN6QyxJQUFNLFFBQVEsR0FBRyw4QkFBVyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQzdDLElBQU0sVUFBVSxHQUFHLDhCQUFXLE9BQU8sQ0FBQyxVQUFVLENBQUM7O0lBRTNDLG1CQUFtQjtZQUFuQixtQkFBbUI7O0FBQ1osV0FEUCxtQkFBbUIsQ0FDWCxFQUFFLEVBQUUsRUFBRSxFQUFFOzBCQURoQixtQkFBbUI7O0FBRXJCLCtCQUZFLG1CQUFtQiw2Q0FFZixDQUFDLEVBQUU7O0FBRVQsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7R0FDckI7O2VBTkcsbUJBQW1COztXQVFuQixnQkFBRztBQUNMLFVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUN0QixZQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQzFDLFlBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7T0FDNUM7S0FDRjs7O1dBRUssZ0JBQUMsRUFBRSxFQUFFO0FBQ1QsVUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFBRSxZQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FB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QyxXQUFHLENBQUMsTUFBTSxHQUFHLE1BQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxXQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QyxXQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7T0FDN0MsQ0FBQyxDQUFDOzs7QUFHSCxVQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQW1CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELFVBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFckMsVUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBUyxHQUFHLEVBQUUsRUFBRSxFQUFFO0FBQ3ZDLFdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNYLFdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLFdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxXQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDZixDQUFDLENBQUM7Ozs7OztLQU1KOzs7U0F6RGtCLGdCQUFnQjtHQUFTLFVBQVU7O3FCQUFuQyxnQkFBZ0IiLCJmaWxlIjoic3JjL2NsaWVudC9wbGF5ZXIvUGxheWVyRXhwZXJpZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBTb3VuZHdvcmtzIGxpYnJhcnkgKGNsaWVudCBzaWRlKVxuaW1wb3J0IHNvdW5kd29ya3MgZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG5jb25zdCBhdWRpb0NvbnRleHQgPSBzb3VuZHdvcmtzLmF1ZGlvQ29udGV4dDtcbmNvbnN0IGNsaWVudCA9IHNvdW5kd29ya3MuY2xpZW50O1xuY29uc3QgRXhwZXJpZW5jZSA9IHNvdW5kd29ya3MuRXhwZXJpZW5jZTtcbmNvbnN0IFJlbmRlcmVyID0gc291bmR3b3Jrcy5kaXNwbGF5LlJlbmRlcmVyO1xuY29uc3QgQ2FudmFzVmlldyA9IHNvdW5kd29ya3MuZGlzcGxheS5DYW52YXNWaWV3O1xuXG5jbGFzcyBQZXJmb3JtYW5jZVJlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcbiAgICBzdXBlcigwKTtcblxuICAgIHRoaXMudmVsb2NpdHlYID0gdng7IC8vIHB4IHBlciBzZWNvbmRzXG4gICAgdGhpcy52ZWxvY2l0eVkgPSB2eTsgLy8gcHggcGVyIHNlY29uZHNcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLnggfHwgIXRoaXMueSkge1xuICAgICAgdGhpcy54ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuY2FudmFzV2lkdGg7XG4gICAgICB0aGlzLnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKGR0KSB7XG4gICAgaWYgKHRoaXMueCA+PSB0aGlzLmNhbnZhc1dpZHRoIHx8IHRoaXMueCA8PSAwKSB7IHRoaXMudmVsb2NpdHlYICo9IC0xOyB9XG4gICAgaWYgKHRoaXMueSA+PSB0aGlzLmNhbnZhc0hlaWdodCB8fCB0aGlzLnkgPD0gMCkgeyB0aGlzLnZlbG9jaXR5WSAqPSAtMTsgfVxuXG4gICAgdGhpcy54ICs9ICh0aGlzLnZlbG9jaXR5WCAqIGR0KTtcbiAgICB0aGlzLnkgKz0gKHRoaXMudmVsb2NpdHlZICogZHQpO1xuICB9XG5cbiAgcmVuZGVyKGN0eCkge1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNjtcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIDQsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNhbnZhc1dpZHRoLCB0aGlzLmNhbnZhc0hlaWdodCk7XG4gIH1cbn1cblxuY29uc3QgdGVtcGxhdGUgPSBgXG4gIDxjYW52YXMgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9jYW52YXM+XG4gIDxkaXYgY2xhc3M9XCJmb3JlZ3JvdW5kXCI+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wIGZsZXgtbWlkZGxlXCI+XG4gICAgICA8cCBjbGFzcz1cImJpZ1wiPjwlPSB0aXRsZSAlPjwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b20gZmxleC1taWRkbGVcIj48L2Rpdj5cbiAgPC9kaXY+XG5gO1xuXG4vKipcbiAqIGBwbGF5ZXJgIGV4cGVyaWVuY2UuXG4gKiBUaGlzIGV4cGVyaWVuY2UgcGxheXMgYSBzb3VuZCB3aGVuIGl0IHN0YXJ0cywgYW5kIHBsYXlzIGFub3RoZXIgc291bmQgd2hlblxuICogb3RoZXIgY2xpZW50cyBqb2luIHRoZSBleHBlcmllbmNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJFeHBlcmllbmNlIGV4dGVuZHMgRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGF1ZGlvRmlsZXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53ZWxjb21lID0gdGhpcy5yZXF1aXJlKCd3ZWxjb21lJywgeyBmdWxsU2NyZWVuOiBmYWxzZSB9KTtcbiAgICB0aGlzLmxvYWRlciA9IHRoaXMucmVxdWlyZSgnbG9hZGVyJywgeyBmaWxlczogYXVkaW9GaWxlcyB9KTtcbiAgICB0aGlzLmNoZWNraW4gPSB0aGlzLnJlcXVpcmUoJ2NoZWNraW4nLCB7IHNob3dEaWFsb2c6IGZhbHNlIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXplIHRoZSB2aWV3XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIHRoaXMuY29udGVudCA9IHsgdGl0bGU6IGBMZXQncyBnbyFgIH07XG4gICAgdGhpcy52aWV3Q3RvciA9IENhbnZhc1ZpZXc7XG4gICAgdGhpcy52aWV3ID0gdGhpcy5jcmVhdGVWaWV3KCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuXG4gICAgaWYgKCF0aGlzLmhhc1N0YXJ0ZWQpXG4gICAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMuc2hvdygpO1xuXG4gICAgLy8gUGxheSB0aGUgZmlyc3QgbG9hZGVkIGJ1ZmZlciBpbW1lZGlhdGVseVxuICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzcmMuYnVmZmVyID0gdGhpcy5sb2FkZXIuYnVmZmVyc1swXTtcbiAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXG4gICAgLy8gUGxheSB0aGUgc2Vjb25kIGxvYWRlZCBidWZmZXIgd2hlbiB0aGUgbWVzc2FnZSBgcGxheWAgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLFxuICAgIC8vIHRoZSBtZXNzYWdlIGlzIHNlbmQgd2hlbiBhbm90aGVyIHBsYXllciBqb2lucyB0aGUgZXhwZXJpZW5jZS5cbiAgICB0aGlzLnJlY2VpdmUoJ3BsYXknLCAoKSA9PiB7XG4gICAgICBjb25zdCBkZWxheSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICBzcmMuYnVmZmVyID0gdGhpcy5sb2FkZXIuYnVmZmVyc1sxXTtcbiAgICAgIHNyYy5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZGVsYXkpO1xuICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSByZW5kZXJpbmdcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFBlcmZvcm1hbmNlUmVuZGVyZXIoMTAwLCAxMDApO1xuICAgIHRoaXMudmlldy5hZGRSZW5kZXJlcih0aGlzLnJlbmRlcmVyKTtcbiAgICAvLyBUaGlzIGdpdmVuIGZ1bmN0aW9uIGlzIGNhbGxlZCBiZWZvcmUgZWFjaCB1cGRhdGUgKGBSZW5kZXJlci5yZW5kZXJgKSBvZiB0aGUgY2FudmFzXG4gICAgdGhpcy52aWV3LnNldFByZVJlbmRlcihmdW5jdGlvbihjdHgsIGR0KSB7XG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4wNTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY3R4LndpZHRoLCBjdHguaGVpZ2h0KTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlIGNhbiBoYW5kIG92ZXIgdGhlXG4gICAgLy8gY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsIGhvd2V2ZXIgc2luY2UgdGhlIGV4cGVyaWVuY2UgaXMgdGhlIGxhc3RcbiAgICAvLyBtb2R1bGUgdG8gYmUgY2FsbGVkIGluIHRoaXMgc2NlbmFyaW8sIHdlIGRvbid0IG5lZWQgaXQgaGVyZS5cbiAgICAvLyB0aGlzLmRvbmUoKTtcbiAgfVxufVxuIl19