import { frequencies, projects } from '../data/projects.js';
import { useState } from 'react';

export default function ProjectBroadcast({ index, tune }) {
  const project = projects[index];
  const images = project.image ? [{ src: project.image, alt: project.imageAlt }, ...(project.gallery || [])] : [];
  const [imageIndex, setImageIndex] = useState(0);
  const image = images[imageIndex];
  const next = (index + 1) % projects.length;

  return (
    <article id="projects" className="project-broadcast" aria-labelledby="broadcast-title">
      <header className="broadcast-header">
        <div className="broadcast-band"><span>{frequencies[index]} FM</span><span>{project.category}</span></div>
        <h2 id="broadcast-title">{project.name}</h2>
        <p>{project.story || project.description}</p>
      </header>
      {image && <figure className="broadcast-preview">
        <a className="broadcast-preview-frame" href={image.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${image.alt}`}>
          <img src={image.src} alt={image.alt} decoding="async" />
        </a>
        <figcaption>
          <span aria-live="polite">{image.alt}</span>
          {images.length > 1 && <div className="broadcast-image-picker" role="group" aria-label="Choose project image">
            {images.map((item, i) => <button type="button" key={item.src} aria-pressed={i === imageIndex}
              aria-label={`Show image ${i + 1}: ${item.alt}`} onClick={() => setImageIndex(i)}>{i + 1}</button>)}
          </div>}
        </figcaption>
      </figure>}
      {project.features && <section className="broadcast-row"><h3>How it works</h3><ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul></section>}
      {project.contribution && project.story && <section className="broadcast-row"><h3>{project.name === 'Speech Tracker' ? 'What I learned' : 'My role'}</h3><p>{project.contribution}</p></section>}
      {project.tools && <section className="broadcast-row"><h3>Toolkit</h3><ul className="broadcast-tools">{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></section>}
      <div className="broadcast-footer">
        <button type="button" onClick={() => { tune(next); document.getElementById('home')?.scrollIntoView({ block: 'start' }); }}>Tune next · {projects[next].name}</button>
      </div>
    </article>
  );
}
