// Import Soundworks library modules (client side)
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _soundworksClient = require('soundworks/client');

// Import Soundfield modules (client side)

var _PlayerPerformanceJs = require('./PlayerPerformance.js');

var _PlayerPerformanceJs2 = _interopRequireDefault(_PlayerPerformanceJs);

// Files to load
var audioFiles = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];

// Initiliaze the client type
_soundworksClient.client.init('player');

// Where the magic happens
window.addEventListener('load', function () {
  // Instantiate the modules
  var welcome = new _soundworksClient.Dialog({
    name: 'welcome',
    text: '<p>Welcome to <b>My Scenario</b>.</p>\n           <p>Touch the screen to join!</p>',
    activateAudio: true
  });
  var checkin = new _soundworksClient.Checkin();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2dDQUNnRCxtQkFBbUI7Ozs7bUNBR3JDLHdCQUF3Qjs7Ozs7QUFHdEQsSUFBTSxVQUFVLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDOzs7QUFHM0UseUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7QUFHdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxZQUFNOztBQUVwQyxNQUFNLE9BQU8sR0FBRyw2QkFBVztBQUN6QixRQUFJLEVBQUUsU0FBUztBQUNmLFFBQUksc0ZBQ29DO0FBQ3hDLGlCQUFhLEVBQUUsSUFBSTtHQUNwQixDQUFDLENBQUM7QUFDSCxNQUFNLE9BQU8sR0FBRywrQkFBYSxDQUFDO0FBQzlCLE1BQU0sTUFBTSxHQUFHLDZCQUFXLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDakQsTUFBTSxXQUFXLEdBQUcscUNBQXNCLE1BQU0sQ0FBQyxDQUFDOzs7QUFHbEQsMkJBQU8sS0FBSyxDQUFDLFVBQUMsTUFBTSxFQUFFLFFBQVE7V0FDNUIsTUFBTTs7O0FBR0osWUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDOztBQUVsQyxlQUFXLENBQ1o7R0FBQSxDQUNGLENBQUM7Q0FDSCxDQUFDLENBQUMiLCJmaWxlIjoic3JjL2NsaWVudC9wbGF5ZXIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgU291bmR3b3JrcyBsaWJyYXJ5IG1vZHVsZXMgKGNsaWVudCBzaWRlKVxuaW1wb3J0IHsgY2xpZW50LCBDaGVja2luLCBEaWFsb2csIExvYWRlciB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuLy8gSW1wb3J0IFNvdW5kZmllbGQgbW9kdWxlcyAoY2xpZW50IHNpZGUpXG5pbXBvcnQgUGxheWVyUGVyZm9ybWFuY2UgZnJvbSAnLi9QbGF5ZXJQZXJmb3JtYW5jZS5qcyc7XG5cbi8vIEZpbGVzIHRvIGxvYWRcbmNvbnN0IGF1ZGlvRmlsZXMgPSBbJ3NvdW5kcy9zb3VuZC13ZWxjb21lLm1wMycsICdzb3VuZHMvc291bmQtb3RoZXJzLm1wMyddO1xuXG4vLyBJbml0aWxpYXplIHRoZSBjbGllbnQgdHlwZVxuY2xpZW50LmluaXQoJ3BsYXllcicpO1xuXG4vLyBXaGVyZSB0aGUgbWFnaWMgaGFwcGVuc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIC8vIEluc3RhbnRpYXRlIHRoZSBtb2R1bGVzXG4gIGNvbnN0IHdlbGNvbWUgPSBuZXcgRGlhbG9nKHtcbiAgICBuYW1lOiAnd2VsY29tZScsXG4gICAgdGV4dDogYDxwPldlbGNvbWUgdG8gPGI+TXkgU2NlbmFyaW88L2I+LjwvcD5cbiAgICAgICAgICAgPHA+VG91Y2ggdGhlIHNjcmVlbiB0byBqb2luITwvcD5gLFxuICAgIGFjdGl2YXRlQXVkaW86IHRydWVcbiAgfSk7XG4gIGNvbnN0IGNoZWNraW4gPSBuZXcgQ2hlY2tpbigpO1xuICBjb25zdCBsb2FkZXIgPSBuZXcgTG9hZGVyKHsgZmlsZXM6IGF1ZGlvRmlsZXMgfSk7XG4gIGNvbnN0IHBlcmZvcm1hbmNlID0gbmV3IFBsYXllclBlcmZvcm1hbmNlKGxvYWRlcik7XG5cbiAgLy8gU3RhcnQgdGhlIHNjZW5hcmlvIGFuZCBvcmRlciB0aGUgbW9kdWxlc1xuICBjbGllbnQuc3RhcnQoKHNlcmlhbCwgcGFyYWxsZWwpID0+XG4gICAgc2VyaWFsKFxuICAgICAgLy8gSW5pdGlhbGl6YXRpb24gc3RlcDogd2UgbGF1bmNoIGluIHBhcmFsbGVsIHRoZSB3ZWxjb21lIG1vZHVsZSxcbiAgICAgIC8vIHRoZSBsb2FkaW5nIG9mIHRoZSBmaWxlcywgYW5kIHRoZSBjaGVja2luXG4gICAgICBwYXJhbGxlbCh3ZWxjb21lLCBsb2FkZXIsIGNoZWNraW4pLFxuICAgICAgLy8gV2hlbiB0aGUgaW5pdGlhbGl6YXRpb24gc3RlcCBpcyBkb25lLCB3ZSBsYXVuY2ggdGhlIHBlcmZvcm1hbmNlXG4gICAgICBwZXJmb3JtYW5jZVxuICAgIClcbiAgKTtcbn0pO1xuIl19