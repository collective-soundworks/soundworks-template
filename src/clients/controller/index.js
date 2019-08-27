import '@babel/polyfill';
import soundworks from '@soundworks/core/client';
import liveCodeingService from '@soundworks/service-live-coding/client'
import ControllerExperience from './ControllerExperience';

async function init() {
  try {
    soundworks.registerService(liveCodeingService);

    // remove initial loader
    const config = window.soundworksConfig;
    // initialize sockets
    await soundworks.init(config);
    // create client side (player) experience and start the client
    const controller = new ControllerExperience(soundworks, config);

    document.body.classList.remove('loading');
    // start everything
    soundworks.start().then(() => {
      controller.start()
    });

    // ...
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        window.location.reload(true);
      }
    }, false);

    soundworks.client.socket.addListener('close', () => {
      setTimeout(() => window.location.reload(true), 2000);
    });
  } catch(err) {
    console.error(err);
  }
}

window.addEventListener('load', init);
