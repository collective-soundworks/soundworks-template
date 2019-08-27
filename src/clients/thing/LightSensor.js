import { spawn } from 'child_process';
import path from 'path';
import EventEmitter from 'events';

class LightSensor extends EventEmitter {
  constructor() {
    super();
    // this.globals = globals;

    // @todo move to globals
    this.lightThreshold = 0.5;
    this.lightHysteresisDuration = 0.1;
    this.lightRawMin = 130000; // dark
    this.lightRawMax = 30000;


    this.seeLight = true;
    this.lastTime = -Infinity;

    this.onData = this.onData.bind(this);
  }

  configure(globals) {
    const {
      lightThreshold,
      lightHysteresisDuration,
      lightRawMin,
      lightRawMax,
    } = globals;

    this.lightThreshold = lightThreshold;
    this.lightHysteresisDuration = lightHysteresisDuration;
    this.lightRawMin = lightRawMin; // ...dark
    this.lightRawMax = lightRawMax; // ...light
  }

  start() {
    const pathToScript = path.join(process.cwd(), 'src', 'client', 'thing', 'lib', 'light_sensor.py');
    const lightSensor = spawn('python', [pathToScript], {});

    lightSensor.stdout.on('data', this.onData);
    lightSensor.stderr.on('data', data => {
      console.log('[LightSensor Error]', data.toString());
    });
  }

  onData(data) {
    const value = parseInt(data);
    const norm = (value - this.lightRawMax) / (this.lightRawMin - this.lightRawMax);

    this.emit('values', value, norm);

    const now = new Date().getTime() / 1000;
    const seeLightNow = norm > this.lightThreshold ? true : false;

    if (this.seeLight !== seeLightNow && this.lastTime + this.lightHysteresisDuration <= now) {
      this.seeLight = seeLightNow;
      this.lastTime = now;

      this.emit('change', this.seeLight);
    }
  }
}

export default LightSensor;
