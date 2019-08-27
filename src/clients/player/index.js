import '@babel/polyfill';
import soundworks from '@soundworks/core/client';
import PlayerExperience from './PlayerExperience';

async function init() {
  try {
    // remove initial loader
    const config = window.soundworksConfig;
    // initialize sockets
    await soundworks.init(config);
    // create client side (player) experience and start the client
    const controller = new PlayerExperience(soundworks, config);

    document.body.classList.remove('loading');
    // start everything
    soundworks.start().then(() => {
      controller.start();
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
