import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Icon } from '../common/Icon';
import { CONTRACT_CONFIG, getCurrentNetwork, getExplorerUrl } from '../../utils/contractConstants';
import ProjectVerificationContract from '../../../artifacts/contracts/ProjectVerification.sol/ProjectVerification.json';

/**
 * Blockchain Verification Component
 * Displays verification status and allows users to verify the deployed application
 */
const BlockchainVerification = () => {
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchVerificationData();
  }, []);

  const fetchVerificationData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Connect to the verification contract
      const provider = new ethers.JsonRpcProvider(CONTRACT_CONFIG.RPC_URL);
      const verificationContract = new ethers.Contract(
        CONTRACT_CONFIG.VERIFICATION_ADDRESS,
        ProjectVerificationContract.abi,
        provider
      );

      const projectName = 'blockchain-verified-portfolio';
      
      // Get verification status
      const status = await verificationContract.getVerificationStatus(projectName, '1.0.0');
      
      let latestHash = null;
      let latestSecurity = null;
      let latestDeployment = null;

      try {
        if (status.hasCodebaseHash) {
          latestHash = await verificationContract.getLatestCodebaseHash(projectName);
        }
      } catch (err) {
        console.warn('Could not fetch codebase hash:', err.message);
      }

      try {
        if (status.hasSecurityReport) {
          latestSecurity = await verificationContract.getLatestSecurityReport(projectName);
        }
      } catch (err) {
        console.warn('Could not fetch security report:', err.message);
      }

      try {
        if (status.hasDeployment) {
          latestDeployment = await verificationContract.getLatestDeployment(projectName);
        }
      } catch (err) {
        console.warn('Could not fetch deployment record:', err.message);
      }

      setVerificationData({
        status,
        latestHash,
        latestSecurity,
        latestDeployment,
        projectName
      });
    } catch (err) {
      console.error('Error fetching verification data:', err);
      setError('Failed to fetch verification data from blockchain');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  const formatAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A';
  };

  const getVerificationScore = () => {
    if (!verificationData?.status) return 0;
    const { status } = verificationData;
    let score = 0;
    if (status.hasCodebaseHash) score += 25;
    if (status.hasSecurityReport && status.securityPassing) score += 35;
    if (status.hasDeployment) score += 25;
    if (status.isVerified) score += 15;
    return score;
  };

  const getVerificationLevel = (score) => {
    if (score >= 90) return { level: 'Fully Verified', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (score >= 70) return { level: 'Highly Verified', color: 'text-blue-400', bg: 'bg-blue-400/20' };
    if (score >= 50) return { level: 'Partially Verified', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    return { level: 'Unverified', color: 'text-red-400', bg: 'bg-red-400/20' };
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-300">Loading blockchain verification data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-800/20 to-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-700/50">
        <div className="flex items-center gap-3">
          <Icon name="AlertCircle" className="w-6 h-6 text-red-400" />
          <div>
            <p className="text-red-300 font-medium">Verification Error</p>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const score = getVerificationScore();
  const { level, color, bg } = getVerificationLevel(score);
  const network = getCurrentNetwork();

  return (
    <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Icon name="Shield" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Blockchain Verification</h3>
              <p className="text-sm text-gray-400">Cryptographic proof of code integrity</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full ${bg} border border-gray-600/50`}>
            <span className={`text-sm font-medium ${color}`}>{level}</span>
          </div>
        </div>

        {/* Score Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Verification Score</span>
            <span className={`text-sm font-medium ${color}`}>{score}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Icon 
              name={verificationData?.status?.hasCodebaseHash ? "CheckCircle" : "XCircle"} 
              className={`w-5 h-5 ${verificationData?.status?.hasCodebaseHash ? 'text-green-400' : 'text-red-400'}`} 
            />
            <span className="text-sm text-gray-300">Code Hash</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon 
              name={verificationData?.status?.hasSecurityReport && verificationData?.status?.securityPassing ? "CheckCircle" : "XCircle"} 
              className={`w-5 h-5 ${verificationData?.status?.hasSecurityReport && verificationData?.status?.securityPassing ? 'text-green-400' : 'text-red-400'}`} 
            />
            <span className="text-sm text-gray-300">Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon 
              name={verificationData?.status?.hasDeployment ? "CheckCircle" : "XCircle"} 
              className={`w-5 h-5 ${verificationData?.status?.hasDeployment ? 'text-green-400' : 'text-red-400'}`} 
            />
            <span className="text-sm text-gray-300">Deployment</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon 
              name={verificationData?.status?.isVerified ? "CheckCircle" : "XCircle"} 
              className={`w-5 h-5 ${verificationData?.status?.isVerified ? 'text-green-400' : 'text-red-400'}`} 
            />
            <span className="text-sm text-gray-300">Verified</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 text-cyan-300 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 text-sm"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} className="w-4 h-4" />
            {isExpanded ? 'Hide Details' : 'View Details'}
          </button>
          
          <a
            href={getExplorerUrl(CONTRACT_CONFIG.VERIFICATION_ADDRESS)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-300 rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 text-sm"
          >
            <Icon name="ExternalLink" className="w-4 h-4" />
            View on {network.name}
          </a>
          
          <button
            onClick={fetchVerificationData}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400/10 to-teal-500/10 text-green-300 rounded-lg border border-green-400/20 hover:border-green-400/40 transition-all duration-300 text-sm"
          >
            <Icon name="RefreshCw" className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && verificationData && (
        <div className="border-t border-gray-700/50 p-6 bg-gray-800/30">
          <div className="space-y-6">
            {/* Codebase Hash Details */}
            {verificationData.latestHash && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Icon name="Code" className="w-4 h-4" />
                  Codebase Verification
                </h4>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400">Git Commit:</span>
                      <span className="text-cyan-300 ml-2 font-mono">{formatAddress(verificationData.latestHash.gitCommitHash)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Source Hash:</span>
                      <span className="text-cyan-300 ml-2 font-mono">{formatAddress(verificationData.latestHash.sourceCodeHash)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Dependencies:</span>
                      <span className="text-cyan-300 ml-2 font-mono">{formatAddress(verificationData.latestHash.dependenciesHash)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Verified:</span>
                      <span className="text-cyan-300 ml-2">{formatTimestamp(verificationData.latestHash.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Report Details */}
            {verificationData.latestSecurity && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Icon name="Security" className="w-4 h-4" />
                  Security Assessment
                </h4>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400">Vulnerabilities:</span>
                      <span className={`ml-2 font-medium ${Number(verificationData.latestSecurity.vulnerabilitiesFound) === 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {Number(verificationData.latestSecurity.vulnerabilitiesFound)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className={`ml-2 font-medium ${verificationData.latestSecurity.isPassing ? 'text-green-400' : 'text-red-400'}`}>
                        {verificationData.latestSecurity.isPassing ? 'Passing' : 'Failed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Deployment Details */}
            {verificationData.latestDeployment && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Icon name="Globe" className="w-4 h-4" />
                  Deployment Record
                </h4>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400">Environment:</span>
                      <span className="text-cyan-300 ml-2 capitalize">{verificationData.latestDeployment.environment}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Contract:</span>
                      <span className="text-cyan-300 ml-2 font-mono">{formatAddress(verificationData.latestDeployment.contractAddress)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Deployed:</span>
                      <span className="text-cyan-300 ml-2">{formatTimestamp(verificationData.latestDeployment.timestamp)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Deployer:</span>
                      <span className="text-cyan-300 ml-2 font-mono">{formatAddress(verificationData.latestDeployment.deployer)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainVerification;