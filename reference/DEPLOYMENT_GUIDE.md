# Blockchain-Verified Portfolio Deployment Guide

This guide will help you deploy your blockchain-verified portfolio application from GitHub to Polygon mainnet using GitHub Actions and Netlify.

## 🚀 Quick Setup Overview

1. **GitHub Secrets Setup** - Configure secrets for blockchain deployment
2. **Netlify Configuration** - Set up hosting with environment variables  
3. **Push to GitHub** - Trigger automated deployment pipeline
4. **Verify Deployment** - Confirm contracts and frontend are live

---

## 📋 Prerequisites

- GitHub repository with your portfolio code
- Netlify account (free tier works)
- Infura account with Polygon API access
- MetaMask wallet with MATIC for deployment
- Etherscan Multichain API key (optional, for contract verification across 60+ networks)

---

## 🔐 Step 1: GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

### 🔗 Navigation
1. Go to your GitHub repository
2. Click `Settings` → `Secrets and variables` → `Actions`
3. Click `New repository secret` for each secret below

### 🔑 Required Secrets

#### **INFURA_API_KEY**
```
Your Infura Project ID for Polygon access
Example: abc123def456ghi789jkl012mno345pqr678stu901
```
- Get from: https://infura.io → Create new project → Project Settings

#### **DEPLOYER_PRIVATE_KEY**
```
Your MetaMask wallet private key (without 0x prefix)
Example: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```
- ⚠️ **CRITICAL**: Export from MetaMask → Account Details → Export Private Key
- 🔒 **SECURITY**: Never share this key publicly

#### **WALLET_ADDRESS**
```
Your MetaMask wallet address (with 0x prefix)
Example: 0x1234567890123456789012345678901234567890
```
- Copy from MetaMask wallet

#### **ETHERSCAN_API_KEY** (Optional - Recommended)
```
Etherscan Multichain API key for contract verification (supports 60+ networks including Polygon)
Example: ABC123DEF456GHI789JKL012MNO345PQR678STU901
```
**🔄 NEW: Etherscan Multichain API**
- **Get from**: https://docs.etherscan.io/getting-started/viewing-api-usage-statistics
- **Register**: [Etherscan Multichain API Registration](https://etherscan.io/register)
- **Alternative**: https://polygonscan.com/apis (redirects to Etherscan Multichain)
- **Benefits**: One API key works across Ethereum, Polygon, BSC, Arbitrum, and 60+ other networks
- **Free Tier**: 100,000 requests/day across all networks
- **Limits**: Free accounts can create up to 3 API keys total
- **Website URL**: Use your GitHub repo URL if site isn't deployed yet (e.g., `https://github.com/yourusername/your-repo`)

💡 **Tip**: Since you can only create 3 API keys, use descriptive names like "Portfolio-Deployment", "Development", "Backup"

⚠️ **Migration Note**: If you previously used `POLYGONSCAN_API_KEY`, update your GitHub Secret to `ETHERSCAN_API_KEY` with your Etherscan Multichain API key.

#### **NETLIFY_AUTH_TOKEN**
```
Netlify personal access token for deployment
Example: nfp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
```
- Get from: Netlify → User Settings → Applications → Personal Access Tokens

#### **NETLIFY_SITE_ID**
```
Netlify site identifier for your deployment
Example: abc123de-f456-7890-1234-567890abcdef
```
- Get from: Netlify → Site Settings → General → Site Information

---

## 🌐 Step 2: Netlify Configuration

### Create New Site
1. Login to [Netlify](https://netlify.com)
2. Click `Add new site` → `Import an existing project`
3. Choose `GitHub` and select your repository
4. **Don't deploy yet** - we need to configure environment variables first

### Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `22.19.0`

### Set Environment Variables
Go to Site Settings → Environment Variables and add:

```bash
# Network Configuration
VITE_NETWORK_ID=137
VITE_NETWORK_NAME=Polygon
VITE_RPC_URL=https://polygon-rpc.com
VITE_POLYGONSCAN_BASE_URL=https://polygonscan.com/address/

# Application Info
VITE_APP_NAME=Deepak's Portfolio
VITE_ENVIRONMENT=production

# Contract addresses will be set automatically by GitHub Actions
# VITE_CONTRACT_ADDRESS=(set by GitHub Actions)
# VITE_VERIFICATION_ADDRESS=(set by GitHub Actions) 
# VITE_WALLET_ADDRESS=(set by GitHub Actions)
```

### Get Site ID
1. Go to Site Settings → General → Site Information
2. Copy the `Site ID` value
3. Add it as `NETLIFY_SITE_ID` secret in GitHub

---

## 🚀 Step 3: Deployment Process

### Prerequisites Check
✅ MetaMask wallet has MATIC for gas fees (~0.01 MATIC minimum)  
✅ All GitHub secrets are configured  
✅ Netlify site is created with environment variables  
✅ Repository code is ready for deployment  

### Trigger Deployment
1. Push your code to the `main` or `master` branch:
   ```bash
   git add .
   git commit -m "🚀 Deploy to Polygon mainnet"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - ✅ Compile smart contracts
   - ✅ Deploy to Polygon mainnet
   - ✅ Verify contracts on Polygonscan
   - ✅ Update frontend configuration
   - ✅ Deploy to Netlify
   - ✅ Store verification data on blockchain

### Monitor Deployment
1. Go to GitHub → Actions tab
2. Watch the deployment progress
3. Check logs for contract addresses
4. Verify successful completion

---

## 🔍 Step 4: Verification & Testing

### Contract Verification
1. Check GitHub Actions logs for contract addresses:
   ```
   Portfolio Contract: 0x1234...5678
   Verification Contract: 0xabcd...efgh
   ```

2. Verify on Polygonscan:
   - Portfolio: `https://polygonscan.com/address/YOUR_PORTFOLIO_ADDRESS`
   - Verification: `https://polygonscan.com/address/YOUR_VERIFICATION_ADDRESS`

### Frontend Testing
1. Visit your Netlify site URL
2. Verify blockchain verification component loads
3. Check that portfolio data loads from Polygon
4. Test verification status display

### Blockchain Verification
1. Ensure verification score shows properly
2. Check that code hashes are stored on-chain
3. Verify security reports are recorded
4. Confirm deployment records are accurate

---

## 🔧 Troubleshooting

### Common Issues

#### **Deployment Fails: Insufficient Gas**
- **Solution**: Add more MATIC to your deployer wallet
- **Minimum**: ~0.01 MATIC for deployment

#### **Contract Verification Fails**
- **Check**: ETHERSCAN_API_KEY is correct and valid for multichain
- **Try**: Manual verification on Polygonscan
- **Verify**: API key has sufficient quota (100k requests/day)

#### **Frontend Build Fails**
- **Check**: Netlify environment variables are set
- **Verify**: Node version is 22.19.0

#### **GitHub Actions Timeout**
- **Check**: Network congestion on Polygon
- **Try**: Re-run the failed job

### Getting Help
- Check GitHub Actions logs for detailed error messages
- Verify all secrets are properly configured
- Ensure wallet has sufficient MATIC balance
- Check Netlify build logs for frontend issues

---

## 📊 Monitoring & Maintenance

### Contract Monitoring
- Monitor contract calls on Polygonscan
- Check gas usage and optimization opportunities
- Track verification data integrity

### Frontend Updates
- New deployments automatically update contract addresses
- Verification component shows real-time blockchain status
- Security reports update with each deployment

### Cost Optimization
- Polygon offers low gas fees
- Consider using Mumbai testnet for development
- Monitor gas usage for contract optimization

---

## 🎉 Success Checklist

After successful deployment, you should have:

✅ Smart contracts deployed on Polygon mainnet  
✅ Contracts verified on Polygonscan  
✅ Frontend deployed on Netlify  
✅ Blockchain verification component working  
✅ Codebase integrity hashes stored on-chain  
✅ Security reports recorded on blockchain  
✅ Automated deployment pipeline active  

---

## 🔒 Security Best Practices

- ✅ Never commit private keys to repository
- ✅ Use GitHub Secrets for all sensitive data
- ✅ Regularly rotate API keys
- ✅ Monitor wallet for unauthorized transactions
- ✅ Keep MetaMask and browser updated
- ✅ Use hardware wallet for high-value operations

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Verify all prerequisites are met
4. Check Netlify deployment logs

Remember: The blockchain verification system provides unprecedented transparency and trust in your deployed application! 🚀