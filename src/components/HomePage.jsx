import Hero from './Hero.jsx';
import LandingOutro from './LandingOutro.jsx';
import LandingProjectsIntro from './LandingProjectsIntro.jsx';
import LandingScrollStack from './LandingScrollStack.jsx';

function HomePage() {
  return (
    <>
      <Hero />
      <LandingScrollStack />
      <LandingProjectsIntro />
      <LandingOutro />
    </>
  );
}

export default HomePage;
