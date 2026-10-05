import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Film, Clock, Lock, Sparkles, Menu, X, User, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { activeProfile, selectProfile, setIsSearchOpen, favorites } = useApp();

  // Scroll listener for dynamic glass background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Memories', path: '/memories' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'For You', path: '/secret', badge: 'New' },
    { 
      name: 'My List', 
      path: '/favorites',
      badge: favorites.length > 0 ? favorites.length : null 
    }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#070709]/95 backdrop-blur-md shadow-2xl py-3 border-none'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5 border-none'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-14 flex items-center justify-between">
        
        {/* Left: Brand Logo & Desktop Nav Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-red-600 font-cinema drop-shadow-[0_2px_12px_rgba(229,9,20,0.6)] group-hover:scale-105 transition-transform">
              OURFLIX
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-medium transition-all duration-200 py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-red-600/80 text-white">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full shadow-[0_0_8px_#e50914]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Search, Profile Selector, Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Search Trigger Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Search memories (Ctrl+K or /)"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden lg:inline text-xs text-zinc-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
              /
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-zinc-800 border border-red-500/40 shrink-0">
                {activeProfile?.avatar ? (
                  <img
                    src={activeProfile.avatar}
                    alt={activeProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-600 text-white font-bold text-xs">
                    US
                  </div>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-medium text-white max-w-[80px] truncate">
                {activeProfile?.name || 'Just Us'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#121217] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs text-zinc-400">Watching as</p>
                  <p className="text-sm font-semibold text-white truncate">
                    {activeProfile?.name || 'Just Us'}
                  </p>
                </div>
                
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <User className="w-4 h-4 text-red-500" />
                  Switch Profile
                </Link>

                <Link
                  to="/favorites"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <Heart className="w-4 h-4 text-pink-500" />
                  My List ({favorites.length})
                </Link>

                <div className="border-t border-white/10 my-1"></div>

                <div className="px-3 py-1.5 text-[11px] text-zinc-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                  Private Relationship Edition
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0e]/98 border-b border-white/10 px-4 py-5 space-y-3 animate-in fade-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-red-600/15 text-red-400 border border-red-500/30'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-600 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
