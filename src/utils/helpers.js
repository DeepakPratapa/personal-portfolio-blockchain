import DOMPurify from 'dompurify';

// Enhanced security configuration for DOMPurify
const PURIFY_CONFIG = {
  // Standard HTML sanitization
  html: {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a', 'span'],
    ALLOWED_ATTR: ['href', 'title', 'class'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form', 'input', 'style'],
    FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover', 'onmouseout', 'onfocus', 'onblur']
  },
  // Text-only sanitization (no HTML)
  text: {
    USE_PROFILES: { html: false },
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }
};

/**
 * Validates and sanitizes input data with enhanced security
 * @param {string} input - Input to validate
 * @param {string} type - Type of validation (email, url, text, html)
 * @returns {string} - Sanitized and validated input
 */
export const validateAndSanitize = (input, type = 'text') => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Input length validation
  if (input.length > 10000) {
    console.warn('Input truncated due to excessive length');
    input = input.substring(0, 10000);
  }

  switch (type) {
    case 'email': {
      // Basic email validation and sanitization
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const sanitizedEmail = DOMPurify.sanitize(input, PURIFY_CONFIG.text);
      return emailRegex.test(sanitizedEmail) ? sanitizedEmail : '';
    }
      
    case 'url':
      // URL validation and sanitization
      try {
        const url = new URL(DOMPurify.sanitize(input, PURIFY_CONFIG.text));
        // Allow only safe protocols
        if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) {
          return url.toString();
        }
      } catch {
        console.warn('Invalid URL provided:', input);
      }
      return '';
      
    case 'html':
      return DOMPurify.sanitize(input, PURIFY_CONFIG.html);
      
    case 'text':
    default:
      return DOMPurify.sanitize(input, PURIFY_CONFIG.text);
  }
};

/**
 * Sanitizes HTML content for safe rendering with enhanced security
 * @param {string} html - The HTML content to sanitize
 * @returns {object} - Object with __html property for dangerouslySetInnerHTML
 */
export const getSanitizedHtml = (html) => {
  if (!html || typeof html !== 'string') {
    return { __html: '' };
  }
  
  return { 
    __html: validateAndSanitize(html, 'html')
  };
};

/**
 * Sanitizes text content by removing HTML tags with enhanced validation
 * @param {string} text - The text content to sanitize
 * @returns {string} - Sanitized text
 */
export const getSanitizedText = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  return validateAndSanitize(text, 'text');
};

/**
 * Formats a phone number for tel: links with validation
 * @param {string} phone - The phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  
  const sanitized = validateAndSanitize(phone, 'text');
  return sanitized.replace(/[^\d+\-()\s]/g, '');
};

/**
 * Validates and formats email for mailto: links
 * @param {string} email - The email to validate
 * @returns {string} - Validated email or empty string
 */
export const validateEmail = (email) => {
  return validateAndSanitize(email, 'email');
};

/**
 * Validates and formats URL for safe linking
 * @param {string} url - The URL to validate
 * @returns {string} - Validated URL or empty string
 */
export const validateUrl = (url) => {
  return validateAndSanitize(url, 'url');
};

/**
 * Truncates an Ethereum address for display purposes with validation
 * @param {string} address - The address to truncate
 * @param {number} startChars - Number of characters to show at start
 * @param {number} endChars - Number of characters to show at end
 * @returns {string} - Truncated address
 */
export const truncateAddress = (address, startChars = 6, endChars = 4) => {
  if (!address || typeof address !== 'string') {
    return '';
  }
  
  const sanitized = validateAndSanitize(address, 'text');
  
  // Basic Ethereum address validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(sanitized)) {
    console.warn('Invalid Ethereum address format');
    return sanitized;
  }
  
  if (sanitized.length <= startChars + endChars) {
    return sanitized;
  }
  
  return `${sanitized.slice(0, startChars)}...${sanitized.slice(-endChars)}`;
};

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => 
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Converts camelCase to space-separated words
 * @param {string} str - The camelCase string
 * @returns {string} - Space-separated string
 */
export const camelCaseToSpaces = (str) => 
  str.replace(/([A-Z])/g, ' $1');

/**
 * Smooth scroll to element
 * @param {HTMLElement} element - The element to scroll to
 */
export const smoothScrollTo = (element) => {
  element?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  });
};