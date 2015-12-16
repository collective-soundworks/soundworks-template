// Import Soundworks library modules (client side)
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _soundworksClient = require('soundworks/client');

// Import Soundfield modules (client side)

var _PlayerPerformanceJs = require('./PlayerPerformance.js');

var _PlayerPerformanceJs2 = _interopRequireDefault(_PlayerPerformanceJs);

var _soundworksClient2 = _interopRequireDefault(_soundworksClient);

// Files to load
var audioFiles = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];

var app = function app() {
  // Initialize the client
  _soundworksClient.client.init('player');

  // const definitions = [
  //   { label: 'test_1', state: 'selected' },
  //   { label: 'test_2', state: 'disabled' },
  //   { label: 'test_3', state: 'unselected' },
  // ]

  // const $container = document.querySelector('#container');
  // const squaredView = new soundworks.display.SquaredView();

  // const onSelect = (label, index) => { console.log('select', label, index); }
  // const onUnselect = (label, index) => { console.log('unselect', label, index); }

  // const selector = new soundworks.display.SelectorView(definitions, onSelect, onUnselect, {
  //   maxSelected: 2,
  //   defaultState: 'unselected',
  // });

  // squaredView.setViewComponent('.section-square', selector);

  // squaredView.render();
  // squaredView.appendTo($container);

  // window.selector = selector;

  // return;

  // Instantiate the modules
  var welcome = new _soundworksClient.Welcome({
    // activateAudio: true, // activate audio on user event (needed on iOS devices)
    wakeLock: true });

  // hack to prevent screen to go to sleep
  // requireMobile: false,
  var checkin = new _soundworksClient.ClientCheckin({ showDialog: false });
  var loader = new _soundworksClient.Loader({ files: audioFiles });
  var performance = new _PlayerPerformanceJs2['default'](loader);

  var placer = new _soundworksClient2['default'].ClientPlacer({ mode: 'list' });
  var locator = new _soundworksClient2['default'].ClientLocator();
  // const orientation = new soundworks.Orientation();

  // Start the scenario and order the modules
  _soundworksClient.client.start(function (serial, parallel) {
    return serial(placer,
    // Initialization step: we launch in parallel the welcome module,
    // the loading of the files, and the checkin
    parallel(welcome, loader), /* checkin */
    // locator,
    // orientation,
    // When the initialization step is done, we launch the performance
    performance);
  });
};

// Where the magic happens
window.addEventListener('load', app);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2dDQUN1RCxtQkFBbUI7Ozs7bUNBRTVDLHdCQUF3Qjs7Ozs7OztBQUt0RCxJQUFNLFVBQVUsR0FBRyxDQUFDLDBCQUEwQixFQUFFLHlCQUF5QixDQUFDLENBQUM7O0FBRzNFLElBQU0sR0FBRyxHQUFHLFNBQU4sR0FBRyxHQUFTOztBQUVoQiwyQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJ0QixNQUFNLE9BQU8sR0FBRyw4QkFBWTs7QUFFMUIsWUFBUSxFQUFFLElBQUksRUFFZixDQUFDLENBQUM7Ozs7QUFFSCxNQUFNLE9BQU8sR0FBRyxvQ0FBa0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN6RCxNQUFNLE1BQU0sR0FBRyw2QkFBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELE1BQU0sV0FBVyxHQUFHLHFDQUFzQixNQUFNLENBQUMsQ0FBQzs7QUFFbEQsTUFBTSxNQUFNLEdBQUcsSUFBSSw4QkFBVyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUM3RCxNQUFNLE9BQU8sR0FBRyxJQUFJLDhCQUFXLGFBQWEsRUFBRSxDQUFDOzs7O0FBSS9DLDJCQUFPLEtBQUssQ0FBQyxVQUFDLE1BQU0sRUFBRSxRQUFRO1dBQzVCLE1BQU0sQ0FDSixNQUFNOzs7QUFHTixZQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBZ0I7Ozs7QUFJeEMsZUFBVyxDQUNaO0dBQUEsQ0FDRixDQUFDO0NBQ0gsQ0FBQTs7O0FBR0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJzcmMvY2xpZW50L3BsYXllci9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBTb3VuZHdvcmtzIGxpYnJhcnkgbW9kdWxlcyAoY2xpZW50IHNpZGUpXG5pbXBvcnQgeyBjbGllbnQsIENsaWVudENoZWNraW4sIFdlbGNvbWUsIExvYWRlciB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50Jztcbi8vIEltcG9ydCBTb3VuZGZpZWxkIG1vZHVsZXMgKGNsaWVudCBzaWRlKVxuaW1wb3J0IFBsYXllclBlcmZvcm1hbmNlIGZyb20gJy4vUGxheWVyUGVyZm9ybWFuY2UuanMnO1xuXG5pbXBvcnQgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbi8vIEZpbGVzIHRvIGxvYWRcbmNvbnN0IGF1ZGlvRmlsZXMgPSBbJ3NvdW5kcy9zb3VuZC13ZWxjb21lLm1wMycsICdzb3VuZHMvc291bmQtb3RoZXJzLm1wMyddO1xuXG5cbmNvbnN0IGFwcCA9ICgpID0+IHtcbiAgLy8gSW5pdGlhbGl6ZSB0aGUgY2xpZW50XG4gIGNsaWVudC5pbml0KCdwbGF5ZXInKTtcblxuICAvLyBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAgLy8gICB7IGxhYmVsOiAndGVzdF8xJywgc3RhdGU6ICdzZWxlY3RlZCcgfSxcbiAgLy8gICB7IGxhYmVsOiAndGVzdF8yJywgc3RhdGU6ICdkaXNhYmxlZCcgfSxcbiAgLy8gICB7IGxhYmVsOiAndGVzdF8zJywgc3RhdGU6ICd1bnNlbGVjdGVkJyB9LFxuICAvLyBdXG5cbiAgLy8gY29uc3QgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKTtcbiAgLy8gY29uc3Qgc3F1YXJlZFZpZXcgPSBuZXcgc291bmR3b3Jrcy5kaXNwbGF5LlNxdWFyZWRWaWV3KCk7XG5cbiAgLy8gY29uc3Qgb25TZWxlY3QgPSAobGFiZWwsIGluZGV4KSA9PiB7IGNvbnNvbGUubG9nKCdzZWxlY3QnLCBsYWJlbCwgaW5kZXgpOyB9XG4gIC8vIGNvbnN0IG9uVW5zZWxlY3QgPSAobGFiZWwsIGluZGV4KSA9PiB7IGNvbnNvbGUubG9nKCd1bnNlbGVjdCcsIGxhYmVsLCBpbmRleCk7IH1cblxuICAvLyBjb25zdCBzZWxlY3RvciA9IG5ldyBzb3VuZHdvcmtzLmRpc3BsYXkuU2VsZWN0b3JWaWV3KGRlZmluaXRpb25zLCBvblNlbGVjdCwgb25VbnNlbGVjdCwge1xuICAvLyAgIG1heFNlbGVjdGVkOiAyLFxuICAvLyAgIGRlZmF1bHRTdGF0ZTogJ3Vuc2VsZWN0ZWQnLFxuICAvLyB9KTtcblxuICAvLyBzcXVhcmVkVmlldy5zZXRWaWV3Q29tcG9uZW50KCcuc2VjdGlvbi1zcXVhcmUnLCBzZWxlY3Rvcik7XG5cbiAgLy8gc3F1YXJlZFZpZXcucmVuZGVyKCk7XG4gIC8vIHNxdWFyZWRWaWV3LmFwcGVuZFRvKCRjb250YWluZXIpO1xuXG4gIC8vIHdpbmRvdy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXG4gIC8vIHJldHVybjtcblxuICAvLyBJbnN0YW50aWF0ZSB0aGUgbW9kdWxlc1xuICBjb25zdCB3ZWxjb21lID0gbmV3IFdlbGNvbWUoe1xuICAgIC8vIGFjdGl2YXRlQXVkaW86IHRydWUsIC8vIGFjdGl2YXRlIGF1ZGlvIG9uIHVzZXIgZXZlbnQgKG5lZWRlZCBvbiBpT1MgZGV2aWNlcylcbiAgICB3YWtlTG9jazogdHJ1ZSwgLy8gaGFjayB0byBwcmV2ZW50IHNjcmVlbiB0byBnbyB0byBzbGVlcFxuICAgIC8vIHJlcXVpcmVNb2JpbGU6IGZhbHNlLFxuICB9KTtcblxuICBjb25zdCBjaGVja2luID0gbmV3IENsaWVudENoZWNraW4oeyBzaG93RGlhbG9nOiBmYWxzZSB9KTtcbiAgY29uc3QgbG9hZGVyID0gbmV3IExvYWRlcih7IGZpbGVzOiBhdWRpb0ZpbGVzIH0pO1xuICBjb25zdCBwZXJmb3JtYW5jZSA9IG5ldyBQbGF5ZXJQZXJmb3JtYW5jZShsb2FkZXIpO1xuXG4gIGNvbnN0IHBsYWNlciA9IG5ldyBzb3VuZHdvcmtzLkNsaWVudFBsYWNlcih7IG1vZGU6ICdsaXN0JyB9KTtcbiAgY29uc3QgbG9jYXRvciA9IG5ldyBzb3VuZHdvcmtzLkNsaWVudExvY2F0b3IoKTtcbiAgLy8gY29uc3Qgb3JpZW50YXRpb24gPSBuZXcgc291bmR3b3Jrcy5PcmllbnRhdGlvbigpO1xuXG4gIC8vIFN0YXJ0IHRoZSBzY2VuYXJpbyBhbmQgb3JkZXIgdGhlIG1vZHVsZXNcbiAgY2xpZW50LnN0YXJ0KChzZXJpYWwsIHBhcmFsbGVsKSA9PlxuICAgIHNlcmlhbChcbiAgICAgIHBsYWNlcixcbiAgICAgIC8vIEluaXRpYWxpemF0aW9uIHN0ZXA6IHdlIGxhdW5jaCBpbiBwYXJhbGxlbCB0aGUgd2VsY29tZSBtb2R1bGUsXG4gICAgICAvLyB0aGUgbG9hZGluZyBvZiB0aGUgZmlsZXMsIGFuZCB0aGUgY2hlY2tpblxuICAgICAgcGFyYWxsZWwod2VsY29tZSwgbG9hZGVyLCAvKiBjaGVja2luICovKSxcbiAgICAgIC8vIGxvY2F0b3IsXG4gICAgICAvLyBvcmllbnRhdGlvbixcbiAgICAgIC8vIFdoZW4gdGhlIGluaXRpYWxpemF0aW9uIHN0ZXAgaXMgZG9uZSwgd2UgbGF1bmNoIHRoZSBwZXJmb3JtYW5jZVxuICAgICAgcGVyZm9ybWFuY2VcbiAgICApXG4gICk7XG59XG5cbi8vIFdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFwcCk7XG4iXX0=