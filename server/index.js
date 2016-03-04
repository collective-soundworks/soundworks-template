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
  },
  maxClientsPerPosition: 2
};

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    var x = (i + 1) / 3 - 1 / 6;
    var y = (j + 1) / 3 - 1 / 6;
    setup.coordinates.push([x, y]);
  }
}

var dummy = {
  test: {
    niap: true,
    bidule: [0, 1, 2]
  },
  test2: 42
};

_soundworksServer2['default'].server.init({ appName: 'Template', setup: setup, dummy: dummy });

// Configure the services and create the experience.
//
// Activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map activities to additional client types (thus defining a
//   route (url) of the from: `'/' + clientType`

var experience = new _PlayerExperience2['default']('player');
experience.require('shared-config');

// Start the application with a given name.
_soundworksServer2['default'].server.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFDTyw2QkFBNkI7Ozs7Z0NBRWIsbUJBQW1COzs7O2dDQUNiLG9CQUFvQjs7OztBQUVqRCxJQUFNLEtBQUssR0FBRztBQUNaLGFBQVcsRUFBRSxFQUFFO0FBQ2YsTUFBSSxFQUFFO0FBQ0osU0FBSyxFQUFFLENBQUM7QUFDUixVQUFNLEVBQUUsQ0FBQztHQUNWO0FBQ0QsdUJBQXFCLEVBQUUsQ0FBQztDQUN6QixDQUFBOztBQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQixRQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxDQUFDLEdBQUksQ0FBQyxHQUFDLENBQUMsQUFBQyxDQUFDO0FBQzlCLFFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLENBQUMsR0FBSSxDQUFDLEdBQUMsQ0FBQyxBQUFDLENBQUM7QUFDOUIsU0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNoQztDQUNGOztBQUVELElBQU0sS0FBSyxHQUFHO0FBQ1osTUFBSSxFQUFFO0FBQ0osUUFBSSxFQUFFLElBQUk7QUFDVixVQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNsQjtBQUNELE9BQUssRUFBRSxFQUFFO0NBQ1YsQ0FBQTs7QUFFRCw4QkFBVyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQVc5RCxJQUFNLFVBQVUsR0FBRyxrQ0FBcUIsUUFBUSxDQUFDLENBQUM7QUFDbEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7O0FBR3BDLDhCQUFXLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsImZpbGUiOiJzcmMvc2VydmVyL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRW5hYmxlIHNvdXJjZU1hcHMgaW4gbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuLy8gSW1wb3J0IFNvdW5kd29ya3MgbGlicmFyeSBtb2R1bGVzIChzZXJ2ZXIgc2lkZSkgYW5kIHNlcnZlciBzaWRlIGV4cGVyaWVuY2VcbmltcG9ydCBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3Mvc2VydmVyJztcbmltcG9ydCBQbGF5ZXJFeHBlcmllbmNlIGZyb20gJy4vUGxheWVyRXhwZXJpZW5jZSc7XG5cbmNvbnN0IHNldHVwID0ge1xuICBjb29yZGluYXRlczogW10sXG4gIGFyZWE6IHtcbiAgICB3aWR0aDogMSxcbiAgICBoZWlnaHQ6IDEsXG4gIH0sXG4gIG1heENsaWVudHNQZXJQb3NpdGlvbjogMixcbn1cblxuZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICBjb25zdCB4ID0gKGkgKyAxKSAvIDMgLSAoMS82KTtcbiAgICBjb25zdCB5ID0gKGogKyAxKSAvIDMgLSAoMS82KTtcbiAgICBzZXR1cC5jb29yZGluYXRlcy5wdXNoKFt4LCB5XSk7XG4gIH1cbn1cblxuY29uc3QgZHVtbXkgPSB7XG4gIHRlc3Q6IHtcbiAgICBuaWFwOiB0cnVlLFxuICAgIGJpZHVsZTogWzAsIDEsIDJdLFxuICB9LFxuICB0ZXN0MjogNDIsXG59XG5cbnNvdW5kd29ya3Muc2VydmVyLmluaXQoeyBhcHBOYW1lOiAnVGVtcGxhdGUnLCBzZXR1cCwgZHVtbXkgfSk7XG5cbi8vIENvbmZpZ3VyZSB0aGUgc2VydmljZXMgYW5kIGNyZWF0ZSB0aGUgZXhwZXJpZW5jZS5cbi8vXG4vLyBBY3Rpdml0aWVzIG11c3QgYmUgbWFwcGVkIHRvIGNsaWVudCB0eXBlczpcbi8vIC0gdGhlIGAncGxheWVyJ2AgY2xpZW50cyAod2hvIHRha2UgcGFydCBpbiB0aGUgc2NlbmFyaW8gYnkgY29ubmVjdGluZyB0byB0aGVcbi8vICAgc2VydmVyIHRocm91Z2ggdGhlIHJvb3QgVVJMKSBuZWVkIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIGBjaGVja2luYCBhbmQgdGhlXG4vLyAgIGBwZXJmb3JtYW5jZWAgb24gdGhlIHNlcnZlciBzaWRlO1xuLy8gLSB3ZSBjb3VsZCBhbHNvIG1hcCBhY3Rpdml0aWVzIHRvIGFkZGl0aW9uYWwgY2xpZW50IHR5cGVzICh0aHVzIGRlZmluaW5nIGFcbi8vICAgcm91dGUgKHVybCkgb2YgdGhlIGZyb206IGAnLycgKyBjbGllbnRUeXBlYFxuXG5jb25zdCBleHBlcmllbmNlID0gbmV3IFBsYXllckV4cGVyaWVuY2UoJ3BsYXllcicpO1xuZXhwZXJpZW5jZS5yZXF1aXJlKCdzaGFyZWQtY29uZmlnJyk7XG5cbi8vIFN0YXJ0IHRoZSBhcHBsaWNhdGlvbiB3aXRoIGEgZ2l2ZW4gbmFtZS5cbnNvdW5kd29ya3Muc2VydmVyLnN0YXJ0KCk7XG4iXX0=