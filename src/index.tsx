// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import without .tsx extension for TypeScript compatibility
// import './index.css'; // Uncomment and add global CSS if needed

/**
 * Entry point of the React application.
 * Renders the App component into the HTML root element.
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Get the root DOM element
);

// Render the App component wrapped in React.StrictMode for development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
