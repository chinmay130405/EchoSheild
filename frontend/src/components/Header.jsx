/**
 * Header component - Navigation and branding
 */
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, ChevronDown } from 'lucide-react';

export const Header = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navItems = ['Home', 'Live Trends', 'Fact-Check', 'Alerts'];

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

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

        {/* User Section */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
          >
            <User className="w-4 h-4" />
            <span className="text-sm">{user?.name || 'User'}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-xs text-gray-400">Logged in as</p>
                <p className="text-sm text-white font-semibold">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
