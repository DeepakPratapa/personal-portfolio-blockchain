import React, { memo } from 'react';
import { getSanitizedText, validateAndSanitize } from '../../utils/helpers';

/**
 * Enhanced reusable component for rendering sanitized text lists with security validation
 * @param {string[]} items - Array of items to display
 * @param {string} className - CSS classes for the list container
 * @param {string} itemClassName - CSS classes for individual list items
 * @param {number} maxItems - Maximum number of items to display (security limit)
 * @returns {JSX.Element} - List component
 */
export const SanitizedList = memo(({ 
  items, 
  className = "list-disc list-inside mt-2 space-y-1 text-gray-300",
  itemClassName = "animate-fade-in-up",
  maxItems = 50 
}) => {
  // Input validation
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  // Security: limit number of items to prevent DOM flooding
  const sanitizedItems = items
    .slice(0, maxItems)
    .filter(item => item && typeof item === 'string')
    .map(item => getSanitizedText(item))
    .filter(item => item.length > 0);

  if (sanitizedItems.length === 0) {
    return null;
  }

  return (
    <ul className={className}>
      {sanitizedItems.map((item, i) => (
        <li 
          key={i} 
          className={itemClassName} 
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
});

/**
 * Enhanced reusable component for rendering sanitized text with validation
 * @param {string} text - Text to sanitize and display
 * @param {string} type - Type of validation (text, email, url)
 * @param {boolean} allowEmpty - Whether to render empty content
 * @returns {JSX.Element} - Text component
 */
export const SanitizedText = memo(({ text, type = 'text', allowEmpty = false }) => {
  if (!text || typeof text !== 'string') {
    return allowEmpty ? <></> : null;
  }

  const sanitizedText = type === 'text' 
    ? getSanitizedText(text)
    : validateAndSanitize(text, type);

  if (!sanitizedText && !allowEmpty) {
    return null;
  }

  return <>{sanitizedText}</>;
});

SanitizedList.displayName = 'SanitizedList';
SanitizedText.displayName = 'SanitizedText';