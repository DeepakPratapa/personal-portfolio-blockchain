import React, { memo } from 'react';
import { Icon } from '../common/Icon';
import { SanitizedText } from '../common/SanitizedComponents';

/**
 * Enhanced Summary section with glassmorphism and animated background
 * @param {object} data - Portfolio data
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @returns {JSX.Element} - Summary section
 */
const SummarySection = memo(({ data, sectionRef }) => (
  <section 
    id="summary" 
    ref={sectionRef} 
    className="relative py-12 animate-fade-in-up"
  >
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 rounded-full blur-3xl float"></div>
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-gradient-to-r from-purple-500/5 to-cyan-400/5 rounded-full blur-3xl float" style={{ animationDelay: '3s' }}></div>
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-4">
      {/* Section header */}
      <div className="text-center mb-8">
        <h2 className="section-header flex items-center justify-center gap-3">
          <Icon name="Summary" />
          Professional Summary
        </h2>
        <p className="text-gray-400 mt-3 text-lg">
          Crafting Secure, Scalable Solutions with Passion and Precision
        </p>
      </div>

      {/* Enhanced content card */}
      <div className="relative group cursor-pointer">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Main content card */}
        <div className="relative glass-card rounded-2xl p-8 md:p-12 hover-lift transition-all duration-300 group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150">
          {/* Decorative corner elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-500/30 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500/30 rounded-br-lg"></div>

          {/* Content with improved typography */}
          <div className="relative z-10">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-200 leading-relaxed text-lg md:text-xl font-light">
                <SanitizedText text={data.summary} />
              </p>
            </div>

            {/* Decorative quote elements */}
            <div className="flex justify-between items-center mt-8 opacity-30">
              <div className="text-4xl text-cyan-400 font-serif">"</div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="text-4xl text-purple-500 font-serif transform rotate-180">"</div>
            </div>
          </div>

          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent shimmer rounded-2xl"></div>
        </div>
      </div>
    </div>
  </section>
));

SummarySection.displayName = 'SummarySection';

export default SummarySection;