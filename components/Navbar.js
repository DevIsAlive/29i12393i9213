import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { BiShareAlt } from 'react-icons/bi';
import ShareModal from './ShareModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set initial active item based on URL
    const path = window.location.hash || '#home';
    setActiveItem(path.substring(1));
    
    // Initialize scroll top button function
    const homeLink = document.getElementById('home-nav-link');
    if (homeLink) {
      homeLink.addEventListener('click', handleScrollToTop);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (homeLink) {
        homeLink.removeEventListener('click', handleScrollToTop);
      }
    };
  }, []);
  
  const navItems = [
    { name: 'home', label: 'Home', path: '/' },
    { name: 'features', label: 'Features', path: '#features' },
    { name: 'pricing', label: 'Pricing', path: '#pricing' },
    { name: 'showcase', label: 'Showcase', path: '#showcase' },
    { name: 'contact', label: 'Contact', path: '#contact' }
  ];

  // Scroll to top function - multiple approaches
  const handleScrollToTop = (e) => {
    if (e) e.preventDefault();
    
    // Force a full page refresh for home nav link
    window.location.href = '/';
  };
  
  // Logo click handler - separate function to ensure it works
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; // Force a full page refresh
  };
  
  return (
    <nav className={`glassy-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'backdrop-blur-md bg-slate-900/80' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/"
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer group"
          >
            <div className="relative w-10 h-10 mr-2 overflow-hidden transition-transform duration-300 group-hover:rotate-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse-slow"></div>
              <div className="absolute inset-1 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xl">F</div>
            </div>
            <span className="text-white font-bold text-xl tracking-wide hover:tracking-wider transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500">
              FINALS<span className="text-blue-500 group-hover:text-transparent">.</span>
            </span>
          </a>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.name === 'home' ? (
                <a 
                  key={item.name}
                  id="home-nav-link"
                  href="/"
                  onClick={handleLogoClick}
                  className="cursor-pointer"
                >
                  <span className={`nav-link relative py-2 px-1 text-sm font-medium transition-all duration-300 
                    ${activeItem === item.name ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-300 ${activeItem === item.name ? 'scale-x-100' : ''}`}></span>
                  </span>
                </a>
              ) : (
                <Link 
                  key={item.name} 
                  href={item.path}
                  onClick={() => setActiveItem(item.name)}
                >
                  <span className={`nav-link relative py-2 px-1 text-sm font-medium transition-all duration-300 
                    ${activeItem === item.name ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-300 ${activeItem === item.name ? 'scale-x-100' : ''}`}></span>
                  </span>
                </Link>
              )
            ))}
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowShareModal(true)}
              className="share-button flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/70 hover:bg-slate-700 transition-all duration-300 text-gray-300 hover:text-white hover:shadow-glow"
              aria-label="Share"
            >
              <BiShareAlt size={20} className="hover:scale-110 transition-transform duration-300" />
            </button>
            
            <a 
              href="https://github.com/yourusername/finals-assistant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-button flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/70 hover:bg-slate-700 transition-all duration-300 text-gray-300 hover:text-white hover:shadow-glow"
              aria-label="GitHub"
            >
              <FaGithub size={20} className="hover:rotate-12 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
      
      {showShareModal && (
        <ShareModal 
          isVisible={showShareModal} 
          onClose={() => setShowShareModal(false)} 
        />
      )}
    </nav>
  );
};

export default Navbar;