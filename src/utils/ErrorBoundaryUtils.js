import React from 'react';
import ErrorBoundary from '../components/common/ErrorBoundary';

/**
 * Higher-order component to wrap components with error boundary
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {string} fallbackMessage - Custom error message
 * @returns {React.Component} - Component wrapped with error boundary
 */
export const withErrorBoundary = (WrappedComponent, fallbackMessage) => {
  const WithErrorBoundaryComponent = (props) => (
    <ErrorBoundary fallbackMessage={fallbackMessage}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
  
  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithErrorBoundaryComponent;
};

/**
 * Section-level error boundary for graceful section failures
 * @param {React.ReactNode} children - Child components
 * @param {string} sectionName - Name of the section for error context
 * @returns {JSX.Element} - Error boundary component
 */
export const SectionErrorBoundary = ({ children, sectionName = 'section' }) => (
  <ErrorBoundary 
    fallbackMessage={`There was an error loading the ${sectionName}. Other sections should continue to work normally.`}
  >
    {children}
  </ErrorBoundary>
);
