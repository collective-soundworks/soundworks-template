import * as soundworks from 'soundworks/client';
import { centToLinear } from 'soundworks/utils/math';
import PlayerRenderer from './PlayerRenderer';

const audioContext = soundworks.audioContext;

const template = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">
      <p class="big"><%= title %></p>
    </div>
    <div class="section-bottom flex-middle"></div>
  </div>
`;

const model = { title: `Let's go!` };

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.audioBufferManager = this.require('audio-buffer-manager', {
      assetsDomain: assetsDomain,
      directories: { path: 'sounds', recursive: true },
    });
  }

  start() {
    super.start(); // don't forget this

    // initialize the view
    this.view = new soundworks.CanvasView(template, model, {}, {
      id: this.id,
      preservePixelRatio: true,
    });

    // as show can be async, we make sure that the view is actually rendered
    this.show().then(() => {
      // play a sound
      this.playSound(this.audioBufferManager.data.tones[0]);

      // play a sound when the message `hello` is received from the server
      // (the message is send when another player joins the experience)
      this.receive('hello', () => this.playSound(this.audioBufferManager.data.tones[1]));

      // play a sound when the message `goodbye` is received from the server
      // (the message is send when another player joins the experience)
      this.receive('goodbye', () => this.playSound(this.audioBufferManager.data.tones[2]));

      // initialize rendering
      const vx = 200 + Math.floor(Math.random() * 200);
      const vy = 200 + Math.floor(Math.random() * 200);

      this.renderer = new PlayerRenderer(vx, vy, (edge) => {
        const idx = (edge === 'top') ? 0 : (edge === 'left' || edge === 'right') ? 1 : 2;
        this.playSound(this.audioBufferManager.data.clicks[idx], 300);
      });

      this.view.addRenderer(this.renderer);

      // this function is called before each update (`Renderer.render`) of the canvas
      this.view.setPreRender(function(ctx, dt, canvasWidth, canvasHeight) {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#000000';
        ctx.rect(0, 0, canvasWidth, canvasHeight);
        ctx.fill();
        ctx.restore();
      });
    });
  }

  playSound(buffer, randomPitchVar = 0) {
    const src = audioContext.createBufferSource();
    src.connect(audioContext.destination);
    src.buffer = buffer;
    src.start(audioContext.currentTime);
    src.playbackRate.value = centToLinear((Math.random() * 2 - 1) * randomPitchVar);
  }
}

export default PlayerExperience;
