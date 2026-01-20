import { ethers } from "ethers";
import { BLOCKCHAIN_CONFIG } from './constants';

/**
 * Creates a resilient RPC provider - using single stable endpoint
 * @returns {Promise<ethers.JsonRpcProvider>} Provider instance
 */
export const createResilientProvider = async () => {
  // Use single reliable RPC endpoint
  const rpcUrl = 'https://polygon-bor-rpc.publicnode.com';
  
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl, undefined, {
      staticNetwork: true,
      batchMaxCount: 1,
      polling: false
    });
    
    // Test the connection with a timeout
    const blockNumberPromise = provider.getBlockNumber();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('RPC timeout after 5s')), 5000)
    );
    
    await Promise.race([blockNumberPromise, timeoutPromise]);
    
    console.log(`✅ Connected to RPC: ${rpcUrl}`);
    return provider;
  } catch (err) {
    throw new Error(`Failed to connect to RPC: ${err.message}`);
  }
};

/**
 * Retry a contract call with exponential backoff
 * @param {Function} fn - The function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} initialDelay - Initial delay in milliseconds
 * @returns {Promise<any>} Result of the function call
 */
export const retryContractCall = async (fn, maxRetries = 3, initialDelay = 1000) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isLastAttempt = attempt === maxRetries - 1;
      
      if (isLastAttempt) {
        console.error(`❌ Failed after ${maxRetries} attempts:`, err.message);
        throw err;
      }
      
      const delay = initialDelay * Math.pow(2, attempt);
      console.warn(
        `⚠️ Attempt ${attempt + 1}/${maxRetries} failed: ${err.message}. Retrying in ${delay}ms...`
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Batch contract calls to reduce RPC requests
 * @param {Array<Function>} calls - Array of async functions to call
 * @param {number} batchSize - Number of calls per batch
 * @returns {Promise<Array>} Array of results
 */
export const batchContractCalls = async (calls, batchSize = 5) => {
  const results = [];
  
  for (let i = 0; i < calls.length; i += batchSize) {
    const batch = calls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(call => retryContractCall(call))
    );
    results.push(...batchResults);
  }
  
  return results;
};

/**
 * Check if contract exists at address
 * @param {ethers.Provider} provider - Ethers provider
 * @param {string} address - Contract address
 * @returns {Promise<boolean>} True if contract exists
 */
export const contractExists = async (provider, address) => {
  try {
    const code = await provider.getCode(address);
    return code !== '0x';
  } catch (error) {
    console.error(`Failed to check contract at ${address}:`, error.message);
    return false;
  }
};

/**
 * Get network information
 * @param {ethers.Provider} provider - Ethers provider
 * @returns {Promise<Object>} Network info
 */
export const getNetworkInfo = async (provider) => {
  try {
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    
    return {
      chainId: Number(network.chainId),
      name: network.name,
      blockNumber,
    };
  } catch (error) {
    console.error('Failed to get network info:', error.message);
    return null;
  }
};
