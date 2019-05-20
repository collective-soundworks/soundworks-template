import * as soundworks from 'soundworks/client';
import { html } from 'lit-html';

const audioContext = soundworks.audioContext;

const template = `
  <div class="section-top flex-middle"></div>
  <div class="section-center flex-center">
    <p class="big"><%= title %></p>
  </div>
  <div class="section-bottom flex-middle"></div>
`;

const model = { title: `ok` };

class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.sharedParams = this.require('shared-params');
    this.audioBufferManager = this.require('audio-buffer-manager', {
      assetsDomain: assetsDomain,
      files: [ /* ... */ ],
    });
  }

  async start() {
    super.start();

    this.view = new soundworks.SegmentedView(template, model, {}, { id: 'player' });
    await this.show();

    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);
    osc.frequency.value = 5000;
    osc.start(now);
    osc.stop(now + 0.001);
  }
}

export default PlayerExperience;
