import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt1 } from 'react-icons/hi';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import { useAPI } from '../../context/apiContext';

const Navbar = () => {
  const { dark, setDark } = useAPI();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { path: '/cheats', label: 'Cheatsheets' },
    { path: '/interview', label: 'Interview Prep' },
    { path: '/upcoming', label: 'Guides' },
    { path: '/project-guides', label: 'Project Guides' },
    { path: '/product', label: 'Products' }
  ];

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`transition-colors duration-200 ${
          isActive 
            ? 'text-yellow-300 font-bold'
            : 'hover:text-yellow-300 text-white'
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className={dark ? 'dark' : ''}>
      {/* Mobile Navbar */}
      <div className={`
        fixed top-0 w-full z-50 lg:hidden
        ${dark ? 'bg-purple-900' : 'bg-purple-800'}
        ${isScrolled ? 'shadow-lg' : ''}
        transition-all duration-300
      `}>
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg ${
              dark ? 'bg-purple-800' : 'bg-purple-700'
            } text-white`}
          >
            <HiMenuAlt1 className="text-2xl" />
          </button>

          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.svg"
              alt="Codeteria Logo"
              className="w-10 h-10"
              loading="lazy"
            />
            <span className="text-2xl font-bold text-white">Codeteria</span>
          </Link>

          <button 
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg bg-amber-400 text-gray-800"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <CiLight size={20} /> : <MdDarkMode size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`
          ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}
          overflow-hidden transition-all duration-300
          ${dark ? 'bg-purple-800' : 'bg-purple-700'}
        `}>
          <div className="p-4 space-y-4">
            {navigationLinks.map(({ path, label }) => (
              <div key={path}>
                <NavLink to={path}>{label}</NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav className={`
        hidden lg:flex fixed top-0 w-full z-50 
        ${dark ? 'bg-purple-900' : 'bg-purple-800'}
        ${isScrolled ? 'shadow-lg py-2' : 'py-4'}
        transition-all duration-300
      `}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.svg"
              alt="Codeteria Logo"
              className="w-10 h-10"
              loading="lazy"
            />
            <span className="text-2xl font-bold text-white">Codeteria</span>
          </Link>

          <div className="flex items-center space-x-8">
            {navigationLinks.map(({ path, label }) => (
              <NavLink key={path} to={path}>{label}</NavLink>
            ))}
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-full bg-amber-400 ${
                dark ? 'text-white' : 'text-gray-800'
              } transition-colors duration-200`}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <CiLight size={22} /> : <MdDarkMode size={22} />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
