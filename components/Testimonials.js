import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    avatar: "/images/avatar1.jpg",
    role: "Pro Player, Team Apex",
    rating: 5,
    text: "This tool has completely transformed my gameplay. The recoil assistance is subtle yet effective, giving me that extra edge in competitive matches without being obvious.",
    game: "The Finals"
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "/images/avatar2.jpg",
    role: "Tournament Finalist",
    rating: 5,
    text: "I've tried many assistants before, but none come close to the precision and reliability of this one. The ESP features helped me spot enemies I would have otherwise missed.",
    game: "The Finals"
  },
  {
    id: 3,
    name: "Marcus Wells",
    avatar: "/images/avatar3.jpg",
    role: "Twitch Streamer",
    rating: 4,
    text: "My viewers constantly ask how I pull off such clean shots. This tool has definitely improved my accuracy and reaction time. Customer support is also top-notch.",
    game: "The Finals"
  },
  {
    id: 4,
    name: "Olivia Rodriguez",
    avatar: "/images/avatar4.jpg",
    role: "Casual Player",
    rating: 5,
    text: "Even as someone who plays casually, I noticed a huge improvement in my performance. The interface is intuitive and the features work flawlessly without detection issues.",
    game: "The Finals"
  }
];

const TestimonialCard = ({ testimonial, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-gray-900/40 border border-gray-800 rounded-xl p-6 relative transform transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ 
        transitionDelay: `${150 * index}ms`,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle glow effect on hover */}
      <div 
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
          isHovered ? 'opacity-70' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255,87,51,0.15), transparent 70%)',
          zIndex: '-1'
        }}
      ></div>
      
      {/* Quote icon */}
      <div className={`absolute -top-3 -left-3 bg-accent-orange text-black rounded-full p-2 transition-all duration-300 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      {/* User info */}
      <div className="flex items-center mb-4 mt-2">
        <div className="relative">
          <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
            isHovered ? 'border-accent-orange' : 'border-gray-700'
          }`}>
            {/* Fallback avatar if image not available */}
            <div className="bg-accent-purple/30 w-full h-full flex items-center justify-center text-xl font-bold">
              {testimonial.avatar ? (
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector('div').style.display = 'flex';
                  }}
                />
              ) : (
                testimonial.name.charAt(0)
              )}
            </div>
          </div>
          
          {/* Game indicator */}
          <div className={`absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1 border transition-all duration-300 ${
            isHovered ? 'border-accent-orange' : 'border-gray-700'
          }`}>
            <span className="block w-4 h-4 text-xs font-bold flex items-center justify-center text-white">TF</span>
          </div>
        </div>
        
        <div className="ml-4">
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </div>
      
      {/* Rating stars */}
      <div className="flex mb-3 transition-all duration-300 transform" style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transformOrigin: 'left'
      }}>
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-accent-orange' : 'text-gray-600'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Testimonial text */}
      <p className="text-gray-300 relative">
        {testimonial.text}
      </p>
      
      {/* Decorative pattern */}
      <div className={`absolute bottom-0 right-0 opacity-10 transition-opacity duration-300 ${
        isHovered ? 'opacity-20' : ''
      }`}>
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <path d="M20 20L80 80M20 80L80 20" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Observe when section comes into view
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
  
  // Auto-rotate testimonials in mobile view
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 overflow-hidden relative">
      {/* Animated background elements */}
      <div className={`absolute top-40 -left-40 w-80 h-80 bg-accent-purple/10 rounded-full blur-[100px] transition-opacity duration-1000 ${isVisible ? 'opacity-70' : 'opacity-0'}`}></div>
      <div className={`absolute -bottom-20 right-0 w-80 h-80 bg-accent-orange/10 rounded-full blur-[100px] transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-70' : 'opacity-0'}`}></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}>
            Don't just take our word for it
          </h2>
          <p className={`text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Hear from players who've elevated their gameplay with our assistance tools
          </p>
        </div>
        
        {/* Mobile testimonial slider */}
        <div className="md:hidden">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`transition-all duration-500 ${
                index === activeIndex ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}
            >
              <TestimonialCard 
                testimonial={testimonial} 
                index={0}
                isVisible={isVisible && index === activeIndex} 
              />
              
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'bg-accent-orange w-6' : 'bg-gray-700'
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop testimonial grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
              isVisible={isVisible} 
            />
          ))}
        </div>
        
        {/* Call to action */}
        <div className={`text-center mt-12 transition-all duration-700 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a 
            href="#" 
            className="inline-flex items-center text-accent-orange hover:text-white transition-colors duration-300 group"
          >
            <span>Join our community of champions</span>
            <svg 
              className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 