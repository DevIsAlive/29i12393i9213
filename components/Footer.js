import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setIsSubscribed(true);
      setEmailInput('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleFooterClick = (e) => {
    // Create ripple effect
    setRipple({ 
      active: true, 
      x: e.clientX, 
      y: e.clientY 
    });
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipple({ active: false, x: 0, y: 0 });
    }, 800);
  };

  return (
    <footer 
      className="py-12 px-6 md:px-12 border-t border-gray-800 relative overflow-hidden"
      onClick={handleFooterClick}
    >
      {/* Ripple effect */}
      {ripple.active && (
        <span 
          className="absolute rounded-full bg-purple-500/10 animate-ripple"
          style={{
            left: ripple.x + 'px',
            top: ripple.y + 'px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
      
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/5 to-transparent opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-md mr-2 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-glow-sm"></div>
              <span className="text-lg font-bold gradient-text">The Finals Assistant</span>
            </Link>
            <p className="text-gray-400 hover-glow-text cursor-default mb-6">
              Enhance your gameplay with advanced features and seamless integration.
            </p>
            
            {/* Newsletter subscription */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-300">Get Updates</h3>
              <form onSubmit={handleSubscribe} className="relative">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email" 
                  className="bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
                <button 
                  type="submit" 
                  disabled={isSubscribed}
                  className={`mt-2 w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transform hover:scale-105 hover:shadow-glow-sm overflow-hidden relative group ${isSubscribed ? 'opacity-75' : ''}`}
                >
                  <span className="relative z-10">{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
                  <span className="absolute inset-0 shine-effect"></span>
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300 hover-glow cursor-default">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Integrations', 'Changelog', 'Documentation'].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className={`text-gray-400 hover:text-white transition-colors duration-300 relative flex items-center group ${hoveredLink === `product-${idx}` ? 'text-white' : ''}`}
                    onMouseEnter={() => setHoveredLink(`product-${idx}`)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className={`absolute left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${hoveredLink === `product-${idx}` ? 'w-full' : 'w-0'}`}></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300 hover-glow cursor-default">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact', 'Media Kit'].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className={`text-gray-400 hover:text-white transition-colors duration-300 relative flex items-center group ${hoveredLink === `company-${idx}` ? 'text-white' : ''}`}
                    onMouseEnter={() => setHoveredLink(`company-${idx}`)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className={`absolute left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${hoveredLink === `company-${idx}` ? 'w-full' : 'w-0'}`}></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300 hover-glow cursor-default">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'EULA'].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className={`text-gray-400 hover:text-white transition-colors duration-300 relative flex items-center group ${hoveredLink === `legal-${idx}` ? 'text-white' : ''}`}
                    onMouseEnter={() => setHoveredLink(`legal-${idx}`)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className={`absolute left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${hoveredLink === `legal-${idx}` ? 'w-full' : 'w-0'}`}></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm hover-glow-text cursor-default">
            © {new Date().getFullYear()} The Finals Assistant. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { name: 'Twitter', icon: '𝕏' },
              { name: 'GitHub', icon: '📂' },
              { name: 'Discord', icon: '💬' },
              { name: 'YouTube', icon: '▶️' }
            ].map((platform, idx) => (
              <Link 
                key={idx} 
                href={`/${platform.name.toLowerCase()}`} 
                className="text-gray-500 hover:text-white transition-colors duration-300 flex items-center gap-1 transform hover:scale-110 hover:text-glow"
              >
                <span className="text-lg">{platform.icon}</span>
                <span>{platform.name}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Back to top button */}
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white transform hover:scale-110 transition-all duration-300 hover:shadow-glow group"
        >
          <svg 
            className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer; 