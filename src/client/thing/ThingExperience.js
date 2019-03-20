import { Experience } from 'soundworks/thing';
import * as masters from 'waves-masters'

const audioContext = new AudioContext();

class Metro extends masters.TimeEngine {
  constructor() {
    super();

    this.period = 1;
  }

  advanceTime(syncTime) {
    console.log(syncTime);
    return syncTime + this.period;
  }
}

class ThingExperience extends Experience {
  constructor() {
    super();

    this.sharedParams = this.require('shared-params');
    this.sync = this.require('sync', {
      getTime: () => audioContext.currentTime,
    });
  }

  start() {
    super.start();

    const scheduler = new masters.Scheduler(() => {
      return this.sync.getSyncTime();
    }, {
      currentTimeToAudioTimeFunction: (time) => {
        return this.sync.getAudioTime(time);
      },
    });

    const metro = new Metro();
    const startTime = Math.ceil(scheduler.currentTime);

    scheduler.add(metro, startTime);
  }

}

export default ThingExperience;
