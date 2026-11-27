import { useEffect, useRef, useState } from 'react';

const muteKey = 'aziq-fm-muted';
const playlist = [
  { title: 'After the Dial', file: 'after-the-dial', bpm: 91 },
  { title: 'Balcony Bossa', file: 'balcony-bossa', bpm: 108 },
  { title: 'Midnight Platform', file: 'midnight-platform', bpm: 78 },
  { title: 'Neon Sidewalk', file: 'neon-sidewalk', bpm: 116 }
];

function drawSong(bag, previous) {
  if (bag.length === 0) bag.push(...playlist);
  const choices = bag.filter((song) => song !== previous);
  const song = choices[Math.floor(Math.random() * choices.length)];
  bag.splice(bag.indexOf(song), 1);
  return song;
}

function prefersSilence() {
  try { return sessionStorage.getItem(muteKey) === 'yes'; }
  catch { return false; }
}

function makeInterference(context) {
  const duration = 0.37;
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const samples = buffer.getChannelData(0);
  let previousNoise = 0;
  let phase = 0;
  for (let i = 0; i < samples.length; i++) {
    const t = i / context.sampleRate;
    const noise = Math.random() * 2 - 1;
    phase += 2 * Math.PI * (1450 - 1100 * t / duration) / context.sampleRate;
    const crackle = (noise - previousNoise) * (0.24 + 0.1 * Math.sin(92 * t));
    const envelope = Math.min(1, t / 0.014) * (1 - t / duration) ** 2;
    samples[i] = Math.tanh(2.1 * (crackle + 0.09 * Math.sin(phase))) * envelope * 0.32;
    previousNoise = noise;
  }
  return buffer;
}

function createReceiver(update) {
  const Context = window.AudioContext || window.webkitAudioContext;
  const context = new Context();
  const track = new Audio();
  track.loop = true;
  const source = context.createMediaElementSource(track);
  const music = context.createGain();
  const master = context.createGain();
  master.gain.value = 0.48;
  const analyser = context.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.72;
  source.connect(music).connect(analyser).connect(master).connect(context.destination);
  const interference = makeInterference(context);
  let burst;
  let song;
  let playRequest = 0;
  let wanted = false;
  let disposed = false;

  function sync() {
    if (!disposed) update({
      playing: wanted && !track.paused && track.readyState >= 2 && context.state === 'running',
      playhead: track.currentTime,
      song,
      analyser,
      error: false
    });
  }
  context.onstatechange = sync;
  track.onplaying = track.onpause = track.onwaiting = sync;
  track.onerror = () => { if (!disposed) update({ playing: false, analyser: null, error: true }); };

  function stopBurst() {
    if (burst) { burst.stop(); burst.disconnect(); burst = null; }
  }
  return {
    play(nextSong) {
      wanted = true;
      if (song !== nextSong || track.error) {
        song = nextSong;
        track.src = `${import.meta.env.BASE_URL}audio/${song.file}.mp3`;
      } else if (!track.paused && context.state === 'running') return;
      const request = ++playRequest;
      Promise.all([context.resume(), track.play()]).then(sync).catch(() => {
        if (request === playRequest && wanted && !disposed) update({ playing: false, analyser: null, error: true });
      });
    },
    tune() {
      stopBurst();
      const now = context.currentTime;
      music.gain.cancelScheduledValues(now);
      music.gain.setValueAtTime(music.gain.value, now);
      music.gain.linearRampToValueAtTime(0.09, now + 0.025);
      music.gain.linearRampToValueAtTime(1, now + 0.40);
      burst = context.createBufferSource();
      burst.buffer = interference;
      burst.connect(analyser);
      const current = burst;
      current.onended = () => { current.disconnect(); if (burst === current) burst = null; };
      current.start(now);
    },
    mute() {
      wanted = false;
      track.pause();
      stopBurst();
      music.gain.cancelScheduledValues(context.currentTime);
      music.gain.value = 1;
      sync();
    },
    dispose() {
      disposed = true;
      track.pause();
      stopBurst();
      track.onplaying = track.onpause = track.onwaiting = track.onerror = context.onstatechange = null;
      track.removeAttribute('src');
      track.load();
      void context.close();
    }
  };
}

export default function useRadioAudio() {
  const audio = useRef(null);
  const bag = useRef([]);
  const selected = useRef(null);
  const muted = useRef(prefersSilence());
  const [state, setState] = useState({ playing: false, analyser: null, error: false });
  useEffect(() => () => { audio.current?.dispose(); audio.current = null; }, []);

  function start(withStatic) {
    try {
      audio.current ??= createReceiver(setState);
      selected.current ??= drawSong(bag.current, null);
      audio.current.play(selected.current);
      if (withStatic) audio.current.tune();
    } catch {
      setState({ playing: false, analyser: null, error: true });
    }
  }
  function toggle() {
    muted.current = state.playing;
    try { sessionStorage.setItem(muteKey, muted.current ? 'yes' : 'no'); } catch { /* Storage is optional. */ }
    if (muted.current) audio.current?.mute();
    else start(false);
  }
  function tune(userGesture = true) {
    selected.current = drawSong(bag.current, selected.current);
    if (!muted.current && (userGesture || state.playing)) start(true);
  }
  return { ...state, toggle, tune };
}
