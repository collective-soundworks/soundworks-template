import { Experience } from 'soundworks/thing';
import { AudioContext } from 'ameize-webaudio';
import * as masters from 'waves-masters'

const audioContext = new AudioContext();

class Metro extends masters.TimeEngine {
  constructor() {
    super();

    const ramp = audioContext.createGain();
    ramp.gain.value = 0;
    ramp.connect(audioContext.destination);

    const env = audioContext.createGain();
    env.gain.value = 0.7;
    env.connect(ramp);

    const osc = audioContext.createOscillator();
    osc.frequency.value = 400;
    osc.connect(env);

    // AM
    const modAmpScale = audioContext.createGain();
    modAmpScale.gain.value = 0.3;
    modAmpScale.connect(env.gain);

    const modAmp = audioContext.createOscillator();
    modAmp.frequency.value = 25;
    modAmp.connect(modAmpScale);

    // FM
    const modFreq = audioContext.createOscillator();
    modFreq.frequency.value = 40;
    modFreq.connect(osc.frequency);

    osc.start(0);
    modAmp.start(0);
    modFreq.start(0);

    this.ramp = ramp;
    this.period = 1;
  }

  advanceTime(syncTime) {

    // problems w/ ramps
    const now = this.master.audioTime;
    this.ramp.gain.setValueAtTime(0, now);
    this.ramp.gain.linearRampToValueAtTime(1, now + 0.01);
    this.ramp.gain.exponentialRampToValueAtTime(0.001, now + 1);

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
    // this.syncScheduler = this.require('sync-scheduler');
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
    console.log(startTime, scheduler.currentTime);

    scheduler.add(metro, startTime);
  }

}

export default ThingExperience;
