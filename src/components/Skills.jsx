import { projects } from '../data/projects.js';
import { projectHref } from '../data/portfolio.js';
import PortfolioIcon from './PortfolioIcon.jsx';

const capabilities = [
  {
    name: 'Full-stack development',
    work: 'I built MBDK from the public portal through to the database. In the staff workspace, a user’s role determines who can enter financial records and who can review them.',
    tools: 'React, Laravel, SQL',
    stations: ['MBDK']
  },
  {
    name: 'Production reporting & automation',
    work: 'For Shimadzu, I replaced a Power BI workflow with a dashboard that traces production totals back to individual jobs. I also built an inspection screen with a checklist and PDF reports.',
    tools: 'Laravel, React, TypeScript',
    stations: ['Shimadzu']
  },
  {
    name: 'Live monitoring & maps',
    work: 'I bring camera feeds, water readings and alerts into one view. In MBS, operators can pick a location on the Seremban map and check its latest reading against the footage.',
    tools: 'Leaflet, WebSocket, Supabase, FFmpeg, MediaMTX',
    stations: ['MBS']
  },
  {
    name: 'Mobile development',
    work: 'I built medication reminders that stay active until a dose is marked as taken. In MyMeds, caregivers can follow that record remotely.',
    tools: 'Flutter, Dart, Firebase Authentication, Firestore',
    stations: ['MyMeds']
  },
  {
    name: 'Embedded systems & computer vision',
    work: 'I connected speech recognition and WhatsApp updates on a low-powered device. In GestureMouse, I used hand landmarks from a webcam to move the cursor and trigger clicks.',
    tools: 'Arduino, C/C++, Python, MediaPipe, OpenCV',
    stations: ['Speech Tracker', 'GestureMouse']
  },
  {
    name: 'Interactive web design',
    work: 'I built the Iotnect website from scratch, including the plasma logo and particle wordmark. Visitors can watch the NeoVision product demo directly on the site.',
    tools: 'Next.js, React, TypeScript, OGL, WebGL',
    stations: ['Iotnect']
  }
];

function Skills() {
  return (
    <section className="portfolio-content-page" aria-labelledby="capabilities-title">
      <header className="portfolio-page-heading"><h1 id="capabilities-title">Skills</h1><p>Capabilities and tools, with examples from my projects.</p></header>
      <div className="capability-list">
        {capabilities.map(({ name, work, tools, stations }) => (
          <article key={name}>
            <h2>{name}</h2>
            <p>{work}</p>
            <p className="capability-tools">{tools}</p>
            <div className="capability-projects">{stations.map((station) => {
              const project = projects.find((item) => item.name === station);
              return <a key={station} href={projectHref(project)} data-portfolio-link>{station}<PortfolioIcon name="arrow" /></a>;
            })}</div>
          </article>
        ))}
      </div>
      <p className="engineering-tools">I also use AutoCAD for drafting and PVsyst for solar system simulation.</p>
      <a className="portfolio-certification" href="https://learn.microsoft.com/api/credentials/share/en-us/Aziqtazry-4821/CE57B57F2CCFBE22?sharingId=62808FA14894F7B7"
        target="_blank" rel="noreferrer">
        <img src={`${import.meta.env.BASE_URL}assets/microsoft-badge.svg`} width="64" height="64" alt="" />
        <div>
          <h2>Microsoft certification</h2>
          <p>View credential on Microsoft Learn</p>
        </div>
        <PortfolioIcon name="external" />
      </a>
    </section>
  );
}

export default Skills;
