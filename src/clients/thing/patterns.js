export function generateStepPattern(numSteps) {
  const result = [];
  const values = [1, 2];
  let lastValue = null;

  while (numSteps > 0) {
    let value = null;

    if (lastValue === null || lastValue === 1 || numSteps === 2) {
      value = 2;
    } else if (numSteps === 1) {
      value = 1;
    } else {
      value = values[Math.floor(Math.random() * values.length)];
    }

    result.push(value);
    lastValue = value;
    numSteps -= value;
  }

  // concat 2 followed by a 1 to 3
  const pattern = [];

  for (let i = 0; i < result.length; i++) {
    const current = result[i];
    const next = result[i + 1];

    if (next && current === 2 && next === 1) {
      const value = current + next; // 3
      pattern.push(value);
      i += 1;
    } else {
      pattern.push(current);
    }
  }

  return pattern;
}

export function flattenPattern(pattern) {
  const flatPattern = [];

  for (let i = 0; i < pattern.length; i++) {
    const numBeats = pattern[i];

    for (let j = 0; j < numBeats; j++) {

      if (i === 0 && j === 0) {
        flatPattern.push('HIGH');
      } else if (j === 0) {
        flatPattern.push('MID');
      } else {
        flatPattern.push('LOW');
      }

    }
  }

  return flatPattern;
}

export const numStepsValues = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

// use a store to control all these parameters
export function getPattern(store) {
  const numValues = numStepsValues[Math.floor(Math.random() * numStepsValues.length)];
  const stepPattern = generateStepPattern(numValues);
  const talea = flattenPattern(stepPattern);

  const duration = 45 + Math.random() * 30;
  const fadeInDuration = (1 - 0.618) * duration;
  const fadeOutDuration = duration - fadeInDuration;

  const octavaRand = Math.random();
  // MIDI values
  const octava = octavaRand < 0.3 ? -12 : octavaRand < 0.4 ? 12 : 0;
  let detune = octava + (Math.random() * 2 - 1);

  // add Fith
  if (Math.random() < 0.5) {
    detune += 7;
  }

  //
  if (Math.random() < 0.5) {
    detune *= 2;
  }

  const periodRand = Math.random();
  let periodFactor;

  if (periodRand < 0.2) {
    periodFactor = 0.5;
  } else if (periodRand < 0.4) {
    periodFactor = 2;
  } else if (periodFactor < 0.5 && detune > 0) {
    periodFactor = 4/3;
  } else {
    periodFactor = 1;
  }

  const attack = 0.001;
  const release = 0.2;

  return {
    talea,
    fadeInDuration,
    fadeOutDuration,
    detune,
    periodFactor,
    attack,
    release,
  }
}


