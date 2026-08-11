import { memo } from 'react';
import Lanyard from './effects/Lanyard.jsx';
import plainLanyard from '../assets/lanyard/lanyard-plain.png';

function LandingLanyardOverlay() {
  return (
    <div className="landing-lanyard-overlay" aria-hidden="true">
      <Lanyard
        position={[0, 0, 18]}
        gravity={[0, -40, 0]}
        frontImage={`${import.meta.env.BASE_URL}assets/Aziq.jpeg`}
        backImage={`${import.meta.env.BASE_URL}assets/Aziq.jpeg`}
        imageFit="cover"
        lanyardImage={plainLanyard}
        lanyardWidth={0.9}
      />
    </div>
  );
}

export default memo(LandingLanyardOverlay);
