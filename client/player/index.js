// Require the Soundworks library (client side)
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var clientSide = require('soundworks/client');
var client = clientSide.client;
var audioContext = clientSide.audioContext;

// Initiliaze the client with its type
client.init('player');

var MyPerformance = (function (_clientSide$Performance) {
  _inherits(MyPerformance, _clientSide$Performance);

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
      client.receive('performance:play', function () {
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
})(clientSide.Performance);

var files = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];

// Where the magic happens
window.addEventListener('load', function () {
  // Instantiate the modules
  var welcome = new clientSide.Dialog({
    name: 'welcome',
    text: "<p>Welcome to <b>My Scenario</b>.</p> <p>Touch the screen to join!</p>",
    activateAudio: true
  });
  var checkin = new clientSide.Checkin();
  var loader = new clientSide.Loader({ files: files });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYXR1c3pld3NraS93d3cvbGliL3NvdW5kd29ya3MtdGVtcGxhdGUvc3JjL2NsaWVudC9wbGF5ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUM5QyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0FBQy9CLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7OztBQUczQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUVoQixhQUFhO1lBQWIsYUFBYTs7QUFDTixXQURQLGFBQWEsQ0FDTCxNQUFNLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOzswQkFENUIsYUFBYTs7QUFFZiwrQkFGRSxhQUFhLDZDQUVULE9BQU8sRUFBRTtBQUNmLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0dBQ3RCOztlQUpHLGFBQWE7O1dBTVosaUJBQUc7OztBQUNOLGlDQVBFLGFBQWEsdUNBT0Q7OztBQUdkLFVBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzVDLFNBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsU0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEMsU0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7OztBQUdwQyxZQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDdkMsa0JBQVUsQ0FBQyxZQUFNO0FBQ2YsY0FBSSxHQUFHLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDNUMsYUFBRyxDQUFDLE1BQU0sR0FBRyxNQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsYUFBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEMsYUFBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO09BQ3hDLENBQUMsQ0FBQzs7O0FBR0gsVUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7OztLQVExQzs7O1NBbENHLGFBQWE7R0FBUyxVQUFVLENBQUMsV0FBVzs7QUFxQ2xELElBQUksS0FBSyxHQUFHLENBQUMsMEJBQTBCLEVBQUUseUJBQXlCLENBQUMsQ0FBQzs7O0FBR3BFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsWUFBTTs7QUFFcEMsTUFBSSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO0FBQ2xDLFFBQUksRUFBRSxTQUFTO0FBQ2YsUUFBSSxFQUFFLHdFQUF3RTtBQUM5RSxpQkFBYSxFQUFFLElBQUk7R0FDcEIsQ0FBQyxDQUFDO0FBQ0gsTUFBSSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdkMsTUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDOUMsTUFBSSxXQUFXLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUc1QyxRQUFNLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUN6QixXQUFPLEdBQUc7O0FBRVIsT0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDOztBQUU3QixlQUFXLENBQ1osQ0FBQztHQUNILENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiIvVXNlcnMvbWF0dXN6ZXdza2kvd3d3L2xpYi9zb3VuZHdvcmtzLXRlbXBsYXRlL3NyYy9jbGllbnQvcGxheWVyL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVxdWlyZSB0aGUgU291bmR3b3JrcyBsaWJyYXJ5IChjbGllbnQgc2lkZSlcbnZhciBjbGllbnRTaWRlID0gcmVxdWlyZSgnc291bmR3b3Jrcy9jbGllbnQnKTtcbnZhciBjbGllbnQgPSBjbGllbnRTaWRlLmNsaWVudDtcbnZhciBhdWRpb0NvbnRleHQgPSBjbGllbnRTaWRlLmF1ZGlvQ29udGV4dDtcblxuLy8gSW5pdGlsaWF6ZSB0aGUgY2xpZW50IHdpdGggaXRzIHR5cGVcbmNsaWVudC5pbml0KCdwbGF5ZXInKTtcblxuY2xhc3MgTXlQZXJmb3JtYW5jZSBleHRlbmRzIGNsaWVudFNpZGUuUGVyZm9ybWFuY2Uge1xuICBjb25zdHJ1Y3Rvcihsb2FkZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyOyAvLyB0aGUgbG9hZGVyIG1vZHVsZVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcblxuICAgIC8vIFBsYXkgdGhlIHdlbGNvbWUgc291bmQgaW1tZWRpYXRlbHlcbiAgICBsZXQgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHNyYy5idWZmZXIgPSB0aGlzLmxvYWRlci5idWZmZXJzWzBdOyAvLyBnZXQgdGhlIGZpcnN0IGF1ZGlvIGJ1ZmZlciBmcm9tIHRoZSBsb2FkZXJcbiAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXG4gICAgLy8gUGxheSBhbm90aGVyIHNvdW5kIHdoZW4gd2UgcmVjZWl2ZSB0aGUgJ3BsYXknIG1lc3NhZ2UgZnJvbSB0aGUgc2VydmVyXG4gICAgY2xpZW50LnJlY2VpdmUoJ3BlcmZvcm1hbmNlOnBsYXknLCAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbGV0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMubG9hZGVyLmJ1ZmZlcnNbMV07IC8vIGdldCB0aGUgc2Vjb25kIGF1ZGlvQnVmZmVyIGZyb20gdGhlIGxvYWRlclxuICAgICAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcbiAgICAgIH0sIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMDAwLCAxMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gZGlzcGxheSBzb21lIGZlZWRiYWNrIHRleHQgaW4gdGhlIHZpZXdcbiAgICB0aGlzLnNldENlbnRlcmVkVmlld0NvbnRlbnQoJ0xldOKAmXMgZ28hJyk7IC8vXG5cbiAgICAvKiBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlXG4gICAgICogY2FuIGhhbmQgb3ZlciB0aGUgY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsXG4gICAgICogaG93ZXZlciBzaW5jZSB0aGUgcGVyZm9ybWFuY2UgaXMgdGhlIGxhc3QgbW9kdWxlIHRvIGJlIGNhbGxlZFxuICAgICAqIGluIHRoaXMgc2NlbmFyaW8sIHdlIGRvbid0IG5lZWQgaXQgaGVyZS5cbiAgICAgKi9cbiAgICAvLyB0aGlzLmRvbmUoKTtcbiAgfVxufVxuXG52YXIgZmlsZXMgPSBbJ3NvdW5kcy9zb3VuZC13ZWxjb21lLm1wMycsICdzb3VuZHMvc291bmQtb3RoZXJzLm1wMyddO1xuXG4vLyBXaGVyZSB0aGUgbWFnaWMgaGFwcGVuc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIC8vIEluc3RhbnRpYXRlIHRoZSBtb2R1bGVzXG4gIHZhciB3ZWxjb21lID0gbmV3IGNsaWVudFNpZGUuRGlhbG9nKHtcbiAgICBuYW1lOiAnd2VsY29tZScsXG4gICAgdGV4dDogXCI8cD5XZWxjb21lIHRvIDxiPk15IFNjZW5hcmlvPC9iPi48L3A+IDxwPlRvdWNoIHRoZSBzY3JlZW4gdG8gam9pbiE8L3A+XCIsXG4gICAgYWN0aXZhdGVBdWRpbzogdHJ1ZVxuICB9KTtcbiAgdmFyIGNoZWNraW4gPSBuZXcgY2xpZW50U2lkZS5DaGVja2luKCk7XG4gIHZhciBsb2FkZXIgPSBuZXcgY2xpZW50U2lkZS5Mb2FkZXIoeyBmaWxlcyB9KTtcbiAgdmFyIHBlcmZvcm1hbmNlID0gbmV3IE15UGVyZm9ybWFuY2UobG9hZGVyKTtcblxuICAvLyBTdGFydCB0aGUgc2NlbmFyaW8gYW5kIGxpbmsgdGhlIG1vZHVsZXNcbiAgY2xpZW50LnN0YXJ0KChzZXEsIHBhcikgPT4ge1xuICAgIHJldHVybiBzZXEoXG4gICAgICAvLyB3ZSBsYXVuY2ggaW4gcGFyYWxsZWwgdGhlIHdlbGNvbWUgbW9kdWxlLCB0aGUgbG9hZGluZyBvZiB0aGUgZmlsZXMsIGFuZCB0aGUgY2hlY2tpblxuICAgICAgcGFyKHdlbGNvbWUsIGxvYWRlciwgY2hlY2tpbiksXG4gICAgICAvLyB3aGVuIGFsbCBvZiB0aGVtIGFyZSBkb25lLCB3ZSBsYXVuY2ggdGhlIHBlcmZvcm1hbmNlXG4gICAgICBwZXJmb3JtYW5jZVxuICAgICk7XG4gIH0pO1xufSk7XG4iXX0=