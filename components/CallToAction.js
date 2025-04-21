import React, { useState, useEffect, useRef } from 'react';

const CallToAction = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [email, setEmail] = useState('');
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add subscription logic here
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <div 
      ref={sectionRef}
      className="relative py-16 px-6 md:px-12 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className={`absolute -top-40 right-0 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px] transition-opacity duration-1000 ${isVisible ? 'opacity-60' : 'opacity-0'}`}></div>
      <div className={`absolute -bottom-40 left-0 w-96 h-96 bg-accent-orange/20 rounded-full blur-[120px] transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-60' : 'opacity-0'}`}></div>
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto relative">
        {/* Card with parallax effect */}
        <div 
          className={`glass-card border border-gray-800 rounded-2xl p-8 md:p-12 overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-20'
          }`}
          onMouseMove={(e) => {
            if (sectionRef.current) {
              const rect = sectionRef.current.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              const y = (e.clientY - rect.top) / rect.height;
              
              sectionRef.current.style.setProperty('--x', x);
              sectionRef.current.style.setProperty('--y', y);
            }
          }}
          style={{
            background: isHovered ? 
              'linear-gradient(120deg, rgba(255,87,51,0.05) 0%, rgba(131,56,236,0.05) 100%)' : 
              'rgba(17, 17, 17, 0.4)',
            transition: 'all 0.4s ease'
          }}
        >
          {/* Glow effect */}
          <div 
            className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-30' : ''}`}
            style={{
              background: 'radial-gradient(circle at calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%), rgba(255,87,51,0.2) 0%, transparent 50%)'
            }}
          ></div>
          
          <div className="relative z-10">
            <h2 
              className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
            >
              Ready to <span className="gradient-text">dominate</span> the competition?
            </h2>
            
            <p 
              className={`text-gray-400 mb-8 max-w-2xl transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Join thousands of players gaining the competitive edge with our advanced assistance tools. Get early access to new features and exclusive updates.
            </p>
            
            <form 
              onSubmit={handleSubmit}
              className={`flex flex-col sm:flex-row gap-4 mb-6 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 bg-gray-900/50 rounded-lg border transition-all duration-300 ${
                    isEmailFocused ? 'border-accent-orange shadow-sm shadow-accent-orange/20' : 'border-gray-700'
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  required
                />
                {/* Subtle email icon */}
                <svg 
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 transition-all duration-300 ${
                    isEmailFocused ? 'text-accent-orange' : ''
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 bg-accent-orange text-black font-medium rounded-lg transition-all duration-300 relative overflow-hidden group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10">Subscribe Now</span>
                
                {/* Button hover effect */}
                <span 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                ></span>
                
                {/* Arrow animation */}
                <span 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </form>
            
            {/* Trust indicators with staggered animation */}
            <div 
              className={`flex flex-wrap items-center gap-6 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm text-gray-400">Secure Payment</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-400">30-Day Free Trial</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-400">HWID Undetected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction; 