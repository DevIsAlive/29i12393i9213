import React, { useState, useEffect } from 'react';

export const TypewriterEffect = ({ text, className, speed = 70, delay = 0, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        startTyping();
      }, delay);
      
      return () => clearTimeout(delayTimer);
    } else {
      startTyping();
    }
    
    function startTyping() {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, speed);
        
        return () => clearTimeout(timeout);
      } else if (!isComplete) {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }
  }, [currentIndex, delay, isComplete, onComplete, speed, text]);
  
  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <span className="typing-cursor">|</span>
      )}
    </span>
  );
};

export default TypewriterEffect;
