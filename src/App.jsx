import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';

// Hooks
import { usePortfolioData } from './hooks/usePortfolioData';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// Components
import {
  NavBar,
  Header,
  Footer,
  ErrorScreen,
  SummarySection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
  CertificationsSection,
  ResearchSection,
  AchievementsSection,
  ProjectCaseStudy
} from './components';
import { PageSkeleton } from './components/common/Skeleton';

// Custom Boundary
import ErrorBoundary from './components/common/ErrorBoundary';
import { SectionErrorBoundary } from './utils/ErrorBoundaryUtils';

// Utils
import { smoothScrollTo } from './utils/helpers';
import { validateEnvVars } from './utils/envValidation';

/**
 * Main App component - Portfolio application with blockchain integration
 * Enhanced with error boundaries and environment validation
 * @returns {JSX.Element} - Main app component
 */
const App = () => {
  // Validate environment on app start
  useEffect(() => {
    try {
      validateEnvVars();
    } catch (error) {
      console.error('Environment validation failed:', error.message);
      // In production, you might want to show a user-friendly error
      if (process.env.NODE_ENV === 'production') {
        // Could redirect to a configuration error page
      }
    }
  }, []);
  // State management
  const [selectedProject, setSelectedProject] = useState(null);
  const [pendingScroll, setPendingScroll] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Custom hooks
  const { data, loading, isDataVerified, error } = usePortfolioData();

  // Section references for navigation - using individual refs to avoid dependency issues
  const contactRef = useRef(null);
  const summaryRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const certificationsRef = useRef(null);
  const researchRef = useRef(null);
  const achievementsRef = useRef(null);
  const verifyRef = useRef(null);

  const sectionRefs = useMemo(() => ({
    contact: contactRef,
    summary: summaryRef,
    experience: experienceRef,
    projects: projectsRef,
    skills: skillsRef,
    education: educationRef,
    certifications: certificationsRef,
    research: researchRef,
    achievements: achievementsRef,
    verify: verifyRef,
  }), []);

  // Event handlers
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleBackToPortfolio = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleNavClick = useCallback((section) => {
    if (selectedProject) {
      setPendingScroll(section);
      setSelectedProject(null);
    } else {
      smoothScrollTo(sectionRefs[section]?.current);
    }
  }, [selectedProject, sectionRefs]);

  const handleSidebarToggle = useCallback((isOpen) => {
    setIsSidebarOpen(isOpen);
  }, []);

  // Handle pending scroll after returning from project view
  useEffect(() => {
    if (!selectedProject && pendingScroll) {
      const timer = setTimeout(() => {
        smoothScrollTo(sectionRefs[pendingScroll]?.current);
        setPendingScroll(null);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedProject, pendingScroll, sectionRefs]);

  // Loading state
  if (loading) {
    return (
      <div className="font-sans antialiased text-gray-200 bg-gray-950 min-h-screen">
        <GlobalStyles />
        <PageSkeleton />
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="font-sans antialiased text-gray-200 bg-gray-950 min-h-screen">
        <GlobalStyles />
        <ErrorScreen message={error} />
      </div>
    );
  }

  // Main render
  return (
    <div className="font-sans antialiased text-gray-200 bg-gray-950 min-h-screen">
      <GlobalStyles />
      <NavBar onNavClick={handleNavClick} onSidebarToggle={handleSidebarToggle} />
      
      <div className={`transition-all duration-300 pt-16 md:pt-0 ${
        isSidebarOpen ? 'pl-0 md:pl-64' : 'pl-0'
      }`}>
        {selectedProject ? (
          <ProjectCaseStudy 
            project={selectedProject} 
            onBack={handleBackToPortfolio} 
          />
        ) : (
          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
            {/* Header */}
            <SectionErrorBoundary sectionName="header">
              <Header data={data} sectionRef={sectionRefs.contact} />
            </SectionErrorBoundary>

            {/* Main Content Sections */}
            <section className="space-y-8">
              <SectionErrorBoundary sectionName="summary">
                <SummarySection data={data} sectionRef={sectionRefs.summary} />
              </SectionErrorBoundary>
              
              <SectionErrorBoundary sectionName="experience">
                <ExperienceSection data={data} sectionRef={sectionRefs.experience} />
              </SectionErrorBoundary>
              
              <SectionErrorBoundary sectionName="projects">
                <ProjectsSection 
                  data={data} 
                  sectionRef={sectionRefs.projects} 
                  onProjectClick={handleProjectClick} 
                />
              </SectionErrorBoundary>
              
              <SectionErrorBoundary sectionName="skills">
                <SkillsSection data={data} sectionRef={sectionRefs.skills} />
              </SectionErrorBoundary>
              
              <SectionErrorBoundary sectionName="education">
                <EducationSection data={data} sectionRef={sectionRefs.education} />
              </SectionErrorBoundary>
              
              <SectionErrorBoundary sectionName="certifications">
                <CertificationsSection data={data} sectionRef={sectionRefs.certifications} />
              </SectionErrorBoundary>
              
              <SectionErrorBoundary sectionName="research">
                <ResearchSection data={data} sectionRef={sectionRefs.research} />
              </SectionErrorBoundary>
              
              <SectionErrorBoundary sectionName="achievements">
                <AchievementsSection data={data} sectionRef={sectionRefs.achievements} />
              </SectionErrorBoundary>
            </section>
          </div>
        )}
      </div>
      
      {/* Footer outside navbar constraints for full-width centering */}
      {!selectedProject && isDataVerified && (
        <SectionErrorBoundary sectionName="footer">
          <Footer isVerified={isDataVerified} isSidebarOpen={isSidebarOpen} sectionRef={sectionRefs.verify} />
        </SectionErrorBoundary>
      )}
    </div>
  );
};

// Wrap the entire app with the main error boundary
const AppWithErrorBoundary = () => (
  <ErrorBoundary fallbackMessage="The portfolio application encountered an unexpected error. Please refresh the page or contact support.">
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;