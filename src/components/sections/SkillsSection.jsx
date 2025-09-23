import React, { memo } from 'react';
import { getSkillIcon } from '../../utils/IconUtils';
import { camelCaseToSpaces, capitalize } from '../../utils/helpers';

/**
 * Enhanced Skills section with animated skill bars and dynamic categorization
 * @param {object} data - Portfolio data
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @returns {JSX.Element} - Skills section
 */
const SkillsSection = memo(({ data, sectionRef }) => {
  const skillCategories = Object.entries(data.skills);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative py-12 animate-fade-in-up"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-r from-cyan-400/3 to-purple-500/3 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gradient-to-r from-purple-500/3 to-cyan-400/3 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="section-header flex items-center justify-center gap-3">
            <Icon name="Skills" />
            Technical Expertise
          </h2>
          <p className="text-gray-400 mt-3 text-lg">
            Mastering Technologies to Build Innovative Solutions
          </p>
        </div>

        {/* Skills categories */}
        <div className="space-y-8">
          {skillCategories.map(([category, skillsList], categoryIndex) => (
            <div key={categoryIndex} className={`card-enter stagger-${categoryIndex + 1}`}>
              {/* Category header */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold gradient-text flex items-center gap-3">
                  {getSkillIcon(category)}
                  {capitalize(camelCaseToSpaces(category))}
                </h3>
                
                {/* Decorative underline */}
                <div className="w-full h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-full"></div>
                </div>
              </div>

              {/* Skills grid - Always visible */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {skillsList.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group relative transform transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer"
                    style={{ animationDelay: `${skillIndex * 0.1}s` }}
                  >
                    {/* Skill card */}
                    <div className="relative glass-card rounded-xl p-4 hover-lift h-full transition-all duration-300 group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150">
                      {/* Background glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <div className="w-8 h-8 mx-auto mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <Icon name="Code" />
                        </div>
                        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                          {skill}
                        </span>
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute top-2 right-2 w-2 h-2 border border-cyan-400/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
