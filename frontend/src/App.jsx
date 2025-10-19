/**
 * Main App component - Routes and state management
 */
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import LiveTrends from './components/LiveTrends';
import FactCheckDetails from './components/FactCheckDetails';
import Alerts from './components/Alerts';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
    return () => setAnimateIn(false);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />;
      case 'Live Trends':
        return <LiveTrends />;
      case 'Fact-Check':
        return <FactCheckDetails />;
      case 'Alerts':
        return <Alerts />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className={`transition-all duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
          {renderPage()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-dark border-t border-gray-700 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>🛡️ EchoSheild - Real-time Misinformation Detection Platform</p>
          <p className="mt-2 text-xs text-gray-500">Developed for Mumbai Hacks • Powered by AI & Fact-Check APIs</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
