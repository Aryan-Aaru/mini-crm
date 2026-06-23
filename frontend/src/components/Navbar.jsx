import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // for mobile menu

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo / App Name */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full 
                            flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-sm">C</span>
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">
              Mini CRM
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4">
            {/* User greeting */}
            <span className="text-indigo-200 text-sm">
              👋 Hello, {user?.name}
            </span>

            {/* Add Opportunity Button */}
            <Link
              to="/opportunities/create"
              className="bg-white text-indigo-600 
                         px-4 py-1.5 rounded-lg 
                         text-sm font-semibold
                         hover:bg-indigo-50 
                         transition duration-200"
            >
              + New Opportunity
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-indigo-200 hover:text-white 
                         text-sm font-medium
                         transition duration-200"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-white focus:outline-none"
          >
            {menuOpen ? (
              // X icon when menu is open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu - shows when hamburger clicked */}
        {menuOpen && (
          <div className="sm:hidden pb-4 space-y-3">
            <p className="text-indigo-200 text-sm px-1">
              👋 Hello, {user?.name}
            </p>
            <Link
              to="/opportunities/create"
              onClick={() => setMenuOpen(false)}
              className="block bg-white text-indigo-600
                         px-4 py-2 rounded-lg
                         text-sm font-semibold
                         hover:bg-indigo-50
                         transition duration-200"
            >
              + New Opportunity
            </Link>
            <button
              onClick={handleLogout}
              className="block text-indigo-200 hover:text-white
                         text-sm font-medium
                         transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;