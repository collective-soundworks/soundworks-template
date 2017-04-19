// import client side soundworks and player experience
import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience.js';
import serviceViewTemplates from '../shared/serviceViewTemplates';
import serviceViewContent from '../shared/serviceViewContent';
import serviceViews from '../shared/serviceViews';

// launch application when document is fully loaded
window.addEventListener('load', () => {
  // initialize the client with configuration received
  // from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  const config = Object.assign({ appContainer: '#container' }, window.soundworksConfig);
  soundworks.client.init(config.clientType, config);

  soundworks.serviceManager.setServiceInstanciationHook((id, instance) => {
    if (id === 'service:platform' || id === 'service:audio-buffer-manager') {
      const template = serviceViewTemplates[id];
      const content = serviceViewContent.get(id, config);
      const viewCtor = serviceViews[id];

      if (viewCtor) {
        const view = new viewCtor(template, content);
        // view.options.id = this.id.replace(/\:/g, '-');
        // view.options.className = 'activity';
        instance.setView(view);
      }
    }
  });

  // @todo - remove that
  // soundworks.client.setViewContentDefinitions(serviceViewContent);
  // soundworks.client.setViewTemplateDefinitions(serviceViewTemplates);

  // create client side (player) experience
  const experience = new PlayerExperience(config.assetsDomain);

  // start the client
  soundworks.client.start();
});
