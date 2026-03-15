import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ConsentBanner from './components/ConsentBanner';
import Chatbot from './components/Chatbot';
import './styles/styles.css';

// Lazy load pages
const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));
const Articles = React.lazy(() => import('./components/Articles'));
const Resources = React.lazy(() => import('./components/Resources'));
const Contact = React.lazy(() => import('./components/Contact'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const AdminLogin = React.lazy(() => import('./components/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));

const LoadingFallback = () => <div className="loading">Loading...</div>;

const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="content" id="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ConsentBanner />
      <Chatbot />
    </div>
  );
};

export default App;
