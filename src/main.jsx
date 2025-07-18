import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import reportWebVitals from './reportWebVitals';
console.log('App is mounting...');
// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();