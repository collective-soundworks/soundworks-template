// Require the Soundworks library (client side)
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var soundworks = require('soundworks/client');
var client = soundworks.client;
var audioContext = soundworks.audioContext;

// Initiliaze the client with its type
client.init('player');

var MyPerformance = (function (_soundworks$ClientPerformance) {
  _inherits(MyPerformance, _soundworks$ClientPerformance);

  function MyPerformance(loader) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, MyPerformance);

    _get(Object.getPrototypeOf(MyPerformance.prototype), 'constructor', this).call(this, options);
    this.loader = loader; // the loader module
  }

  _createClass(MyPerformance, [{
    key: 'start',
    value: function start() {
      var _this = this;

      _get(Object.getPrototypeOf(MyPerformance.prototype), 'start', this).call(this); // don't forget this

      // Play the welcome sound immediately
      var src = audioContext.createBufferSource();
      src.buffer = this.loader.buffers[0]; // get the first audio buffer from the loader
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime);

      // Play another sound when we receive the 'play' message from the server
      this.receive('play', function () {
        setTimeout(function () {
          var src = audioContext.createBufferSource();
          src.buffer = _this.loader.buffers[1]; // get the second audioBuffer from the loader
          src.connect(audioContext.destination);
          src.start(audioContext.currentTime);
        }, parseInt(Math.random() * 1000, 10));
      });

      // display some feedback text in the view
      this.setCenteredViewContent('Let’s go!'); //

      /* We would usually call the 'done' method when the module
       * can hand over the control to subsequent modules,
       * however since the performance is the last module to be called
       * in this scenario, we don't need it here.
       */
      // this.done();
    }
  }]);

  return MyPerformance;
})(soundworks.ClientPerformance);

var files = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];

// Where the magic happens
window.addEventListener('load', function () {
  // Instantiate the modules
  var welcome = new soundworks.Dialog({
    name: 'welcome',
    text: "<p>Welcome to <b>My Scenario</b>.</p> <p>Touch the screen to join!</p>",
    activateAudio: true
  });
  var checkin = new soundworks.ClientCheckin();
  var loader = new soundworks.Loader({ files: files });
  var performance = new MyPerformance(loader);

  // Start the scenario and link the modules
  client.start(function (seq, par) {
    return seq(
    // we launch in parallel the welcome module, the loading of the files, and the checkin
    par(welcome, loader, checkin),
    // when all of them are done, we launch the performance
    performance);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDaEQsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUNqQyxJQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDOzs7QUFHN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7SUFFaEIsYUFBYTtZQUFiLGFBQWE7O0FBQ04sV0FEUCxhQUFhLENBQ0wsTUFBTSxFQUFnQjtRQUFkLE9BQU8seURBQUcsRUFBRTs7MEJBRDVCLGFBQWE7O0FBRWYsK0JBRkUsYUFBYSw2Q0FFVCxPQUFPLEVBQUU7QUFDZixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztHQUN0Qjs7ZUFKRyxhQUFhOztXQU1aLGlCQUFHOzs7QUFDTixpQ0FQRSxhQUFhLHVDQU9EOzs7QUFHZCxVQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUM1QyxTQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFNBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLFNBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7QUFHcEMsVUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBTTtBQUN6QixrQkFBVSxDQUFDLFlBQU07QUFDZixjQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUM1QyxhQUFHLENBQUMsTUFBTSxHQUFHLE1BQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxhQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QyxhQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7T0FDeEMsQ0FBQyxDQUFDOzs7QUFHSCxVQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7O0tBUTFDOzs7U0FsQ0csYUFBYTtHQUFTLFVBQVUsQ0FBQyxpQkFBaUI7O0FBcUN4RCxJQUFNLEtBQUssR0FBRyxDQUFDLDBCQUEwQixFQUFFLHlCQUF5QixDQUFDLENBQUM7OztBQUd0RSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFlBQU07O0FBRXBDLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUNwQyxRQUFJLEVBQUUsU0FBUztBQUNmLFFBQUksRUFBRSx3RUFBd0U7QUFDOUUsaUJBQWEsRUFBRSxJQUFJO0dBQ3BCLENBQUMsQ0FBQztBQUNILE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sV0FBVyxHQUFHLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHOUMsUUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDekIsV0FBTyxHQUFHOztBQUVSLE9BQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQzs7QUFFN0IsZUFBVyxDQUNaLENBQUM7R0FDSCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoic3JjL2NsaWVudC9wbGF5ZXIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBSZXF1aXJlIHRoZSBTb3VuZHdvcmtzIGxpYnJhcnkgKGNsaWVudCBzaWRlKVxuY29uc3Qgc291bmR3b3JrcyA9IHJlcXVpcmUoJ3NvdW5kd29ya3MvY2xpZW50Jyk7XG5jb25zdCBjbGllbnQgPSBzb3VuZHdvcmtzLmNsaWVudDtcbmNvbnN0IGF1ZGlvQ29udGV4dCA9IHNvdW5kd29ya3MuYXVkaW9Db250ZXh0O1xuXG4vLyBJbml0aWxpYXplIHRoZSBjbGllbnQgd2l0aCBpdHMgdHlwZVxuY2xpZW50LmluaXQoJ3BsYXllcicpO1xuXG5jbGFzcyBNeVBlcmZvcm1hbmNlIGV4dGVuZHMgc291bmR3b3Jrcy5DbGllbnRQZXJmb3JtYW5jZSB7XG4gIGNvbnN0cnVjdG9yKGxvYWRlciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5sb2FkZXIgPSBsb2FkZXI7IC8vIHRoZSBsb2FkZXIgbW9kdWxlXG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuXG4gICAgLy8gUGxheSB0aGUgd2VsY29tZSBzb3VuZCBpbW1lZGlhdGVseVxuICAgIGxldCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgc3JjLmJ1ZmZlciA9IHRoaXMubG9hZGVyLmJ1ZmZlcnNbMF07IC8vIGdldCB0aGUgZmlyc3QgYXVkaW8gYnVmZmVyIGZyb20gdGhlIGxvYWRlclxuICAgIHNyYy5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG5cbiAgICAvLyBQbGF5IGFub3RoZXIgc291bmQgd2hlbiB3ZSByZWNlaXZlIHRoZSAncGxheScgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXJcbiAgICB0aGlzLnJlY2VpdmUoJ3BsYXknLCAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbGV0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMubG9hZGVyLmJ1ZmZlcnNbMV07IC8vIGdldCB0aGUgc2Vjb25kIGF1ZGlvQnVmZmVyIGZyb20gdGhlIGxvYWRlclxuICAgICAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcbiAgICAgIH0sIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMDAwLCAxMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gZGlzcGxheSBzb21lIGZlZWRiYWNrIHRleHQgaW4gdGhlIHZpZXdcbiAgICB0aGlzLnNldENlbnRlcmVkVmlld0NvbnRlbnQoJ0xldOKAmXMgZ28hJyk7IC8vXG5cbiAgICAvKiBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlXG4gICAgICogY2FuIGhhbmQgb3ZlciB0aGUgY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsXG4gICAgICogaG93ZXZlciBzaW5jZSB0aGUgcGVyZm9ybWFuY2UgaXMgdGhlIGxhc3QgbW9kdWxlIHRvIGJlIGNhbGxlZFxuICAgICAqIGluIHRoaXMgc2NlbmFyaW8sIHdlIGRvbid0IG5lZWQgaXQgaGVyZS5cbiAgICAgKi9cbiAgICAvLyB0aGlzLmRvbmUoKTtcbiAgfVxufVxuXG5jb25zdCBmaWxlcyA9IFsnc291bmRzL3NvdW5kLXdlbGNvbWUubXAzJywgJ3NvdW5kcy9zb3VuZC1vdGhlcnMubXAzJ107XG5cbi8vIFdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgLy8gSW5zdGFudGlhdGUgdGhlIG1vZHVsZXNcbiAgY29uc3Qgd2VsY29tZSA9IG5ldyBzb3VuZHdvcmtzLkRpYWxvZyh7XG4gICAgbmFtZTogJ3dlbGNvbWUnLFxuICAgIHRleHQ6IFwiPHA+V2VsY29tZSB0byA8Yj5NeSBTY2VuYXJpbzwvYj4uPC9wPiA8cD5Ub3VjaCB0aGUgc2NyZWVuIHRvIGpvaW4hPC9wPlwiLFxuICAgIGFjdGl2YXRlQXVkaW86IHRydWVcbiAgfSk7XG4gIGNvbnN0IGNoZWNraW4gPSBuZXcgc291bmR3b3Jrcy5DbGllbnRDaGVja2luKCk7XG4gIGNvbnN0IGxvYWRlciA9IG5ldyBzb3VuZHdvcmtzLkxvYWRlcih7IGZpbGVzIH0pO1xuICBjb25zdCBwZXJmb3JtYW5jZSA9IG5ldyBNeVBlcmZvcm1hbmNlKGxvYWRlcik7XG5cbiAgLy8gU3RhcnQgdGhlIHNjZW5hcmlvIGFuZCBsaW5rIHRoZSBtb2R1bGVzXG4gIGNsaWVudC5zdGFydCgoc2VxLCBwYXIpID0+IHtcbiAgICByZXR1cm4gc2VxKFxuICAgICAgLy8gd2UgbGF1bmNoIGluIHBhcmFsbGVsIHRoZSB3ZWxjb21lIG1vZHVsZSwgdGhlIGxvYWRpbmcgb2YgdGhlIGZpbGVzLCBhbmQgdGhlIGNoZWNraW5cbiAgICAgIHBhcih3ZWxjb21lLCBsb2FkZXIsIGNoZWNraW4pLFxuICAgICAgLy8gd2hlbiBhbGwgb2YgdGhlbSBhcmUgZG9uZSwgd2UgbGF1bmNoIHRoZSBwZXJmb3JtYW5jZVxuICAgICAgcGVyZm9ybWFuY2VcbiAgICApO1xuICB9KTtcbn0pO1xuIl19