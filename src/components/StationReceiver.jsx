import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import RadioMeter from './RadioMeter.jsx';
import { projects, frequencies } from '../data/projects.js';
import './StationReceiver.css';

const channelNumber = (index) => String(index + 1).padStart(2, '0');
const stationCount = projects.length;
const degreesPerStation = 360 / stationCount;
const wrapStation = (position) => ((position % stationCount) + stationCount) % stationCount;

function TuningDial({ index, tune }) {
  const gesture = useRef(null);
  const [position, setPosition] = useState(index);

  useLayoutEffect(() => {
    // Presets and browser history move to the closest turn of the dial.
    setPosition((current) => {
      const detent = Math.round(current);
      const forward = wrapStation(index - detent);
      if (forward === 0) return current;
      return detent + (forward > stationCount / 2 ? forward - stationCount : forward);
    });
  }, [index]);

  function pointerAngle(event, rect) {
    return Math.atan2(event.clientY - rect.top - rect.height / 2, event.clientX - rect.left - rect.width / 2) * 180 / Math.PI;
  }

  function start(event) {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    gesture.current = { rect, angle: pointerAngle(event, rect), position, moved: false, x: event.clientX, y: event.clientY };
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function turn(event) {
    const drag = gesture.current;
    if (!drag || !event.isPrimary) return;
    const angle = pointerAngle(event, drag.rect);
    const rotation = (angle - drag.angle + 540) % 360 - 180;
    drag.angle = angle;
    drag.position += rotation / degreesPerStation;
    if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 4) drag.moved = true;
    if (drag.moved) {
      setPosition(drag.position);
      tune(wrapStation(Math.round(drag.position)));
    }
  }

  function release() {
    gesture.current = null;
    setPosition(Math.round);
  }

  function finish(event) {
    if (!gesture.current || !event.isPrimary) return;
    if (!gesture.current.moved) tune(wrapStation(index + 1));
    release();
  }

  function keyDown(event) {
    const targets = { ArrowRight: index + 1, ArrowUp: index + 1, ArrowLeft: index - 1, ArrowDown: index - 1, Home: 0, End: stationCount - 1, Enter: index + 1, ' ': index + 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    tune(wrapStation(targets[event.key]));
  }

  return (
    <div className="dial-assembly">
      <div className="dial-ring">
        <div role="slider" tabIndex="0" aria-label="Project tuning dial" aria-valuemin={1} aria-valuemax={projects.length} aria-valuenow={index + 1}
          aria-valuetext={`${projects[index].name}, ${frequencies[index]} FM`} aria-describedby="tuning-help" className="rotary-dial"
          style={{ '--angle': `${-135 + position * degreesPerStation}deg` }}
          onPointerDown={start} onPointerMove={turn} onPointerUp={finish} onLostPointerCapture={release}
          onPointerCancel={release} onKeyDown={keyDown}>
          <i aria-hidden="true" />
        </div>
      </div>
      <span>Tuning</span>
    </div>
  );
}

export default function StationReceiver({ index, tune, sound }) {
  const project = projects[index];
  const signal = useRef(null);
  const backlight = useRef(null);
  const lastIndex = useRef(index);
  useEffect(() => {
    if (lastIndex.current === index) return;
    lastIndex.current = index;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sweep = signal.current.animate([
      { opacity: 0, transform: 'translateX(-100%)' },
      { opacity: 0.64, offset: 0.30 },
      { opacity: 0, transform: 'translateX(100%)' }
    ], { duration: 460, easing: 'ease-out' });
    return () => sweep.cancel();
  }, [index]);
  return (
    <section className="radio-studio" aria-label="Portfolio radio">
      <div ref={backlight} className={`studio-backlight${sound.playing ? ' lit' : ''}`} aria-hidden="true" />
      <div className={`hi-fi${sound.playing ? ' hi-fi-playing' : ''}`}
        style={sound.playing ? { '--groove-offset': `${-sound.playhead}s`, '--beat': `${60 / sound.song.bpm}s` } : undefined}>
        <div className="metal-face">
          <div className="set-name"><h1>Aziq <em>FM</em></h1><span>Portfolio receiver</span>
            <button type="button" className="jazz-switch" onClick={sound.toggle}>
              <span aria-hidden="true">{sound.playing ? 'Ⅱ' : '▶'}</span>{sound.playing ? 'Mute jazz' : 'Play jazz'}
            </button>
          </div>
          <div className="receiver-display">
            <div className="station-interference" ref={signal} aria-hidden="true" />
            <div className="readout" aria-live="polite" aria-atomic="true">
              <span className="on-air-lamp">On air</span>
              <strong key={project.name}>{project.name}</strong>
              <span className="mhz">{frequencies[index]} <small>MHz</small></span>
            </div>
            <div className="radio-scale" aria-hidden="true">
              <div className="dial-marks" />
              <div className="band-labels">{frequencies.map((f) => <span key={f}>{f}</span>)}</div>
              <i className="dial-needle" style={{ left: `${(index + 0.5) / projects.length * 100}%` }} />
            </div>
            <div className="music-readout">
              <RadioMeter analyser={sound.analyser} playing={sound.playing} backlight={backlight} />
              <span>{sound.error ? 'Audio unavailable · tap to retry' : sound.playing ? `${sound.song.title} · Original jazz` : 'Jazz on standby'}</span>
            </div>
          </div>
          <div className="radio-hardware">
            <div className="radio-grille" aria-hidden="true" />
            {sound.playing && <div className="speaker-notes" aria-hidden="true">
              <span>♪</span><span>♫</span><span>♩</span>
            </div>}
            <div className="preset-bank"><span>Station presets</span>
              <div className="preset-keys">{projects.map((p, i) => <button type="button" key={p.name} onClick={() => tune(i)}
                aria-label={`Tune to ${p.name}, ${frequencies[i]} FM`} title={`${frequencies[i]} FM · ${p.name}`} aria-pressed={i === index}>{channelNumber(i)}</button>)}</div>
            </div>
            <TuningDial index={index} tune={tune} />
          </div>
        </div>
      </div>
      <p id="tuning-help">Turn the dial or press a preset to change projects.</p>
    </section>
  );
}
