import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HomePage from './components/HomePage.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Awards from './components/Awards.jsx';
import Footer from './components/Footer.jsx';
import LandingLanyardOverlay from './components/LandingLanyardOverlay.jsx';
import LandingLightfallBackground from './components/LandingLightfallBackground.jsx';
import LandingPixelTrail from './components/LandingPixelTrail.jsx';
import LandingSkeleton from './components/LandingSkeleton.jsx';
import ScrollTopButton from './components/ScrollTopButton.jsx';

const routes = {
  '/': { id: 'home', component: <HomePage /> },
  '/skills': { id: 'skills', component: <Skills /> },
  '/projects': { id: 'projects', component: <Projects /> },
  '/awards': { id: 'awards', component: <Awards /> }
};

function getCurrentPath() {
  return routes[window.location.pathname] ? window.location.pathname : '/';
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const [activeSection, setActiveSection] = useState('home');
  const [showLandingSkeleton, setShowLandingSkeleton] = useState(getCurrentPath() === '/');

  useEffect(() => {
    const updateScrollState = () => {
      const nextIsScrolled = window.scrollY > 50;
      const nextShowScrollTop = window.scrollY > 400;

      setIsScrolled((current) => (current === nextIsScrolled ? current : nextIsScrolled));
      setShowScrollTop((current) => (current === nextShowScrollTop ? current : nextShowScrollTop));
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getCurrentPath());
      window.scrollTo({ top: 0 });
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
      }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentPath]);

  useEffect(() => {
    if (currentPath !== '/') return undefined;

    const sectionIds = ['home', 'skills', 'projects'];
    const updateActiveSection = () => {
      const nextSection =
        sectionIds
          .map((sectionId) => {
            const element = document.getElementById(sectionId);
            if (!element) return null;

            const rect = element.getBoundingClientRect();
            return {
              id: sectionId,
              distance: Math.abs(rect.top - window.innerHeight * 0.28)
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.distance - b.distance)[0]?.id || 'home';

      setActiveSection((current) => (current === nextSection ? current : nextSection));
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [currentPath]);

  useEffect(() => {
    if (currentPath !== '/') {
      setShowLandingSkeleton(false);
      return undefined;
    }

    setShowLandingSkeleton(true);
    const timeout = window.setTimeout(() => {
      setShowLandingSkeleton(false);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [currentPath]);

  const handleNavigate = (path) => {
    if (path.startsWith('#')) {
      const sectionId = path.slice(1);
      const scrollToSection = () => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        window.setTimeout(scrollToSection, 50);
        return;
      }

      scrollToSection();
      return;
    }

    const nextPath = routes[path] ? path : '/';

    if (nextPath !== currentPath) {
      window.history.pushState({}, '', nextPath);
      setCurrentPath(nextPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentRoute = routes[currentPath] || routes['/'];
  const isLandingPage = currentRoute.id === 'home';
  const activeNavItem = isLandingPage ? activeSection : currentRoute.id;

  return (
    <div className={`app-shell${isLandingPage ? ' landing-page' : ''}`}>
      {isLandingPage && <LandingLightfallBackground />}
      {isLandingPage && <LandingPixelTrail />}
      {isLandingPage && <LandingLanyardOverlay />}
      {isLandingPage && showLandingSkeleton && <LandingSkeleton />}

      <Navbar isScrolled={isScrolled} activePage={activeNavItem} onNavigate={handleNavigate} />

      <main>
        {currentRoute.component}
      </main>

      <Footer />
      <ScrollTopButton isVisible={showScrollTop} />
    </div>
  );
}

export default App;
