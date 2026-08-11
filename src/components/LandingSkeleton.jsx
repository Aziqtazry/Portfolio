function LandingSkeleton() {
  return (
    <div className="landing-skeleton" aria-hidden="true">
      <div className="skeleton-nav">
        <span className="skeleton-block skeleton-logo"></span>
        <div className="skeleton-nav-links">
          <span className="skeleton-block"></span>
          <span className="skeleton-block"></span>
          <span className="skeleton-block"></span>
        </div>
      </div>

      <div className="skeleton-hero">
        <div className="skeleton-hero-copy">
          <span className="skeleton-block skeleton-eyebrow"></span>
          <span className="skeleton-block skeleton-title"></span>
          <span className="skeleton-block skeleton-title skeleton-title-short"></span>
          <span className="skeleton-block skeleton-copy"></span>
          <span className="skeleton-block skeleton-copy skeleton-copy-short"></span>
          <div className="skeleton-actions">
            <span className="skeleton-block skeleton-button"></span>
            <span className="skeleton-block skeleton-button skeleton-button-outline"></span>
          </div>
        </div>

        <div className="skeleton-lanyard">
          <span className="skeleton-rope"></span>
          <span className="skeleton-badge"></span>
        </div>

        <div className="skeleton-card-stack">
          <span className="skeleton-card"></span>
          <span className="skeleton-card"></span>
          <span className="skeleton-card"></span>
        </div>
      </div>

      <div className="skeleton-lower">
        <span className="skeleton-block skeleton-section-title"></span>
        <span className="skeleton-panel"></span>
      </div>
    </div>
  );
}

export default LandingSkeleton;
