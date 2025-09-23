import React, { memo, useState, useEffect, useCallback } from 'react';
import { Icon } from '../common/Icon';
import { NAVIGATION_SECTIONS } from '../../utils/constants';
import { capitalize } from '../../utils/helpers';

/**
 * Enhanced Navigation bar component with universal toggle design
 * @param {function} onNavClick - Handler for navigation item clicks
 * @param {function} onSidebarToggle - Handler for sidebar toggle state changes
 * @returns {JSX.Element} - Navigation bar component
 */
const NavBar = memo(({ onNavClick, onSidebarToggle }) => {
  const [activeSection, setActiveSection] = useState('contact');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on all devices

  const handleNavClick = (section) => {
    setActiveSection(section);
    onNavClick(section);
    // On mobile, close sidebar after navigation
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => {
      const newState = !prev;
      onSidebarToggle?.(newState); // Notify parent component
      return newState;
    });
  }, [onSidebarToggle]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar-nav') && !event.target.closest('.menu-button')) {
        setIsSidebarOpen(false);
        onSidebarToggle?.(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen, onSidebarToggle]);

  // Remove automatic responsive behavior - keep navbar hidden by default
  // Users must click hamburger to show/hide on all devices

  // Keyboard shortcut for toggling sidebar (Ctrl/Cmd + B)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleSidebar]);

  return (
    <>
      {/* Universal Menu Button - Only show when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="menu-button fixed top-4 left-4 z-50 p-3 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:scale-110 shadow-lg group bg-gradient-to-r from-cyan-400/30 to-purple-500/30 border-cyan-400/50 hover:border-cyan-400/80 hover:shadow-cyan-400/25"
          aria-label="Open navigation menu"
          title="Open Navigation Menu (Ctrl+B)"
        >
          <Icon name="Menu" />
        </button>
      )}

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => {
            setIsSidebarOpen(false);
            onSidebarToggle?.(false);
          }}
        ></div>
      )}

      {/* Universal Sidebar Navigation */}
      <nav className={`sidebar-nav fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-r border-gray-800/50 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
        isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
      }`}>
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/5 via-transparent to-purple-900/5"></div>
      
        <div className="relative z-10 flex flex-col h-full">
          {/* Header Section with Close Button */}
          <div className="px-6 py-8 relative">
            {/* Close Button - Same hamburger icon inside navbar */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 p-2 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:scale-110 shadow-lg group bg-gradient-to-r from-cyan-400/40 to-purple-500/40 border-cyan-400/60 hover:border-cyan-400/80 shadow-cyan-400/30"
              aria-label="Close navigation menu"
              title="Close Navigation Menu (Ctrl+B)"
            >
              <Icon name="Menu" />
            </button>

            <div className="flex flex-col items-center space-y-4">
              {/* Logo with enhanced styling */}
              {/* <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon name="Cross" />
                </div>
              </div> */}
              
              {/* Brand text */}
              {/* <div className="text-center">
                <h1 className="text-xl font-black gradient-text text-glow">Portfolio</h1>
              </div> */}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              {NAVIGATION_SECTIONS.map((section, index) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`group relative w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === section
                      ? 'bg-gradient-to-r from-cyan-400/30 to-purple-500/30 text-white shadow-lg scale-105'
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-purple-500/20 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Active indicator */}
                  {activeSection === section && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-r-full"></div>
                  )}
                  
                  {/* Background glow for active item */}
                  {activeSection === section && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-xl blur opacity-75"></div>
                  )}
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSection === section 
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-500 scale-125 shadow-lg shadow-cyan-400/50' 
                        : 'bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:scale-110'
                    }`}></span>
                    {capitalize(section)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
              <span>Powered by Web3</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;