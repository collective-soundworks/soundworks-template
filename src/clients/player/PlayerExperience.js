import soundworks from '@soundworks/core/client';
import { render, html } from 'lit-html';


class PlayerExperience extends soundworks.Experience {
  constructor(soudnworks, options = {}) {
    super(soudnworks);

    this.$container = document.querySelector('#container');
  }

  async start(_client) {
    super.start();

    console.log('Experience started');
    // init app with current values
    this.renderApp();
  }

  renderApp() {
    render(html`<div><h3>ok</h3></div>`, this.$container);
  }
}

export default PlayerExperience;
