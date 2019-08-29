import soundworks from '@soundworks/core/client';
import { render, html } from 'lit-html';


class PlayerExperience extends soundworks.Experience {
  constructor(soudnworks, options = {}) {
    super(soudnworks);

    this.delay1 = this.require('delay-1');
    this.delay2 = this.require('delay-2');

    this.$container = document.querySelector('#container');

    this.renderApp('Initializing...');
  }

  start() {
    super.start();

    this.renderApp('Hello');
  }

  renderApp(msg) {
    render(html`<div><h3>${msg}</h3></div>`, this.$container);
  }
}

export default PlayerExperience;
