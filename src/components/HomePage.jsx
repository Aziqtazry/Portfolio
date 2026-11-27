import { featuredProjects, profileUrl, viewHref } from '../data/portfolio.js';
import PortfolioIcon from './PortfolioIcon.jsx';
import { ProjectCards, ProjectRows } from './PortfolioProjects.jsx';

export default function HomePage() {
  return (
    <div className="portfolio-home">
      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <div className="portfolio-hero-copy">
          <p className="portfolio-kicker"><PortfolioIcon name="signal" /> Software developer</p>
          <h1 id="portfolio-title">Aziqtazry<br />Faidzli<span>.</span></h1>
          <p>A full-stack developer that loves to learn and implement new tech</p>
          <div className="hero-actions">
            <a className="portfolio-button portfolio-button-primary" href={viewHref('projects')} data-portfolio-link>
              Explore projects <PortfolioIcon name="arrow" />
            </a>
            <a className="portfolio-button portfolio-button-outline hero-contact" href={profileUrl} target="_blank" rel="noreferrer">
              Say hello <PortfolioIcon name="external" />
            </a>
          </div>
        </div>
        <div className="portfolio-portrait">
          <img src={`${import.meta.env.BASE_URL}assets/Aziq.jpeg`} width="1020" height="1020" alt="Aziqtazry Faidzli" fetchPriority="high" />
        </div>
      </section>

      <section className="portfolio-block" aria-labelledby="featured-title">
        <div className="portfolio-section-heading">
          <h2 id="featured-title">Featured projects</h2>
          <a href={viewHref('projects')} data-portfolio-link>View all <PortfolioIcon name="arrow" /></a>
        </div>
        <ProjectCards items={featuredProjects} />
      </section>

      <section className="portfolio-block portfolio-all-projects" aria-labelledby="project-list-title">
        <div className="portfolio-section-heading"><h2 id="project-list-title">Project index</h2></div>
        <ProjectRows />
      </section>
    </div>
  );
}
