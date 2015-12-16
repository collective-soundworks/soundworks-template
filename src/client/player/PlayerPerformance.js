// Import Soundworks library (client side)
import { client, audioContext, ClientPerformance } from 'soundworks/client';
import soundworks from 'soundworks/client';
const SegmentedView = soundworks.display.SegmentedView;

/**
 * '`player`' performance module (client side).
 * This performance plays a sound when it starts, and plays another sound when
 * other clients join the performance.
 */
export default class PlayerPerformance extends ClientPerformance {
  constructor(loader, options = {}) {
    super(options);

    this._loader = loader; // the loader module
    this._counter = 0;
    // rename to this.content
    this.content = {
      top: `<p class="big">Let's go!</p>`,
      center: `<p class="big">${this._counter}</p>`,
      bottom: '',
    };

    this.events = { click: this.updateView.bind(this) };
    this.view = new SegmentedView(null, this.content, this.events);
  }

  updateView() {
    this._counter++;
    this.content.center = `<p class="big">${this._counter}</p>`;
    this.view.render();
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
    this.receive('play', () => {
      const delay = Math.random();
      let src = audioContext.createBufferSource();
      src.buffer = this._loader.buffers[1]; // get second buffer from loader
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime + delay);
    });

    // Display some feedback text in the view
    // this.setCenteredViewContent('Let’s go!');

    // We would usually call the 'done' method when the module can hand over the
    // control to subsequent modules, however since the performance is the last
    // module to be called in this scenario, we don't need it here.
    // this.done();
  }
}
