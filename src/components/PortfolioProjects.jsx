import { useState } from 'react';
import { projects } from '../data/projects.js';
import { projectHref, viewHref } from '../data/portfolio.js';
import PortfolioIcon from './PortfolioIcon.jsx';

const artwork = {
  MyMeds: 'coral',
  'Speech Tracker': 'gold',
  GestureMouse: 'plum',
  Iotnect: 'plum',
  MBS: 'emblem',
  MBDK: 'emblem',
  Shimadzu: 'emblem'
};

export function ProjectArtwork({ project }) {
  const image = project.coverImage || project.image;
  return (
    <span className={`project-artwork artwork-${artwork[project.name]}`}>
      {image && <img src={image} alt="" decoding="async" />}
    </span>
  );
}

export function ProjectCards({ items }) {
  return (
    <ul className="portfolio-cards">
      {items.map((project) => (
        <li key={project.name}>
          <a href={projectHref(project)} data-portfolio-link>
            <span className="portfolio-card-cover">
              <ProjectArtwork project={project} />
              <span className="card-open"><PortfolioIcon name="arrow" /></span>
            </span>
            <span className="portfolio-card-label"><strong>{project.name}</strong><small>{project.category}</small></span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ProjectRows() {
  return (
    <ol className="portfolio-project-rows">
      {projects.map((project, index) => (
        <li key={project.name}>
          <a href={projectHref(project)} data-portfolio-link>
            <span className="project-row-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <ProjectArtwork project={project} />
            <span className="project-row-title"><strong>{project.name}</strong><small>{project.category}</small></span>
            <span className="project-row-category" aria-hidden="true">{project.category}</span>
            <PortfolioIcon name="arrow" />
          </a>
        </li>
      ))}
    </ol>
  );
}

export function ProjectLibrary({ query }) {
  const isSearch = query !== undefined;
  const searchTerms = query?.trim().toLowerCase().split(/\s+/).filter(Boolean) || [];
  const items = projects.filter((project) => {
    const searchText = [project.name, project.category, project.description, ...(project.terms || []), ...(project.tools || [])]
      .join(' ').toLowerCase();
    return searchTerms.every((term) => searchText.includes(term));
  });

  return (
    <section className="portfolio-content-page" aria-labelledby="library-title">
      <header className="portfolio-page-heading">
        <h1 id="library-title">{isSearch ? 'Search results' : 'Project library'}</h1>
        <p>{query ? `${items.length} ${items.length === 1 ? 'project' : 'projects'} for “${query}”` : `${items.length} projects across software and engineering`}</p>
      </header>
      {items.length > 0 ? <ProjectCards items={items} /> : (
        <div className="portfolio-empty">
          <p>Try a project name or a technology like React or Flutter.</p>
          <a className="portfolio-button portfolio-button-outline" href={viewHref('projects')} data-portfolio-link>Browse all projects</a>
        </div>
      )}
    </section>
  );
}

export function ProjectDetail({ project }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = project.image ? [{ src: project.image, alt: project.imageAlt, credit: project.imageCredit }, ...(project.gallery || [])] : [];
  const image = images[imageIndex];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article className="portfolio-content-page portfolio-case-study" aria-labelledby="case-study-title">
      <a className="portfolio-back" href={viewHref('projects')} data-portfolio-link><PortfolioIcon name="back" /> Project library</a>
      <header className="portfolio-page-heading">
        <p className="portfolio-kicker">{project.category}</p>
        <h1 id="case-study-title">{project.name}</h1>
        <p>{project.story || project.description}</p>
      </header>
      {image && <figure className="case-study-gallery">
        <a href={image.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image of ${project.name} (opens in a new tab)`}>
          <img src={image.src} alt={image.alt} decoding="async" />
          <span><PortfolioIcon name="external" /></span>
        </a>
        <figcaption>
          <span aria-live="polite">{image.alt}</span>
          {image.credit && <a href={image.credit.href}>{image.credit.label}</a>}
          {images.length > 1 && <div className="case-study-thumbnails" role="group" aria-label="Project screenshots">
            {images.map((item, index) => (
              <button key={item.src} type="button" aria-label={`Show image ${index + 1} of ${images.length}`} aria-pressed={imageIndex === index}
                onClick={() => setImageIndex(index)}><img src={item.src} alt="" loading="lazy" decoding="async" /></button>
            ))}
          </div>}
        </figcaption>
      </figure>}
      {project.features && <section className="case-study-section">
        <h2>How it works</h2><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      </section>}
      {project.contribution && <section className="case-study-section">
        <h2>{project.name === 'Speech Tracker' ? 'What I learned' : 'My role'}</h2><p>{project.contribution}</p>
      </section>}
      {project.tools && <section className="case-study-section">
        <h2>Toolkit</h2><ul className="case-study-tools">{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
      </section>}
      <div className="case-study-links">
        {project.href && <a className="portfolio-button portfolio-button-outline" href={project.href}>Full project write-up <PortfolioIcon name="arrow" /></a>}
        <a className="portfolio-button portfolio-button-primary" href={projectHref(next)} data-portfolio-link>Next: {next.name} <PortfolioIcon name="arrow" /></a>
      </div>
    </article>
  );
}
