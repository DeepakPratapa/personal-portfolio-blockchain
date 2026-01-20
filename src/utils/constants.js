// Smart contract address from environment variables
export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

// Blockchain configuration from environment variables
export const BLOCKCHAIN_CONFIG = {
  RPC_URL: import.meta.env.VITE_RPC_URL || "http://127.0.0.1:7545",
  RPC_FALLBACK_URLS: import.meta.env.VITE_RPC_FALLBACK_URLS 
    ? import.meta.env.VITE_RPC_FALLBACK_URLS.split(',')
    : [
        'https://polygon-rpc.com',
        'https://polygon-bor-rpc.publicnode.com', 
        'https://rpc-mainnet.matic.network',
        'https://rpc-mainnet.maticvigil.com'
      ],
  ETHERSCAN_BASE_URL: import.meta.env.VITE_ETHERSCAN_BASE_URL || "https://sepolia.etherscan.io/address/",
  POLYGONSCAN_BASE_URL: import.meta.env.VITE_POLYGONSCAN_BASE_URL || "https://polygonscan.com/address/",
  NETWORK_ID: import.meta.env.VITE_NETWORK_ID || "1337",
  ETHERSCAN_API_KEY: import.meta.env.VITE_ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY: import.meta.env.VITE_POLYGONSCAN_API_KEY,
};

// Application configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || "Portfolio DApp",
  VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || "development",
  OWNER_ADDRESS: import.meta.env.VITE_OWNER_ADDRESS,
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID,
};

// Skill categories
export const SKILL_CATEGORIES = [
  'languages', 
  'frameworks', 
  'databases', 
  'cloud', 
  'devops', 
  'security', 
  'expertise', 
  'other'
];

// Navigation sections
export const NAVIGATION_SECTIONS = [
  'contact', 
  'summary', 
  'experience', 
  'projects', 
  'skills', 
  'education', 
  'certifications', 
  'research', 
  'achievements',
  'verify'
];