import pkg from 'hardhat';
const { ethers } = pkg;
import fs from 'fs';
import path from 'path';

/**
 * Store codebase verification data on the blockchain
 */
async function storeVerificationData() {
    const [deployer] = await ethers.getSigners();
    const network = await ethers.provider.getNetwork();
    
    console.log("🔐 Storing verification data with account:", deployer.address);
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);

    // Read verification report
    const reportPath = path.join(process.cwd(), 'verification-report.json');
    if (!fs.existsSync(reportPath)) {
        console.error("❌ Verification report not found. Run codebase verification first.");
        process.exit(1);
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    console.log("📋 Loaded verification report for:", report.projectName, "v" + report.version);

    // Get contract addresses from environment or config
    const verificationAddress = process.env.VERIFICATION_CONTRACT_ADDRESS || 
                               process.env.VITE_VERIFICATION_ADDRESS;
    
    if (!verificationAddress) {
        console.error("❌ Verification contract address not found in environment variables.");
        process.exit(1);
    }

    try {
        // Connect to ProjectVerification contract
        const ProjectVerification = await ethers.getContractFactory("ProjectVerification");
        const verificationContract = ProjectVerification.attach(verificationAddress);
        
        console.log("🔗 Connected to ProjectVerification contract:", verificationAddress);

        // Store codebase hash
        console.log("💾 Storing codebase hash...");
        const tx1 = await verificationContract.storeCodebaseHash(
            report.projectName,
            report.version,
            report.gitCommitHash,
            report.sourceCodeHash,
            report.dependenciesHash,
            report.configHash,
            report.buildArtifactsHash,
            report.deploymentHash
        );
        
        await tx1.wait();
        console.log("✅ Codebase hash stored. TX:", tx1.hash);

        // Store security report
        console.log("🔒 Storing security report...");
        const securityTools = Object.keys(report.securityChecks);
        const vulnerabilitiesFound = Object.values(report.securityChecks).filter(check => !check).length;
        const isPassing = report.verification.isValid;
        const securityScanHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(report.securityChecks)));

        const tx2 = await verificationContract.storeSecurityReport(
            report.projectName,
            report.version,
            vulnerabilitiesFound,
            securityScanHash,
            securityTools,
            isPassing
        );
        
        await tx2.wait();
        console.log("✅ Security report stored. TX:", tx2.hash);

        // If this is a deployment, record deployment info
        if (process.env.GITHUB_ACTIONS) {
            const portfolioAddress = process.env.PORTFOLIO_CONTRACT_ADDRESS || 
                                   process.env.VITE_CONTRACT_ADDRESS;
                                   
            if (portfolioAddress) {
                console.log("🚀 Recording deployment...");
                const tx3 = await verificationContract.recordDeployment(
                    report.projectName,
                    report.version,
                    "production",
                    portfolioAddress,
                    "", // Deployment TX hash will be filled by deployment script
                    0   // Gas used will be filled by deployment script
                );
                
                await tx3.wait();
                console.log("✅ Deployment recorded. TX:", tx3.hash);
            }
        }

        // Get verification status
        const verificationStatus = await verificationContract.getVerificationStatus(
            report.projectName, 
            report.version
        );
        
        console.log("\\n" + "=".repeat(60));
        console.log("🎉 VERIFICATION DATA STORED ON BLOCKCHAIN");
        console.log("=".repeat(60));
        console.log("Project:", report.projectName);
        console.log("Version:", report.version);
        console.log("Verification Contract:", verificationAddress);
        console.log("Has Codebase Hash:", verificationStatus.hasCodebaseHash ? "✅" : "❌");
        console.log("Has Security Report:", verificationStatus.hasSecurityReport ? "✅" : "❌");
        console.log("Security Passing:", verificationStatus.securityPassing ? "✅" : "❌");
        console.log("Has Deployment:", verificationStatus.hasDeployment ? "✅" : "❌");
        console.log("Is Verified:", verificationStatus.isVerified ? "✅" : "❌");
        console.log("=".repeat(60));

        // Save blockchain verification data
        const blockchainReport = {
            ...report,
            blockchain: {
                network: network.name,
                chainId: Number(network.chainId),
                verificationContract: verificationAddress,
                transactions: {
                    codebaseHash: tx1.hash,
                    securityReport: tx2.hash,
                    deployment: process.env.GITHUB_ACTIONS && portfolioAddress ? (await verificationContract.getDeploymentCount(report.projectName)) : null
                },
                verificationStatus,
                timestamp: new Date().toISOString()
            }
        };

        fs.writeFileSync(
            path.join(process.cwd(), 'blockchain-verification-report.json'),
            JSON.stringify(blockchainReport, null, 2)
        );

        console.log("📄 Blockchain verification report saved");
        console.log("🔍 Verify on explorer:", `https://polygonscan.com/address/${verificationAddress}`);

    } catch (error) {
        console.error("❌ Error storing verification data:", error.message);
        process.exit(1);
    }
}

// Export for GitHub Actions usage
export { storeVerificationData };

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
    storeVerificationData().catch(console.error);
}