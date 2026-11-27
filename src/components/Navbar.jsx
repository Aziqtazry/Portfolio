import { useEffect, useRef, useState } from 'react';
import { navigationItems } from '../data/navigation.js';

function Navbar({ isScrolled, activePage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const dialog = useRef(null);

  useEffect(() => {
    if (isContactOpen) dialog.current?.showModal();
  }, [isContactOpen]);

  const handleNavClick = (event, path) => {
    event.preventDefault();
    setIsMenuOpen(false);
    onNavigate(path);
  };

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <a
        className="logo"
        href="#home"
        onClick={(event) => handleNavClick(event, '#home')}
      >
        <span className="station-mark" aria-hidden="true"><i/><i/><i/><i/><i/></span>
        Aziqtazry Faidzli
      </a>

      <ul className={`nav-links${isMenuOpen ? ' active' : ''}`}>
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.path}
              className={activePage === item.id ? 'active' : undefined}
              onClick={(event) => handleNavClick(event, item.path)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button type="button" className="station-contact" aria-haspopup="dialog" aria-expanded={isContactOpen} onClick={() => setIsContactOpen(true)}>Get in touch</button>
        <button
          className="hamburger"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </div>

      {isContactOpen && (
          <dialog
            ref={dialog}
            className="contact-dialog"
            aria-labelledby="contact-dialog-title"
            onClose={() => setIsContactOpen(false)}
            onClick={(event) => {
              if (event.target !== dialog.current) return;
              const bounds = dialog.current.getBoundingClientRect();
              if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current.close();
            }}
          >
            <button className="contact-dialog-close" type="button" aria-label="Close contact options" onClick={() => dialog.current.close()}>
              <span aria-hidden="true">×</span>
            </button>
            <p className="contact-dialog-eyebrow">Let’s connect</p>
            <h2 id="contact-dialog-title">Aziqtazry Faidzli</h2>
            <p>Choose how you’d like to get in touch.</p>
            <div className="contact-dialog-actions">
              <a href="mailto:tazryaziq@gmail.com?subject=Hello%20Aziqtazry&body=Hi%20Aziqtazry,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!" className="btn">
                <i className="fas fa-envelope"></i>
                Contact Me
              </a>
              <a href="https://www.linkedin.com/in/aziqtazry-faidzli-ba925127a" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <i className="fab fa-linkedin"></i>
                LinkedIn
              </a>
            </div>
          </dialog>
      )}
    </nav>
  );
}

export default Navbar;
