import * as soundworks from 'soundworks/client';
import ControllerExperience from './ControllerExperience';
import serviceViews from '../shared/serviceViews';


function init() {
  document.body.classList.remove('loading');

  const config = Object.assign({ appContainer: '#container' }, window.soundworksConfig);
  soundworks.client.init(config.clientType, config);

  soundworks.client.setServiceInstanciationHook((id, instance) => {
    if (serviceViews.has(id))
      instance.view = serviceViews.get(id, config);
  });

  const controller = new ControllerExperience({ auth: false });
  soundworks.client.start();

  // reload client if server is down...
  soundworks.client.socket.addStateListener(eventName => {
    if (eventName === 'disconnect') {
      setTimeout(() => window.location.reload(true), 2000);
    }
  });
}

window.addEventListener('load', init);
