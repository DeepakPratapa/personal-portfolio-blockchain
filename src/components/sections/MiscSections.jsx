import React, { memo } from 'react';
import { Icon } from '../common/Icon';
import { SanitizedText, SanitizedList } from '../common/SanitizedComponents';
import { GlassCard, CategoryBadge } from '../common/ReusableComponents';

/**
 * Enhanced Certifications section component with glassmorphism design
 * @param {object} data - Portfolio data from blockchain
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @returns {JSX.Element} - Certifications section component
 */
const CertificationsSection = memo(({ data, sectionRef }) => {
  // Helper function to categorize certifications
  const getCertificationType = (name, issuer) => {
    const text = `${name} ${issuer}`.toLowerCase();
    if (text.includes('cyber') || text.includes('incident') || text.includes('security')) return 'cybersecurity';
    if (text.includes('web') || text.includes('javascript') || text.includes('django')) return 'development';
    return 'other';
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'cybersecurity': return 'from-red-400 to-orange-500';
      case 'development': return 'from-cyan-400 to-purple-500';
      default: return 'from-green-400 to-blue-500';
    }
  };

  return (
    <section 
      id="certifications" 
      ref={sectionRef} 
      className="relative py-12 animate-fade-in-up"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/8 to-purple-500/8 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-16 left-10 w-28 h-28 bg-gradient-to-br from-purple-500/8 to-cyan-400/8 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="section-header flex items-center justify-center gap-3">
            <Icon name="Certifications" />
            Certifications
          </h2>
          <p className="text-gray-400 mt-3 text-lg">
            Professional Certifications in Cybersecurity, Web Development, and Emerging Technologies.
          </p>
        </div>
        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.certifications.map((cert, index) => {
              const certType = getCertificationType(cert.name, cert.issuer);
              
              return (
                <div 
                  key={index}
                  className="group relative animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${0.15 + (index * 0.15)}s` }}
                >
                  {/* Certification Card */}
                  <div className="glass-card p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-500 hover-lift group-hover:shadow-2xl h-full group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${getColorForType(certType)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon name={certType === 'cybersecurity' ? 'Security' : 'Projects'} />
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">
                        <SanitizedText text={cert.date} />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                        {cert.link ? (
                          <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline"
                          >
                            <SanitizedText text={cert.name} />
                          </a>
                        ) : (
                          <SanitizedText text={cert.name} />
                        )}
                      </h3>
                      <p className="text-gray-300 font-medium mb-4">
                        <SanitizedText text={cert.issuer} />
                      </p>
                      {cert.description && (
                        <div className="text-gray-400 text-sm">
                          <ul className="space-y-2">
                            {cert.description.map((item, itemIndex) => (
                              <li key={itemIndex} className="group flex items-start gap-2">
                                <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 transition-all duration-300 bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:scale-125`}></span>
                                <span className="group-hover:text-gray-200 transition-colors duration-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Category:</span>
                        <span className={`px-2 py-1 bg-gradient-to-r ${
                          certType === 'cybersecurity' 
                            ? 'from-red-400/10 to-orange-500/10 text-red-300 border border-red-400/20' 
                            : 'from-cyan-400/10 to-purple-500/10 text-cyan-300 border border-cyan-400/20'
                        } rounded-md text-xs font-medium`}>
                          {certType === 'cybersecurity' ? 'Cybersecurity' : 'Web Development'}
                        </span>
                      </div>
                      
                      {/* View Certificate Button */}
                      {cert.link && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(cert.link, '_blank', 'noopener,noreferrer');
                          }}
                          className="relative z-30 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 text-cyan-300 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:bg-cyan-400/5 text-sm font-medium cursor-pointer active:scale-95 active:transition-transform active:duration-150"
                        >
                          <Icon name="ExternalLink" />
                          View Certificate
                        </button>
                      )}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </section>
  );
});

/**
 * Enhanced Research section component with glassmorphism design
 * @param {object} data - Portfolio data from blockchain
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @returns {JSX.Element} - Research section component
 */
const ResearchSection = memo(({ data, sectionRef }) => {
  return (
  <section 
    id="research" 
    ref={sectionRef} 
    className="relative py-12 animate-fade-in-up"
  >
    {/* Floating background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-20 w-36 h-36 bg-gradient-to-br from-cyan-400/8 to-purple-500/8 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-gradient-to-br from-purple-500/8 to-cyan-400/8 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
    </div>

    <div className="max-w-6xl mx-auto px-4">
      {/* Section header */}
      <div className="text-center mb-10">
        <h2 className="section-header flex items-center justify-center gap-3">
          <Icon name="Research" />
          Research
        </h2>
        <p className="text-gray-400 mt-3 text-lg">
          Academic Research Contributions in Cybersecurity and Data Protection Technologies.
        </p>
      </div>

      {/* Research Items */}
      <div className="space-y-8">
        {data.research.map((research, index) => (
          <div key={index} className="group relative animate-fade-in-up cursor-pointer" style={{ animationDelay: `${0.15 + (index * 0.2)}s` }}>
            <div className="glass-card p-10 rounded-3xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-500 hover-lift group-hover:shadow-2xl group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Research" />
                  </div>
                  <div>
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-400/20 to-cyan-400/20 text-green-300 border border-green-400/30">
                      Published
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  <SanitizedText text={research.date} />
                </span>
              </div>

              {/* Title */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                  {research.link ? (
                    <a
                      href={research.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <SanitizedText text={research.title} />
                    </a>
                  ) : (
                    <SanitizedText text={research.title} />
                  )}
                </h3>
                
                {/* Read Paper Button */}
                {research.link && (
                  <div className="mt-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(research.link, '_blank', 'noopener,noreferrer');
                      }}
                      className="relative z-30 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400/10 to-cyan-400/10 text-green-300 rounded-lg border border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:bg-green-400/5 text-sm font-medium cursor-pointer active:scale-95 active:transition-transform active:duration-150"
                    >
                      <Icon name="ExternalLink" />
                      Read Full Paper
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Research Overview</h4>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  <ul className="space-y-3">
                    {research.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="group flex items-start gap-3">
                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:scale-125`}></span>
                        <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Research Impact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="glass-card p-4 rounded-xl border border-gray-700/30 text-center hover:border-cyan-400/30 transition-all duration-300">
                  <Icon name="Security" />
                  <h5 className="font-semibold text-white mt-2 mb-1">Security Enhancement</h5>
                  <p className="text-xs text-gray-400">Advanced encryption protocols</p>
                </div>
                
                <div className="glass-card p-4 rounded-xl border border-gray-700/30 text-center hover:border-cyan-400/30 transition-all duration-300">
                  <Icon name="Projects" />
                  <h5 className="font-semibold text-white mt-2 mb-1">Implementation</h5>
                  <p className="text-xs text-gray-400">Python prototype validation</p>
                </div>
                
                <div className="glass-card p-4 rounded-xl border border-gray-700/30 text-center hover:border-cyan-400/30 transition-all duration-300">
                  <Icon name="Achievements" />
                  <h5 className="font-semibold text-white mt-2 mb-1">Publication</h5>
                  <p className="text-xs text-gray-400">Peer-reviewed journal</p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
});

/**
 * Enhanced Achievements section component with glassmorphism design
 * @param {object} data - Portfolio data from blockchain
 * @param {React.RefObject} sectionRef - Reference for scroll targeting
 * @returns {JSX.Element} - Achievements section component
 */
const AchievementsSection = memo(({ data, sectionRef }) => {
  // Helper function to categorize achievements
  const getAchievementCategory = (title) => {
    const text = title.toLowerCase();
    if (text.includes('honor') || text.includes('gpa') || text.includes('academic')) return 'Academic';
    if (text.includes('certification') || text.includes('professional')) return 'Professional';
    if (text.includes('project') || text.includes('technical') || text.includes('development')) return 'Technical';
    return 'Academic';
  };

  const getColorForCategory = (category) => {
    switch (category) {
      case 'Academic': return 'from-blue-400 to-cyan-500';
      case 'Professional': return 'from-green-400 to-teal-500';
      case 'Technical': return 'from-cyan-400 to-purple-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getIconForCategory = (category) => {
    switch (category) {
      case 'Academic': return 'Education';
      case 'Professional': return 'Certifications';
      case 'Technical': return 'Projects';
      default: return 'Achievements';
    }
  };

  return (
    <section 
      id="achievements" 
      ref={sectionRef} 
      className="relative py-12 animate-fade-in-up"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-16 w-40 h-40 bg-gradient-to-br from-cyan-400/8 to-purple-500/8 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-16 right-16 w-32 h-32 bg-gradient-to-br from-purple-500/8 to-cyan-400/8 rounded-full blur-xl animate-float" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="section-header flex items-center justify-center gap-3">
            <Icon name="Achievements" />
            Achievements
          </h2>
        </div>

        {/* Expanded Achievement Display */}
        <div className="max-w-4xl mx-auto">
          {data.achievements.map((achievement, index) => {
            const category = getAchievementCategory(achievement.title);
            
            return (
              <div 
                key={index}
                className="group relative animate-fade-in-up mb-8 cursor-pointer"
                style={{ animationDelay: `${0.15 + (index * 0.1)}s` }}
              >
                {/* Achievement Card - Expanded Layout */}
                <div className="glass-card p-12 rounded-3xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-500 hover-lift group-hover:shadow-2xl group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${getColorForCategory(category)} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon name={getIconForCategory(category)} size="lg" />
                      </div>
                      <div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          category === 'Academic' 
                            ? 'bg-gradient-to-r from-blue-400/20 to-cyan-500/20 text-blue-300 border border-blue-400/30'
                            : category === 'Professional'
                            ? 'bg-gradient-to-r from-green-400/20 to-teal-500/20 text-green-300 border border-green-400/30'
                            : 'bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30'
                        }`}>
                          {category} Excellence
                        </span>
                      </div>
                    </div>
                    <span className="text-lg text-gray-300 font-medium">
                      <SanitizedText text={achievement.date} />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-white mb-6 group-hover:gradient-text transition-all duration-300">
                      <SanitizedText text={achievement.title} />
                    </h3>
                    
                    <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                      <ul className="space-y-4">
                        {achievement.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="group flex items-start gap-3">
                            <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:scale-125`}></span>
                            <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Achievement Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="glass-card p-6 rounded-xl border border-gray-700/30 text-center hover:border-cyan-400/30 transition-all duration-300">
                      <Icon name="Education" />
                      <h5 className="font-semibold text-white mt-3 mb-2">Academic Performance</h5>
                      <p className="text-sm text-gray-400">High GPA maintenance demonstrating consistent excellence</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl border border-gray-700/30 text-center hover:border-cyan-400/30 transition-all duration-300">
                      <Icon name="Skills" />
                      <h5 className="font-semibold text-white mt-3 mb-2">Commitment to Learning</h5>
                      <p className="text-sm text-gray-400">Continuous improvement and dedication to computer science mastery</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl border border-gray-700/30 text-center hover:border-cyan-400/30 transition-all duration-300">
                      <Icon name="Achievements" />
                      <h5 className="font-semibold text-white mt-3 mb-2">Recognition</h5>
                      <p className="text-sm text-gray-400">Official institutional acknowledgment of outstanding achievement</p>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

CertificationsSection.displayName = 'CertificationsSection';
ResearchSection.displayName = 'ResearchSection';
AchievementsSection.displayName = 'AchievementsSection';

export { CertificationsSection, ResearchSection, AchievementsSection };