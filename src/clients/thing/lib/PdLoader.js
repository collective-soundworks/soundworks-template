import path from 'path';
import fs from 'fs';

const patchesPath = path.join(process.cwd(), 'pd');
const timePerBuffer = 50; // amount of ms at which we consider a buffer failed to load
/**
 * Load files into pd arrays
 */
class PdLoader {
  constructor(pd) {
    this.pd = pd;
    this.patch = pd.openPatch('loader.pd', patchesPath);
  }

  load(directory) {
    const files = fs.readdirSync(directory).filter(f => !(/(^|\/)\.[^\/\.]/g).test(f));
    const length = files.length;
    const pd = this.pd;
    const patch = this.patch;
    const buffers = [];
    let fileIndex = 0;

    return new Promise((resolve, reject) => {
      // reject promise if too long to load...
      const timeoutId = setTimeout(() => {
        if (patch.isValid) {
          pd.unsubscribe(`${patch.$0}-loaded`, onLoaded);
        }

        reject();
      }, length * timePerBuffer); // assume max 50ms for each buffer

      function loadNext() {
        const filename = files[fileIndex];
        const pathname = path.join(directory, filename);

        // if (!this.aborted)
        setTimeout(() => {
          pd.send(`${patch.$0}-load`, pathname);
        }, 4);
      }

      function onLoaded([index, file, duration]) {
        buffers.push({ index, file, duration });

        if (buffers.length === length) {
          // clear failed / watchdog timeout
          clearTimeout(timeoutId);

          if (patch.isValid) {
            pd.unsubscribe(`${patch.$0}-loaded`, onLoaded);
          }

          resolve(buffers);
        } else {
          fileIndex += 1;
          loadNext();
        }
      }

      pd.subscribe(`${patch.$0}-loaded`, onLoaded);

      loadNext();
    });
  }

  loadFile(filename) {
    const pd = this.pd;
    const patch = this.patch;

    return new Promise((resolve, reject) => {
      // reject promise if too long to load...
      const timeoutId = setTimeout(() => {
        if (patch.isValid) {
          pd.unsubscribe(`${patch.$0}-loaded`, onLoaded);
        }

        reject();
      }, timePerBuffer); // assume max 50ms for each buffer

      function onLoaded([index, file, duration]) {
        // clear failed / watchdog timeout
        clearTimeout(timeoutId);

        if (patch.isValid) {
          pd.unsubscribe(`${patch.$0}-loaded`, onLoaded);
        }

        resolve({ index, file, duration });
      }

      pd.subscribe(`${patch.$0}-loaded`, onLoaded);
      pd.send(`${patch.$0}-load`, filename);
    });
  }

  clear() {
    this.pd.send(`${this.patch.$0}-resetall`, true);
    this.pd.closePatch(this.patch);
  }
}

export default PdLoader;
