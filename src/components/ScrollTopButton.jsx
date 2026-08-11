function ScrollTopButton({ isVisible }) {
  return (
    <button
      className={`scroll-top${isVisible ? ' show' : ''}`}
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}

export default ScrollTopButton;
