import '@babel/polyfill';
import { Client } from '@soundworks/core/client';
import initQoS from '@soundworks/helpers/client/init-qos.js';
import ControllerExperience from './ControllerExperience';

// import services here...

const config = window.soundworksConfig;

async function launch() {
  try {
    const client = new Client();

    // -------------------------------------------------------------------
    // register services
    // -------------------------------------------------------------------

    // -------------------------------------------------------------------
    // launch application
    // -------------------------------------------------------------------

    await client.init(config);
    initQoS(client);

    const $container = document.querySelector('#__soundworks-container');
    const controllerExperience = new ControllerExperience(client, config, $container);

    document.body.classList.remove('loading');
    // start everything
    await client.start();
    controllerExperience.start();

  } catch(err) {
    console.error(err);
  }
}

launch();
