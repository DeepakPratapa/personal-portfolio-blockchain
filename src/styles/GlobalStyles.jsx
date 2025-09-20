import React from 'react';

/**
 * Global styles component for the portfolio application
 * @returns {JSX.Element} - Style element with CSS rules
 */
export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background: #0a0a0a;
    }
    
    .animate-fade-in {
      animation: fadeIn 1s ease-in-out;
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .animate-slide-in {
      animation: slideIn 1s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .section-header {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #374151;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .section-header svg {
      margin-right: 0.5rem;
      color: #22d3ee;
    }
    
    .project-card:hover {
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
      transform: translateY(-5px);
    }
    
    .project-card-animation {
        animation: cardFadeIn 0.8s ease-out forwards;
    }
    
    @keyframes cardFadeIn {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .section-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .section-card:hover {
        box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
        transform: scale(1.01);
    }
    
    .skill-badge {
      transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s cubic-bezier(0.4,0,0.2,1);
    }
    
    .skill-badge:hover {
      transform: scale(1.15);
      box-shadow: 0 4px 18px 0 #22d3ee55;
      background: #06b6d4;
      color: #fff;
      z-index: 1;
    }
  `}</style>
);

export default GlobalStyles;