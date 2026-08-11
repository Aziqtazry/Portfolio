import { memo } from 'react';
import Galaxy from './effects/Galaxy.jsx';

const galaxyFocal = [0.5, 0.5];
const galaxyRotation = [1.0, 0.0];

function LandingGalaxyBackground() {
  return (
    <div className="landing-galaxy-bg" aria-hidden="true">
      <Galaxy
        focal={galaxyFocal}
        rotation={galaxyRotation}
        mouseRepulsion
        mouseInteraction
        density={1.8}
        glowIntensity={0.65}
        saturation={0.9}
        hueShift={215}
        twinkleIntensity={0.7}
        rotationSpeed={0.04}
        repulsionStrength={1.6}
        transparent
      />
    </div>
  );
}

export default memo(LandingGalaxyBackground);
