import soundworks from '@soundworks/core/client';
import { render, html } from 'lit-html';


class PlayerExperience extends soundworks.Experience {
  constructor(application, options = {}) {
    super(application);

    this.application = application;

    this.delay1 = this.require('delay-1');
    // this.delay2 = this.require('delay-2');
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.$root = document.querySelector('#container')
    this.$container = document.createElement('div');
    this.$container.style.width = '200px';
    this.$container.style.height = '200px';
    this.$container.style.float = 'left';
    this.$container.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    this.$root.appendChild(this.$container);

    this.renderApp('Initializing...');
  }

  start() {
    super.start();

    this.renderApp(`Hello ${this.application.id}`);
  }

  renderApp(msg) {
    render(html`
      <div>
        <h3>${msg}</h3>
      </div>
    `, this.$container);
  }
}

export default PlayerExperience;
