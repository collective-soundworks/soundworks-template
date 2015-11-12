// Require the Soundworks library (client side)
var clientSide = require('soundworks/client');
var client = clientSide.client;
var audioContext = clientSide.audioContext;

// Initiliaze the client with its type
client.init('player');

class MyPerformance extends clientSide.Performance {
  constructor(loader, options = {}) {
    super(options);
    this.loader = loader; // the loader module
  }

  start() {
    super.start(); // don't forget this

    // Play the welcome sound immediately
    let src = audioContext.createBufferSource();
    src.buffer = this.loader.buffers[0]; // get the first audio buffer from the loader
    src.connect(audioContext.destination);
    src.start(audioContext.currentTime);

    // Play another sound when we receive the 'play' message from the server
    client.receive('performance:play', () => {
      setTimeout(() => {
        let src = audioContext.createBufferSource();
        src.buffer = this.loader.buffers[1]; // get the second audioBuffer from the loader
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
}

var files = ['sounds/sound-welcome.mp3', 'sounds/sound-others.mp3'];

// Where the magic happens
window.addEventListener('load', () => {
  // Instantiate the modules
  var welcome = new clientSide.Dialog({
    name: 'welcome',
    text: "<p>Welcome to <b>My Scenario</b>.</p> <p>Touch the screen to join!</p>",
    activateAudio: true
  });
  var checkin = new clientSide.Checkin();
  var loader = new clientSide.Loader({ files });
  var performance = new MyPerformance(loader);

  // Start the scenario and link the modules
  client.start((seq, par) => {
    return seq(
      // we launch in parallel the welcome module, the loading of the files, and the checkin
      par(welcome, loader, checkin),
      // when all of them are done, we launch the performance
      performance
    );
  });
});
