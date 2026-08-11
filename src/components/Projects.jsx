import { projects } from '../data/projects.js';
import ShinyText from './effects/ShinyText.jsx';
import SpotlightCard from './effects/SpotlightCard.jsx';

function Projects() {
  return (
    <section id="projects" className="section bg-light">
      <div className="section-heading animate-on-scroll">
        <ShinyText as="p" className="eyebrow">Selected Work</ShinyText>
        <h2>Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <SpotlightCard as="article" className="project-card animate-on-scroll" key={project.name}>
            {project.image ? (
              <div className="project-image">
                <img src={project.image} alt={project.imageAlt} />
              </div>
            ) : (
              <div className="project-image project-placeholder">
                <i className={project.placeholderIcon}></i>
              </div>
            )}

            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.href} className="btn-small">
                View Project <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

export default Projects;
