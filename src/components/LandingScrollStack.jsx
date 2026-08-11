import ScrollStack, { ScrollStackItem } from './effects/ScrollStack.jsx';
import { skills } from '../data/skills.js';

const certificationCards = [
  {
    label: 'Certification',
    title: 'Microsoft Certification',
    description: 'Verified Microsoft Learn credential with a shareable certification badge.'
  }
];

function LandingScrollStack() {
  const stackItems = [
    ...certificationCards,
    ...skills.map((skill) => ({
      label: 'Skill',
      title: skill.name,
      description: skill.description,
      iconClass: skill.iconClass,
      color: skill.color
    }))
  ];

  return (
    <section id="skills" className="landing-scroll-stack" aria-label="Skills and certifications">
      <div className="landing-stack-heading">
        <p className="eyebrow">Capabilities</p>
        <h2>Skills & Certifications</h2>
      </div>

      <ScrollStack
        useWindowScroll
        itemDistance={120}
        itemStackDistance={10}
        baseScale={0.9}
        itemScale={0.02}
        rotationAmount={0}
        blurAmount={0}
        stackPosition="24%"
        scaleEndPosition="8%"
      >
        {stackItems.map((item) => (
          <ScrollStackItem itemClassName="landing-stack-card" key={`${item.label}-${item.title}`}>
            <div className="landing-stack-card-icon">
              {item.iconClass ? (
                <i className={item.iconClass} style={item.color ? { color: item.color } : undefined}></i>
              ) : (
                <img src={`${import.meta.env.BASE_URL}assets/microsoft-badge.svg`} alt="" />
              )}
            </div>
            <span>{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}

export default LandingScrollStack;
