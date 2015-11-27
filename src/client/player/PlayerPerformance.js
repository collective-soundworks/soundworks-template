// Import Soundworks library (client side)
import { client, audioContext, Performance } from 'soundworks/client';

/**
 * '`player`' performance module (client side).
 * This performance plays a sound when it starts, and plays another sound when
 * other clients join the performance.
 */
export default class PlayerPerformance extends Performance {
  constructor(loader, options = {}) {
    super(options);

    this._loader = loader; // the loader module
  }

  start() {
    super.start(); // don't forget this

    // Play the welcome sound immediately
    let src = audioContext.createBufferSource();
    src.buffer = this._loader.buffers[0]; // get first buffer from loader
    src.connect(audioContext.destination);
    src.start(audioContext.currentTime);

    // Play another sound when we receive a message from the server (that
    // indicates that another client joined the performance)
    client.receive('performance:play', () => {
      let src = audioContext.createBufferSource();
      src.buffer = this._loader.buffers[1]; // get second buffer from loader
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime);
    });

    // Display some feedback text in the view
    this.setCenteredViewContent('Let’s go!');

    // We would usually call the 'done' method when the module can hand over the
    // control to subsequent modules, however since the performance is the last
    // module to be called in this scenario, we don't need it here.
    // this.done();
  }
}
