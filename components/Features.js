import React, { useState, useEffect, useRef } from 'react';
import { FaChartLine, FaVideo, FaBrain, FaRunning, FaUsers, FaSatelliteDish, FaStar, FaCrosshairs, FaWrench } from 'react-icons/fa';
import DownloadModal from './DownloadModal';

const features = [
  {
    id: 'rank-surge',
    title: 'Rank Surge',
    description: 'A thrilling in-app tool that predicts your rank progression using scoreboard stats, guiding you toward your next tier with clear insights.',
    icon: <FaChartLine className="text-purple-400" />,
    image: '/images/feature-rank.jpg',
    color: 'purple',
    category: 'utility',
    benefits: [
      'Calculates rank trajectory trends',
      'Tracks performance across matches',
      'Suggests rank-up focused strategies'
    ]
  },
  {
    id: 'auto-moment',
    title: 'Auto Moment',
    description: 'A high-energy auto clip maker that captures your best moments in real-time, turning them into highlight montages for instant sharing.',
    icon: <FaVideo className="text-blue-400" />,
    image: '/images/feature-clip.jpg',
    color: 'blue',
    category: 'utility',
    benefits: [
      'Detects highlight-worthy plays',
      'Generates clips with one click',
      'Integrates with social platforms'
    ]
  },
  {
    id: 'ai-coach',
    title: 'AI Coach',
    description: 'A dynamic in-game tool that offers real-time AI coaching tips via kill feed, guiding your plays with strategic suggestions.',
    icon: <FaBrain className="text-orange-400" />,
    image: '/images/feature-coach.jpg',
    color: 'orange',
    category: 'aim',
    benefits: [
      'Analyzes post-match stats',
      'Fully interactable tip adjustments',
      'Adapts to player skill level'
    ]
  },
  {
    id: 'meta-build',
    title: 'Meta Build',
    description: 'A brilliant in-app tool that crafts the perfect build by analyzing the meta and your team\'s setup, ensuring you dominate every match.',
    icon: <FaWrench className="text-cyan-400" />,
    image: '/images/feature-movement.jpg',
    color: 'cyan',
    category: ['utility', 'team'],
    benefits: [
      'Analyzes meta trends from patch notes',
      'Matches builds to teammate roles',
      'Suggests optimal loadout picks'
    ]
  },
  {
    id: 'team-sync',
    title: 'Team Coordination',
    description: 'Seamlessly coordinate with teammates using real-time position sharing, enemy call-outs, and strategic objective planning tools.',
    icon: <FaUsers className="text-indigo-400" />,
    image: '/images/feature-team.jpg',
    color: 'indigo',
    category: 'team',
    benefits: [
      'Real-time teammate positioning',
      'Automated call-outs',
      'Strategic objective planning'
    ]
  },
  {
    id: 'radar-hack',
    title: 'Radar Hack',
    description: 'Get a strategic advantage with our advanced radar system that shows enemy positions, movements, and equipment in real-time.',
    icon: <FaSatelliteDish className="text-green-400" />,
    image: '/images/feature-radar.jpg',
    color: 'green',
    category: 'utility',
    benefits: [
      'Real-time position tracking',
      'Equipment and loadout detection',
      'Movement prediction algorithms'
    ]
  }
];

const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  
  let gradientClass = '';
  let glowClass = '';
  let iconColorClass = '';
  
  switch (feature.color) {
    case 'blue':
      gradientClass = 'from-blue-600/20 via-blue-700/10 to-blue-800/20';
      glowClass = 'hover:shadow-blue-500/40';
      iconColorClass = 'group-hover:text-blue-400 group-hover:shadow-blue-500/70';
      break;
    case 'purple':
      gradientClass = 'from-purple-600/20 via-purple-700/10 to-purple-800/20';
      glowClass = 'hover:shadow-purple-500/40';
      iconColorClass = 'group-hover:text-purple-400 group-hover:shadow-purple-500/70';
      break;
    case 'green':
      gradientClass = 'from-green-600/20 via-green-700/10 to-green-800/20';
      glowClass = 'hover:shadow-green-500/40';
      iconColorClass = 'group-hover:text-green-400 group-hover:shadow-green-500/70';
      break;
    case 'orange':
      gradientClass = 'from-orange-600/20 via-orange-700/10 to-orange-800/20';
      glowClass = 'hover:shadow-orange-500/40';
      iconColorClass = 'group-hover:text-orange-400 group-hover:shadow-orange-500/70';
      break;
    case 'cyan':
      gradientClass = 'from-cyan-600/20 via-cyan-700/10 to-cyan-800/20';
      glowClass = 'hover:shadow-cyan-500/40';
      iconColorClass = 'group-hover:text-cyan-400 group-hover:shadow-cyan-500/70';
      break;
    case 'indigo':
      gradientClass = 'from-indigo-600/20 via-indigo-700/10 to-indigo-800/20';
      glowClass = 'hover:shadow-indigo-500/40';
      iconColorClass = 'group-hover:text-indigo-400 group-hover:shadow-indigo-500/70';
      break;
    default:
      gradientClass = 'from-gray-600/20 via-gray-700/10 to-gray-800/20';
      glowClass = 'hover:shadow-gray-500/40';
      iconColorClass = 'group-hover:text-gray-400 group-hover:shadow-gray-500/70';
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current || !isHovered) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 35;
      const tiltY = (centerX - x) / 35;
      
      cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
      
      // Add spotlight effect following cursor
      cardRef.current.style.background = `
        radial-gradient(circle at ${x}px ${y}px, 
        rgba(255, 255, 255, 0.08) 0%, 
        rgba(255, 255, 255, 0.03) 25%, 
        rgba(255, 255, 255, 0) 50%), 
        linear-gradient(to bottom right, ${feature.color === 'blue' ? 'rgba(60, 80, 200, 0.2)' : 
        feature.color === 'purple' ? 'rgba(120, 60, 200, 0.2)' : 
        feature.color === 'green' ? 'rgba(60, 200, 120, 0.2)' : 
        feature.color === 'orange' ? 'rgba(200, 120, 60, 0.2)' : 
        feature.color === 'cyan' ? 'rgba(60, 200, 200, 0.2)' : 
        feature.color === 'indigo' ? 'rgba(80, 60, 200, 0.2)' : 
        'rgba(80, 80, 80, 0.2)'}, 
        rgba(20, 20, 40, 0.3))
      `;
      
      // Make icon follow cursor slightly
      if (iconRef.current) {
        const followX = (x - centerX) / 30;
        const followY = (y - centerY) / 30;
        iconRef.current.style.transform = `translate(${followX}px, ${followY}px) scale(1.2)`;
      }
      
      // Make button glow when cursor is near
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const relX = e.clientX - buttonRect.left;
        const relY = e.clientY - buttonRect.top;
        
        const distance = Math.sqrt(
          Math.pow(relX - buttonRect.width / 2, 2) + 
          Math.pow(relY - buttonRect.height / 2, 2)
        );
        
        const maxDistance = Math.sqrt(
          Math.pow(buttonRect.width / 2, 2) + 
          Math.pow(buttonRect.height / 2, 2)
        );
        
        if (distance < maxDistance * 1.5) {
          const intensity = 1 - distance / (maxDistance * 1.5);
          buttonRef.current.style.boxShadow = `0 0 ${15 * intensity}px ${
            feature.color === 'blue' ? 'rgba(60, 130, 255, ' : 
            feature.color === 'purple' ? 'rgba(150, 60, 255, ' : 
            feature.color === 'green' ? 'rgba(60, 215, 160, ' : 
            feature.color === 'orange' ? 'rgba(255, 150, 60, ' : 
            feature.color === 'cyan' ? 'rgba(60, 210, 255, ' : 
            feature.color === 'indigo' ? 'rgba(100, 90, 255, ' : 
            'rgba(150, 150, 150, '
          }${0.5 * intensity})`;
          buttonRef.current.style.transform = `scale(${1 + 0.05 * intensity})`;
        } else {
          buttonRef.current.style.boxShadow = '';
          buttonRef.current.style.transform = '';
        }
      }
    };
    
    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      cardRef.current.style.background = '';
      
      if (iconRef.current) {
        iconRef.current.style.transform = '';
      }
      
      if (buttonRef.current) {
        buttonRef.current.style.boxShadow = '';
        buttonRef.current.style.transform = '';
      }
    };
    
    const handleTouchStart = () => {
      setIsTapped(true);
      setTimeout(() => setIsTapped(false), 300);
    };
    
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('touchstart', handleTouchStart);
    }
    
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, [isHovered, feature.color]);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  return (
    <div 
      ref={cardRef}
      className={`glass-card group bg-gradient-to-br ${gradientClass} p-6 rounded-xl border border-slate-700/30 h-full transition-all duration-500 ${glowClass} hover:shadow-xl hover:border-slate-600/50 relative overflow-hidden backdrop-blur-sm`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease, border-color 0.5s ease, background 0.3s ease',
        transform: isTapped ? 'scale(0.98)' : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient effect */}
      <div className="absolute inset-0 border border-transparent rounded-xl pointer-events-none" style={{
        background: `linear-gradient(90deg, 
          ${feature.color === 'blue' ? 'rgba(60, 130, 255, 0)' : 
          feature.color === 'purple' ? 'rgba(150, 60, 255, 0)' : 
          feature.color === 'green' ? 'rgba(60, 215, 160, 0)' : 
          feature.color === 'orange' ? 'rgba(255, 150, 60, 0)' : 
          feature.color === 'cyan' ? 'rgba(60, 210, 255, 0)' : 
          feature.color === 'indigo' ? 'rgba(100, 90, 255, 0)' : 
          'rgba(150, 150, 150, 0)'},
          ${feature.color === 'blue' ? 'rgba(60, 130, 255, 0.5)' : 
          feature.color === 'purple' ? 'rgba(150, 60, 255, 0.5)' : 
          feature.color === 'green' ? 'rgba(60, 215, 160, 0.5)' : 
          feature.color === 'orange' ? 'rgba(255, 150, 60, 0.5)' : 
          feature.color === 'cyan' ? 'rgba(60, 210, 255, 0.5)' : 
          feature.color === 'indigo' ? 'rgba(100, 90, 255, 0.5)' : 
          'rgba(150, 150, 150, 0.5)'},
          ${feature.color === 'blue' ? 'rgba(60, 130, 255, 0)' : 
          feature.color === 'purple' ? 'rgba(150, 60, 255, 0)' : 
          feature.color === 'green' ? 'rgba(60, 215, 160, 0)' : 
          feature.color === 'orange' ? 'rgba(255, 150, 60, 0)' : 
          feature.color === 'cyan' ? 'rgba(60, 210, 255, 0)' : 
          feature.color === 'indigo' ? 'rgba(100, 90, 255, 0)' : 
          'rgba(150, 150, 150, 0)'}
        )`,
        backgroundSize: '300% 100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
        borderRadius: '0.75rem'
      }}></div>

      {/* Subtle glass blur effect overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
      
      {/* Subtle particles that appear on hover */}
      {isHovered && (
        [...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white/20 animate-particle-float"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 0.5}s`,
              filter: `blur(${Math.random() + 0.5}px)`,
              background: `radial-gradient(circle at center, 
                ${feature.color === 'blue' ? 'rgba(60, 130, 255, 0.9)' : 
                feature.color === 'purple' ? 'rgba(150, 60, 255, 0.9)' : 
                feature.color === 'green' ? 'rgba(60, 215, 160, 0.9)' : 
                feature.color === 'orange' ? 'rgba(255, 150, 60, 0.9)' : 
                feature.color === 'cyan' ? 'rgba(60, 210, 255, 0.9)' : 
                feature.color === 'indigo' ? 'rgba(100, 90, 255, 0.9)' : 
                'rgba(150, 150, 150, 0.9)'},
                transparent)`
            }}
          />
        ))
      )}
      
      <div className="text-2xl mb-4 font-bold flex items-center">
        <div 
          ref={iconRef}
          className={`flex items-center justify-center h-12 w-12 rounded-lg mr-3 bg-slate-800/60 text-2xl ${iconColorClass} transition-all duration-500 group-hover:bg-slate-800/90`}
          style={{
            boxShadow: isHovered ? `0 0 15px ${
              feature.color === 'blue' ? 'rgba(60, 130, 255, 0.4)' : 
              feature.color === 'purple' ? 'rgba(150, 60, 255, 0.4)' : 
              feature.color === 'green' ? 'rgba(60, 215, 160, 0.4)' : 
              feature.color === 'orange' ? 'rgba(255, 150, 60, 0.4)' : 
              feature.color === 'cyan' ? 'rgba(60, 210, 255, 0.4)' : 
              feature.color === 'indigo' ? 'rgba(100, 90, 255, 0.4)' : 
              'rgba(150, 150, 150, 0.4)'
            }` : 'none',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
          }}
        >
          {feature.icon}
          <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
        </div>
        <span className="text-white font-bold tracking-wide transition-all duration-300 leading-tight group-hover:tracking-wider">
          {feature.title}
        </span>
      </div>
      
      <p className="text-gray-300 mb-5 transition-all duration-500 group-hover:text-white group-hover:translate-y-[-2px] leading-relaxed">{feature.description}</p>
      
      <ul className="space-y-3 mb-5">
        {feature.benefits && feature.benefits.map((benefit, i) => (
          <li key={i} className="flex items-start group/item">
            <span 
              className={`text-green-400 mr-2 transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12`}
              style={{ 
                textShadow: isHovered ? `0 0 5px rgba(74, 222, 128, 0.7)` : 'none',
                transitionDelay: `${i * 100}ms`
              }}
            >
              ✓
            </span>
            <span 
              className="text-gray-400 group-hover/item:text-white transition-all duration-300"
              style={{ 
                transitionDelay: `${i * 100 + 50}ms`,
                transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              {benefit}
            </span>
          </li>
        ))}
      </ul>
      
      <button 
        ref={buttonRef}
        className={`mt-auto px-4 py-2.5 rounded-lg bg-gradient-to-r transition-all duration-500 text-white font-medium transform hover:scale-105 hover:shadow-glow relative overflow-hidden shine-effect group/btn w-full ${
          feature.color === 'blue' ? 'from-blue-600 to-blue-400' : 
          feature.color === 'purple' ? 'from-purple-600 to-purple-400' : 
          feature.color === 'green' ? 'from-green-600 to-green-400' : 
          feature.color === 'orange' ? 'from-orange-600 to-orange-400' : 
          feature.color === 'cyan' ? 'from-cyan-600 to-cyan-400' : 
          feature.color === 'indigo' ? 'from-indigo-600 to-indigo-400' : 
          'from-gray-600 to-gray-400'
        }`}
        style={{
          boxShadow: isHovered ? `0 4px 20px ${
            feature.color === 'blue' ? 'rgba(60, 130, 255, 0.5)' : 
            feature.color === 'purple' ? 'rgba(150, 60, 255, 0.5)' : 
            feature.color === 'green' ? 'rgba(60, 215, 160, 0.5)' : 
            feature.color === 'orange' ? 'rgba(255, 150, 60, 0.5)' : 
            feature.color === 'cyan' ? 'rgba(60, 210, 255, 0.5)' : 
            feature.color === 'indigo' ? 'rgba(100, 90, 255, 0.5)' : 
            'rgba(150, 150, 150, 0.5)'
          }` : 'none'
        }}
        onClick={handleDownloadClick}
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 rounded-lg transition-opacity duration-300"></span>
        <span className="relative z-10 flex items-center justify-center gap-2">
          Try Now
          <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
      </button>

      {showDownloadModal && (
        <DownloadModal 
          isVisible={showDownloadModal}
          onClose={handleCloseModal}
          downloadName={`Finals-${feature.id}`}
        />
      )}
    </div>
  );
};

const Features = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoverCategory, setHoverCategory] = useState(null);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const categoryRefs = useRef([]);
  const categoryContainerRef = useRef(null);
  const featuresContainerRef = useRef(null);
  
  // Define categories before using them in any function
  const categories = [
    { id: 'all', name: 'All Features', icon: <FaStar className="text-yellow-400" /> },
    { id: 'aim', name: 'Aim', icon: <FaCrosshairs className="text-red-400" /> },
    { id: 'movement', name: 'Movement', icon: <FaRunning className="text-cyan-400" /> },
    { id: 'utility', name: 'Utility', icon: <FaWrench className="text-gray-400" /> },
    { id: 'team', name: 'Team', icon: <FaUsers className="text-indigo-400" /> }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => {
        if (Array.isArray(feature.category)) {
          return feature.category.includes(activeCategory);
        }
        return feature.category === activeCategory;
      });

  // Count features in each category for badges
  const categoryCounts = {};
  categories.forEach(cat => {
    if (cat.id === 'all') {
      categoryCounts[cat.id] = features.length;
    } else {
      categoryCounts[cat.id] = features.filter(f => {
        if (Array.isArray(f.category)) {
          return f.category.includes(cat.id);
        }
        return f.category === cat.id;
      }).length;
    }
  });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Handle category change with animation
  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory || animating) return;
    
    setAnimating(true);
    
    // Animate features container out
    if (featuresContainerRef.current) {
      featuresContainerRef.current.style.opacity = '0.5';
      featuresContainerRef.current.style.transform = 'translateY(10px) scale(0.99)';
      featuresContainerRef.current.style.filter = 'blur(2px)';
    }
    
    // Change category after short delay
    setTimeout(() => {
      setActiveCategory(categoryId);
      
      // Animate features container back in
      if (featuresContainerRef.current) {
        setTimeout(() => {
          featuresContainerRef.current.style.opacity = '1';
          featuresContainerRef.current.style.transform = 'translateY(0) scale(1)';
          featuresContainerRef.current.style.filter = 'blur(0)';
          setTimeout(() => {
            setAnimating(false);
          }, 300);
        }, 50);
      }
    }, 250);
  };

  // Add mouse tracking for category filter buttons
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!categoryContainerRef.current) return;

      // Add subtle light effect to the whole container when mouse is over
      const containerRect = categoryContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      if (
        mouseX >= 0 && 
        mouseX <= containerRect.width && 
        mouseY >= 0 && 
        mouseY <= containerRect.height
      ) {
        // Use a safe assignment that won't throw errors during SSR
        if (typeof categoryContainerRef.current?.style !== 'undefined') {
          categoryContainerRef.current.style.background = `
            radial-gradient(
              circle at ${mouseX}px ${mouseY}px, 
              rgba(100, 100, 255, 0.07), 
              transparent 150px
            ),
            rgba(0, 0, 0, 0.2)
          `;
        }
      } else {
        if (typeof categoryContainerRef.current?.style !== 'undefined') {
          categoryContainerRef.current.style.background = '';
        }
      }

      // Individual button effects with safe assignments
      categoryRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        
        // Check if mouse is within 120px of the button
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + 
          Math.pow(y - centerY, 2)
        );
        
        // Make sure categories and index are valid
        if (!categories[index]) return;
        
        if (distance < 120) {
          const intensity = 1 - distance / 120;
          const scale = 1 + 0.05 * intensity;
          
          // Apply transform with safety checks
          if (typeof ref.style !== 'undefined') {
            ref.style.transform = `scale(${scale})`;
            
            // Apply glow effect based on category color
            const categoryId = categories[index].id;
            const color = 
              categoryId === 'all' ? 'rgba(234, 179, 8, 0.5)' :
              categoryId === 'aim' ? 'rgba(239, 68, 68, 0.5)' :
              categoryId === 'movement' ? 'rgba(6, 182, 212, 0.5)' :
              categoryId === 'utility' ? 'rgba(156, 163, 175, 0.5)' :
              'rgba(99, 102, 241, 0.5)';
              
            ref.style.boxShadow = `0 0 ${15 * intensity}px ${color.replace('0.5', 0.3 * intensity)}`;
            
            // Add subtle inner light effect with safety check
            const iconElement = ref.querySelector('svg');
            if (iconElement && typeof iconElement.style !== 'undefined') {
              iconElement.style.filter = `drop-shadow(0 0 ${3 * intensity}px ${color.replace('0.5', '0.8')})`;
              iconElement.style.transform = `scale(${1 + 0.1 * intensity})`;
            }
          }
        } else {
          if (typeof ref.style !== 'undefined') {
            ref.style.transform = categories[index].id === activeCategory ? 'scale(1.05)' : '';
            ref.style.boxShadow = '';
            
            const iconElement = ref.querySelector('svg');
            if (iconElement && typeof iconElement.style !== 'undefined') {
              iconElement.style.filter = '';
              iconElement.style.transform = '';
            }
          }
        }
      });
    };
    
    // Only add event listeners on the client side
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [activeCategory, categories]);

  return (
    <section id="features" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background elements with subtle color changes based on category */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-1/4 w-1/3 h-1/3 rounded-full blur-[120px] transform translate-y-1/4 animate-pulse-slow transition-colors duration-1000`} 
          style={{
            background: activeCategory === 'all' ? 'rgba(59, 130, 246, 0.1)' :
                      activeCategory === 'aim' ? 'rgba(239, 68, 68, 0.1)' :
                      activeCategory === 'movement' ? 'rgba(6, 182, 212, 0.1)' :
                      activeCategory === 'utility' ? 'rgba(156, 163, 175, 0.1)' :
                      'rgba(99, 102, 241, 0.1)'
          }}
        ></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[120px] transform -translate-y-1/4 animate-pulse-slow animation-delay-2000"></div>
        <div className={`absolute top-1/2 left-1/2 w-1/3 h-1/3 rounded-full blur-[150px] transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow animation-delay-4000 transition-colors duration-1000`}
          style={{
            background: activeCategory === 'all' ? 'rgba(168, 85, 247, 0.1)' :
                       activeCategory === 'aim' ? 'rgba(236, 72, 153, 0.1)' :
                       activeCategory === 'movement' ? 'rgba(14, 165, 233, 0.1)' :
                       activeCategory === 'utility' ? 'rgba(232, 121, 249, 0.1)' :
                       'rgba(79, 70, 229, 0.1)'
          }}
        ></div>
        
        {/* Animated particles with increased quality */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                opacity: Math.random() * 0.4 + 0.1,
                backgroundColor: `rgba(${Math.random() * 155 + 100}, ${Math.random() * 155 + 100}, ${Math.random() * 255}, ${Math.random() * 0.3 + 0.1})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${Math.random() * 15 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
                filter: `blur(${Math.random()}px)`
              }}
            />
          ))}
        </div>
        
        {/* Grid pattern overlay with subtle animation */}
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-5 animate-grid-shift"
          style={{backgroundSize: '30px 30px'}}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            Premium Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto shine-on-scroll">
            Explore our advanced tools designed to enhance your gameplay experience
          </p>
        </div>

        {/* Simplified Category Selector */}
        <div 
          ref={categoryContainerRef}
          className={`flex justify-center mb-16 transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
            relative max-w-md mx-auto`}
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 p-1 rounded-full backdrop-blur-md">
            <div className="flex bg-slate-900/70 rounded-full p-1.5 relative overflow-hidden">
              {/* Background indicator for active category */}
              <div 
                className="absolute h-full top-0 rounded-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-indigo-600/30 transition-all duration-300 ease-out backdrop-blur-sm border border-white/10"
                style={{
                  width: categoryRefs.current[categories.findIndex(c => c.id === activeCategory)]?.offsetWidth || 0,
                  left: categoryRefs.current[categories.findIndex(c => c.id === activeCategory)]?.offsetLeft || 0,
                  height: 'calc(100% - 6px)',
                  top: '3px',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
                }}
              ></div>
              
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  ref={el => categoryRefs.current[index] = el}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 relative z-10 transition-all duration-300
                    ${activeCategory === category.id ? 'text-white' : 'text-gray-400'}`}
                >
                  <span className={`transition-all duration-300 ${activeCategory === category.id ? 'text-white scale-110' : ''}`}>
                    {category.icon}
                  </span>
                  
                  <span className={`text-sm font-medium transition-all duration-300 ${activeCategory === category.id ? 'opacity-100' : 'opacity-70'}`}>
                    {category.name}
                  </span>
                  
                  {categoryCounts[category.id] > 0 && (
                    <span className={`ml-1 w-5 h-5 flex items-center justify-center text-xs rounded-full bg-white/10 transition-all duration-300 ${
                      activeCategory === category.id ? 'bg-white/20 text-white' : 'bg-slate-800/80 text-gray-400'
                    }`}>
                      {categoryCounts[category.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features container with enhanced transitions */}
        <div 
          ref={featuresContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease'
          }}
        >
          {filteredFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ 
                transitionDelay: `${(index % 3) * 200 + 400}ms`,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </div>
        
        {/* Empty state with subtle animation */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-20 glass-card rounded-xl border border-slate-700/30 max-w-xl mx-auto backdrop-blur-sm">
            <div className="text-6xl mb-4 opacity-70 animate-float">🔍</div>
            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">No features found</h3>
            <p className="text-gray-400">We're working on adding features to this category soon!</p>
          </div>
        )}
        
        {/* Bottom call-to-action with subtle refinements */}
        <div className={`text-center mt-16 transition-all duration-700 delay-1000 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="glass-card inline-block rounded-xl px-10 py-8 border border-slate-700/30 max-w-2xl mx-auto relative overflow-hidden backdrop-blur-md">
            {/* Subtle animated backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 animate-gradient-shift"></div>
            
            <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 relative">
              Ready to dominate The Finals?
            </h3>
            <p className="text-gray-300 mb-6 relative">Join thousands of players already using our premium features</p>
            <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium text-white shadow-glow hover:shadow-glow-lg transform transition-all duration-500 hover:scale-105 hover:translate-y-[-2px] shine-effect relative">
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-lg transition-opacity duration-300"></span>
              <span className="flex items-center justify-center gap-2 relative">
                Get Started Now
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[50px] animate-pulse-slow"></div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-purple-500/10 rounded-full blur-[30px] animate-pulse-slow animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
