import CardSwap, { Card } from './effects/CardSwap.jsx';

function LandingCardSwap() {
  return (
    <aside className="landing-card-swap" aria-label="Portfolio highlights">
      <CardSwap cardDistance={82} verticalDistance={58} delay={3500} width={390} height={280} skewAmount={5}>
        <Card customClass="portfolio-swap-card">
          <span>01</span>
          <h3>Skills</h3>
          <p>React, JavaScript, Flutter, Firebase, PHP, Laravel, Python, SQL, and engineering tools.</p>
        </Card>

        <Card customClass="portfolio-swap-card">
          <span>02</span>
          <h3>Projects</h3>
          <p>MyMeds, Speech Tracker, and GestureMouse across mobile, IoT, and computer vision.</p>
        </Card>

        <Card customClass="portfolio-swap-card">
          <span>03</span>
          <h3>Awards</h3>
          <p>Gold and Bronze recognition from FKEE Fest for engineering project work.</p>
        </Card>
      </CardSwap>
    </aside>
  );
}

export default LandingCardSwap;
