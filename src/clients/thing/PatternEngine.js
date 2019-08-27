import { TimeEngine } from 'waves-masters';
import path from 'path';

class PatternEngine extends TimeEngine {
  constructor(pd, samplers, buffers, pattern, basePeriod, globalsState, engineScript) {
    super();

    this.pd = pd;
    this.samplers = samplers;
    this.buffers = buffers;
    this.pattern = pattern;
    this.basePeriod = basePeriod;
    this.globalsState = globalsState;
    this.engineScript = engineScript;

    this.patternIndex = 0;
    this.startTime = null;

    const it = this.samplers.values();
    this.patch = it.next().value;
    this.samplers.delete(this.patch);

    console.log('using', this.patch.$0, 'pool size:', this.samplers.size);
  }

  set masterVolume(value) {
    this.pd.send(this.patch.$0 + '-master', value);
  }

  stop() {
    this.samplers.add(this.patch);
    console.log('released:', this.patch.$0, 'pool size:', this.samplers.size);
  }

  advanceTime(syncTime) {
    const {
      talea,
      fadeInDuration,
      fadeOutDuration,
      detune,
      periodFactor,
      attack,
      release,
    } = this.pattern;

    const {
      gainHigh,
      gainMid,
      gainLow,
    } = this.globalsState.getValues();

    // general anvelope of the pattern
    if (this.startTime === null) {
      const fadeInDurationMs = fadeInDuration * 1000;
      const fadeOutDurationMs = fadeOutDuration * 1000;
      const list = [fadeInDurationMs, fadeOutDurationMs];
      // console.log(list);
      this.pd.send(this.patch.$0 + '-env', list);
      this.startTime = syncTime;
    }

    if (syncTime > this.startTime + fadeInDuration + fadeOutDuration) {
      this.stop();
      return null;
    } else {
      const audioTime = this.master.audioTime;
      const buffer = this.buffers[Math.floor(Math.random() * this.buffers.length)];
      const bufferName = `samples-${buffer.index}`;
      const level = talea[this.patternIndex];
      const gain = level === 'HIGH' ? gainHigh : level === 'MID' ? gainMid : gainLow;
      const attackMs = attack * 1000;
      const releaseMs = release * 1000;
      const params = this.engineScript.execute(this.pattern, [bufferName, detune, gain, attackMs, releaseMs]);

      // console.log(params);
      this.pd.send(this.patch.$0 + '-trigger', params, audioTime);
      // compute next pattern index
      this.patternIndex = (this.patternIndex + 1) % talea.length;
      return syncTime + this.basePeriod * periodFactor;
    }
  }
}

export default PatternEngine;
