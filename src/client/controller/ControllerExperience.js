import { Experience, View } from 'soundworks/client';
import SharedParamsComponent from './components/SharedParamsComponent';
import LogComponent from './components/LogComponent';

const template = `
  <div id="shared-params"></div>
  <div id="log"></div>
`;

class ControllerExperience extends Experience {
  constructor(options = {}) {
    super();

    this.sharedParams = this.require('shared-params');

    this.sharedParamsComponent = new SharedParamsComponent('#shared-params', this);
    this.logComponent = new LogComponent('#log', this);

    this.setGuiOptions('numPlayers', { readonly: true });

    if (options.auth) {
      this.auth = this.require('auth');
    }
  }

  start() {
    super.start();

    this.view = new View(template, {}, {}, { id: 'controller' });

    this.show().then(() => {
      this.sharedParamsComponent.enter();
      this.logComponent.enter();

      this.receive('log', (type, ...args) => {
        switch (type) {
          case 'error':
            this.logComponent.error(...args);
            break;
        }
      });

    });
  }

  setGuiOptions(name, options) {
    this.sharedParamsComponent.setGuiOptions(name, options);
  }
}

export default ControllerExperience;
