import React, { memo, useState, useEffect } from 'react';
import { Icon } from '../common/Icon';
import { BLOCKCHAIN_CONFIG } from '../../utils/constants';
import { getContractAddress } from '../../utils/envValidation';

/**
 * Enhanced Footer component with animated verification status and improved design
 * @param {boolean} isVerified - Whether data is verified by blockchain
 * @param {boolean} isSidebarOpen - Whether the sidebar is currently open
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @returns {JSX.Element} - Footer component
 */
const Footer = memo(({ isVerified, isSidebarOpen = true, sectionRef }) => {
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const contractAddress = getContractAddress();
  const polygonscanUrl = `${BLOCKCHAIN_CONFIG.POLYGONSCAN_BASE_URL}${contractAddress}`;

  useEffect(() => {
    // Animate verification status when it changes
    if (isVerified) {
      setPulseAnimation(true);
      const timer = setTimeout(() => setPulseAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isVerified]);

  return (
    <footer 
      ref={sectionRef}
      className={`relative w-full px-4 py-12 mt-20 overflow-hidden transition-all duration-300 ${
      isSidebarOpen ? 'md:pl-64' : 'pl-0'
    }`}>
      {/* Animated background */}
      <div className={`absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/95 to-transparent transition-all duration-300 ${
        isSidebarOpen ? 'md:left-64' : 'left-0'
      }`}></div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-t from-cyan-400/5 to-transparent rounded-full blur-3xl transition-all duration-300 ${
          isSidebarOpen ? 'md:left-1/3' : 'left-1/4'
        }`}></div>
        <div className={`absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-t from-purple-500/5 to-transparent rounded-full blur-3xl transition-all duration-300 ${
          isSidebarOpen ? 'md:right-1/3' : 'right-1/4'
        }`}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Main verification section */}
        <div className="text-center mb-8">
          {/* Verification badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className={`relative group ${pulseAnimation ? 'animate-pulse' : ''}`}>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Main badge */}
              <div className="relative glass-card rounded-full p-6 hover-lift">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isVerified 
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 pulse-glow' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-500'
                }`}>
                  <Icon name="Verified" />
                </div>
              </div>
            </div>
          </div>

          {/* Status text */}
          <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
            {isVerified ? 'Blockchain Verified' : 'Verification Pending'}
          </h3>
          
          <p className="text-gray-400 text-lg mb-2 max-w-2xl mx-auto leading-relaxed">
            {isVerified 
              ? 'This Portfolio is Authenticated and Secured by Blockchain Technology, Ensuring Data Integrity and Transparency.'
              : 'Portfolio Data is Being Verified on the Blockchain for Authenticity and Security.'
            }
          </p>

          <p className="text-sm text-cyan-400 font-medium italic">
            Trust • Transparency • Immutability
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a 
            href={polygonscanUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-3 group"
          >
            <Icon name="ExternalLink" />
            <span>Verify on Polygonscan</span>
            <div className="w-2 h-2 bg-white/50 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
          </a>
          
          <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-xl text-sm text-gray-400">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
            <span>Powered by Polygon Network</span>
          </div>
        </div>

        {/* Contract info */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-lg text-xs text-gray-500 font-mono">
            <Icon name="Code" />
            <span>Contract: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}</span>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-500 flex items-center gap-1">
              © 2025 Blockchain Portfolio. Built with ❤️  and Web3 Technology.
            </div>
            
            {/* Tech stack badges */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20">
                React
              </div>
              <div className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full border border-purple-500/20">
                Solidity
              </div>
              <div className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20">
                Polygon
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="flex justify-center mt-8">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-50"></div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;