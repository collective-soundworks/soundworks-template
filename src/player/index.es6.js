// Load the libraries
var clientSide = require('soundworks/client');
var client = clientSide.client;
var audioContext = require('audio-context');

// Initiliaze the client in its namespace
client.init('/player');

class MyPerformance extends clientSide.Performance {
  constructor(loader, options = {}) {
    super(options);

    this.loader = loader; // the loader module
  }

  start() {
    super.start(); // don't forget this (in particular, it sends the 'performance:start' message)

    // On reception of a WebSocket message from the server, play a sound
    client.receive('performance:play', () => {
      let bufferSource = audioContext.createBufferSource();
      bufferSource.buffer = this.loader.audioBuffers[0]; // get the audioBuffers from the loader
      bufferSource.connect(audioContext.destination);
      bufferSource.start(audioContext.currentTime);

      this.setViewText('Congratulations, you just played a sound!'); // display some feedback text in the view

      /* We would usually call the .done() method when the module has done its duty,
       * however since the performance is the last module to be called in this scenario,
       * we don't need it.
       */
      // this.done(); 
    });
  }
}

var file = ['sounds/sound.mp3'];

// Where the magic happens
window.addEventListener('load', () => {
  // Instantiate the modules
  var welcome = new clientSide.Dialog({
    id: 'welcome',
    text: "<p>Welcome to <b>My Scenario</b>.</p> <p>Touch the screen to join!</p>",
    activateAudio: true
  });
  var checkin = new clientSide.Checkin({
    dialog: false
  });
  var loader = new clientSide.Loader(file);
  var performance = new MyPerformance(loader);

  // Start the scenario and link the modules
  client.start(
    client.serial(
      client.parallel( // we launch in parallel the welcome module, the loading of the files, and the checkin
        welcome,
        loader,
        checkin
      ),
      performance // when all of them are done, we launch the performance
    )
  );

});
