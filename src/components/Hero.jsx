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
      </div>

      <LandingCardSwap />
    </section>
  );
}

export default Hero;
