import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- 404 Page Component ---
const NotFoundPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <Header />
      <main className="flex-grow flex items-center justify-center text-white text-center px-4 relative overflow-hidden pt-40 pb-40">
        {/* Background SVG Icons */}
        <div className="absolute inset-0 z-0 opacity-5">
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="pattern-dashes" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M5 5 l10 10 M25 5 l10 10 M45 5 l10 10 M65 5 l10 10" stroke="#fff" strokeWidth="1" />
                        <path d="M5 25 l10 10 M25 25 l10 10 M45 25 l10 10" stroke="#fff" strokeWidth="1" />
                         <path d="M5 45 l10 10 M25 45 l10 10" stroke="#fff" strokeWidth="1" />
                         <path d="M5 65 l10 10" stroke="#fff" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-dashes)" />
            </svg>
        </div>
        
        <div className="z-10">
          <h1 className="text-8xl md:text-9xl font-extrabold text-blue-500 tracking-wider">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Page Not Found</h2>
          <p className="text-gray-400 mt-4 max-w-md mx-auto">
            It seems you've taken a wrong turn on your fitness journey. Let's get you back on track.
          </p>
          <a
            href="/"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
          >
            Go Back Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
