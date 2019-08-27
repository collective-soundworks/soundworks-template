import { TimeEngine } from 'waves-masters';
import path from 'path';
import fs from 'fs';

const patchesPath = path.join(process.cwd(), 'pd');
const logFile = path.join(process.cwd(), 'test.log');

class TestEngine extends TimeEngine {
  constructor(pd, buffer, period = 1) {
    super();

    this.pd = pd;
    this.buffer = buffer;
    this.period = period;
    this.patch = this.pd.openPatch('sample-player.pd', patchesPath);
    this.pd.send(this.patch.$0 + '-env', [0, 3 * 24 * 60 * 60 * 1000]);

    fs.unlinkSync(logFile);
  }

  set masterVolume(value) {
    this.pd.send(this.patch.$0 + '-master', value);
  }

  stop() {
    this.pd.closePatch(this.patch);
  }

  advanceTime(syncTime) {
    const audioTime = this.master.audioTime;
    const buffer = `samples-${this.buffer.index}`;
    const detune = 0;
    const gain = 0.8;
    const attackMs = 0.01 * 1000;
    const releaseMs = 0.1 * 1000;
    const params = [buffer, detune, gain, attackMs, releaseMs];

    this.pd.send(this.patch.$0 + '-trigger', params, audioTime);

    fs.appendFileSync(logFile, `${new Date()}\n`);

    return syncTime + this.period;
  }
}

export default TestEngine;
