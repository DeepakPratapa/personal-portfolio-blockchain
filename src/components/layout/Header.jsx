import React, { memo } from 'react';
import { Icon } from '../common/Icon';
import { getSanitizedText, formatPhoneNumber, truncateAddress } from '../../utils/helpers';
import { getOwnerAddress } from '../../utils/envValidation';

/**
 * Enhanced Header component with personal information and contact details
 * @param {object} data - Portfolio data containing name, title, and contact info
 * @returns {JSX.Element} - Header component
 */
const Header = memo(({ data, sectionRef }) => (
  <header className="relative text-center space-y-6 pt-16 pb-12 animate-fade-in-down" ref={sectionRef}>
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-xl float"></div>
      <div className="absolute top-32 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 rounded-full blur-xl float" style={{ animationDelay: '2s' }}></div>
    </div>

    {/* Main content */}
    <div className="relative z-10 space-y-6">
      {/* Name with enhanced styling */}
      <div className="space-y-2">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black gradient-text text-glow relative">
          <span className="block">{getSanitizedText(data.name)}</span>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </h1>
        
        {/* Enhanced subtitle */}
        <div className="text-xl md:text-2xl text-gray-300 font-medium animate-fade-in-up relative" style={{ animationDelay: '0.2s' }}>
          <span className="relative z-10">{getSanitizedText(data.title)}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent shimmer"></div>
        </div>
      </div>

      {/* Enhanced contact links */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <a 
          href={`tel:${formatPhoneNumber(data.contact.phone)}`} 
          className="group flex items-center gap-2 px-4 py-2 glass-card rounded-xl hover-lift focus-visible-enhanced"
        >
          <Icon name="Phone" />
          <span className="text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300">
            {getSanitizedText(data.contact.phone)}
          </span>
        </a>
        
        <a 
          href={`mailto:${data.contact.email}`} 
          className="group flex items-center gap-2 px-4 py-2 glass-card rounded-xl hover-lift focus-visible-enhanced"
        >
          <Icon name="Email" />
          <span className="text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300">
            {getSanitizedText(data.contact.email)}
          </span>
        </a>
        
        <a 
          href={data.contact.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group flex items-center gap-2 px-4 py-2 glass-card rounded-xl hover-lift focus-visible-enhanced"
        >
          <Icon name="LinkedIn" />
          <span className="text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300">
            LinkedIn
          </span>
        </a>
        
        <a 
          href={data.contact.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group flex items-center gap-2 px-4 py-2 glass-card rounded-xl hover-lift focus-visible-enhanced"
        >
          <Icon name="GitHub" />
          <span className="text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300">
            GitHub
          </span>
        </a>
      </div>

      {/* Enhanced owner address display */}
      <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pulse-glow"></div>
          <span className="text-xs font-semibold text-cyan-400">Verified Owner:</span>
          <span className="text-xs text-gray-300 font-mono">{truncateAddress(getOwnerAddress())}</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
      </div>
    </div>
  </header>
));

Header.displayName = 'Header';

export default Header;