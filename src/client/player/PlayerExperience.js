import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';

const audioContext = soundworks.audioContext;

const viewTemplate = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">
      <p class="big"><%= title %></p>
    </div>
    <div class="section-bottom flex-middle"></div>
  </div>
`;

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, audioFiles) {
    super();

    this.platform = this.require('platform', { features: ['web-audio', 'wake-lock'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.loader = this.require('loader', {
      assetsDomain: assetsDomain,
      files: audioFiles,
    });
  }

  playSound() {
    //Attempt to move the playing of sound into a function
    //Currently will only play the first sound

    const src = audioContext.createBufferSource();
    src.buffer = this.loader.buffers[0];
    src.connect(audioContext.destination);
    src.start(audioContext.currentTime);
    alert('Sound test successful!');

  }

  init() {
    // initialize the view
    this.viewTemplate = viewTemplate;
    this.viewContent = { title: `Moondog Player` };
    this.viewCtor = soundworks.CanvasView;
    this.viewOptions = { preservePixelRatio: true };
    this.view = this.createView();
  }


  start(){
    super.start(); // don't forget this

    if (!this.hasStarted)
      this.init();

    this.show();


    //Play first loaded buffer, but with a custom function
    this.playSound();
    // play the first loaded buffer immediately
    /*
    const src = audioContext.createBufferSource();
    console.log('Playing first sound!');
    src.buffer = this.loader.buffers[0];
    src.connect(audioContext.destination);
    src.start(audioContext.currentTime);
    */



    // play the second loaded buffer when the message `play` is received from
    // the server, the message is send when another player joins the experience.
    this.receive('play', () => {
    	console.log('New device detected!');
    	//The delay has been modified so that the sounds may or may not overlap. Other plays may play up to 1.5 seconds after a new client joins.
      const delay = (Math.random() * 5.5);
      const src = audioContext.createBufferSource();
      src.buffer = this.loader.buffers[1];
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime + delay);

    });

    // initialize rendering
    this.renderer = new PlayerRenderer(100, 100);
    this.view.addRenderer(this.renderer);

    // this function is called before each update (`Renderer.render`) of the canvas
    this.view.setPreRender(function(ctx, dt) {
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#000000';
      ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fill();
      ctx.restore();
    });
  }


}
