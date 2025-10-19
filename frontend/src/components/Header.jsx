/**
 * Header component - Navigation and branding
 */
import React from 'react';

export const Header = ({ currentPage, setCurrentPage }) => {
  const navItems = ['Home', 'Live Trends', 'Fact-Check', 'Alerts'];

  return (
    <header className="bg-gradient-dark border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
          <span className="text-3xl">⚡</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            EchoSheild
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`px-3 py-2 rounded-lg transition-all ${
                currentPage === item
                  ? 'bg-gradient-primary text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Info */}
        <div className="text-sm text-gray-400">
          Real-time Misinformation Detection
        </div>
      </div>
    </header>
  );
};

export default Header;
