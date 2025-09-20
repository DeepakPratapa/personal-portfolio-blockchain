import React from 'react';
import { Icon } from './Icon';

/**
 * Enhanced Error Boundary component for graceful error handling
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI with retry option
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Error" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h2>
            
            <p className="text-gray-400 mb-6">
              {this.props.fallbackMessage || 
               "We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists."
              }
            </p>

            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-purple-600 transition-all duration-300"
                disabled={this.state.retryCount >= 3}
              >
                {this.state.retryCount >= 3 ? 'Maximum retries reached' : 'Try Again'}
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                Refresh Page
              </button>
            </div>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-gray-400 hover:text-gray-300">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-4 bg-gray-900 rounded-lg text-xs overflow-auto">
                  <pre className="text-red-400 whitespace-pre-wrap">
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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

export default ErrorBoundary;