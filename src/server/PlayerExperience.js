import soundworks from '@soundworks/core/server';

class PlayerExperience extends soundworks.Experience {
  constructor(soundworks, clientTypes, options = {}) {
    super(soundworks, clientTypes);
  }

  start() {}

  enter(client) {
    console.log('client enter', client.id);
  }

  exit(client) {
    console.log('client exit', client.id);
  }
}

export default PlayerExperience;
