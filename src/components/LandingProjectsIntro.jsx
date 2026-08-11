import DomeGallery from './effects/DomeGallery';

const projectGalleryImages = [
  { src: `${import.meta.env.BASE_URL}assets/MyMeds.png`, alt: 'MyMeds mobile application screen' },
  { src: `${import.meta.env.BASE_URL}assets/Speech%20Tracker.png`, alt: 'Speech Tracker project screen' },
  { src: `${import.meta.env.BASE_URL}assets/GestureMouse-hand-controller.png`, alt: 'GestureMouse hand controller detection' },
  { src: `${import.meta.env.BASE_URL}assets/GestureMouse-detection-1.png`, alt: 'GestureMouse image detection project' },
  { src: `${import.meta.env.BASE_URL}assets/GestureMouse-detection-2.png`, alt: 'GestureMouse image detection result' }
];

function LandingProjectsIntro() {
  return (
    <section id="projects" className="landing-projects-intro" aria-label="My projects">
      <div className="landing-projects-copy">
        <p className="eyebrow">Selected Work</p>
        <h2>My Projects</h2>
      </div>
      <div className="landing-projects-gallery" aria-hidden="false">
        <div className="landing-projects-gallery-inner">
        <DomeGallery
          images={projectGalleryImages}
          fit={0.88}
          fitBasis="width"
          minRadius={720}
          maxRadius={1280}
          padFactor={0.12}
          overlayBlurColor="#050916"
          maxVerticalRotationDeg={13}
          dragSensitivity={18}
          segments={34}
          autoRotate
          autoRotateSpeed={-0.018}
          openedImageWidth="min(76vw, 720px)"
          openedImageHeight="min(62vh, 520px)"
          imageBorderRadius="22px"
          openedImageBorderRadius="24px"
          grayscale={false}
        />
        </div>
      </div>
    </section>
  );
}

export default LandingProjectsIntro;
