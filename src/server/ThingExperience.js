import { Experience } from 'soundworks/server';


class ThingExperience extends Experience {
  constructor(clientTypes) {
    super(clientTypes);

    this.sharedParams = this.require('shared-params');
    // this.sync = this.require('sync');
    // this.syncScheduler = this.require('sync-scheduler');
    // this.checkin = this.require('checkin');
  }

  start() {

  }

  enter(client) {
    super.enter(client);

    console.log('client enter');
    this.sharedParams.update('numThings', this.clients.length);
  }

  exit(client) {
    super.exit(client);

    console.log('client exit');
    this.sharedParams.update('numThings', this.clients.length);
  }
}

export default ThingExperience;
