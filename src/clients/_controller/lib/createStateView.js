import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

const eventListeners = {};

const createStateView = (stateName, state) => {
  const schema = state.getSchema();
  const values = state.getValues();

  if (!eventListeners[stateName]) {
    eventListeners[stateName] = {};
  }

  const elms = [];

  for (let paramName in schema) {
    const def = schema[paramName];

    let tmpl;

    // readonly
    if (def.metas && def.metas.readonly) {
      tmpl = html`
        <label><span>${paramName}</span>
          ${values[paramName]}
        </label>
      `
    // events
    } else if (def.event) {
      if (!eventListeners[stateName][paramName]) {
        eventListeners[stateName][paramName] = e => {
          const value = def.default || null;
          state.set({ [paramName]: value });
        }
      }

      tmpl = html`
        <label>
          <button
            @click="${eventListeners[stateName][paramName]}"
          >${paramName}</button>
        </label>
      `;

    // else
    } else {

      switch (def.type) {
        case 'boolean':
          if (!eventListeners[stateName][paramName]) {
            eventListeners[stateName][paramName] = e => {
              const value = !!parseInt(e.target.value);
              state.set({ [paramName]: value });
            }
          }

          tmpl = html`
            <label><span>${paramName}</span>
              <select
                @change="${eventListeners[stateName][paramName]}"
              >
                <option ?selected="${!values[paramName]}" value="0">disabled</option>
                <option ?selected="${values[paramName]}" value="1">enabled</option>
              </select>
            </label>
          `;
          break;
        case 'integer':
        case 'float':

          if (!eventListeners[stateName][paramName]) {
            eventListeners[stateName][paramName] = e => {
              const value = def.type === 'integer' ?
                parseInt(e.target.value) : parseFloat(e.target.value);
              state.set({ [paramName]: value });
            }
          }

          if (def.metas && def.metas.view === 'slider') {
            tmpl = html`
              <label><span>${paramName}</span>
                <input
                  type="range"
                  min="${ifDefined(def.min)}"
                  max="${ifDefined(def.max)}"
                  step="${ifDefined(def.step)}"
                  .value="${values[paramName]}"
                  @input="${eventListeners[stateName][paramName]}"
                />
                ${values[paramName]}
              </label>
            `;
          } else {
            tmpl = html`
              <label><span>${paramName}</span>
              <input
                type="number"
                .value="${values[paramName]}"
                @change="${eventListeners[stateName][paramName]}"
              />
              </label>
            `;

          }

          break;
        case 'enum':
          if (!eventListeners[stateName][paramName]) {
            eventListeners[stateName][paramName] = e => {
              state.set({ [paramName]: e.target.value });
            }
          }

          const options = def.list.map(item => {
            return html`
              <option ?selected="${item === values[paramName]}" value="${item}">${item}</option>
            `;
          });

          tmpl = html`
            <label><span>${paramName}</span>
              <select
                @change="${eventListeners[stateName][paramName]}"
              >
                ${options}
              </select>
            </label>
          `;
          break;
      }

    }

    elms.push(tmpl);
  }

  return elms;
}

export default createStateView;
