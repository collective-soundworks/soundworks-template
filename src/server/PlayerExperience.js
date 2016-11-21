import { Experience } from 'soundworks/server';



// server-side 'player' experience.
export default class PlayerExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.checkin = this.require('checkin');
    this.sharedConfig = this.require('shared-config');


  }

  osci(client){
    this.send(client, 'tstmsg');
  }

  // if anything needs to append when the experience starts
  start() {}

  // if anything needs to happen when a client enters the performance (*i.e.*
  // starts the experience on the client side), write it in the `enter` method
  enter(client) {
    super.enter(client);
    // send a message to all the other clients of the same type
    //Play a sound when another client enters
      this.broadcast(client.type, client, 'play');

      //Import the Javascript OSC libraries as written here: https://github.com/TheAlphaNerd/node-osc
      var osc = require('node-osc');

      var oscServer = new osc.Server(57110, '127.0.0.1');

      oscServer.on('message', function (msg, rinfo)
      {
        console.log('Got a message. Params are ' + msg + ' and ' + rinfo);
      });

      this.broadcast(client,client,'tstmsg');
      this.send(client,'tstmsg');


    this.receive(client,'taptime', () =>
  {
    this.broadcast(client, client, 'tapplay');
    this.send(client,'tapplay');
  });
  }




  exit(client) {
    this.broadcast(client, client, 'gameover');
    super.exit(client);
    // ...
  }
}
