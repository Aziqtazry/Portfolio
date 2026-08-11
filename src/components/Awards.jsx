import { awards } from '../data/awards.js';
import ShinyText from './effects/ShinyText.jsx';

function Awards() {
  return (
    <section id="awards" className="section">
      <div className="section-heading animate-on-scroll">
        <ShinyText as="p" className="eyebrow">Recognition</ShinyText>
        <h2>Awards</h2>
      </div>

      <div className="awards-list">
        {awards.map((award) => (
          <a
            href={award.href}
            target="_blank"
            rel="noopener noreferrer"
            className="award-link animate-on-scroll"
            key={award.title}
          >
            <article className="award-item">
              <i className={award.iconClass} style={{ color: award.color }}></i>
              <div className="award-details">
                <h3>{award.title}</h3>
                <p>{award.description}</p>
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Awards;
