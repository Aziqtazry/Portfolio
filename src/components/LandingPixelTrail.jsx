import PixelTrail from './effects/PixelTrail.jsx';

function LandingPixelTrail() {
  return (
    <div className="landing-pixel-trail" aria-hidden="true">
      <PixelTrail
        gridSize={48}
        trailSize={0.07}
        maxAge={220}
        interpolate={3}
        color="#93c5fd"
        gooeyFilter={{ id: 'landing-pixel-goo', strength: 1.6 }}
        canvasProps={{
          eventSource: document.body,
          eventPrefix: 'client'
        }}
      />
    </div>
  );
}

export default LandingPixelTrail;
