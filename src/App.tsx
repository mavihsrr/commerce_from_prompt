// src/App.tsx
import React from 'react';
// Corrected: Added .tsx extension for explicit resolution
import CreatorDashboardPage from './pages/CreatorDashboardPage';

/**
 * The root component of the React application.
 * It's responsible for setting up global styles (like font and Tailwind)
 * and rendering the main Creator Dashboard page.
 */
function App() {
  return (
    <>
      {/* Load Inter font from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {/* Load Tailwind CSS via CDN - for development/simple embedding */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* Render the main Creator Dashboard page */}
      <CreatorDashboardPage />
    </>
  );
}

export default App;
