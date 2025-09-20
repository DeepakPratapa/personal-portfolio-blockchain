const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Validate private key format
function validatePrivateKey(key) {
  if (!key) return false;
  // Remove 0x prefix if present
  const cleanKey = key.replace(/^0x/, '');
  // Check if it's exactly 64 hex characters and not all zeros
  return /^[a-fA-F0-9]{64}$/.test(cleanKey) && cleanKey !== '0'.repeat(64);
}

// Get validated private key or return empty array
function getPrivateKey() {
  // For GitHub Actions, use DEPLOYER_PRIVATE_KEY secret
  const key = process.env.DEPLOYER_PRIVATE_KEY || process.env.VITE_DEPLOYER_PRIVATE_KEY;
  
  // In GitHub Actions, be more permissive with validation
  if (key && key.trim()) {
    const cleanKey = key.trim().replace(/^0x/, '');
    if (cleanKey.length === 64) {
      return [cleanKey.startsWith('0x') ? cleanKey : `0x${cleanKey}`];
    }
  }
  
  console.warn("⚠️  Warning: Invalid or missing private key. Using Hardhat's default accounts.");
  console.warn("📝 For production deployment:");
  console.warn("   1. Set DEPLOYER_PRIVATE_KEY in GitHub Secrets");
  console.warn("   2. Set INFURA_API_KEY in GitHub Secrets"); 
  console.warn("   3. Set WALLET_ADDRESS in GitHub Secrets");
  return [];
}

// Validate environment variables
function validateEnvConfig() {
  // Skip validation in GitHub Actions - secrets will be available at runtime
  if (process.env.CI || process.env.GITHUB_ACTIONS) {
    return;
  }
  
  const required = ['VITE_RPC_URL', 'VITE_NETWORK_ID'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error("❌ Missing required environment variables for local development:");
    missing.forEach(key => console.error(`   - ${key}`));
    console.error("📝 Please update your .env file with the required variables for local development.");
    console.error("🚀 For production, these will be set via GitHub Secrets and Netlify.");
  }
}

// Get Polygon mainnet configuration
function getPolygonConfig() {
  const infuraApiKey = process.env.INFURA_API_KEY;
  const polygonRpcUrl = infuraApiKey 
    ? `https://polygon-mainnet.infura.io/v3/${infuraApiKey}`
    : process.env.POLYGON_RPC_URL;
    
  return {
    url: polygonRpcUrl || "https://polygon-rpc.com",
    accounts: getPrivateKey(),
    chainId: 137,
    gasPrice: 30000000000, // 30 gwei
    confirmations: 2,
    timeoutBlocks: 200,
    skipDryRun: true
  };
}

// Get Mumbai testnet configuration
function getMumbaiConfig() {
  const infuraApiKey = process.env.INFURA_API_KEY;
  const mumbaiRpcUrl = infuraApiKey 
    ? `https://polygon-mumbai.infura.io/v3/${infuraApiKey}`
    : process.env.MUMBAI_RPC_URL;
    
  return {
    url: mumbaiRpcUrl || "https://rpc-mumbai.maticvigil.com",
    accounts: getPrivateKey(),
    chainId: 80001,
    gasPrice: 20000000000, // 20 gwei
    confirmations: 2,
    timeoutBlocks: 200,
    skipDryRun: true
  };
}

// Validate environment variables before creating config
validateEnvConfig();

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // Polygon Mumbai Testnet
    mumbai: getMumbaiConfig(),
    // Polygon Mainnet
    polygon: getPolygonConfig(),
    // Sepolia Testnet (Ethereum)
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: getPrivateKey(),
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
  },
  polygonscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  // Gas reporting
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

// Add Ganache network configuration only if environment variables are available
if (process.env.VITE_RPC_URL && process.env.VITE_NETWORK_ID) {
  config.networks.ganache = {
    url: process.env.VITE_RPC_URL,
    chainId: parseInt(process.env.VITE_NETWORK_ID),
    accounts: getPrivateKey(),
  };
}

module.exports = config;