import React, { memo } from 'react';
import { Icon } from '../common/Icon';
import { SanitizedText, SanitizedList } from '../common/SanitizedComponents';

/**
 * Enhanced Experience section with timeline design and improved animations
 * @param {object} data - Portfolio data
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @returns {JSX.Element} - Experience section
 */
const ExperienceSection = memo(({ data, sectionRef }) => (
  <section 
    id="experience" 
    ref={sectionRef} 
    className="relative py-12 animate-fade-in-up"
  >
    <div className="max-w-6xl mx-auto px-4">
      {/* Section header */}
      <div className="text-center mb-10">
        <h2 className="section-header flex items-center justify-center gap-3">
          <Icon name="Experience" />
          Professional Experience
        </h2>
        <p className="text-gray-400 mt-3 text-lg">
          Journey through impactful roles and achievements
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 rounded-full hidden md:block"></div>

        {/* Experience cards */}
        <div className="space-y-12 md:space-y-16">
          {data.experience.map((exp, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col md:flex-row items-center gap-8 card-enter stagger-${index + 1}`}
            >
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full border-4 border-gray-900 pulse-glow z-10"></div>

              {/* Card content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                <div className="relative group cursor-pointer">
                  {/* Background glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Main card */}
                  <div className="relative glass-card rounded-2xl p-6 md:p-8 hover-lift transition-all duration-300 group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-xl md:text-2xl font-bold gradient-text mb-2">
                        <SanitizedText text={exp.title} />
                      </h3>
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                        <Icon name="Building" />
                        <SanitizedText text={exp.company} />
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 mt-2">
                        <Icon name="Calendar" />
                        <SanitizedText text={exp.dates} />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="text-gray-300 leading-relaxed">
                      <ul className="space-y-3">
                        {exp.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="group flex items-start gap-3 text-sm md:text-base">
                            <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:scale-125`}></span>
                            <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-4 right-4 w-6 h-6 border-2 border-cyan-400/30 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Mobile timeline indicator */}
              <div className="md:hidden w-full flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline end indicator */}
        <div className="hidden md:flex justify-center mt-8">
          <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full border-4 border-gray-900 pulse-glow"></div>
        </div>
      </div>
    </div>
  </section>
));

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;