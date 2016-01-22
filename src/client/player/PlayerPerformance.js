// Import Soundworks library (client side)
import soundworks from 'soundworks/client';

const audioContext = soundworks.audioContext;
const client = soundworks.client;
const ClientPerformance = soundworks.ClientPerformance;
const Renderer = soundworks.display.Renderer;
const CanvasView = soundworks.display.CanvasView;


class PerformanceRenderer extends Renderer {
  constructor(vx, vy) {
    super(0);

    this.velocityX = vx; // px per seconds
    this.velocityY = vy; // px per seconds
  }

  init() {
    if (!this.x || !this.y) {
      this.x = Math.random() * this.canvasWidth;
      this.y = Math.random() * this.canvasHeight;
    }
  }

  update(dt) {
    if (this.x >= this.canvasWidth || this.x <= 0) { this.velocityX *= -1; }
    if (this.y >= this.canvasHeight || this.y <= 0) { this.velocityY *= -1; }

    this.x += (this.velocityX * dt);
    this.y += (this.velocityY * dt);
  }

  render(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = '#ffffff';
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

const template = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle">
      <p class="big"><%= title %></p>
    </div>
    <div class="section-center flex-center"></div>
    <div class="section-bottom flex-middle"></div>
  </div>
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

    this.init();
  }

  init() {
    // Initialize the view
    this.template = template;
    this.content = { title: `Let's go!` };
    this.viewCtor = CanvasView;
    this.view = this.createView();
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

    // initialize rendering
    this.view.setPreRender(function(ctx, dt) {
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, ctx.width, ctx.height);
      ctx.restore();
    });

    this.renderer = new PerformanceRenderer(100, 100);
    this.view.addRenderer(this.renderer);

    // We would usually call the 'done' method when the module can hand over the
    // control to subsequent modules, however since the performance is the last
    // module to be called in this scenario, we don't need it here.
    // this.done();
  }
}
