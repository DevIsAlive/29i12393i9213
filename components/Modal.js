import { useEffect, useRef, useState } from 'react';

const Modal = ({ 
  children, 
  title, 
  onClose, 
  size = 'medium', 
  type = 'default'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Prevent body scrolling when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    
    // Handle ESC key press
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    // Handle click outside modal
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalContentRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      // Restore body scrolling when modal is closed
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    };
  }, [onClose]);
  
  if (!isMounted) {
    return null;
  }

  // Size classes
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-full mx-8'
  };
  
  // Type classes
  const typeClasses = {
    default: '',
    success: 'modal-success',
    warning: 'modal-warning',
    danger: 'modal-danger',
    info: 'modal-info'
  };

  return (
    <div 
      className="modal-overlay"
      ref={modalRef}
      onClick={(e) => e.target === modalRef.current && onClose()}
    >
      <div 
        className={`modal-content ${sizeClasses[size]} ${typeClasses[type]}`}
        ref={modalContentRef}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button 
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 