import { memo } from 'react';
import Lightfall from './effects/Lightfall.jsx';

const lightfallColors = ['#A6C8FF', '#5227FF', '#FF9FFC', '#7DD3FC'];

function LandingLightfallBackground() {
  return (
    <div className="landing-lightfall-bg" aria-hidden="true">
      <Lightfall
        colors={lightfallColors}
        backgroundColor="#0A29FF"
        speed={0.5}
        streakCount={3}
        streakWidth={1}
        streakLength={1}
        glow={0.7}
        density={0.6}
        twinkle={1}
        zoom={3}
        backgroundGlow={0.4}
        opacity={1}
        mouseInteraction={false}
        mouseStrength={0.5}
        mouseRadius={0.65}
      />
    </div>
  );
}

export default memo(LandingLightfallBackground);
