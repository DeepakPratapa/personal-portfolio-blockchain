// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

/**
 * @title ProjectVerification
 * @dev Smart contract for storing and verifying cryptographic hashes of project components
 * This contract enables transparent verification of deployed applications against their source code
 */
contract ProjectVerification {
    address public owner;
    
    struct CodebaseHash {
        string projectName;
        string version;
        string gitCommitHash;
        string sourceCodeHash;
        string dependenciesHash;
        string configHash;
        string buildArtifactsHash;
        string deploymentHash;
        uint256 timestamp;
        address deployer;
        bool isVerified;
    }
    
    struct SecurityReport {
        string projectName;
        string version;
        uint256 vulnerabilitiesFound;
        string securityScanHash;
        string[] securityTools;
        bool isPassing;
        uint256 timestamp;
    }
    
    struct DeploymentRecord {
        string projectName;
        string version;
        string environment;
        string contractAddress;
        string deploymentTxHash;
        uint256 gasUsed;
        uint256 timestamp;
        address deployer;
    }
    
    // Mappings to store verification data
    mapping(string => CodebaseHash[]) public codebaseHashes;
    mapping(string => SecurityReport[]) public securityReports;
    mapping(string => DeploymentRecord[]) public deploymentRecords;
    mapping(string => mapping(string => bool)) public verifiedVersions;
    
    // Events for transparency
    event CodebaseHashStored(
        string indexed projectName,
        string indexed version,
        string gitCommitHash,
        address deployer
    );
    
    event SecurityReportStored(
        string indexed projectName,
        string indexed version,
        bool isPassing,
        uint256 vulnerabilitiesFound
    );
    
    event DeploymentRecorded(
        string indexed projectName,
        string indexed version,
        string environment,
        string contractAddress
    );
    
    event VerificationStatusUpdated(
        string indexed projectName,
        string indexed version,
        bool isVerified
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        console.log("ProjectVerification contract deployed by:", owner);
    }
    
    /**
     * @dev Store cryptographic hashes of project codebase components
     */
    function storeCodebaseHash(
        string memory _projectName,
        string memory _version,
        string memory _gitCommitHash,
        string memory _sourceCodeHash,
        string memory _dependenciesHash,
        string memory _configHash,
        string memory _buildArtifactsHash,
        string memory _deploymentHash
    ) public {
        CodebaseHash memory newHash = CodebaseHash({
            projectName: _projectName,
            version: _version,
            gitCommitHash: _gitCommitHash,
            sourceCodeHash: _sourceCodeHash,
            dependenciesHash: _dependenciesHash,
            configHash: _configHash,
            buildArtifactsHash: _buildArtifactsHash,
            deploymentHash: _deploymentHash,
            timestamp: block.timestamp,
            deployer: msg.sender,
            isVerified: false
        });
        
        codebaseHashes[_projectName].push(newHash);
        
        emit CodebaseHashStored(_projectName, _version, _gitCommitHash, msg.sender);
    }
    
    /**
     * @dev Store security scan report
     */
    function storeSecurityReport(
        string memory _projectName,
        string memory _version,
        uint256 _vulnerabilitiesFound,
        string memory _securityScanHash,
        string[] memory _securityTools,
        bool _isPassing
    ) public {
        SecurityReport memory newReport = SecurityReport({
            projectName: _projectName,
            version: _version,
            vulnerabilitiesFound: _vulnerabilitiesFound,
            securityScanHash: _securityScanHash,
            securityTools: _securityTools,
            isPassing: _isPassing,
            timestamp: block.timestamp
        });
        
        securityReports[_projectName].push(newReport);
        
        emit SecurityReportStored(_projectName, _version, _isPassing, _vulnerabilitiesFound);
    }
    
    /**
     * @dev Record deployment information
     */
    function recordDeployment(
        string memory _projectName,
        string memory _version,
        string memory _environment,
        string memory _contractAddress,
        string memory _deploymentTxHash,
        uint256 _gasUsed
    ) public {
        DeploymentRecord memory newRecord = DeploymentRecord({
            projectName: _projectName,
            version: _version,
            environment: _environment,
            contractAddress: _contractAddress,
            deploymentTxHash: _deploymentTxHash,
            gasUsed: _gasUsed,
            timestamp: block.timestamp,
            deployer: msg.sender
        });
        
        deploymentRecords[_projectName].push(newRecord);
        
        emit DeploymentRecorded(_projectName, _version, _environment, _contractAddress);
    }
    
    /**
     * @dev Mark a version as verified after comprehensive checks
     */
    function markAsVerified(string memory _projectName, string memory _version) public onlyOwner {
        verifiedVersions[_projectName][_version] = true;
        
        // Update the latest codebase hash verification status
        CodebaseHash[] storage hashes = codebaseHashes[_projectName];
        for (uint i = 0; i < hashes.length; i++) {
            if (keccak256(bytes(hashes[i].version)) == keccak256(bytes(_version))) {
                hashes[i].isVerified = true;
            }
        }
        
        emit VerificationStatusUpdated(_projectName, _version, true);
    }
    
    /**
     * @dev Get the latest codebase hash for a project
     */
    function getLatestCodebaseHash(string memory _projectName) 
        public 
        view 
        returns (CodebaseHash memory) 
    {
        require(codebaseHashes[_projectName].length > 0, "No hashes found for project");
        return codebaseHashes[_projectName][codebaseHashes[_projectName].length - 1];
    }
    
    /**
     * @dev Get the latest security report for a project
     */
    function getLatestSecurityReport(string memory _projectName) 
        public 
        view 
        returns (SecurityReport memory) 
    {
        require(securityReports[_projectName].length > 0, "No security reports found");
        return securityReports[_projectName][securityReports[_projectName].length - 1];
    }
    
    /**
     * @dev Get the latest deployment record for a project
     */
    function getLatestDeployment(string memory _projectName) 
        public 
        view 
        returns (DeploymentRecord memory) 
    {
        require(deploymentRecords[_projectName].length > 0, "No deployments found");
        return deploymentRecords[_projectName][deploymentRecords[_projectName].length - 1];
    }
    
    /**
     * @dev Check if a specific version is verified
     */
    function isVersionVerified(string memory _projectName, string memory _version) 
        public 
        view 
        returns (bool) 
    {
        return verifiedVersions[_projectName][_version];
    }
    
    /**
     * @dev Get total number of stored hashes for a project
     */
    function getHashCount(string memory _projectName) public view returns (uint256) {
        return codebaseHashes[_projectName].length;
    }
    
    /**
     * @dev Get total number of security reports for a project
     */
    function getSecurityReportCount(string memory _projectName) public view returns (uint256) {
        return securityReports[_projectName].length;
    }
    
    /**
     * @dev Get total number of deployments for a project
     */
    function getDeploymentCount(string memory _projectName) public view returns (uint256) {
        return deploymentRecords[_projectName].length;
    }
    
    /**
     * @dev Verify hash integrity by comparing stored hashes
     */
    function verifyHashIntegrity(
        string memory _projectName,
        string memory _version,
        string memory _sourceCodeHash,
        string memory _dependenciesHash
    ) public view returns (bool) {
        CodebaseHash[] memory hashes = codebaseHashes[_projectName];
        
        for (uint i = 0; i < hashes.length; i++) {
            if (keccak256(bytes(hashes[i].version)) == keccak256(bytes(_version))) {
                return (
                    keccak256(bytes(hashes[i].sourceCodeHash)) == keccak256(bytes(_sourceCodeHash)) &&
                    keccak256(bytes(hashes[i].dependenciesHash)) == keccak256(bytes(_dependenciesHash))
                );
            }
        }
        
        return false;
    }
    
    /**
     * @dev Get comprehensive verification status
     */
    function getVerificationStatus(string memory _projectName, string memory _version) 
        public 
        view 
        returns (
            bool hasCodebaseHash,
            bool hasSecurityReport,
            bool hasDeployment,
            bool isVerified,
            bool securityPassing
        ) 
    {
        // Check for codebase hash
        hasCodebaseHash = false;
        CodebaseHash[] memory hashes = codebaseHashes[_projectName];
        for (uint i = 0; i < hashes.length; i++) {
            if (keccak256(bytes(hashes[i].version)) == keccak256(bytes(_version))) {
                hasCodebaseHash = true;
                break;
            }
        }
        
        // Check for security report
        hasSecurityReport = false;
        securityPassing = false;
        SecurityReport[] memory reports = securityReports[_projectName];
        for (uint i = 0; i < reports.length; i++) {
            if (keccak256(bytes(reports[i].version)) == keccak256(bytes(_version))) {
                hasSecurityReport = true;
                securityPassing = reports[i].isPassing;
                break;
            }
        }
        
        // Check for deployment
        hasDeployment = false;
        DeploymentRecord[] memory deployments = deploymentRecords[_projectName];
        for (uint i = 0; i < deployments.length; i++) {
            if (keccak256(bytes(deployments[i].version)) == keccak256(bytes(_version))) {
                hasDeployment = true;
                break;
            }
        }
        
        // Check verified status
        isVerified = verifiedVersions[_projectName][_version];
    }
}