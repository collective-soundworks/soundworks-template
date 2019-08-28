import soundworks from '@soundworks/core/server';

class ControllerExperience extends soundworks.Experience {
  constructor(soundworks, clientTypes, auditState, options = {}) {
    super(soundworks, clientTypes);

    this.auditState = auditState;
    this.sync = this.require('sync');
    this.liveCoding = this.require('live-coding');
  }

  start() {}

  enter(client) {
    console.log('thing entered', this.clients.size);
    this.auditState.set({ 'numThings': this.clients.size });
  }

  exit(client) {
    this.auditState.set({ 'numThings': this.clients.size });
  }
}

export default ControllerExperience;
