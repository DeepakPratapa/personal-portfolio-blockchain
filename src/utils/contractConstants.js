// Contract configuration - Updated by GitHub Actions
// For local development, these are placeholder values

export const CONTRACT_CONFIG = {
  PORTFOLIO_ADDRESS: process.env.VITE_CONTRACT_ADDRESS || '0x42EB8Af38438765920c25177c4C5a7C648396b38',
  VERIFICATION_ADDRESS: process.env.VITE_VERIFICATION_ADDRESS || '0x0000000000000000000000000000000000000000',
  WALLET_ADDRESS: process.env.VITE_WALLET_ADDRESS || '0x5D037E4692C9Dfe6aE40cc59e1F7A29469b4410F',
  NETWORK: process.env.VITE_NETWORK_NAME || 'ganache',
  CHAIN_ID: parseInt(process.env.VITE_NETWORK_ID) || 1337,
  RPC_URL: process.env.VITE_RPC_URL || 'http://127.0.0.1:7545',
  EXPLORER_URL: process.env.VITE_POLYGONSCAN_BASE_URL || 'http://localhost:7545'
};

export const NETWORK_CONFIG = {
  137: {
    name: 'Polygon Mainnet',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com'
  },
  80001: {
    name: 'Polygon Mumbai',
    currency: 'MATIC',
    explorerUrl: 'https://mumbai.polygonscan.com',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com'
  },
  1337: {
    name: 'Ganache',
    currency: 'ETH',
    explorerUrl: 'http://localhost:7545',
    rpcUrl: 'http://127.0.0.1:7545'
  }
};

// Helper function to get current network config
export const getCurrentNetwork = () => {
  return NETWORK_CONFIG[CONTRACT_CONFIG.CHAIN_ID] || NETWORK_CONFIG[1337];
};

// Helper function to get explorer URL for an address
export const getExplorerUrl = (address) => {
  const network = getCurrentNetwork();
  return `${network.explorerUrl}/address/${address}`;
};

// Validation function
export const validateContractConfig = () => {
  const errors = [];
  
  if (!CONTRACT_CONFIG.PORTFOLIO_ADDRESS || CONTRACT_CONFIG.PORTFOLIO_ADDRESS === '0x0000000000000000000000000000000000000000') {
    errors.push('Portfolio contract address not set');
  }
  
  if (!CONTRACT_CONFIG.WALLET_ADDRESS || CONTRACT_CONFIG.WALLET_ADDRESS === '0x0000000000000000000000000000000000000000') {
    errors.push('Wallet address not set');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};