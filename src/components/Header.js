import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
      <nav>
        <div className="menu-toggle">&#9776;</div>
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
