import { Experience } from 'soundworks/thing';

class ThingExperience extends Experience {
  constructor() {
    super();

    this.sharedParams = this.require('shared-params');
  }

  start() {
    super.start();

    console.log('> experience start');
  }

}

export default ThingExperience;
