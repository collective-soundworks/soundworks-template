// Import Soundworks server side Experience
import { Experience } from 'soundworks/server';

/**
 * Server-side 'player' experience.
 */
export default class PlayerExperience extends Experience {
  /**
   *
   */
  constructor(clientType) {
    super(clientType);

    this.checkin = this.require('checkin');
  }

  /**
   * If anything needs to happen when a client enters the performance (*i.e.*
   * starts the experience on the client side), write it in the `enter`
   * method.
   */
  enter(client) {
    super.enter(client);
    // Send a message to all the other clients of the same type
    this.broadcast(client.type, client, 'play');
  }

  exit(client) {
    super.exit(client);
    // ...
  }

  /**
   * If anything needs to happen when a client connects to the server,
   * write it in the `connect` method.
   */
  // connect(client) {
  //   super.connect(client); // don't forget this
  //
  //   ... // your code
  // }

  /**
   * If anything needs to happen when a client disconnects from the server,
   * write it in the `disconnect` method.
   */
  // disconnect(client) {
  //   super.disconnect(client); // don't forget this
  //
  //   ... // your code
  // }
}
