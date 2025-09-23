import React from 'react';
import { Icon } from '../components/common/Icon';

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
