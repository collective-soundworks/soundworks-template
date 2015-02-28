// Loading the libraries
var clientSide = require('soundworks/client');
var client = clientSide.client;
var audioContext = require('audio-context');

// Initiliazing the socket.io namespace
client.init('/player');

class MyPerformance extends clientSide.Module {
  constructor(loader) {
    super('performance', true);

    this.loader = loader; // the loader module
  }

  start() {
    super.start(); // mandatory

    // Send a message to the server indicating that we started the performance
    client.socket.emit('perf_start'); //

    // Plays a sound when we receive a message from the server
    client.socket.on('play_sound', () => {
      let bufferSource = audioContext.createBufferSource();
      bufferSource.buffer = this.loader.audioBuffers[0]; // get the audioBuffers from the loader
      bufferSource.connect(audioContext.destination);
      bufferSource.start(audioContext.currentTime);

      this.view.innerHTML = '<div class="centered-content">Contratulations, you just played a sound!</div>';

      /* We would usually call the .done() method when the module has done its duty,
       * however since the performance is the last module to be called in this scenario,
       * we don't need it.
       */
      // this.done(); 
    });
  }

  /* You usually won't have to write your own .done() method but in case you need to,
   * you _have to_ include super.done() at the end of the method.
   */
  // done() {
  //   super.done(); // mandatory
  // }
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
