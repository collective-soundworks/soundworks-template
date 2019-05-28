import '@babel/polyfill';
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

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.location.reload(true);
    }
  }, false);

  // @todo - move to a `FailureManagement` service,
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.location.reload(true);
    }
  }, false);

  soundworks.client.socket.addListener('close', () => {
    setTimeout(() => window.location.reload(true), 2000);
  });
}

window.addEventListener('load', init);
