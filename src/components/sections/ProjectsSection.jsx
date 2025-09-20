import React, { memo, useState } from 'react';
import { Icon } from '../common/Icon';
import { SanitizedText, SanitizedList } from '../common/SanitizedComponents';

/**
 * Enhanced Projects section with 3D card effects and case study reveals
 * @param {object} data - Portfolio data
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @param {function} onProjectClick - Handler for project card clicks
 * @returns {JSX.Element} - Projects section
 */
const ProjectsSection = memo(({ data, sectionRef, onProjectClick }) => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCardExpansion = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative py-12 animate-fade-in-up"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-cyan-400/5 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 rounded-full blur-3xl float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="section-header flex items-center justify-center gap-3 group-hover:text-glow">
            <Icon name="Projects" />
            Featured Projects
          </h2>
          <p className="text-gray-400 mt-3 text-lg">
            Innovative Solutions Crafted with Cutting-Edge Technology
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr">
          {data.projects.map((proj, index) => (
            <div
              key={index}
              className={`relative group perspective-1000 card-enter stagger-${index + 1} h-full cursor-pointer`}
            >
              {/* 3D card container */}
              <div className="relative transform-gpu transition-all duration-500 hover:rotate-y-6 hover:scale-105 h-full">
                {/* Background glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Main project card */}
                <div 
                  className="relative glass-card rounded-3xl p-6 md:p-8 hover-lift transform-gpu flex flex-col h-full transition-all duration-300 group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150"
                >
                  {/* Card header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <Icon name="Code" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold gradient-text mb-3 transition-all duration-300">
                      <SanitizedText text={proj.title} />
                    </h3>
                  </div>

                  {/* Project description */}
                  <div className="text-gray-300 leading-relaxed mb-6 flex-1">
                    {/* Always show first 2 description points */}
                    <ul className="space-y-2">
                      {proj.description.slice(0, 2).map((item, itemIndex) => (
                        <li key={itemIndex} className="group flex items-start gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:scale-125`}></span>
                          <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable section for remaining description points */}
                    {proj.description.length > 2 && (
                      <>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          expandedCards[index] ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}>
                          <ul className="space-y-2">
                            {proj.description.slice(2).map((item, itemIndex) => (
                              <li key={itemIndex + 2} className="group flex items-start gap-2 text-sm">
                                <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:scale-125`}></span>
                                <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Show More/Less Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleCardExpansion(index);
                          }}
                          className="relative z-30 mt-3 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-sm font-medium group/button bg-transparent border-none p-1 rounded-md hover:bg-cyan-400/10 active:bg-cyan-400/20 active:scale-95 active:transition-transform active:duration-150"
                        >
                          <Icon name={expandedCards[index] ? "ChevronUp" : "ChevronDown"} className="w-4 h-4 group-hover/button:scale-110 transition-transform duration-200" />
                          <span>
                            {expandedCards[index] 
                              ? 'Show Less' 
                              : `Show ${proj.description.length - 2} More Details`
                            }
                          </span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Interactive features */}
                  <div className="space-y-4 relative z-10 mt-auto">
                    {/* Case study teaser - Always visible */}
                    {proj.caseStudy && (
                      <button
                        type="button"
                        className="relative z-30 w-full text-left cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onProjectClick(proj);
                        }}
                      >
                        <div className="p-3 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-gradient-to-r hover:from-cyan-400/15 hover:to-purple-500/15 transition-all duration-300 active:scale-95 active:transition-transform active:duration-150">
                          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
                            <Icon name="Document" />
                            Case Study Available
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Click to explore the technical deep-dive
                          </p>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 border border-purple-500/30 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-0"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border border-cyan-400/30 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-0"></div>

                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/1 to-transparent shimmer rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;