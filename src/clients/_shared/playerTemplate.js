import { html } from 'lit-element';

const playerTemplate = (values, eventListeners) => {
  return html`
    <h1>Player</h1>
    <label>Volume
      <input
        type="range"
        min="-60"
        max="6"
        .value=${values.player.volume}
        @input=${eventListeners.updateVolume}
      />
    </label>
    <label>Start/Stop Synth
      <input
        type="checkbox"
        .checked=${values.player.startStopSynth === 'start'}
        @click=${eventListeners.startStopSynth}
      />
    </label>
    <label>Trigger Synth
      <button @click=${eventListeners.triggerSynth}>Trigger</button>
    </label>
  `;
}

export default playerTemplate;
