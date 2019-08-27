import soundworks from '@soundworks/core/server';

class ControllerExperience extends soundworks.Experience {
  constructor(soundworks, clientTypes, options = {}) {
    super(soundworks, clientTypes);

    this.liveCoding = this.require('live-coding');
  }

  start() {}

  enter(client) {}

  exit(client) {}
}

export default ControllerExperience;
