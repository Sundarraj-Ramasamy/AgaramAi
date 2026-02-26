import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';

const Header = () => {
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [menuOpen, setMenuOpen] = useState(width > 768);

  const handleToggleClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  // Define the scrollToTop function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <h1>Welcome to AgaramAi</h1>
      <button
        ref={toggleRef}
        onClick={handleToggleClick}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        style={{ display: isMobile ? 'block' : 'none' }}
        className="menu-toggle"
      >
        &#9776;
      </button>
      <nav
        ref={navRef}
        id="main-nav"
        className={menuOpen ? 'open' : ''}
        style={{ display: menuOpen ? 'block' : 'none' }}
        aria-label="Main navigation"
      >
        <ul>
          <li><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
          <li><Link to="/about" onClick={handleNavLinkClick}>About</Link></li>
          <li><Link to="/articles" onClick={handleNavLinkClick}>Articles</Link></li>
          <li><Link to="/resources" onClick={handleNavLinkClick}>Resources</Link></li>
          <li><Link to="/contact" onClick={handleNavLinkClick}>Contact</Link></li>
        </ul>
      </nav>
      <button 
        className="top-icon" 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
      >
        &#8593;
      </button>
    </header>
  );
};

export default Header;
