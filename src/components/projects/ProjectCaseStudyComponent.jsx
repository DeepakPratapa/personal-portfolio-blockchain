import React, { useEffect, memo } from 'react';
import { Icon } from '../common/Icon';
import { getSanitizedHtml, getSanitizedText } from '../../utils/helpers';

/**
 * Project case study component for detailed project view
 * @param {object} project - Project data with case study details
 * @param {function} onBack - Handler for back button
 * @returns {JSX.Element} - Project case study component
 */
const ProjectCaseStudy = memo(({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project || !project.caseStudy) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in text-gray-200">
      <button 
        onClick={onBack} 
        className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-6 group"
      >
        <Icon name="Back" />
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          Back to Portfolio
        </span>
      </button>
      
      <div className="bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
          {getSanitizedText(project.title)}
        </h1>
        
        {project.repo && (
          <div className="mb-6">
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold text-lg"
            >
              <span className="mr-2 text-cyan-400">
                <Icon name="GitHub" />
              </span>
              <span>Source Code</span>
            </a>
          </div>
        )}
        
        <div className="space-y-8">
          {Object.entries(project.caseStudy).map(([sectionName, content], index) => {
            const isObject = typeof content === 'object' && content !== null && !Array.isArray(content);
            const contentToDisplay = isObject ? content : { 
              content: content, 
              title: sectionName.charAt(0).toUpperCase() + sectionName.slice(1) 
            };
            
            return (
              <div 
                key={index} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <h2 className="section-header section-header-animation">
                  <Icon 
                    name={
                      contentToDisplay.title ? 
                        (contentToDisplay.title === 'Architecture and Design Decisions' ? 'Architecture' : contentToDisplay.title) : 
                        sectionName.charAt(0).toUpperCase() + sectionName.slice(1)
                    } 
                  />
                  {contentToDisplay.title}
                </h2>
                <p 
                  className="text-gray-300 leading-relaxed mb-4" 
                  dangerouslySetInnerHTML={getSanitizedHtml(contentToDisplay.content)}
                />
                {contentToDisplay.stack && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {contentToDisplay.stack.map((item, stackIndex) => (
                      <div 
                        key={stackIndex} 
                        className="bg-gray-800 p-4 rounded-lg shadow-sm hover:ring-2 hover:ring-cyan-500 transition-all duration-300 transform-gpu animate-fade-in-up" 
                        style={{ animationDelay: `${(index * 0.15) + (stackIndex * 0.1)}s` }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {getSanitizedText(item.name)}
                        </h4>
                        <p 
                          className="text-gray-400 text-sm" 
                          dangerouslySetInnerHTML={getSanitizedHtml(item.desc)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

ProjectCaseStudy.displayName = 'ProjectCaseStudy';

export default ProjectCaseStudy;