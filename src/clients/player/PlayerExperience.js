import { Experience } from '@soundworks/core/client';
import renderInitialization from '@soundworks/helpers/client/render-initialization.js';
import { render, html } from 'lit-html';

class PlayerExperience extends Experience {
  constructor(client, config = {}, $container) {
    super(client);

    this.config = config;
    this.$container = $container;
    this.rafId = null;
    // require services

    // default initialization views
    renderInitialization(client, config, $container);
  }

  async start() {
    super.start();

    window.addEventListener('resize', () => this.render());
    this.render();
  }

  render() {
    // debounce with requestAnimationFrame
    window.cancelAnimationFrame(this.rafId);

    this.rafId = window.requestAnimationFrame(() => {
      render(html`
        <h1 style="padding: 20px; margin: 0">${this.client.type} [id: ${this.client.id}]</h1>
      `, this.$container);
    });
  }
}

export default PlayerExperience;
