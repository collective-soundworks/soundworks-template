// Import Soundworks library modules (client side)
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _soundworksClient = require('soundworks/client');

// Import Soundfield modules (client side)

var _PlayerPerformanceJs = require('./PlayerPerformance.js');

var _PlayerPerformanceJs2 = _interopRequireDefault(_PlayerPerformanceJs);

// Files to load
var audioFiles = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];
// Initialize the client type
_soundworksClient.client.init('player');

// Where the magic happens
window.addEventListener('load', function () {
  // Instantiate the modules
  var welcome = new _soundworksClient.Dialog({
    name: 'welcome',
    text: '<p>Welcome to <b>My Scenario</b>.</p>\n           <p>Touch the screen to join!</p>',
    activateAudio: true
  });

  var checkin = new _soundworksClient.ClientCheckin();
  var loader = new _soundworksClient.Loader({ files: audioFiles });
  var performance = new _PlayerPerformanceJs2['default'](loader);

  // Start the scenario and order the modules
  _soundworksClient.client.start(function (serial, parallel) {
    return serial(
    // Initialization step: we launch in parallel the welcome module,
    // the loading of the files, and the checkin
    parallel(welcome, loader, checkin),
    // When the initialization step is done, we launch the performance
    performance);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2dDQUNzRCxtQkFBbUI7Ozs7bUNBRTNDLHdCQUF3Qjs7Ozs7QUFHdEQsSUFBTSxVQUFVLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDOztBQUUzRSx5QkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7OztBQUl0QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFlBQU07O0FBRXBDLE1BQU0sT0FBTyxHQUFHLDZCQUFXO0FBQ3pCLFFBQUksRUFBRSxTQUFTO0FBQ2YsUUFBSSxzRkFDb0M7QUFDeEMsaUJBQWEsRUFBRSxJQUFJO0dBQ3BCLENBQUMsQ0FBQzs7QUFFSCxNQUFNLE9BQU8sR0FBRyxxQ0FBbUIsQ0FBQztBQUNwQyxNQUFNLE1BQU0sR0FBRyw2QkFBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELE1BQU0sV0FBVyxHQUFHLHFDQUFzQixNQUFNLENBQUMsQ0FBQzs7O0FBR2xELDJCQUFPLEtBQUssQ0FBQyxVQUFDLE1BQU0sRUFBRSxRQUFRO1dBQzVCLE1BQU07OztBQUdKLFlBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQzs7QUFFbEMsZUFBVyxDQUNaO0dBQUEsQ0FDRixDQUFDO0NBQ0gsQ0FBQyxDQUFDIiwiZmlsZSI6InNyYy9jbGllbnQvcGxheWVyL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbGlicmFyeSBtb2R1bGVzIChjbGllbnQgc2lkZSlcbmltcG9ydCB7IGNsaWVudCwgQ2xpZW50Q2hlY2tpbiwgRGlhbG9nLCBMb2FkZXIgfSBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG4vLyBJbXBvcnQgU291bmRmaWVsZCBtb2R1bGVzIChjbGllbnQgc2lkZSlcbmltcG9ydCBQbGF5ZXJQZXJmb3JtYW5jZSBmcm9tICcuL1BsYXllclBlcmZvcm1hbmNlLmpzJztcblxuLy8gRmlsZXMgdG8gbG9hZFxuY29uc3QgYXVkaW9GaWxlcyA9IFsnc291bmRzL3NvdW5kLXdlbGNvbWUubXAzJywgJ3NvdW5kcy9zb3VuZC1vdGhlcnMubXAzJ107XG4vLyBJbml0aWFsaXplIHRoZSBjbGllbnQgdHlwZVxuY2xpZW50LmluaXQoJ3BsYXllcicpO1xuXG5cbi8vIFdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgLy8gSW5zdGFudGlhdGUgdGhlIG1vZHVsZXNcbiAgY29uc3Qgd2VsY29tZSA9IG5ldyBEaWFsb2coe1xuICAgIG5hbWU6ICd3ZWxjb21lJyxcbiAgICB0ZXh0OiBgPHA+V2VsY29tZSB0byA8Yj5NeSBTY2VuYXJpbzwvYj4uPC9wPlxuICAgICAgICAgICA8cD5Ub3VjaCB0aGUgc2NyZWVuIHRvIGpvaW4hPC9wPmAsXG4gICAgYWN0aXZhdGVBdWRpbzogdHJ1ZVxuICB9KTtcblxuICBjb25zdCBjaGVja2luID0gbmV3IENsaWVudENoZWNraW4oKTtcbiAgY29uc3QgbG9hZGVyID0gbmV3IExvYWRlcih7IGZpbGVzOiBhdWRpb0ZpbGVzIH0pO1xuICBjb25zdCBwZXJmb3JtYW5jZSA9IG5ldyBQbGF5ZXJQZXJmb3JtYW5jZShsb2FkZXIpO1xuXG4gIC8vIFN0YXJ0IHRoZSBzY2VuYXJpbyBhbmQgb3JkZXIgdGhlIG1vZHVsZXNcbiAgY2xpZW50LnN0YXJ0KChzZXJpYWwsIHBhcmFsbGVsKSA9PlxuICAgIHNlcmlhbChcbiAgICAgIC8vIEluaXRpYWxpemF0aW9uIHN0ZXA6IHdlIGxhdW5jaCBpbiBwYXJhbGxlbCB0aGUgd2VsY29tZSBtb2R1bGUsXG4gICAgICAvLyB0aGUgbG9hZGluZyBvZiB0aGUgZmlsZXMsIGFuZCB0aGUgY2hlY2tpblxuICAgICAgcGFyYWxsZWwod2VsY29tZSwgbG9hZGVyLCBjaGVja2luKSxcbiAgICAgIC8vIFdoZW4gdGhlIGluaXRpYWxpemF0aW9uIHN0ZXAgaXMgZG9uZSwgd2UgbGF1bmNoIHRoZSBwZXJmb3JtYW5jZVxuICAgICAgcGVyZm9ybWFuY2VcbiAgICApXG4gICk7XG59KTtcbiJdfQ==