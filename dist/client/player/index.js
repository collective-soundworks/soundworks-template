'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Require the Soundworks library (client side)
var clientSide = require('soundworks')('client');
var client = clientSide.client;
var audioContext = clientSide.audioContext;

// Initiliaze the client with its type
client.init('player');

var MyPerformance = (function (_clientSide$Performan) {
  (0, _inherits3.default)(MyPerformance, _clientSide$Performan);

  function MyPerformance(loader) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, MyPerformance);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(MyPerformance).call(this, options));

    _this.loader = loader; // the loader module
    return _this;
  }

  (0, _createClass3.default)(MyPerformance, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(Object.getPrototypeOf(MyPerformance.prototype), 'start', this).call(this); // don't forget this

      // Play the welcome sound immediately
      var src = audioContext.createBufferSource();
      src.buffer = this.loader.buffers[0]; // get the first audio buffer from the loader
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime);

      // Play another sound when we receive the 'play' message from the server
      client.receive('performance:play', function () {
        setTimeout(function () {
          var src = audioContext.createBufferSource();
          src.buffer = _this2.loader.buffers[1]; // get the second audioBuffer from the loader
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakQsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUMvQixJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWTs7O0FBQUMsQUFHM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7SUFFaEIsYUFBYTswQkFBYixhQUFhOztBQUNqQixXQURJLGFBQWEsQ0FDTCxNQUFNLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFO3dDQUQ1QixhQUFhOztxRkFBYixhQUFhLGFBRVQsT0FBTzs7QUFDYixVQUFLLE1BQU0sR0FBRyxNQUFNO0FBQUM7R0FDdEI7OzZCQUpHLGFBQWE7OzRCQU1UOzs7QUFDTiwrQ0FQRSxhQUFhOzs7QUFPRCxBQUdkLFVBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzVDLFNBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQUMsQUFDcEMsU0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEMsU0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDOzs7QUFBQyxBQUdwQyxZQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDdkMsa0JBQVUsQ0FBQyxZQUFNO0FBQ2YsY0FBSSxHQUFHLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDNUMsYUFBRyxDQUFDLE1BQU0sR0FBRyxPQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQUMsQUFDcEMsYUFBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEMsYUFBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO09BQ3hDLENBQUM7OztBQUFDLEFBR0gsVUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQzs7Ozs7Ozs7QUFBQyxLQVExQzs7U0FsQ0csYUFBYTtHQUFTLFVBQVUsQ0FBQyxXQUFXOztBQXFDbEQsSUFBSSxLQUFLLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSx5QkFBeUIsQ0FBQzs7O0FBQUMsQUFHcEUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxZQUFNOztBQUVwQyxNQUFJLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7QUFDbEMsUUFBSSxFQUFFLFNBQVM7QUFDZixRQUFJLEVBQUUsd0VBQXdFO0FBQzlFLGlCQUFhLEVBQUUsSUFBSTtHQUNwQixDQUFDLENBQUM7QUFDSCxNQUFJLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN2QyxNQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUM5QyxNQUFJLFdBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUM7OztBQUFDLEFBRzVDLFFBQU0sQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ3pCLFdBQU8sR0FBRzs7QUFFUixPQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7O0FBRTdCLGVBQVcsQ0FDWixDQUFDO0dBQ0gsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVxdWlyZSB0aGUgU291bmR3b3JrcyBsaWJyYXJ5IChjbGllbnQgc2lkZSlcbnZhciBjbGllbnRTaWRlID0gcmVxdWlyZSgnc291bmR3b3JrcycpKCdjbGllbnQnKTtcbnZhciBjbGllbnQgPSBjbGllbnRTaWRlLmNsaWVudDtcbnZhciBhdWRpb0NvbnRleHQgPSBjbGllbnRTaWRlLmF1ZGlvQ29udGV4dDtcblxuLy8gSW5pdGlsaWF6ZSB0aGUgY2xpZW50IHdpdGggaXRzIHR5cGVcbmNsaWVudC5pbml0KCdwbGF5ZXInKTtcblxuY2xhc3MgTXlQZXJmb3JtYW5jZSBleHRlbmRzIGNsaWVudFNpZGUuUGVyZm9ybWFuY2Uge1xuICBjb25zdHJ1Y3Rvcihsb2FkZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyOyAvLyB0aGUgbG9hZGVyIG1vZHVsZVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcblxuICAgIC8vIFBsYXkgdGhlIHdlbGNvbWUgc291bmQgaW1tZWRpYXRlbHlcbiAgICBsZXQgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHNyYy5idWZmZXIgPSB0aGlzLmxvYWRlci5idWZmZXJzWzBdOyAvLyBnZXQgdGhlIGZpcnN0IGF1ZGlvIGJ1ZmZlciBmcm9tIHRoZSBsb2FkZXJcbiAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXG4gICAgLy8gUGxheSBhbm90aGVyIHNvdW5kIHdoZW4gd2UgcmVjZWl2ZSB0aGUgJ3BsYXknIG1lc3NhZ2UgZnJvbSB0aGUgc2VydmVyXG4gICAgY2xpZW50LnJlY2VpdmUoJ3BlcmZvcm1hbmNlOnBsYXknLCAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbGV0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMubG9hZGVyLmJ1ZmZlcnNbMV07IC8vIGdldCB0aGUgc2Vjb25kIGF1ZGlvQnVmZmVyIGZyb20gdGhlIGxvYWRlclxuICAgICAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcbiAgICAgIH0sIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMDAwLCAxMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gZGlzcGxheSBzb21lIGZlZWRiYWNrIHRleHQgaW4gdGhlIHZpZXdcbiAgICB0aGlzLnNldENlbnRlcmVkVmlld0NvbnRlbnQoJ0xldOKAmXMgZ28hJyk7IC8vXG5cbiAgICAvKiBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlXG4gICAgICogY2FuIGhhbmQgb3ZlciB0aGUgY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsXG4gICAgICogaG93ZXZlciBzaW5jZSB0aGUgcGVyZm9ybWFuY2UgaXMgdGhlIGxhc3QgbW9kdWxlIHRvIGJlIGNhbGxlZFxuICAgICAqIGluIHRoaXMgc2NlbmFyaW8sIHdlIGRvbid0IG5lZWQgaXQgaGVyZS5cbiAgICAgKi9cbiAgICAvLyB0aGlzLmRvbmUoKTtcbiAgfVxufVxuXG52YXIgZmlsZXMgPSBbJ3NvdW5kcy9zb3VuZC13ZWxjb21lLm1wMycsICdzb3VuZHMvc291bmQtb3RoZXJzLm1wMyddO1xuXG4vLyBXaGVyZSB0aGUgbWFnaWMgaGFwcGVuc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIC8vIEluc3RhbnRpYXRlIHRoZSBtb2R1bGVzXG4gIHZhciB3ZWxjb21lID0gbmV3IGNsaWVudFNpZGUuRGlhbG9nKHtcbiAgICBuYW1lOiAnd2VsY29tZScsXG4gICAgdGV4dDogXCI8cD5XZWxjb21lIHRvIDxiPk15IFNjZW5hcmlvPC9iPi48L3A+IDxwPlRvdWNoIHRoZSBzY3JlZW4gdG8gam9pbiE8L3A+XCIsXG4gICAgYWN0aXZhdGVBdWRpbzogdHJ1ZVxuICB9KTtcbiAgdmFyIGNoZWNraW4gPSBuZXcgY2xpZW50U2lkZS5DaGVja2luKCk7XG4gIHZhciBsb2FkZXIgPSBuZXcgY2xpZW50U2lkZS5Mb2FkZXIoeyBmaWxlcyB9KTtcbiAgdmFyIHBlcmZvcm1hbmNlID0gbmV3IE15UGVyZm9ybWFuY2UobG9hZGVyKTtcblxuICAvLyBTdGFydCB0aGUgc2NlbmFyaW8gYW5kIGxpbmsgdGhlIG1vZHVsZXNcbiAgY2xpZW50LnN0YXJ0KChzZXEsIHBhcikgPT4ge1xuICAgIHJldHVybiBzZXEoXG4gICAgICAvLyB3ZSBsYXVuY2ggaW4gcGFyYWxsZWwgdGhlIHdlbGNvbWUgbW9kdWxlLCB0aGUgbG9hZGluZyBvZiB0aGUgZmlsZXMsIGFuZCB0aGUgY2hlY2tpblxuICAgICAgcGFyKHdlbGNvbWUsIGxvYWRlciwgY2hlY2tpbiksXG4gICAgICAvLyB3aGVuIGFsbCBvZiB0aGVtIGFyZSBkb25lLCB3ZSBsYXVuY2ggdGhlIHBlcmZvcm1hbmNlXG4gICAgICBwZXJmb3JtYW5jZVxuICAgICk7XG4gIH0pO1xufSk7XG4iXX0=