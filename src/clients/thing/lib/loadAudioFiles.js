import PdLoader from './PdLoader';

async function loadAudioFiles(pd, obj) {
  // crash app if too much failures...
  let numErrors = 0;
  let maxErrors = 10;

  function onLoadingAborted(name) {
    console.log(`... loading "${name}" aborted`);
    numErrors += 1;

    if (numErrors > maxErrors) {
      throw new Error('too much loading errors, restart app');
    }
  }

  const loader = new PdLoader(pd);
  const buffers = {};

  for (let name in obj) {
    const filename = obj[name];
    let buffer = null;

    while (!buffer) {
      try {
        buffer = await loader.loadFile(filename);
      } catch(err) {
        onLoadingAborted('sine');
      }
    }

    buffers[name] = buffer;
  }

  return buffers;
}

export default loadAudioFiles;
