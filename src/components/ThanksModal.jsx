import React from 'react';
import './ThanksModal.css';

const ThanksModal = ({ isOpen, onClose, name }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop" 
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="thanks-modal" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="thanks-title"
      >
        <div className="modal-content">
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
          
          <div className="modal-icon">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="2" />
              <path
                d="M25 35l5 5 10-10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 id="thanks-title" className="modal-title">Thank You!</h2>
          
          <p className="modal-message">
            Thank you for reaching out, <strong>{name}</strong>.
          </p>
          
          <p className="modal-description">
            We've received your message and will get back to you shortly. We appreciate your interest and look forward to connecting with you!
          </p>

          <button
            className="modal-button"
            onClick={onClose}
            type="button"
            autoFocus
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ThanksModal;
