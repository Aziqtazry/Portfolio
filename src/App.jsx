import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import HomePage from './components/HomePage.jsx';
import Skills from './components/Skills.jsx';
import PortfolioIcon from './components/PortfolioIcon.jsx';
import PortfolioPlayer from './components/PortfolioPlayer.jsx';
import { ProjectArtwork, ProjectDetail, ProjectLibrary } from './components/PortfolioProjects.jsx';
import { projects } from './data/projects.js';
import { featuredProject, profileUrl, projectHref, viewHref } from './data/portfolio.js';

const navigation = [
  { view: 'home', label: 'Home', icon: 'home' },
  { view: 'projects', label: 'Projects', icon: 'grid' },
  { view: 'skills', label: 'Skills', icon: 'code' }
];

function readLocation() {
  const { hash, pathname, search } = window.location;
  const params = new URLSearchParams(search);
  const query = params.get('q');
  if (query !== null) return { view: 'search', query };

  const project = projects.find(({ frequency }) => frequency === params.get('fm'));
  if (project) return { view: 'project', project };

  const requestedView = params.get('view') || hash.slice(1) || pathname.split('/').filter(Boolean).at(-1);
  return { view: navigation.find(({ view }) => view === requestedView)?.view || 'home' };
}

function PortfolioSidebar({ view, currentProject }) {
  const active = view === 'project' ? 'projects' : view;
  return (
    <aside className="portfolio-sidebar portfolio-panel" aria-label="Portfolio library">
      <nav className="portfolio-nav" aria-label="Portfolio sections">
        {navigation.map(({ view: destination, label, icon }) => (
          <a key={destination} href={viewHref(destination)} data-portfolio-link
            aria-current={active === destination ? 'page' : undefined}>
            <PortfolioIcon name={icon} /><span>{label}</span>
          </a>
        ))}
      </nav>

      <nav className="sidebar-projects" aria-label="All projects">
        <div className="sidebar-heading"><PortfolioIcon name="library" /><span>Project library</span><span>{projects.length}</span></div>
        <ul>
          {projects.map((project) => (
            <li key={project.name}>
              <a href={projectHref(project)} data-portfolio-link
                aria-current={view === 'project' && currentProject === project ? 'page' : undefined}>
                <ProjectArtwork project={project} />
                <span><strong>{project.name}</strong><small>{project.category}</small></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="sidebar-credit">© 2026 Aziqtazry Faidzli</span>
    </aside>
  );
}

function ProjectSpotlight({ project, isOpen, isPlaying }) {
  return (
    <aside className="portfolio-spotlight portfolio-panel" aria-labelledby="spotlight-title">
      <div className="spotlight-heading">
        <h2 id="spotlight-title">Project spotlight</h2>
        <PortfolioIcon name="focus" />
      </div>
      <div className={`spotlight-disc-stage${isPlaying ? ' is-playing' : ''}`} aria-hidden="true">
        <div className="spotlight-disc">
          <ProjectArtwork project={project} />
        </div>
        <div className="spotlight-notes">
          <span>♪</span><span>♫</span><span>♪</span><span>♫</span>
        </div>
      </div>
      <div className="spotlight-project">
        <h3>{project.name}</h3>
        <p>{project.category}</p>
      </div>
      <div className="spotlight-summary">
        <h4>About this project</h4>
        <p>{project.description}</p>
        {!isOpen && <a className="portfolio-button portfolio-button-outline" href={projectHref(project)} data-portfolio-link>
          View case study <PortfolioIcon name="arrow" />
        </a>}
      </div>
      <div className="spotlight-profile">
        <img src={`${import.meta.env.BASE_URL}assets/Aziq.jpg`} width="40" height="40" alt="" />
        <div><strong>Aziqtazry Faidzli</strong><small>Software developer</small></div>
      </div>
    </aside>
  );
}

export default function App() {
  const [location, setLocation] = useState(readLocation);
  const [currentProject, setCurrentProject] = useState(() => location.project || featuredProject);
  const [search, setSearch] = useState(location.query || '');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const main = useRef(null);
  const focusOnNavigation = useRef(false);
  const { view, project, query } = location;

  function syncLocation() {
    const next = readLocation();
    if (next.project) setCurrentProject(next.project);
    setSearch(next.query || '');
    setLocation(next);
  }

  useEffect(() => {
    function onPopState() {
      focusOnNavigation.current = true;
      syncLocation();
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useLayoutEffect(() => {
    main.current.scrollTop = 0;
    if (focusOnNavigation.current) main.current.focus({ preventScroll: true });
    focusOnNavigation.current = false;
    const page = project?.name || navigation.find((item) => item.view === view)?.label || 'Search';
    document.title = view === 'home' ? 'Aziq FM · Aziqtazry Faidzli' : `${page} · Aziq FM`;
  }, [location, project, view]);

  function navigate(href) {
    const url = new URL(href, window.location.href);
    if (url.href !== window.location.href) window.history.pushState(null, '', url);
    focusOnNavigation.current = true;
    syncLocation();
  }

  function followLink(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[data-portfolio-link]');
    if (!link) return;
    event.preventDefault();
    navigate(link.href);
  }

  function submitSearch(event) {
    event.preventDefault();
    const params = new URLSearchParams({ q: search.trim() });
    navigate(`${import.meta.env.BASE_URL}?${params}`);
  }

  return (
    <div className="portfolio-shell" onClick={followLink}>
      <a className="portfolio-skip" href="#portfolio-content" onClick={() => main.current.focus()}>Skip to content</a>
      <header className="portfolio-topbar">
        <a className="portfolio-brand" href={viewHref('home')} data-portfolio-link>
          <span className="portfolio-brand-mark"><PortfolioIcon name="signal" /></span>
          <span>Aziq <em>FM</em></span>
        </a>
        <form className="portfolio-search" role="search" onSubmit={submitSearch}>
          <button type="submit" aria-label="Search projects"><PortfolioIcon name="search" /></button>
          <input aria-label="Search projects or technologies" type="search" value={search}
            onChange={(event) => setSearch(event.target.value)} placeholder="Search projects" />
        </form>
        <a className="portfolio-profile-link" href={profileUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
          <span>LinkedIn</span><PortfolioIcon name="external" /><PortfolioIcon name="linkedin" />
        </a>
      </header>

      <PortfolioSidebar view={view} currentProject={currentProject} />

      <main className="portfolio-main portfolio-panel" id="portfolio-content" ref={main} tabIndex={-1}>
        {view === 'home' && <HomePage />}
        {view === 'projects' && <ProjectLibrary />}
        {view === 'search' && <ProjectLibrary query={query} />}
        {view === 'project' && <ProjectDetail key={project.name} project={project} />}
        {view === 'skills' && <Skills />}
      </main>

      <ProjectSpotlight project={currentProject} isOpen={view === 'project'} isPlaying={isAudioPlaying} />
      <PortfolioPlayer onPlaybackChange={setIsAudioPlaying} />
    </div>
  );
}
