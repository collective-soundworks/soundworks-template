// Handle sourceMaps in node
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

require('source-map-support/register');

// Import Soundworks library modules (server side)

var _soundworksServer = require('soundworks/server');

var _soundworksServer2 = _interopRequireDefault(_soundworksServer);

// Import server side experience

var _PlayerExperience = require('./PlayerExperience');

var _PlayerExperience2 = _interopRequireDefault(_PlayerExperience);

// Launch server
_soundworksServer2['default'].server.start({ appName: 'Template' });

// Instantiate the modules
var checkin = new _soundworksServer2['default'].ServerCheckin({ capacity: 100 });
var experience = new _PlayerExperience2['default']();

// Map modules to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root URL) need to communicate with the `checkin` and the
//   `performance` on the server side;
// - we could also map other modules to additional client types (who would take
//   part in the scenario by connecting to the server through the `'/' + clientType`
//   URL).
_soundworksServer2['default'].server.map('player', checkin, experience);
// server.map('soloist', soloistPerformance);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZXJ2ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFDTyw2QkFBNkI7Ozs7Z0NBRWIsbUJBQW1COzs7Ozs7Z0NBRWIsb0JBQW9COzs7OztBQUdqRCw4QkFBVyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7OztBQUdqRCxJQUFNLE9BQU8sR0FBRyxJQUFJLDhCQUFXLGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2hFLElBQU0sVUFBVSxHQUFHLG1DQUFzQixDQUFDOzs7Ozs7Ozs7QUFTMUMsOEJBQVcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDIiwiZmlsZSI6InNyYy9zZXJ2ZXIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBIYW5kbGUgc291cmNlTWFwcyBpbiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG4vLyBJbXBvcnQgU291bmR3b3JrcyBsaWJyYXJ5IG1vZHVsZXMgKHNlcnZlciBzaWRlKVxuaW1wb3J0IHNvdW5kd29ya3MgZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuLy8gSW1wb3J0IHNlcnZlciBzaWRlIGV4cGVyaWVuY2VcbmltcG9ydCBQbGF5ZXJFeHBlcmllbmNlIGZyb20gJy4vUGxheWVyRXhwZXJpZW5jZSc7XG5cbi8vIExhdW5jaCBzZXJ2ZXJcbnNvdW5kd29ya3Muc2VydmVyLnN0YXJ0KHsgYXBwTmFtZTogJ1RlbXBsYXRlJyB9KTtcblxuLy8gSW5zdGFudGlhdGUgdGhlIG1vZHVsZXNcbmNvbnN0IGNoZWNraW4gPSBuZXcgc291bmR3b3Jrcy5TZXJ2ZXJDaGVja2luKHsgY2FwYWNpdHk6IDEwMCB9KTtcbmNvbnN0IGV4cGVyaWVuY2UgPSBuZXcgUGxheWVyRXhwZXJpZW5jZSgpO1xuXG4vLyBNYXAgbW9kdWxlcyB0byBjbGllbnQgdHlwZXM6XG4vLyAtIHRoZSBgJ3BsYXllcidgIGNsaWVudHMgKHdobyB0YWtlIHBhcnQgaW4gdGhlIHNjZW5hcmlvIGJ5IGNvbm5lY3RpbmcgdG8gdGhlXG4vLyAgIHNlcnZlciB0aHJvdWdoIHRoZSByb290IFVSTCkgbmVlZCB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBgY2hlY2tpbmAgYW5kIHRoZVxuLy8gICBgcGVyZm9ybWFuY2VgIG9uIHRoZSBzZXJ2ZXIgc2lkZTtcbi8vIC0gd2UgY291bGQgYWxzbyBtYXAgb3RoZXIgbW9kdWxlcyB0byBhZGRpdGlvbmFsIGNsaWVudCB0eXBlcyAod2hvIHdvdWxkIHRha2Vcbi8vICAgcGFydCBpbiB0aGUgc2NlbmFyaW8gYnkgY29ubmVjdGluZyB0byB0aGUgc2VydmVyIHRocm91Z2ggdGhlIGAnLycgKyBjbGllbnRUeXBlYFxuLy8gICBVUkwpLlxuc291bmR3b3Jrcy5zZXJ2ZXIubWFwKCdwbGF5ZXInLCBjaGVja2luLCBleHBlcmllbmNlKTtcbi8vIHNlcnZlci5tYXAoJ3NvbG9pc3QnLCBzb2xvaXN0UGVyZm9ybWFuY2UpO1xuIl19