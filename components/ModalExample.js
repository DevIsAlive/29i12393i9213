import { useState } from 'react';
import Modal from './Modal';

export default function ModalExample() {
  const [modals, setModals] = useState({
    default: false,
    success: false,
    warning: false,
    danger: false,
    info: false
  });

  const openModal = (type) => {
    setModals({ ...modals, [type]: true });
  };

  const closeModal = (type) => {
    setModals({ ...modals, [type]: false });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* Default Modal Button */}
      <button 
        onClick={() => openModal('default')}
        className="p-4 bg-slate-800 rounded-lg shadow-lg text-white hover:bg-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -translate-y-full bg-gradient-to-b from-blue-400 to-blue-600 group-hover:translate-y-0 group-hover:translate-x-0 opacity-20"></span>
        <span className="relative">Open Default Modal</span>
      </button>

      {/* Success Modal Button */}
      <button 
        onClick={() => openModal('success')}
        className="p-4 bg-emerald-800 rounded-lg shadow-lg text-white hover:bg-emerald-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -translate-y-full bg-gradient-to-b from-emerald-400 to-emerald-600 group-hover:translate-y-0 group-hover:translate-x-0 opacity-20"></span>
        <span className="relative">Open Success Modal</span>
      </button>

      {/* Warning Modal Button */}
      <button 
        onClick={() => openModal('warning')}
        className="p-4 bg-amber-800 rounded-lg shadow-lg text-white hover:bg-amber-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -translate-y-full bg-gradient-to-b from-amber-400 to-amber-600 group-hover:translate-y-0 group-hover:translate-x-0 opacity-20"></span>
        <span className="relative">Open Warning Modal</span>
      </button>

      {/* Danger Modal Button */}
      <button 
        onClick={() => openModal('danger')}
        className="p-4 bg-red-800 rounded-lg shadow-lg text-white hover:bg-red-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -translate-y-full bg-gradient-to-b from-red-400 to-red-600 group-hover:translate-y-0 group-hover:translate-x-0 opacity-20"></span>
        <span className="relative">Open Danger Modal</span>
      </button>

      {/* Info Modal Button */}
      <button 
        onClick={() => openModal('info')}
        className="p-4 bg-blue-800 rounded-lg shadow-lg text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -translate-y-full bg-gradient-to-b from-blue-400 to-blue-600 group-hover:translate-y-0 group-hover:translate-x-0 opacity-20"></span>
        <span className="relative">Open Info Modal</span>
      </button>

      {/* Default Modal */}
      {modals.default && (
        <Modal 
          title="Default Modal" 
          onClose={() => closeModal('default')} 
          size="medium"
        >
          <div className="modal-body">
            <p>This is a default modal with medium size.</p>
            <p className="mt-4">You can close it by:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Clicking the X button</li>
              <li>Clicking outside the modal</li>
              <li>Pressing the ESC key</li>
            </ul>
            
            <div className="modal-form-actions">
              <button 
                className="cancel-btn group"
                onClick={() => closeModal('default')}
              >
                <span className="relative z-10">Cancel</span>
                <span className="absolute inset-0 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 bg-slate-700 origin-center"></span>
              </button>
              <button 
                className="submit-btn group relative overflow-hidden"
                onClick={() => {
                  alert('Action confirmed!');
                  closeModal('default');
                }}
              >
                <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Confirm</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Success Modal */}
      {modals.success && (
        <Modal 
          title="Success Modal" 
          onClose={() => closeModal('success')} 
          type="success"
          size="small"
        >
          <div className="modal-body">
            <p>Operation completed successfully!</p>
            <div className="flex items-center justify-center my-6">
              <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="modal-form-actions">
              <button 
                className="submit-btn group relative overflow-hidden"
                onClick={() => closeModal('success')}
              >
                <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Close</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Warning Modal */}
      {modals.warning && (
        <Modal 
          title="Warning Modal" 
          onClose={() => closeModal('warning')} 
          type="warning"
          size="medium"
        >
          <div className="modal-body">
            <p>This action requires your attention before proceeding.</p>
            <div className="flex items-center justify-center my-6">
              <svg className="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div className="modal-form-actions">
              <button 
                className="cancel-btn group"
                onClick={() => closeModal('warning')}
              >
                <span className="relative z-10">Cancel</span>
                <span className="absolute inset-0 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 bg-slate-700 origin-center"></span>
              </button>
              <button 
                className="submit-btn group relative overflow-hidden"
                onClick={() => {
                  alert('Proceeding with caution!');
                  closeModal('warning');
                }}
              >
                <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Proceed</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Danger Modal */}
      {modals.danger && (
        <Modal 
          title="Danger Modal" 
          onClose={() => closeModal('danger')} 
          type="danger"
          size="medium"
        >
          <div className="modal-body">
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex items-center justify-center my-6">
              <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <div className="modal-form-actions">
              <button 
                className="cancel-btn group"
                onClick={() => closeModal('danger')}
              >
                <span className="relative z-10">Cancel</span>
                <span className="absolute inset-0 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 bg-slate-700 origin-center"></span>
              </button>
              <button 
                className="submit-btn group relative overflow-hidden"
                style={{ background: '#ef4444', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)' }}
                onClick={() => {
                  alert('Item deleted!');
                  closeModal('danger');
                }}
              >
                <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Delete</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Info Modal */}
      {modals.info && (
        <Modal 
          title="Info Modal" 
          onClose={() => closeModal('info')} 
          type="info"
          size="large"
        >
          <div className="modal-body">
            <p>This is an information modal with a form example.</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted!');
              closeModal('info');
            }}>
              <div className="modal-form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="modal-form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="modal-form-group">
                <label htmlFor="message">Message</label>
                <input 
                  type="text" 
                  id="message" 
                  placeholder="Enter your message"
                />
              </div>
              
              <div className="modal-form-actions">
                <button 
                  type="button"
                  className="cancel-btn group"
                  onClick={() => closeModal('info')}
                >
                  <span className="relative z-10">Cancel</span>
                  <span className="absolute inset-0 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 bg-slate-700 origin-center"></span>
                </button>
                <button 
                  type="submit"
                  className="submit-btn group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 group-hover:w-full"></span>
                  <span className="relative z-10">Submit</span>
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
} 