import { Experience } from 'soundworks/server';

class PlayerExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.checkin = this.require('checkin');
    this.sharedParams = this.require('shared-params');
    this.audioBufferManager = this.require('audio-buffer-manager');
  }

  start() {

  }

  enter(client) {
    super.enter(client);

    this.sharedParams.update('numPlayers', this.clients.length);
  }

  exit(client) {
    super.exit(client);

    this.sharedParams.update('numPlayers', this.clients.length);
  }
}

export default PlayerExperience;
