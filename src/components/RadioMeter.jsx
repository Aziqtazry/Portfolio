import { useEffect, useRef } from 'react';

export default function RadioMeter({ analyser, playing, backlight }) {
  const meter = useRef(null);

  useEffect(() => {
    if (!playing || !analyser) return;
    const bars = Array.from(meter.current.children);
    const spectrum = new Uint8Array(analyser.frequencyBinCount);
    const binWidth = analyser.context.sampleRate / analyser.fftSize;
    const light = backlight.current;
    const bassStart = Math.max(1, Math.round(55 / binWidth));
    const bassEnd = Math.max(bassStart + 1, Math.ceil(185 / binWidth));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let last = -Infinity;

    function draw(time) {
      if (time - last >= 32) {
        analyser.getByteFrequencyData(spectrum);
        let bass = 0;
        for (let bin = bassStart; bin < bassEnd; bin++) bass += spectrum[bin];
        light.style.setProperty('--bass', (bass / ((bassEnd - bassStart) * 255)).toFixed(3));
        bars.forEach((bar, i) => {
          const from = Math.floor(65 * 110 ** (i / bars.length) / binWidth);
          const to = Math.ceil(65 * 110 ** ((i + 1) / bars.length) / binWidth);
          let peak = 0;
          for (let bin = from; bin < to; bin++) peak = Math.max(peak, spectrum[bin] || 0);
          bar.style.transform = `scaleY(${Math.max(0.07, (peak / 255) ** 1.6)})`;
        });
        last = time;
      }
      frame = requestAnimationFrame(draw);
    }
    function restart() {
      cancelAnimationFrame(frame);
      bars.forEach((bar) => bar.style.removeProperty('transform'));
      light.style.removeProperty('--bass');
      if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(draw);
    }
    restart();
    reduced.addEventListener('change', restart);
    document.addEventListener('visibilitychange', restart);
    return () => {
      cancelAnimationFrame(frame);
      reduced.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
      light.style.removeProperty('--bass');
      bars.forEach((bar) => bar.style.removeProperty('transform'));
    };
  }, [analyser, playing, backlight]);

  return <span ref={meter} className="radio-meter" aria-hidden="true">
    {Array.from({ length: 24 }, (_, i) => <i key={i} />)}
  </span>;
}
