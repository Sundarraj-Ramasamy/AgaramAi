import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section id="not-found" className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="back-link">Return to Home</Link>
    </section>
  );
};

export default NotFound;
