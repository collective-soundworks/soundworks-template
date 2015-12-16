// Import Soundworks library (client side)
import soundworks from 'soundworks/client';

const audioContext = soundworks.audioContext;
const client = soundworks.client;
const ClientPerformance = soundworks.ClientPerformance;
const SegmentedView = soundworks.display.SegmentedView;

const template = `
  <div class="section-top flex-middle">
    <p class="big"><%= go %></p>
  </div>
  <div class="section-center flex-center">
    <p class="big"><%= counter %></p>
  </div>
  <div class="section-bottom"></div>
`;

/**
 * '`player`' performance module (client side).
 * This performance plays a sound when it starts, and plays another sound when
 * other clients join the performance.
 */
export default class PlayerPerformance extends ClientPerformance {
  constructor(loader, options = {}) {
    super(options);

    this._loader = loader; // the loader module

    // Define elements for the view
    this.template = template;
    this.content = { go: `Let's go!`,   counter: 0 };
    this.events = { click: this.updateView.bind(this) };
    // Create the view
    this.view = new SegmentedView(this.template, this.content, this.events);
  }

  updateView() {
    this.content.counter++;
    // partially update the view
    this.view.render('.section-center');
  }

  start() {
    super.start(); // don't forget this

    // Play the welcome sound immediately
    const src = audioContext.createBufferSource();
    src.buffer = this._loader.buffers[0]; // get first buffer from loader
    src.connect(audioContext.destination);
    src.start(audioContext.currentTime);

    // Play another sound when we receive a message from the server (that
    // indicates that another client joined the performance)
    this.receive('play', () => {
      const delay = Math.random();
      const src = audioContext.createBufferSource();
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
