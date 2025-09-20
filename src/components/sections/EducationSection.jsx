import React, { memo } from 'react';
import { Icon } from '../common/Icon';
import { SanitizedText } from '../common/SanitizedComponents';
import { TimelineItem, StatusBadge, GlassCard } from '../common/ReusableComponents';

/**
 * Enhanced Education section component with glassmorphism design
 * @param {object} data - Portfolio data from blockchain
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @returns {JSX.Element} - Education section component
 */
const EducationSection = memo(({ data, sectionRef }) => {
  // Helper function to determine status based on dates
  const getEducationStatus = (dates) => {
    const currentYear = new Date().getFullYear();
    const endYear = parseInt(dates.split('--')[1] || dates.split('-')[1] || currentYear);
    if (endYear >= currentYear) {
      return { status: 'Completed', type: 'success' };
    }
    return { status: 'Completed', type: 'success' };
  };

  return (
    <section 
      id="education" 
      ref={sectionRef} 
      className="relative py-12 animate-fade-in-up"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-cyan-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="section-header flex items-center justify-center gap-3">
            <Icon name="Education" />
            Education
          </h2>
          <p className="text-gray-400 mt-3 text-lg">
            Academic Journey Focused on Computer Science, Cybersecurity, and Advanced Computing Technologies.
          </p>
        </div>
        {/* Education Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 opacity-50"></div>

          <div className="space-y-12">
            {data.education.map((edu, index) => {
              const statusInfo = getEducationStatus(edu.dates);
              
              return (
                <TimelineItem key={index} iconName="Education" index={index}>
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <StatusBadge status={statusInfo.status} type={statusInfo.type} />
                    <span className="text-sm text-gray-400 font-medium">
                      <SanitizedText text={edu.dates} />
                    </span>
                  </div>

                  {/* Degree Information */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                      <SanitizedText text={edu.degree} />
                    </h3>
                    <p className="text-gray-300 font-medium">
                      <SanitizedText text={edu.university} />
                    </p>
                  </div>

                  {/* GPA */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">GPA:</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-lg text-cyan-300 font-bold border border-cyan-400/20">
                      <SanitizedText text={edu.gpa} />
                    </span>
                  </div>
                </TimelineItem>
              );
            })}
          </div>
        </div>

        {/* Academic Focus Areas */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto auto-rows-fr">
            {data.academicFocus && data.academicFocus.map((focus, index) => (
              <GlassCard 
                key={index} 
                className="text-center h-full"
                animationDelay={`${index * 0.1}s`}
                hoverable={true}
              >
                <div className="flex flex-col justify-center h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={focus.iconName} />
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    <SanitizedText text={focus.title} />
                  </h4>
                  <p className="text-sm text-gray-400">
                    <SanitizedText text={focus.description} />
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';

export default EducationSection;