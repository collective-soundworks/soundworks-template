import path from 'path';
import os from 'os';
import soundworks from '@soundworks/core/client';
import * as masters from 'waves-masters';
import loadAudioFiles from './lib/loadAudioFiles';
import PatternEngine from './PatternEngine';
import TestEngine from './TestEngine';
import LightSensor from './LightSensor'
import { getPattern } from './patterns';

const patchesPath = path.join(process.cwd(), 'pd');

class ThingExperience extends soundworks.Experience {
  constructor(soundworks, pd) {
    super(soundworks);

    this.pd = pd;
    this.engines = new Set();
    this.testEngine = null;
    this.samplers = new Set();

    this.sync = this.require('sync', {
      getTimeFunction: () => this.pd.currentTime,
    });

    this.triggerTimeout = null;

    this.liveCoding = this.require('live-coding');
  }

  async start() {
    super.start();

    const hostname = os.hostname();
    const numSamplers = 4;

    console.log(`> ----------------------------------------------`);
    console.log(`> ${hostname} started`)
    console.log('> #samplers:', numSamplers);
    console.log(`> ----------------------------------------------`);

    for (let i = 0; i < numSamplers; i++) {
      const patch = this.pd.openPatch('sample-player.pd', patchesPath);
      this.samplers.add(patch);
    }

    this.patternScript = this.liveCoding.attach('pattern');
    this.engineScript = this.liveCoding.attach('engine');

    this.lightSensor = new LightSensor();

    const cwd = process.cwd();

    // sketch audio stuff properly...
    this.buffers = await loadAudioFiles(this.pd, {
      kick: path.join(cwd, 'public', 'audio', '909-BD-high.wav'),
      // sounfiles for generated pattern
      noise: path.join(cwd, 'public', 'audio', 'noise.wav'),
      sine: path.join(cwd, 'public', 'audio', 'sine-420.wav'),
      square: path.join(cwd, 'public', 'audio', 'square-420.wav'),
      sawtooth: path.join(cwd, 'public', 'audio', 'sawtooth-420.wav'),
      'bol-tibetain-1': path.join(cwd, 'public', 'audio', 'real', 'bol-tibetain-1.wav'),
      'bol-tibetain-2': path.join(cwd, 'public', 'audio', 'real', 'bol-tibetain-2.wav'),
      'bol-tibetain-3': path.join(cwd, 'public', 'audio', 'real', 'bol-tibetain-3.wav'),
      'cloche-japonaise-1': path.join(cwd, 'public', 'audio', 'real', 'cloche-japonaise-1.wav'),
      'cloche-japonaise-2': path.join(cwd, 'public', 'audio', 'real', 'cloche-japonaise-2.wav'),
      'cloches-tibetaines-1': path.join(cwd, 'public', 'audio', 'real', 'cloches-tibetaines-1.wav'),
      'cloches-tibetaines-2': path.join(cwd, 'public', 'audio', 'real', 'cloches-tibetaines-2.wav'),
      'cloches-tibetaines-3': path.join(cwd, 'public', 'audio', 'real', 'cloches-tibetaines-3.wav'),
      'cloches-tibetaines-4': path.join(cwd, 'public', 'audio', 'real', 'cloches-tibetaines-4.wav'),
      'noise-djembe-1': path.join(cwd, 'public', 'audio', 'real', 'noise-djembe-1.wav'),
      'noise-djembe-2': path.join(cwd, 'public', 'audio', 'real', 'noise-djembe-2.wav'),
      'noise-djembe-3': path.join(cwd, 'public', 'audio', 'real', 'noise-djembe-3.wav'),
      'tambour-basque-1': path.join(cwd, 'public', 'audio', 'real', 'tambour-basque-1.wav'),
      'tambour-basque-2': path.join(cwd, 'public', 'audio', 'real', 'tambour-basque-2.wav'),
      'tambour-basque-3': path.join(cwd, 'public', 'audio', 'real', 'tambour-basque-3.wav'),
    });

    this.soundBanks = {
      noise: [this.buffers.noise],
      sine: [this.buffers.sine],
      square: [this.buffers.square],
      sawtooth: [this.buffers.sawtooth],
      'bol-tibetain': [this.buffers['bol-tibetain-1'], this.buffers['bol-tibetain-2'], this.buffers['bol-tibetain-3']],
      'cloche-japonaise': [this.buffers['cloche-japonaise-1'], this.buffers['cloche-japonaise-2']],
      'cloches-tibetaines': [this.buffers['cloches-tibetaines-1'], this.buffers['cloches-tibetaines-2'], this.buffers['cloches-tibetaines-3'], this.buffers['cloches-tibetaines-4']],
      'noise-djembe': [this.buffers['noise-djembe-1'], this.buffers['noise-djembe-2'], this.buffers['noise-djembe-3']],
      'tambour-basque': [this.buffers['tambour-basque-1'], this.buffers['tambour-basque-2'], this.buffers['tambour-basque-3']],
    };

    this.scheduler = new masters.Scheduler(() => this.sync.getSyncTime(), {
      currentTimeToAudioTimeFunction: time => this.sync.getLocalTime(time),
    });

    this.globalsState = await this.soundworks.stateManager.attach('globals');
    this.thingState = await this.soundworks.stateManager.create('thing');

    this.globalsState.subscribe(updates => {
      for (let [name, value] of Object.entries(updates)) {
        switch (name) {
          case 'master':
            this.engines.forEach(engine => this.setEngineVolume(engine));

            if (this.testEngine) {
              this.testEngine.masterVolume = value;
            }
            break;
          case 'triggerKick':
            const seeLight = this.thingState.getValues().seeLight;
            // if does see light, avoid
            if (!seeLight) {
              const duration = 45 + Math.random() * 30;
              const fadeInDuration = (1 - 0.618) * duration;
              const fadeOutDuration = duration - fadeInDuration;

              const pattern = {
                talea: ['HIGH', 'MID', 'MID', 'MID'],
                fadeInDuration,
                fadeOutDuration,
                detune: 0,
                periodFactor: 4,
                attack: 0.001,
                release: Math.random() * 0.3 + 0.1,
              };

              this.triggerPattern(pattern);
            }
            break;
          case 'lightThreshold':
          case 'lightHysteresisDuration':
          case 'lightRawMin':
          case 'lightRawMax':
            this.lightSensor[name] = value;
            break;
        }
      }
    });

    this.lightSensor.configure(this.globalsState.getValues());
    this.lightSensor.start();

    this.thingState.subscribe(updates => {
      for (let name in updates) {
        switch (name) {
          case 'startEngines':
            this.startEngines();
            this.thingState.set({ enginesState: 'started' });
            break;
          case 'stopEngines':
            this.stopEngines();
            this.thingState.set({ enginesState: 'stopped' });
            break;
          case 'startSelected':
            this.triggerPattern();
            break;
          case 'seeLight':
            this.engines.forEach(engine => this.setEngineVolume(engine));
            break;
          case 'test':
            this.toggleTest(updates[name]);
            break;
          case 'streamLightValues':
            const value = updates[name];
            if (value) {
              this.lightSensor.addListener('values', (raw, norm) => {
                this.thingState.set({
                  lightRawValue: raw,
                  lightNormValue: norm,
                });
              });
            } else {
              this.lightSensor.removeAllListeners('values');
            }
            break;

          case 'kill': {
            throw new Error('Killed by user');
          }
        }
      }
    });

    this.thingState.set({ hostname });

    this.lightSensor.on('change', seeLight => {
      this.thingState.set({ seeLight });
    });
  }

  startEngines() {
    clearTimeout(this.triggerTimeout);

    const autoTrigger = () => {
      this.triggerPattern();
      // randomize next sound
      const soundBanks = Object.keys(this.soundBanks);
      const soundBank = soundBanks[Math.floor(Math.random() * soundBanks.length)];
      this.thingState.set({ soundBank });

      this.triggerTimeout = setTimeout(autoTrigger, (Math.random() * 10 + 10) * 1000);
    }

    autoTrigger();
  }

  stopEngines() {
    clearTimeout(this.triggerTimeout);

    this.engines.forEach(engine => {
      if (engine.master) {
        this.scheduler.remove(engine);
        engine.stop();
      }
    });

    this.engines.clear();
  }

  triggerPattern(pattern = null) {
    // we keep a smapler available for the kick
    if (this.samplers.size > 1 || (this.samplers.size >= 1 && pattern)) {
      let buffers;
      // kick pattern is given and not generated
      if (pattern === null) {
        pattern = this.patternScript.execute(getPattern());
        const soundBank = this.thingState.getValues().soundBank;
        buffers = this.soundBanks[soundBank];

        console.log(soundBank, pattern);
      } else {
        buffers = [this.buffers.noise];

        console.log('kick', pattern);
      }

      const basePeriod = this.globalsState.getValues().basePeriod;
      const engine = new PatternEngine(this.pd,
                                       this.samplers,
                                       buffers,
                                       pattern,
                                       basePeriod,
                                       this.globalsState,
                                       this.engineScript);

      this.setEngineVolume(engine);

      const now = this.sync.getSyncTime();
      const startTime = Math.ceil(now / basePeriod) * basePeriod;

      this.scheduler.add(engine, startTime);
      this.engines.add(engine);
    } else {
      console.log('no sampler available, aborting triggerPattern');
    }
  }

  setEngineVolume(engine) {
    const { seeLight, bypassLightSensor } = this.thingState.getValues();
    console.log(bypassLightSensor, seeLight);

    if (!seeLight || bypassLightSensor) {
      const masterVolume = this.globalsState.getValues().master;
      engine.masterVolume = masterVolume;
    } else {
      engine.masterVolume = -80;
    }
  }

  toggleTest(value) {
    if (value && this.testEngine === null) {
      this.testEngine = new TestEngine(this.pd, this.buffers['noise']);
      this.testEngine.masterVolume = this.globalsState.getValues().master;
      this.scheduler.add(this.testEngine);
    } else if (!value && this.testEngine !== null) {
      this.scheduler.remove(this.testEngine);
      this.testEngine.stop(); // close patch
      this.testEngine = null;
    }
  }
}

export default ThingExperience;
