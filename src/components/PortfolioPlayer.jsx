import { useEffect, useRef, useState } from 'react';
import PortfolioIcon from './PortfolioIcon.jsx';

const tracks = [
  { title: 'After the Dial', file: 'after-the-dial' },
  { title: 'Balcony Bossa', file: 'balcony-bossa' },
  { title: 'Midnight Platform', file: 'midnight-platform' },
  { title: 'Neon Sidewalk', file: 'neon-sidewalk' }
];
const initialVolume = 0.45;
const trackUrl = (index) => `${import.meta.env.BASE_URL}audio/${tracks[index].file}.mp3`;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${minutes}:${remainder}`;
}

export default function PortfolioPlayer({ onPlaybackChange }) {
  const audio = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => { audio.current.volume = initialVolume; }, []);

  function play() {
    const track = audio.current;
    if (track.error) track.load();
    setError(false);
    track.play().catch((reason) => {
      if (reason.name !== 'AbortError') {
        setError(true);
        onPlaybackChange(false);
      }
    });
  }

  function togglePlayback() {
    if (audio.current.paused) play();
    else audio.current.pause();
  }

  function changeTrack(direction, autoplay = !audio.current.paused) {
    const next = (index + direction + tracks.length) % tracks.length;
    setIndex(next);
    setElapsed(0);
    setDuration(0);
    setError(false);
    audio.current.src = trackUrl(next);
    if (autoplay) play();
  }

  function changeVolume(event) {
    const next = Number(event.target.value);
    audio.current.volume = next;
    audio.current.muted = false;
    setVolume(next);
    setMuted(false);
  }

  function toggleMute() {
    if (volume === 0) {
      audio.current.volume = initialVolume;
      setVolume(initialVolume);
    }
    const next = volume === 0 ? false : !muted;
    audio.current.muted = next;
    setMuted(next);
  }

  return (
    <footer className="portfolio-player" aria-label="Original jazz player">
      <audio ref={audio} src={trackUrl(0)} preload="metadata"
        onPlay={() => setPlaying(true)}
        onPlaying={() => onPlaybackChange(true)}
        onWaiting={() => onPlaybackChange(false)}
        onEmptied={() => onPlaybackChange(false)}
        onPause={() => { setPlaying(false); onPlaybackChange(false); }}
        onEnded={() => { onPlaybackChange(false); changeTrack(1, true); }}
        onError={() => { setPlaying(false); onPlaybackChange(false); setError(true); }}
        onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
        onDurationChange={(event) => {
          const next = event.currentTarget.duration;
          setDuration(Number.isFinite(next) ? next : 0);
        }} />

      <div className="player-track">
        <span className={`track-art track-art-${index}`}><PortfolioIcon name="music" /></span>
        <div className="track-text" aria-live="polite"><strong>{tracks[index].title}</strong><small>{error ? 'Audio unavailable. Play to retry.' : 'Original jazz · Aziq FM'}</small></div>
      </div>

      <div className="player-center">
        <div className="player-buttons" role="group" aria-label="Playback controls">
          <button type="button" aria-label="Previous track" onClick={() => changeTrack(-1)}><PortfolioIcon name="previous" /></button>
          <button type="button" className="player-play" aria-label={playing ? 'Pause' : 'Play'} onClick={togglePlayback}>
            <PortfolioIcon name={playing ? 'pause' : 'play'} />
          </button>
          <button type="button" aria-label="Next track" onClick={() => changeTrack(1)}><PortfolioIcon name="next" /></button>
        </div>
        <div className="player-timeline">
          <span aria-hidden="true">{formatTime(elapsed)}</span>
          <input type="range" aria-label="Seek track" aria-valuetext={`${formatTime(elapsed)} of ${formatTime(duration)}`}
            min="0" max={duration || 1} step="0.1" value={Math.min(elapsed, duration)} disabled={!duration}
            style={{ '--progress': `${duration ? elapsed / duration * 100 : 0}%` }}
            onChange={(event) => {
              audio.current.currentTime = Number(event.target.value);
              setElapsed(audio.current.currentTime);
            }} />
          <span aria-hidden="true">{duration ? formatTime(duration) : '–:––'}</span>
        </div>
      </div>

      <div className="player-volume">
        <button type="button" aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'} onClick={toggleMute}>
          <PortfolioIcon name={muted || volume === 0 ? 'mute' : 'volume'} />
        </button>
        <input type="range" aria-label="Volume" min="0" max="1" step="0.01" value={muted ? 0 : volume}
          aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)}%`} style={{ '--progress': `${muted ? 0 : volume * 100}%` }} onChange={changeVolume} />
      </div>
    </footer>
  );
}
