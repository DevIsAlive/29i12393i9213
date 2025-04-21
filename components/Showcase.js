import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Showcase() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('visualization');
  const [hoverIndex, setHoverIndex] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [magneticEffect, setMagneticEffect] = useState({ x: 0, y: 0, active: false });
  const [hoveredStat, setHoveredStat] = useState(null);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const buttonRef = useRef(null);
  
  // Features tabs content
  const tabs = {
    visualization: {
      title: 'Advanced Visualization',
      description: 'Real-time data visualization with heatmaps, player movement tracking, and damage statistics to give you the competitive edge.',
      image: '/images/showcase-visualization.jpg',
      highlight: 'blue'
    },
    aimbot: {
      title: 'Aim Assistance',
      description: 'Legal aim assistance that helps improve your targeting precision without breaking the game rules. Train your muscle memory and improve over time.',
      image: '/images/showcase-aimbot.jpg',
      highlight: 'purple'
    },
    radar: {
      title: 'Enhanced Radar',
      description: 'Get a clearer picture of the battlefield with our enhanced radar that shows more details about enemy positions and movements.',
      image: '/images/showcase-radar.jpg',
      highlight: 'pink'
    }
  };
  
  // Cursor tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setCursorPosition({ x, y });
        
        // Apply magnetic effect to try button
        if (buttonRef.current) {
          const btnRect = buttonRef.current.getBoundingClientRect();
          const btnCenterX = btnRect.left + btnRect.width / 2;
          const btnCenterY = btnRect.top + btnRect.height / 2;
          
          const distanceX = e.clientX - btnCenterX;
          const distanceY = e.clientY - btnCenterY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          const maxDistance = 100;
          if (distance < maxDistance) {
            const power = 1 - (distance / maxDistance);
            setMagneticEffect({
              x: distanceX * power * 0.3,
              y: distanceY * power * 0.3,
              active: true
            });
          } else if (magneticEffect.active) {
            setMagneticEffect({ x: 0, y: 0, active: false });
          }
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [magneticEffect.active]);
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
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
  
  // Get highlight color classes based on tab
  const getHighlightClasses = (tabKey) => {
    const colors = {
      blue: {
        text: 'text-blue-400',
        bg: 'bg-blue-500',
        border: 'border-blue-400',
        shadow: 'shadow-blue-500/50',
        gradient: 'from-blue-500'
      },
      purple: {
        text: 'text-purple-400',
        bg: 'bg-purple-500',
        border: 'border-purple-400',
        shadow: 'shadow-purple-500/50',
        gradient: 'from-purple-500'
      },
      pink: {
        text: 'text-pink-400',
        bg: 'bg-pink-500',
        border: 'border-pink-400',
        shadow: 'shadow-pink-500/50',
        gradient: 'from-pink-500'
      }
    };
    
    return colors[tabs[tabKey].highlight];
  };
  
  const handleSectionClick = (e) => {
    // Create ripple effect
    setRipple({
      active: true,
      x: e.clientX - (sectionRef.current?.getBoundingClientRect().left || 0),
      y: e.clientY - (sectionRef.current?.getBoundingClientRect().top || 0)
    });
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipple({ active: false, x: 0, y: 0 });
    }, 800);
  };
  
  return (
    <section 
      id="showcase" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      onClick={handleSectionClick}
    >
      {/* Ripple effect */}
      {ripple.active && (
        <span 
          className={`absolute rounded-full ${getHighlightClasses(activeTab).bg} animate-ripple opacity-20`}
          style={{
            left: ripple.x + 'px',
            top: ripple.y + 'px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
      
      {/* Background animation */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-5"
        style={{
          transform: `translate(${cursorPosition.x * -10}px, ${cursorPosition.y * -10}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      
      {/* Highlight orbs */}
      <div 
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full transition-all duration-700 ease-out filter blur-[100px] opacity-20 ${getHighlightClasses(activeTab).bg}`}
        style={{
          transform: `translate(${cursorPosition.x * -30}px, ${cursorPosition.y * -30}px)`
        }}
      ></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header with animated reveal */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 hover-glow cursor-default">
              Experience The Next Level 
              <span className={`ml-2 text-transparent bg-clip-text bg-gradient-to-r ${getHighlightClasses(activeTab).gradient} to-slate-200`}>
                Gaming Assistant
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto hover-glow-text cursor-default">
              Our cutting-edge features give you the edge you need to dominate in The Finals. Switch between views to see how our tool enhances your gameplay.
            </p>
          </div>
          
          {/* Feature tabs */}
          <div className={`flex flex-wrap justify-center gap-2 md:gap-4 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {Object.keys(tabs).map((tabKey, index) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden group ${
                  activeTab === tabKey
                    ? `${getHighlightClasses(tabKey).text} ${getHighlightClasses(tabKey).shadow} shadow-lg`
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* Background and border effects */}
                <span 
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    activeTab === tabKey 
                      ? 'bg-slate-800/80 border border-slate-600/80' 
                      : 'bg-slate-800/30 border border-slate-700/30'
                  } ${activeTab === tabKey ? 'scale-100' : 'scale-95'} group-hover:scale-100`}
                ></span>
                
                {/* Bottom border indicator */}
                <span 
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500 ${getHighlightClasses(tabKey).bg} ${
                    activeTab === tabKey ? 'opacity-100' : 'opacity-0 scale-x-0'
                  } group-hover:opacity-70 group-hover:scale-x-100`}
                  style={{ transformOrigin: 'center' }}
                ></span>
                
                {/* Glow effect on hover */}
                <span 
                  className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                    activeTab === tabKey ? `${getHighlightClasses(tabKey).bg} opacity-5` : 'opacity-0'
                  } group-hover:opacity-10`}
                ></span>
                
                {/* Text content */}
                <span className="relative z-10">{tabs[tabKey].title}</span>
              </button>
            ))}
          </div>
          
          {/* Feature showcase with animated transitions */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Feature description */}
            <div className={`transition-all duration-700 ${activeTab ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className={`text-2xl font-bold mb-4 ${getHighlightClasses(activeTab).text} hover-glow cursor-default`}>
                {tabs[activeTab].title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed hover-glow-text cursor-default">
                {tabs[activeTab].description}
              </p>
              
              {/* Feature stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {['Accuracy', 'Response Time', 'Processing', 'Satisfaction'].map((stat, index) => (
                  <div 
                    key={stat} 
                    ref={el => statsRef.current[index] = el}
                    className="glass-card p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group"
                    onMouseEnter={() => setHoveredStat(index)}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    <div className={`text-sm ${hoveredStat === index ? 'text-white' : 'text-gray-400'} transition-colors duration-300`}>{stat}</div>
                    <div className="flex items-center mt-1">
                      <div 
                        className={`h-2 rounded-full ${getHighlightClasses(activeTab).bg}`}
                        style={{ 
                          width: `${85 + (index * 5)}%`,
                          transition: 'width 1s ease-in-out',
                          filter: hoveredStat === index ? 'brightness(1.3)' : 'brightness(1)'
                        }}
                      ></div>
                      <span className={`ml-2 text-sm font-medium ${hoveredStat === index ? 'scale-110' : ''} transition-transform duration-300`}>
                        {85 + (index * 5)}%
                      </span>
                    </div>
                    
                    {/* Highlight glow on hover */}
                    <div 
                      className={`absolute inset-0 rounded-lg bg-gradient-to-br ${getHighlightClasses(activeTab).gradient} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                  </div>
                ))}
              </div>
              
              {/* CTA button */}
              <button 
                ref={buttonRef}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 group relative overflow-hidden bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50`}
                style={{
                  transform: magneticEffect.active 
                    ? `translate(${magneticEffect.x}px, ${magneticEffect.y}px) scale(1.05)` 
                    : 'translate(0, 0) scale(1)'
                }}
              >
                <span className={`absolute inset-0 ${getHighlightClasses(activeTab).bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></span>
                <span className="absolute inset-0 shine-effect"></span>
                <span className="relative z-10 flex items-center">
                  <span>Try this feature</span>
                  <svg 
                    className={`w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1 ${getHighlightClasses(activeTab).text}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>
            
            {/* Image showcase with interactive elements */}
            <div className="relative rounded-xl overflow-hidden group transition-transform duration-500 transform hover:scale-105">
              {/* Main image with animated transition */}
              <div className="relative h-[350px] w-full overflow-hidden shadow-2xl border border-slate-700/50 rounded-xl">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center transition-all duration-300"
                  style={{
                    transform: `perspective(1000px) rotateX(${cursorPosition.y * 5}deg) rotateY(${-cursorPosition.x * 5}deg)`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                      {tabs[activeTab].title}
                    </div>
                  </div>
                </div>
                
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent transition-opacity duration-300 opacity-70 group-hover:opacity-40`}></div>
                
                {/* Interactive elements overlay */}
                <div 
                  className="absolute inset-0 p-4"
                  style={{
                    transform: `perspective(1000px) rotateX(${cursorPosition.y * 2}deg) rotateY(${-cursorPosition.x * 2}deg)`,
                    transition: 'transform 0.5s ease-out',
                  }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex justify-between">
                      {/* Interactive UI elements */}
                      <div className="glass-card px-3 py-2 rounded-lg text-sm hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <span className={`${getHighlightClasses(activeTab).text}`}>Active View</span>
                      </div>
                      
                      <div className="glass-card px-3 py-2 rounded-lg text-sm hover:scale-110 transition-transform duration-300 flex items-center cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        <span>Live Data</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      {/* Center UI element - changes with tab selection */}
                      <div 
                        className="glass-card py-2 px-4 rounded-lg text-center transform transition-all duration-500 hover:scale-110"
                        style={{
                          backgroundColor: 'rgba(30, 41, 59, 0.7)',
                          borderColor: 'rgba(100, 116, 139, 0.3)',
                          boxShadow: `0 0 20px 2px ${activeTab === 'visualization' ? 'rgba(59, 130, 246, 0.2)' : activeTab === 'aimbot' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(236, 72, 153, 0.2)'}`
                        }}
                      >
                        <div className="text-sm font-medium mb-1">{tabs[activeTab].title} Enabled</div>
                        <div className="flex space-x-1 justify-center">
                          <div className={`h-1 w-5 rounded-full ${getHighlightClasses(activeTab).bg} animate-pulse-slow`}></div>
                          <div className={`h-1 w-3 rounded-full ${getHighlightClasses(activeTab).bg} animate-pulse-slow`} style={{ animationDelay: '300ms' }}></div>
                          <div className={`h-1 w-7 rounded-full ${getHighlightClasses(activeTab).bg} animate-pulse-slow`} style={{ animationDelay: '600ms' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      {/* Bottom UI elements */}
                      <div className="glass-card px-3 py-2 rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <div className="text-xs text-gray-400">FPS</div>
                        <div className="font-medium">120+ <span className="text-green-400 text-xs">+15%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at ${cursorPosition.x * 100}% ${cursorPosition.y * 100}%, rgba(255, 255, 255, 0.1), transparent 70%)`
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Bottom decorative elements */}
          <div className="mt-16 flex justify-center gap-4 opacity-50">
            {['Basic', 'Pro', 'Elite'].map((tier, idx) => (
              <div 
                key={tier} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeTab === Object.keys(tabs)[idx] 
                    ? getHighlightClasses(activeTab).bg
                    : 'bg-gray-600'
                } ${
                  activeTab === Object.keys(tabs)[idx] 
                    ? 'scale-150'
                    : 'scale-100 hover:scale-125'
                }`}
                onClick={() => setActiveTab(Object.keys(tabs)[idx])}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 