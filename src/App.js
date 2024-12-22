import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Articles from './components/Articles';
import Resources from './components/Resources';
import Contact from './components/Contact';
import ConsentBanner from './components/ConsentBanner';
import './styles/styles.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
      <ConsentBanner />
    </div>
  );
};

export default App;
