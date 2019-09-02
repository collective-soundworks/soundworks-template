import '@babel/polyfill';
import soundworks from '@soundworks/core/client';
import delayServiceFactory from '@soundworks/service-delay/client';
import PlayerExperience from './PlayerExperience';

async function init() {
  try {
    const client = new soundworks.Client();

    client.registerService('delay-1', delayServiceFactory, { delayTime: 1 }, []);
    // application.registerService('delay-2', delayServiceFactory, { delayTime: 2 }, ['delay-1']);

    const config = window.soundworksConfig;
    await client.init(config);

    const playerExperience = new PlayerExperience(client, config);

    document.body.classList.remove('loading');

    await client.start()
    playerExperience.start();

    client.socket.addListener('close', () => {
      setTimeout(() => window.location.reload(true), 2000);
    });
  } catch(err) {
    console.error(err);
  }
}

window.addEventListener('load', () => {
  for (let i = 0; i < 100; i++) { init(); }
  // init();
});

// QoS
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    window.location.reload(true);
  }
}, false);
