import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(window.innerWidth > 768);

  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setMenuOpen(!mobile); // open on desktop, closed on mobile
  };

  const handleToggleClick = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define the scrollToTop function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header>
      <h1>Welcome to AgaramAi</h1>
       <button
        ref={toggleRef}
        onClick={handleToggleClick}
        style={{ display: isMobile ? 'block' : 'none' }}
        className="menu-toggle"
      >
       &#9776;
      </button>
      <nav
        ref={navRef}
        className={menuOpen ? 'open' : ''}
        style={{ display: menuOpen ? 'block' : 'none' }}
      >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="top-icon" onClick={scrollToTop}>&#8593;</div>
    </header>
  );
};

export default Header;
