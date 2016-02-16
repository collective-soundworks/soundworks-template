// Enable sourceMaps in node
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

require('source-map-support/register');

// Import Soundworks library modules (server side) and server side experience

var _soundworksServer = require('soundworks/server');

var _soundworksServer2 = _interopRequireDefault(_soundworksServer);

var _PlayerExperience = require('./PlayerExperience');

var _PlayerExperience2 = _interopRequireDefault(_PlayerExperience);

var setup = {
  coordinates: [],
  area: {
    width: 1,
    height: 1
  }
};

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    var x = (i + 1) / 3 - 1 / 6;
    var y = (j + 1) / 3 - 1 / 6;
    setup.coordinates.push([x, y]);
  }
}

_soundworksServer2['default'].server.init({ appName: 'Template', setup: setup });

// Configure the services and create the experience.
//
// Activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map activities to additional client types (thus defining a
//   route (url) of the from: `'/' + clientType`

var checkin = _soundworksServer2['default'].server.require('checkin');
checkin.addClientType('player');

// const placer = soundworks.server.require('placer');
// placer.addClientType('player');

// const locator = soundworks.server.require('locator');
// locator.addClientType('player');

var experience = new _PlayerExperience2['default']();
experience.addClientType('player');

// Start the application with a given name.
_soundworksServer2['default'].server.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFDTyw2QkFBNkI7Ozs7Z0NBRWIsbUJBQW1COzs7O2dDQUNiLG9CQUFvQjs7OztBQUVqRCxJQUFNLEtBQUssR0FBRztBQUNaLGFBQVcsRUFBRSxFQUFFO0FBQ2YsTUFBSSxFQUFFO0FBQ0osU0FBSyxFQUFFLENBQUM7QUFDUixVQUFNLEVBQUUsQ0FBQztHQUNWO0NBQ0YsQ0FBQTs7QUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsUUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksQ0FBQyxHQUFJLENBQUMsR0FBQyxDQUFDLEFBQUMsQ0FBQztBQUM5QixRQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxDQUFDLEdBQUksQ0FBQyxHQUFDLENBQUMsQUFBQyxDQUFDO0FBQzlCLFNBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDaEM7Q0FDRjs7QUFFRCw4QkFBVyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7QUFXdkQsSUFBTSxPQUFPLEdBQUcsOEJBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyRCxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7OztBQVFoQyxJQUFNLFVBQVUsR0FBRyxtQ0FBc0IsQ0FBQztBQUMxQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7QUFHbkMsOEJBQVcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDIiwiZmlsZSI6InNyYy9zZXJ2ZXIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFbmFibGUgc291cmNlTWFwcyBpbiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG4vLyBJbXBvcnQgU291bmR3b3JrcyBsaWJyYXJ5IG1vZHVsZXMgKHNlcnZlciBzaWRlKSBhbmQgc2VydmVyIHNpZGUgZXhwZXJpZW5jZVxuaW1wb3J0IHNvdW5kd29ya3MgZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuaW1wb3J0IFBsYXllckV4cGVyaWVuY2UgZnJvbSAnLi9QbGF5ZXJFeHBlcmllbmNlJztcblxuY29uc3Qgc2V0dXAgPSB7XG4gIGNvb3JkaW5hdGVzOiBbXSxcbiAgYXJlYToge1xuICAgIHdpZHRoOiAxLFxuICAgIGhlaWdodDogMSxcbiAgfVxufVxuXG5mb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgIGNvbnN0IHggPSAoaSArIDEpIC8gMyAtICgxLzYpO1xuICAgIGNvbnN0IHkgPSAoaiArIDEpIC8gMyAtICgxLzYpO1xuICAgIHNldHVwLmNvb3JkaW5hdGVzLnB1c2goW3gsIHldKTtcbiAgfVxufVxuXG5zb3VuZHdvcmtzLnNlcnZlci5pbml0KHsgYXBwTmFtZTogJ1RlbXBsYXRlJywgc2V0dXAgfSk7XG5cbi8vIENvbmZpZ3VyZSB0aGUgc2VydmljZXMgYW5kIGNyZWF0ZSB0aGUgZXhwZXJpZW5jZS5cbi8vXG4vLyBBY3Rpdml0aWVzIG11c3QgYmUgbWFwcGVkIHRvIGNsaWVudCB0eXBlczpcbi8vIC0gdGhlIGAncGxheWVyJ2AgY2xpZW50cyAod2hvIHRha2UgcGFydCBpbiB0aGUgc2NlbmFyaW8gYnkgY29ubmVjdGluZyB0byB0aGVcbi8vICAgc2VydmVyIHRocm91Z2ggdGhlIHJvb3QgVVJMKSBuZWVkIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIGBjaGVja2luYCBhbmQgdGhlXG4vLyAgIGBwZXJmb3JtYW5jZWAgb24gdGhlIHNlcnZlciBzaWRlO1xuLy8gLSB3ZSBjb3VsZCBhbHNvIG1hcCBhY3Rpdml0aWVzIHRvIGFkZGl0aW9uYWwgY2xpZW50IHR5cGVzICh0aHVzIGRlZmluaW5nIGFcbi8vICAgcm91dGUgKHVybCkgb2YgdGhlIGZyb206IGAnLycgKyBjbGllbnRUeXBlYFxuXG5jb25zdCBjaGVja2luID0gc291bmR3b3Jrcy5zZXJ2ZXIucmVxdWlyZSgnY2hlY2tpbicpO1xuY2hlY2tpbi5hZGRDbGllbnRUeXBlKCdwbGF5ZXInKTtcblxuLy8gY29uc3QgcGxhY2VyID0gc291bmR3b3Jrcy5zZXJ2ZXIucmVxdWlyZSgncGxhY2VyJyk7XG4vLyBwbGFjZXIuYWRkQ2xpZW50VHlwZSgncGxheWVyJyk7XG5cbi8vIGNvbnN0IGxvY2F0b3IgPSBzb3VuZHdvcmtzLnNlcnZlci5yZXF1aXJlKCdsb2NhdG9yJyk7XG4vLyBsb2NhdG9yLmFkZENsaWVudFR5cGUoJ3BsYXllcicpO1xuXG5jb25zdCBleHBlcmllbmNlID0gbmV3IFBsYXllckV4cGVyaWVuY2UoKTtcbmV4cGVyaWVuY2UuYWRkQ2xpZW50VHlwZSgncGxheWVyJyk7XG5cbi8vIFN0YXJ0IHRoZSBhcHBsaWNhdGlvbiB3aXRoIGEgZ2l2ZW4gbmFtZS5cbnNvdW5kd29ya3Muc2VydmVyLnN0YXJ0KCk7XG4iXX0=