import { AbstractExperience } from '@soundworks/core/server.js';

export class ControllerExperience extends AbstractExperience {
  constructor(server, clientTypes, context = {}) {
    super(server, clientTypes);
  }

  start() {
    super.start();
  }

  enter(client) {
    super.enter(client);
  }

  exit(client) {
    super.exit(client);
  }
}
