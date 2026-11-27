import DomeGallery from './effects/DomeGallery.jsx';

const baseUrl = import.meta.env.BASE_URL;

const projectGalleryImages = [
  { src: `${baseUrl}assets/MyMeds.png`, alt: 'MyMeds mobile application screen' },
  { src: `${baseUrl}assets/Speech%20Tracker.png`, alt: 'Speech Tracker project screen' },
  { src: `${baseUrl}assets/GestureMouse-hand-controller.png`, alt: 'GestureMouse hand controller detection' },
  { src: `${baseUrl}assets/GestureMouse-detection-1.png`, alt: 'GestureMouse image detection project' },
  { src: `${baseUrl}assets/GestureMouse-detection-2.png`, alt: 'GestureMouse image detection result' },
  { src: `${baseUrl}assets/hrms-dashboard.png`, alt: 'eHRMS dashboard' },
  { src: `${baseUrl}assets/ehrms-landing-page.png`, alt: 'eHRMS landing page' },
  { src: `${baseUrl}assets/ecms-profile-picture.png`, alt: 'eCMS landing page' }
];

function LandingProjectsIntro() {
  return (
    <section className="landing-projects-intro" aria-label="Project gallery">
      <div className="landing-projects-copy">
        <h2>Project gallery</h2>
      </div>

      <div className="landing-projects-gallery">
        <div className="landing-projects-gallery-inner">
          <DomeGallery images={projectGalleryImages} />
        </div>
      </div>
    </section>
  );
}

export default LandingProjectsIntro;
