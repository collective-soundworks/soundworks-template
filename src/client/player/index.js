// import client side soundworks and player experience
import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience.js';
import viewTemplates from '../shared/viewTemplates';
import viewContent from '../shared/viewContent';

// list of files to load (passed to the experience)
const files = [
  'sounds/MDFull.mp3',
  'sounds/MDStart.mp3',
  'sounds/A2.mp3',
  'sounds/C2.mp3',
  'sounds/E2.mp3',
  'sounds/G2.mp3',
  'sounds/D3.mp3',
  'sounds/SMWGO.mp3'
];

// launch application when document is fully loaded
window.addEventListener('load', () => {
  // configuration received from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  const { appName, clientType, socketIO, assetsDomain }  = window.soundworksConfig;
  // initialize the 'player' client
  soundworks.client.init(clientType, { appName, socketIO });
  soundworks.client.setViewContentDefinitions(viewContent);
  soundworks.client.setViewTemplateDefinitions(viewTemplates);

  // create client side (player) experience
  const experience = new PlayerExperience(assetsDomain, files);

  // start the client
  soundworks.client.start();
});
