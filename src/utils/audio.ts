// Web Audio API synth for realistic paper page-flip sound effect

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPageFlipSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.18; // ~180ms paper rustle
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    // Generate white noise with soft envelope
    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      // Exponential decay envelope with subtle paper friction resonance
      const envelope = Math.sin(progress * Math.PI) * Math.pow(1 - progress, 1.2);
      output[i] = (Math.random() * 2 - 1) * envelope * 0.15;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Filter to sound like heavy art paper / portfolio cardstock
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3500, ctx.currentTime + 0.1);
    filter.Q.value = 1.2;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();
  } catch (err) {
    // Audio context may be restricted or unsupported; fail silently
    console.debug('Audio play failed', err);
  }
}
