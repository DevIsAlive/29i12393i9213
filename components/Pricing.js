import React, { useState, useRef, useEffect } from 'react';

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    duration: 'Forever',
    description: 'Essential features for casual play',
    features: [
      'Basic performance tracking',
      'Match history (5 games)',
      'Standard loadout suggestions',
      'Basic aim tips'
    ],
    cta: 'Get Started',
    popular: false,
    color: 'from-blue-500 to-cyan-400',
    gradientText: 'from-blue-400 to-cyan-300',
    buttonGradient: 'to right, #2563eb, #06b6d4',
    hoverGlow: 'rgba(59, 130, 246, 0.3)',
    iconColor: 'text-blue-400',
    hoverEffect: 'pulse',
    hoverText: 'Get Started Now',
    particleColor: '#38bdf8'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$5.99',
    duration: '/month',
    description: 'Advanced features for serious gamers',
    features: [
      'Advanced performance analytics',
      'Unlimited match history',
      'AI-powered loadout optimizer',
      'Personalized aim training',
      'Priority support'
    ],
    cta: 'Upgrade Now',
    popular: false,
    color: 'from-purple-500 to-indigo-500',
    gradientText: 'from-purple-400 to-indigo-400',
    buttonGradient: 'to right, #6366f1, #8b5cf6',
    hoverGlow: 'rgba(139, 92, 246, 0.3)',
    iconColor: 'text-purple-400',
    hoverEffect: 'expand',
    hoverText: 'Upgrade & Save',
    particleColor: '#a78bfa'
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$12.99',
    duration: '/month',
    description: 'Ultimate package for competitive players',
    features: [
      'Pro features +',
      'Team performance analytics',
      'AI coaching with voice feedback',
      'Custom tournament tracking',
      'Exclusive strategy guides',
      'VIP Discord access'
    ],
    cta: 'Go Elite',
    popular: false,
    limitedOffer: true,
    color: 'from-rose-500 to-orange-500',
    gradientText: 'from-rose-400 to-orange-400',
    buttonGradient: 'to right, #e11d48, #f97316',
    hoverGlow: 'rgba(249, 115, 22, 0.3)',
    iconColor: 'text-orange-400',
    hoverEffect: 'shine',
    hoverText: 'Unlock Elite Features',
    particleColor: '#f97316'
  }
];

const faqs = [
  {
    question: "Is The Finals Assistant safe to use with The Finals?",
    answer: "Yes, Finals Assistant is fully compliant with The Finals' Terms of Service and Easy Anti-Cheat (EAC). It uses only on-screen data like kill feed and objectives, processed through Overwolf's approved APIs, ensuring no risk of bans. We've been thoroughly reviewed by Overwolf and Embark Studios to guarantee safety."
  },
  {
    question: "How quickly can I start using Finals Assistant after installing?",
    answer: "You can start using FinalsVision immediately after a quick setup! Once installed via are standalone installer, it takes just a few minutes to configure your preferences, and features like Auto Moment will start capturing your highlights right away."
  },
  {
    question: "Will Finals Assistant impact my game's performance?",
    answer: "Not at all! Finals Assistant is optimized for low-end PCs, using less than 7% CPU and 300 MB RAM. It runs smoothly on systems as low as an Intel i3 with Intel HD 4000 graphics, ensuring no lag or frame drops during your Finals matches."
  },
  {
    question: "What if I need help or encounter an issue?",
    answer: "We've got you covered with 24/7 support! Reach out through our in-app chat or Discord community, and our team will assist you promptly. Plus, our AI Coach Play Strategist feature includes interactive tips to help you improve right away."
  }
];

const PriceCard = ({ plan, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonHovered, setButtonHovered] = useState(false);
  const [buttonText, setButtonText] = useState(plan.cta);
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isVisible) {
      // No need to set showGlow anymore
    }
  }, [isVisible]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    // Calculate tilt based on mouse position - making it much more subtle
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 150; // Reduced from /20 to /150
    const tiltY = (centerX - x) / 150; // Reduced from /20 to /150
    
    cardRef.current.style.transform = `perspective(1500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.005)`; // Reduced scale from 1.02 to 1.005
    
    // Update glow position with subtle effect
    const glowElement = cardRef.current.querySelector('.card-glow');
    if (glowElement) {
      glowElement.style.background = `radial-gradient(circle at ${x}px ${y}px, ${plan.hoverGlow} 0%, transparent 70%)`; // Reduced opacity from 0.3 to 0.15
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      
      // Reset glow
      const glowElement = cardRef.current.querySelector('.card-glow');
      if (glowElement) {
        glowElement.style.background = 'transparent';
      }
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    
    // Create ripple effect
    if (cardRef.current) {
      const ripple = document.createElement('div');
      ripple.className = 'absolute inset-0 bg-white rounded-xl animate-ping';
      ripple.style.opacity = '0.1';
      ripple.style.zIndex = '-1';
      cardRef.current.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode === cardRef.current) {
          cardRef.current.removeChild(ripple);
        }
        setIsClicked(false);
      }, 700);
    }
  };

  // Add a handler for button hover
  const handleButtonEnter = () => {
    setButtonHovered(true);
    setButtonText(plan.hoverText || plan.cta);
    
    // Create particles
    if (plan.hoverEffect === 'pulse' || plan.hoverEffect === 'shine') {
      const newParticles = [];
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 1 + 1
        });
      }
      setParticles(newParticles);
    }
  };

  const handleButtonLeave = () => {
    setButtonHovered(false);
    setButtonText(plan.cta);
    setParticles([]);
  };

  return (
    <div 
      ref={cardRef}
      className={`glass-card relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${plan.popular ? 'border-opacity-70 shadow-lg shadow-purple-500/10' : 'border-opacity-30'} overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transitionDelay: '0.1s',
        transition: isHovered 
          ? 'transform 0.25s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.3s ease' 
          : 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.3s ease'
      }}
    >
      {/* Interactive background gradient */}
      <div className="absolute inset-0 opacity-10 transition-opacity duration-500 ease-out z-0" 
        style={{
          opacity: isHovered ? 0.12 : 0.08,
          background: `linear-gradient(135deg, var(--glow-${plan.id === 'free' ? 'blue' : plan.id === 'pro' ? 'purple' : 'orange'}), var(--glow-${plan.id === 'free' ? 'cyan' : plan.id === 'pro' ? 'indigo' : 'rose'}))`
        }}
      />
      
      {/* Interactive glow effect */}
      <div className="card-glow absolute inset-0 opacity-0 transition-opacity duration-300 z-0"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      <div className="p-6 relative z-10">
        <div className="mb-4">
          <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${plan.gradientText} transition-all duration-300`}>
            {plan.name}
          </h3>
          <div className="flex items-end mt-1">
            <span className={`text-4xl font-bold transition-all duration-300 ${isHovered ? 'transform scale-110' : ''}`}>
              {plan.price}
            </span>
            <span className="text-gray-400 ml-1 text-sm mb-1">{plan.duration}</span>
          </div>
          <p className="text-gray-400 mt-2 text-sm">{plan.description}</p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30 my-4" />

        {/* Limited time offer */}
        {plan.limitedOffer && (
          <div className="mb-4 bg-gradient-to-r from-amber-900/30 to-red-900/30 border border-amber-700/30 rounded-md p-2 text-center">
            <span className="text-amber-400 text-xs font-medium inline-flex items-center gap-1">
              <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              LIMITED TIME OFFER
            </span>
          </div>
        )}

        <ul className="space-y-3 mb-6 min-h-[200px]">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-300 group transition-all duration-200 hover:translate-x-1">
              <svg className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                isHovered ? plan.iconColor : 'text-green-500'
              }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="group-hover:text-white transition-colors duration-300">{feature}</span>
            </li>
          ))}
        </ul>

        <button 
          ref={buttonRef}
          onClick={handleClick}
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all relative overflow-hidden ${
            isClicked ? 'translate-y-1 shadow-inner' : 'shadow-lg'
          }`}
          style={{
            background: `linear-gradient(${plan.buttonGradient})`,
            boxShadow: buttonHovered ? `0 0 20px ${plan.hoverGlow}, 0 0 30px ${plan.hoverGlow}` : 
              isHovered ? `0 0 15px ${plan.hoverGlow}` : 'none',
            transform: buttonHovered ? 
              plan.hoverEffect === 'expand' ? 'scale(1.05)' : 
              plan.hoverEffect === 'pulse' ? 'scale(1.02)' : 
              'translateY(-2px)' : 
              isClicked ? 'translateY(1px)' : 'translateY(0)'
          }}
        >
          {/* Background animation effect on hover */}
          {buttonHovered && plan.hoverEffect === 'shine' && (
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                transform: 'translateX(-100%)',
                animation: 'shine-sweep 1s ease-in-out infinite'
              }}
            />
          )}
          
          {/* Particle effects for pulse animation */}
          {buttonHovered && particles.length > 0 && (
            <>
              {particles.map(particle => (
                <span 
                  key={particle.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: plan.particleColor,
                    opacity: 0,
                    transform: 'scale(0)',
                    animation: `particle-burst ${particle.duration}s ease-out ${particle.id * 0.1}s infinite`
                  }}
                />
              ))}
            </>
          )}
          
          <span className="relative z-10 flex items-center justify-center gap-1 text-white transition-all duration-300" 
            style={{
              transform: buttonHovered && plan.hoverEffect === 'expand' ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <span className="min-w-[120px] text-center transition-all duration-300">
              {buttonText}
            </span>
            <svg 
              className={`w-4 h-4 ml-1 transition-all duration-300 ${
                buttonHovered ? 'translate-x-2 scale-125' : isHovered ? 'translate-x-1' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

const FAQ = ({ isVisible }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className={`mt-24 max-w-3xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
        Frequently Asked Questions
      </h3>
      
      <div className="space-y-4 mt-8">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="glass-card overflow-hidden cursor-pointer transition-all duration-300 border-opacity-30 hover:border-opacity-50"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <button 
              className={`flex justify-between items-center w-full p-5 text-left ${activeIndex === index ? 'text-white' : 'text-gray-300'}`}
            >
              <span className="font-medium transition-all duration-300 hover:text-white">{faq.question}</span>
              <svg 
                className={`w-5 h-5 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-purple-400' : 'text-gray-400'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-gray-400">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingAnimations = `
@keyframes shine-sweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes particle-burst {
  0% {
    opacity: 0.8;
    transform: scale(0);
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}
`;

const Pricing = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [showFAQ, setShowFAQ] = useState(false);
  const sectionRef = useRef(null);
  const [hoverTransparent, setHoverTransparent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleCards(['title']);
            setTimeout(() => setVisibleCards(prev => [...prev, 'subtitle']), 300);
            setTimeout(() => setVisibleCards(prev => [...prev, 'card1']), 600);
            setTimeout(() => setVisibleCards(prev => [...prev, 'card2']), 900);
            setTimeout(() => setVisibleCards(prev => [...prev, 'card3']), 1200);
            setTimeout(() => setShowFAQ(true), 1500);
          }, 100);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Add styles to the document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = PricingAnimations;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <section id="pricing" className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements with floating particles and interactive gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[120px] transform transition-all duration-700 ease-out"
          style={{
            transform: `translate(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * 10}px)`,
            opacity: visibleCards.includes('title') ? 0.5 : 0.2
          }}
        ></div>
        <div 
          className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[120px] transform transition-all duration-700 ease-out"
          style={{
            transform: `translate(${(0.5 - mousePosition.x) * 10}px, ${(0.5 - mousePosition.y) * 10}px)`,
            opacity: visibleCards.includes('card2') ? 0.5 : 0.2
          }}
        ></div>
        
        {/* Enhanced animated floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full shadow-glow"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                backgroundColor: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, ${Math.random() * 0.3 + 0.1})`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, 0.3)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${Math.random() * 15 + 15}s linear infinite`,
                animationDelay: `${Math.random() * 7}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 overflow-visible">
        <div className={`text-center mb-24 transition-all duration-700 transform ${visibleCards.includes('title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal-text">
            Simple <span 
              className="transparent-text cursor-pointer"
              onMouseEnter={() => setHoverTransparent(true)}
              onMouseLeave={() => setHoverTransparent(false)}
              style={{
                textShadow: hoverTransparent ? '0 0 15px var(--glow-purple), 0 0 30px var(--glow-blue)' : 'none'
              }}
            >
              transparent
            </span> pricing
          </h2>
          <p className={`text-lg text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-300 transform ${visibleCards.includes('subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our pricing reflects a 20% payment processor fee, ensuring we deliver the best The Finals features while keeping costs fair and transparent.
          </p>
        </div>

        {/* Pricing comparison cards with enhanced interactivity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative overflow-visible">
          {pricingPlans.map((plan, index) => (
            <PriceCard 
              key={plan.id} 
              plan={plan} 
              isVisible={visibleCards.includes(`card${index + 1}`)}
            />
          ))}
        </div>
        
        {/* Interactive money-back guarantee banner */}
        <div className={`mt-12 text-center transition-all duration-700 delay-1500 transform ${visibleCards.includes('card3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-full px-6 py-3 border border-slate-700/30 backdrop-blur-sm hover:bg-gradient-to-r hover:from-slate-800/70 hover:to-slate-900/70 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
            <span className="flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 text-green-500 group-hover:text-green-400 transition-colors duration-300 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              All plans come with a 7-day money-back guarantee and 24/7 support
            </span>
          </div>
        </div>
        
        {/* Enhanced FAQ Section */}
        <FAQ isVisible={showFAQ} />
      </div>
    </section>
  );
};

export default Pricing; 