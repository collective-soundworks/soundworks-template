import soundworks from '@soundworks/core/client';
import { render, html } from 'lit-html';
import createStateView from './lib/createStateView';
// @todo - move somewhere else
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/keymap/sublime';

class ControllerExperience extends soundworks.Experience {
  constructor(soudnworks, options = {}) {
    super(soudnworks);

    this.liveCoding = this.require('live-coding');

    this.$container = document.querySelector('#container');
    this.$container.classList.add('controller');

    this.thingStates = {};
    this.scripts = {};
  }

  async start(_client) {
    super.start();

    this.globalsState = await this.soundworks.stateManager.attach('globals');
    this.auditState = await this.soundworks.stateManager.attach('audit');

    this.soundworks.stateManager.observe(async (name, nodeId) => {
      if (name === 'thing') {
        const state = await this.soundworks.stateManager.attach(name, nodeId);

        state.subscribe(updates => this.renderApp());

        state.onDetach(() => {
          delete this.thingStates[nodeId];
          this.renderApp();
        });

        this.thingStates[nodeId] = state;
        this.renderApp();
      }
    });

    this.liveCoding.observe(scripts => {
      // @note - should attach to receive updates of other peers
      for (let [name, value] of Object.entries(scripts)) {
        console.log(name, value);
        this.scripts[name] = { value }
      }

      this.renderApp();
    });

    this.eventListeners = {
      // update script
      updateScript: e => {
        const name = e.target.dataset.target;
        const value = this.scripts[name].code.getValue();
        this.liveCoding.update(name, value);
      },
    };

    this.globalsState.subscribe(updates => this.renderApp());
    this.auditState.subscribe(updates => this.renderApp());
    // init app with current values
    this.renderApp();
  }

  renderApp() {
    render(
      html`
        <div><h3>audit</h3>
          ${createStateView('audit', this.auditState)}
        </div>
        <div><h3>globals</h3>
          ${createStateView('globals', this.globalsState)}
        </div>
        <hr />
        ${Object.keys(this.thingStates).map(thingId => {
          return html`
            <div><h3>${this.thingStates[thingId].getValues().hostname} (id: ${thingId})</h3>
            ${createStateView(`thing-${thingId}`, this.thingStates[thingId])}
          `;
        })}
        <hr />
        ${ Object.keys(this.scripts).length
          ? html`
          <div id="scripts">
            ${Object.keys(this.scripts).map((name) => {
              return html`
                <h4>> script: ${name}</h4>
                <div class="script-${name}"></div>
                <button
                  class="update"
                  data-target="${name}"
                  @click="${this.eventListeners.updateScript}">update
                </button>
              `;
            })}
          </div>` : ``
        }`
      , this.$container
    );

    // CodeMirror
    for (let name in this.scripts) {
      if (!this.scripts[name].code) {
        const $el = document.querySelector(`.script-${name}`);
        const code = CodeMirror($el, {
          value: this.scripts[name].value,
          mode: 'javascript',
          theme: 'monokai',
          lineNumbers: true,
          tabSize: 2,
          keyMap: 'sublime',
          fontSize: 11,
        });

        this.scripts[name].code = code;
      }
    }
  }

}

export default ControllerExperience;
