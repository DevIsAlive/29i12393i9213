import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

// Script to prevent addEventListener errors
const ClientSafetyScript = () => {
  useEffect(() => {
    // Safety patch for document.addEventListener errors
    if (typeof window !== 'undefined') {
      // Store the original addEventListener method
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      
      // Override addEventListener to check for null targets
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (this) {
          return originalAddEventListener.call(this, type, listener, options);
        }
        console.warn('Attempted to add event listener to null element');
        return undefined;
      };
    }
  }, []);
  
  return null;
};

// Smooth scrolling animation setup
const SmoothScrollSetup = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      // Setup intersection observer for animation on scroll
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      // Select all elements with scroll-reveal class
      const scrollElements = document.querySelectorAll('.scroll-reveal');
      scrollElements.forEach(el => {
        observer.observe(el);
      });
      
      // Add scroll class to appropriate elements
      const sectionsToAnimate = document.querySelectorAll('section > div, .feature-card, .hero-text, h2, .glass-card');
      sectionsToAnimate.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
      });
      
      return () => {
        scrollElements.forEach(el => observer.unobserve(el));
        sectionsToAnimate.forEach(el => observer.unobserve(el));
      };
    }
  }, []);
  
  return null;
};

function MyApp({ Component, pageProps }) {
  const router = typeof window !== 'undefined' ? useRouter() : null;
  const [loading, setLoading] = useState(false);
  const pageWrapperRef = useRef(null);

  useEffect(() => {
    // Skip this effect during SSR
    if (!router) return;
    
    const handleStart = () => {
      setLoading(true);
      if (pageWrapperRef.current) {
        pageWrapperRef.current.style.opacity = '0.8';
        pageWrapperRef.current.style.transform = 'translateY(10px)';
      }
    };

    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
        if (pageWrapperRef.current) {
          pageWrapperRef.current.style.opacity = '1';
          pageWrapperRef.current.style.transform = 'translateY(0)';
        }
        
        // Smooth scroll to top or to hash
        const hashId = window.location.hash;
        if (hashId) {
          setTimeout(() => {
            const element = document.querySelector(hashId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 300);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Initialize smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [router]);

  return (
    <div 
      ref={pageWrapperRef}
      className={`page-wrapper ${loading ? 'page-changing' : ''}`}
      style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}
    >
      <ClientSafetyScript />
      <SmoothScrollSetup />
      {loading && <LoadingSpinner message="Loading content..." />}
      <Component {...pageProps} />
    </div>
  );
}
