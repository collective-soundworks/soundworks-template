import { html, render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

function header(config) {
  return html`
    <div class="align-center">
      <h1 class="title">${config.app.name}</h1>
      <p class="author">${config.app.author ? `by ${config.app.author}` : ''}</p>
    </div>
  `;
}

// this one is very special
const renderScreen = {
  platform(platform, config) {
    const serviceState = platform.state.getValues();

    let msg;
    let blink = false;
    let bindListener = false;


    if (serviceState.available === null) {
      msg = 'Checkin...';
    } else if (serviceState.authorized === null) {
      msg = 'Authorizing...';
    } else if (serviceState.initialized === null) {
      msg = 'Please click to join';
      blink = true;
      bindListener = platform.onUserGesture;
    } else if (serviceState.finalized === null) {
      msg = 'Finalizing...'
    }

    return html`
      <div class="services screen"
        @mouseup="${ifDefined(bindListener)}"
        @touchend="${ifDefined(bindListener)}"
      >
        <section class="half-screen aligner">
          ${header(config)}
        </section>
        <section class="half-screen aligner">
          <p class="normal align-center ${blink ? 'soft-blink' : ''}">${msg}</p>
        </section>
      </div>
    `
  },

  default(services, config) {
    return html`
      <div class="screen">
        <section class="half-screen aligner">
          ${header(config)}
        </section>
        <section class="half-screen aligner services">
          <div class="aligner-item--top">
            <ul>
              <li class="italic normal">Please wait while</li>
              ${services.map(service => html`
                <li class="normal initialization-item">
                  ${startedMsg[service.name]
                    ? startedMsg[service.name](service)
                    : startedMsg.default(service)}<span>.</span><span>.</span><span>.</span></li>`
              )}
            </ul>
          </div>
        </section>
      </div>
    `;
  },

  errored(service, config) {
    return html`
      <div class="screen">
        <section class="half-screen aligner">
          ${header(config)}
        </section>
        <section class="half-screen aligner services">
          <div>
            <ul>
              <li class="italic normal error">Sorry,</li>
              ${errorMsg[service.name] ? errorMsg[service.name](service) : errorMsg.default(service)}
            </ul>
          </div>
        </section>
      </div>
    `;
  },
};

const startedMsg = {
  'audio-buffer-loader': (service) => 'Loading audio files',
  'sync': (service) => 'Syncing',
  'default': (service) => `Initializing ${service.name}`,
};

const errorMsg = {
  platform(service) {
    const serviceState = service.state.getValues();

    const stepErrors = {
      available: 'checking device compatibility',
      authorized: 'asking authorizations',
      initialized: 'initializing application',
      finalized: 'finalizing initialization',
    }

    let errorMsg;
    let erroredFeatures = [];

    // set error message and find more informations in [step].details
    for (let step of Object.keys(stepErrors)) {
      if (serviceState[step].result === false) { // this is the guilty one
        errorMsg = stepErrors[step];

        for (let feature in serviceState[step].details) {
          if (serviceState[step].details[feature] === false) {
            erroredFeatures.push(feature);
          }
        }

        break;
      }
    }

    // @todo - use renderDefaultErroredService
    return html`
      <li class="italic normal error">An error occured while...</li>
      <li class="normal error-item">${errorMsg}</li>
      <li class="normal error-item">(${erroredFeatures.join(', ')})</li>
    `;
  },

  checkin(checkin) {
    return html`
      <li class="italic normal error">No place available...</li>
      <li class="normal error-item">Please try again later</li>
    `;

    return $html;
  },

  default(service) {
    return html`
      <li class="italic normal error">An error occured while...</li>
      <li class="normal error-item">Initializing ${service.name}</li>
    `;
  },
};

/**
 * This method only works with default service names (cf. `serviceFactory.defaultName`).
 * if other names are used, should be updated accordingly...
 */
export default function renderAppInitialization(client, config, $container) {
  const unsubscribe = client.serviceManager.observe(status => {
    let $screen;
    // handle platform first
    if (status['platform'] && status['platform'] === 'started') {

      const platformService = client.serviceManager.get('platform');
      $screen = renderScreen.platform(platformService, config);

    } else if (status['platform'] && status['platform'] === 'errored') {

      const platformService = client.serviceManager.get('platform');
      $screen = renderScreen.errored(platformService, config);

    // then every one else...
    } else if (!status['platform'] || status['platform'] === 'ready') {
      // platform is ready, or not platform at all...
      const started = [];
      const errored = null; // only one service can be errored at once (normally)

      for (let key in status) {
        const service = client.serviceManager.get(key);

        // we ignore ready and idle services
        if (status[key] === 'started') {
          started.push(service);
        } else if (status[key] === 'errored') {
          errored = service;
        }
      }

      if (errored) {
        $screen = renderScreen.errored(errored, config);
      } else {
        $screen = renderScreen.default(started, config);
      }
    }

    render($screen, $container);
  });

  // clean when ready...
  client.serviceManager.ready.then(unsubscribe);
}

