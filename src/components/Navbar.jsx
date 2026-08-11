import { useState } from 'react';
import { navigationItems } from '../data/navigation.js';

function Navbar({ isScrolled, activePage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (event, path) => {
    event.preventDefault();
    setIsMenuOpen(false);
    onNavigate(path);
  };

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <a className="logo" href="/" aria-label="Aziqtazry Faidzli home" onClick={(event) => handleNavClick(event, '/')}>
        Aziqtazry
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
        <button
          className="hamburger"
          type="button"
          aria-label="Open navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
