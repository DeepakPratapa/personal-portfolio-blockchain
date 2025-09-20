/**
 * Enhanced environment variables validation utility with runtime type checking
 * Ensures required environment variables are set with proper validation
 */

// Required environment variables with validation rules
const REQUIRED_ENV_VARS = {
  'VITE_CONTRACT_ADDRESS': {
    required: true,
    validator: (value) => /^0x[a-fA-F0-9]{40}$/.test(value),
    errorMessage: 'Must be a valid Ethereum address (0x + 40 hex characters)'
  },
  'VITE_RPC_URL': {
    required: true,
    validator: (value) => {
      try {
        const url = new URL(value);
        return ['http:', 'https:', 'ws:', 'wss:'].includes(url.protocol);
      } catch {
        return false;
      }
    },
    errorMessage: 'Must be a valid RPC URL (http/https/ws/wss protocol)'
  }
};

// Optional environment variables with defaults and validation
const OPTIONAL_ENV_VARS = {
  'VITE_NETWORK_ID': {
    default: '1337',
    validator: (value) => /^\d+$/.test(value) && parseInt(value) > 0,
    errorMessage: 'Must be a positive integer'
  },
  'VITE_ETHERSCAN_BASE_URL': {
    default: 'https://sepolia.etherscan.io/address/',
    validator: (value) => {
      try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol);
      } catch {
        return false;
      }
    },
    errorMessage: 'Must be a valid HTTPS URL'
  },
  'VITE_APP_NAME': {
    default: 'Portfolio DApp',
    validator: (value) => typeof value === 'string' && value.length > 0 && value.length <= 100,
    errorMessage: 'Must be a non-empty string (max 100 characters)'
  },
  'VITE_APP_VERSION': {
    default: '1.0.0',
    validator: (value) => /^\d+\.\d+\.\d+(-[a-zA-Z0-9-]+)?$/.test(value),
    errorMessage: 'Must be a valid semantic version (x.y.z or x.y.z-suffix)'
  },
  'VITE_ENVIRONMENT': {
    default: 'development',
    validator: (value) => ['development', 'staging', 'production'].includes(value),
    errorMessage: 'Must be one of: development, staging, production'
  }
};

/**
 * Runtime type validation for environment variables
 * @param {string} key - Environment variable key
 * @param {string} value - Environment variable value
 * @param {object} config - Validation configuration
 * @returns {boolean} - Whether the value is valid
 */
const validateEnvVar = (key, value, config) => {
  if (!value && config.required) {
    console.error(`❌ Missing required environment variable: ${key}`);
    if (config.errorMessage) {
      console.error(`   Requirement: ${config.errorMessage}`);
    }
    return false;
  }

  if (value && config.validator && !config.validator(value)) {
    console.error(`❌ Invalid environment variable: ${key} = "${value}"`);
    if (config.errorMessage) {
      console.error(`   Requirement: ${config.errorMessage}`);
    }
    return false;
  }

  return true;
};

/**
 * Enhanced validation that checks all required environment variables with type validation
 * @throws {Error} If required environment variables are missing or invalid
 */
export const validateEnvVars = () => {
  const errors = [];
  
  // Validate required variables
  Object.entries(REQUIRED_ENV_VARS).forEach(([key, config]) => {
    const value = import.meta.env[key];
    if (!validateEnvVar(key, value, config)) {
      errors.push(key);
    }
  });

  // Validate optional variables that are set
  Object.entries(OPTIONAL_ENV_VARS).forEach(([key, config]) => {
    const value = import.meta.env[key];
    if (value && !validateEnvVar(key, value, config)) {
      errors.push(key);
    }
  });

  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed for: ${errors.join(', ')}\n` +
      'Please check your .env file and ensure all variables meet the requirements.\n' +
      'You can use .env.example as a template.'
    );
  }
};

/**
 * Gets environment variable with fallback to default and validation
 * @param {string} key - Environment variable key
 * @param {string} defaultValue - Default value if not set
 * @returns {string} - Environment variable value or default
 */
export const getEnvVar = (key, defaultValue = '') => {
  const value = import.meta.env[key];
  
  if (!value) {
    const config = OPTIONAL_ENV_VARS[key];
    return config?.default || defaultValue;
  }
  
  // Validate the value if config exists
  const config = REQUIRED_ENV_VARS[key] || OPTIONAL_ENV_VARS[key];
  if (config && config.validator && !config.validator(value)) {
    console.warn(`⚠️  Invalid environment variable: ${key}, using default`);
    return config.default || defaultValue;
  }
  
  return value;
};

/**
 * Checks if we're in development mode
 * @returns {boolean} - True if in development
 */
export const isDevelopment = () => {
  return getEnvVar('VITE_ENVIRONMENT', 'development') === 'development';
};

/**
 * Checks if we're in production mode
 * @returns {boolean} - True if in production
 */
export const isProduction = () => {
  return getEnvVar('VITE_ENVIRONMENT', 'development') === 'production';
};

/**
 * Gets contract address with enhanced validation
 * @returns {string} - Contract address
 * @throws {Error} If contract address is not set or invalid
 */
export const getContractAddress = () => {
  const address = getEnvVar('VITE_CONTRACT_ADDRESS');
  if (!address) {
    throw new Error('Contract address not configured. Please set VITE_CONTRACT_ADDRESS in your .env file.');
  }
  
  // Additional validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`Invalid contract address format: ${address}. Must be a valid Ethereum address.`);
  }
  
  return address;
};

/**
 * Gets owner address with enhanced validation
 * @returns {string} - Owner address
 * @throws {Error} If owner address is not set or invalid
 */
export const getOwnerAddress = () => {
  const address = getEnvVar('VITE_OWNER_ADDRESS');
  if (!address) {
    throw new Error('Owner address not configured. Please set VITE_OWNER_ADDRESS in your .env file.');
  }
  
  // Additional validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`Invalid owner address format: ${address}. Must be a valid Ethereum address.`);
  }
  
  return address;
};

/**
 * Logs environment information (only in development)
 */
export const logEnvInfo = () => {
  if (isDevelopment()) {
    console.log('🌍 Environment Configuration:');
    console.log(`📱 App: ${getEnvVar('VITE_APP_NAME', 'Portfolio DApp')} v${getEnvVar('VITE_APP_VERSION', '1.0.0')}`);
    console.log(`🔗 Network: ${getEnvVar('VITE_RPC_URL', 'http://127.0.0.1:7545')}`);
    console.log(`📄 Contract: ${getEnvVar('VITE_CONTRACT_ADDRESS', 'Not configured')}`);
    console.log(`🚀 Environment: ${getEnvVar('VITE_ENVIRONMENT', 'development')}`);
  }
};