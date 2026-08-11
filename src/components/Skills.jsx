import { skills } from '../data/skills.js';
import ShinyText from './effects/ShinyText.jsx';
import SpotlightCard from './effects/SpotlightCard.jsx';

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-heading animate-on-scroll">
        <ShinyText as="p" className="eyebrow">Capabilities</ShinyText>
        <h2>Skills & Certifications</h2>
      </div>

      <div className="cert-badge animate-on-scroll">
        <a
          href="https://learn.microsoft.com/api/credentials/share/en-us/Aziqtazry-4821/CE57B57F2CCFBE22?sharingId=62808FA14894F7B7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`${import.meta.env.BASE_URL}assets/microsoft-badge.svg`} alt="Microsoft certification badge" />
        </a>
        <div>
          <h3>Microsoft Certification</h3>
          <p>Verified credential available through Microsoft Learn.</p>
        </div>
      </div>

      <div className="skills-container stagger-children">
        {skills.map((skill) => (
          <SpotlightCard className="skill-card animate-on-scroll" key={skill.name}>
            <i className={skill.iconClass} style={skill.color ? { color: skill.color } : undefined}></i>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

export default Skills;
