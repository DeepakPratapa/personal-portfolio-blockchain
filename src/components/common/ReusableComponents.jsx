import React, { memo } from 'react';
import { Icon } from './Icon';

/**
 * Reusable glassmorphism card component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hoverable - Whether card should have hover effects
 * @param {string} props.animationDelay - Animation delay for staggered animations
 * @returns {JSX.Element} - Glassmorphism card component
 */
const GlassCard = memo(({ 
  children, 
  className = "", 
  hoverable = true, 
  animationDelay = "0s" 
}) => (
  <div 
    className={`group relative animate-fade-in-up h-full ${hoverable ? 'cursor-pointer' : ''} ${className}`}
    style={{ animationDelay }}
  >
    <div className={`glass-card p-8 rounded-2xl border border-gray-700/50 transition-all duration-500 h-full ${
      hoverable ? 'hover:border-cyan-400/30 hover-lift group-hover:shadow-2xl group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150' : ''
    }`}>
      {children}
      
      {hoverable && (
        <>
          {/* Hover Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          
          {/* Decorative corner */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </>
      )}
    </div>
  </div>
));

/**
 * Reusable timeline item component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Timeline item content
 * @param {string} props.iconName - Icon name for timeline dot
 * @param {number} props.index - Item index for animation delay
 * @returns {JSX.Element} - Timeline item component
 */
const TimelineItem = memo(({ children, iconName, index = 0 }) => (
  <div 
    className="relative flex items-start gap-8 group animate-fade-in-up cursor-pointer"
    style={{ animationDelay: `${0.15 + (index * 0.2)}s` }}
  >
    {/* Timeline dot */}
    <div className="relative z-10 flex-shrink-0">
      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Icon name={iconName} />
      </div>
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    {/* Timeline content */}
    <div className="flex-1 glass-card p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-500 hover-lift group-hover:shadow-2xl group-hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150">
      {children}
      
      {/* Decorative corner */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  </div>
));

/**
 * Reusable status badge component
 * @param {object} props - Component properties
 * @param {string} props.status - Status text
 * @param {string} props.type - Badge type (success, warning, info)
 * @returns {JSX.Element} - Status badge component
 */
const StatusBadge = memo(({ status, type = 'info' }) => {
  const getColorClasses = (badgeType) => {
    switch (badgeType) {
      case 'success':
        return 'bg-gradient-to-r from-green-400/20 to-cyan-400/20 text-green-300 border border-green-400/30';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-300 border border-yellow-400/30';
      case 'info':
      default:
        return 'bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getColorClasses(type)}`}>
      {status}
    </span>
  );
});

/**
 * Reusable category badge component
 * @param {object} props - Component properties
 * @param {string} props.category - Category text
 * @param {string} props.colorScheme - Color scheme (cybersecurity, development, academic, etc.)
 * @returns {JSX.Element} - Category badge component
 */
const CategoryBadge = memo(({ category, colorScheme = 'default' }) => {
  const getColorClasses = (scheme) => {
    switch (scheme) {
      case 'cybersecurity':
        return 'from-red-400/10 to-orange-500/10 text-red-300 border border-red-400/20';
      case 'development':
        return 'from-cyan-400/10 to-purple-500/10 text-cyan-300 border border-cyan-400/20';
      case 'academic':
        return 'from-blue-400/10 to-cyan-500/10 text-blue-300 border border-blue-400/20';
      case 'professional':
        return 'from-green-400/10 to-teal-500/10 text-green-300 border border-green-400/20';
      default:
        return 'from-gray-400/10 to-gray-600/10 text-gray-300 border border-gray-400/20';
    }
  };

  return (
    <span className={`px-2 py-1 bg-gradient-to-r ${getColorClasses(colorScheme)} rounded-md text-xs font-medium`}>
      {category}
    </span>
  );
});

GlassCard.displayName = 'GlassCard';
TimelineItem.displayName = 'TimelineItem';
StatusBadge.displayName = 'StatusBadge';
CategoryBadge.displayName = 'CategoryBadge';

export { GlassCard, TimelineItem, StatusBadge, CategoryBadge };