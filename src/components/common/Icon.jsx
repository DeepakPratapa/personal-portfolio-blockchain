import React from 'react';

// Icon definitions
const icons = {
  Summary: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M21 13H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2zM3 3h18v8H3V3zM3 21h18c1.1 0 2-.9 2-2v-2H1v2c0 1.1.9 2 2 2zm18-8h-8v8h8v-8z"/></svg>,
  GitHub: <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.309 3.492.997.107-.775.418-1.309.762-1.605-2.665-.304-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.197-6.091 8.197-11.388 0-6.627-5.373-12-12-12z"/></svg>,
  Experience: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12h20V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm8 16H6V8h12v12z"/></svg>,
  Projects: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>,
  Skills: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 10c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM12.5 10c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM8.5 10c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H4V6h16v12z"/></svg>,
  Education: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 11-6-11-6zm0 14.99l-9-5V12l9 5 9-5v-1.01l-9-5-9 5v1.01l9 5z"/></svg>,
  Certifications: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3h-4V1c0-.55-.45-1-1-1s-1 .45-1 1v2H9V1c0-.55-.45-1-1-1s-1 .45-1 1v2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM21 21H3V8h18v13z"/></svg>,
  Research: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13 18v-2c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2h-8v-2h8v-2h-8v-2h8V7h-6c-.55 0-1 .45-1 1v2H5v2h7v2H5v2h8v2h2z"/></svg>,
  Achievements: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M21.1 9.5l-3.6 3.6 1.1 5.3c.1.5-.1.9-.6 1.1-.5.1-1-.1-1.3-.5l-4.5-4.5-4.5 4.5c-.3.4-.8.6-1.3.5-.5-.2-.7-.6-.6-1.1l1.1-5.3-3.6-3.6c-.4-.4-.5-.9-.3-1.4.2-.5.7-.8 1.2-.8h5.3l1.1-5.3c.1-.5.5-.9 1-.9s.9.4 1 .9l1.1 5.3h5.3c.5 0 1 .3 1.2.8.2.5.1 1-.3 1.4z"/></svg>,
  Challenge: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>,
  Architecture: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 17h2v-6h-2v6zm-3 0h2v-6H8v6zm-3 0h2v-6H5v6zm13-10h-2V7h2v6zm-3 0h-2V7h2v6zm-3 0h-2V7h2v6z"/></svg>,
  Implementation: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>,
  Scalability: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M15 13H9V7H7v6h2v-2h4v2zm-2 2H9v4h4v-4zm0-6H9V5h4v4z"/></svg>,
  Conclusion: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15h2v2h-2v-2zm0-4h2V8h-2v4z"/></svg>,
  Back: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>,
  Language: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93h4l2 2 2-2h4c0 4.08-3.05 7.44-7 7.93v-3.93l-2-2zM4.08 12c.49-3.95 3.85-7 7.92-7v4l-2 2-2-2h-4zm15.92 0c-.49 3.95-3.85 7-7.92 7V12l2-2 2 2h4zm-5-1.92l-2-2V5.08c3.95.49 7 3.85 7 7.92H12l-2 2z"/></svg>,
  Framework: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>,
  Database: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M17 12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h10zM7 5h10v6H7zm10 8c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h10zM7 11h10v2H7v-2zm-2 4h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2z"/></svg>,
  Cloud: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-3.11 0-5.78 1.99-7.05 4.72C2.65 9.4 2 10.97 2 12.5c0 2.22 1.63 4.07 3.82 4.49L7 17h11.5c2.21 0 4-1.79 4-4 0-2.12-1.69-3.87-3.65-3.96z"/></svg>,
  DevOps: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M19 13v-2h-2V7h-4V5H9v2H5v4H3v2h2v4h4v2h2v-2h2v2h2v-2h2v-4z"/></svg>,
  Security: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 18c-3.87 0-7-3.13-7-7v-5.23l7-3.11 7 3.11V12c0 3.87-3.13 7-7 7z"/></svg>,
  Expertise: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2v-6zm0 8h2v2h-2v-2z"/></svg>,
  Other: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v2h-2zm0 4h2v6h-2z"/></svg>,
  Phone: <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5A1 1 0 013 3.5H6.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/></svg>,
  Email: <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  LinkedIn: <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.768 7 2.476v6.759z"/></svg>,
  ExternalLink: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Verified: <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  Cross: <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Error: <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>,
  Menu: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
  Loading: <svg className="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
};

/**
 * Icon component that renders the appropriate icon based on the name
 * @param {string} name - The name of the icon to render
 * @returns {JSX.Element|null} - The icon component or null if not found
 */
export const Icon = ({ name }) => icons[name] || null;

/**
 * Get appropriate icon for skill categories
 * @param {string} category - The skill category
 * @returns {JSX.Element} - The icon component for the category
 */
export const getSkillIcon = (category) => {
  const categoryIcons = {
    languages: 'Language',
    frameworks: 'Framework',
    databases: 'Database',
    cloud: 'Cloud',
    devops: 'DevOps',
    security: 'Security',
    expertise: 'Expertise',
    other: 'Other'
  };
  return <Icon name={categoryIcons[category] || 'Other'} />;
};

export default Icon;