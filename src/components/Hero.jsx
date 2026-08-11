import BlurText from './effects/BlurText.jsx';
import LandingCardSwap from './LandingCardSwap.jsx';
import ShinyText from './effects/ShinyText.jsx';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content animate-on-scroll">
        <ShinyText as="p" className="eyebrow">Software Developer</ShinyText>
        <BlurText as="h1" text={'Aziqtazry\nFaidzli'} />
        <p className="hero-copy">
          Computer engineering graduate focused on practical software, embedded systems, mobile applications, and engineering design.
        </p>

        <div className="hero-actions">
          <a
            href="mailto:tazryaziq@gmail.com?subject=Hello%20Aziqtazry&body=Hi%20Aziqtazry,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!"
            className="btn"
          >
            <i className="fas fa-envelope"></i>
            Contact Me
          </a>
          <a
            href="https://www.linkedin.com/in/aziqtazry-faidzli-ba925127a"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <i className="fab fa-linkedin"></i>
            LinkedIn
          </a>
        </div>
      </div>

      <LandingCardSwap />
    </section>
  );
}

export default Hero;
