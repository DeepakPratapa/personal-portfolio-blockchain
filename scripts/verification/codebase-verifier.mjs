#!/usr/bin/env node

/**
 * Codebase Verification Script
 * Generates cryptographic hashes of all project components for blockchain verification
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

class CodebaseVerifier {
    constructor(projectRoot = '.') {
        this.projectRoot = path.resolve(projectRoot);
        this.results = {
            projectName: 'blockchain-verified-portfolio',
            version: '',
            gitCommitHash: '',
            sourceCodeHash: '',
            dependenciesHash: '',
            configHash: '',
            buildArtifactsHash: '',
            deploymentHash: '',
            timestamp: new Date().toISOString(),
            files: {}
        };
    }

    // Generate SHA256 hash of a string
    generateHash(content) {
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    // Get Git commit hash
    getGitCommitHash() {
        try {
            const commitHash = execSync('git rev-parse HEAD', { 
                cwd: this.projectRoot,
                encoding: 'utf8' 
            }).trim();
            console.log('✅ Git commit hash:', commitHash);
            return commitHash;
        } catch (error) {
            console.log('⚠️  Warning: Could not get Git commit hash:', error.message);
            return 'unknown';
        }
    }

    // Get project version from package.json
    getProjectVersion() {
        try {
            const packagePath = path.join(this.projectRoot, 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            return packageJson.version || '1.0.0';
        } catch (error) {
            console.log('⚠️  Warning: Could not read package.json version');
            return '1.0.0';
        }
    }

    // Hash source code files (excluding node_modules, dist, etc.)
    hashSourceCode() {
        const sourceFiles = this.getSourceFiles();
        const combinedContent = sourceFiles
            .sort()
            .map(file => {
                const content = fs.readFileSync(file, 'utf8');
                return `${path.relative(this.projectRoot, file)}:${content}`;
            })
            .join('\\n');
        
        console.log(`✅ Hashed ${sourceFiles.length} source code files`);
        return this.generateHash(combinedContent);
    }

    // Get list of source files
    getSourceFiles() {
        const extensions = ['.js', '.jsx', '.ts', '.tsx', '.sol', '.json', '.md', '.yml', '.yaml'];
        const excludeDirs = ['node_modules', 'dist', 'build', '.git', 'coverage', 'artifacts', 'cache'];
        const files = [];

        const walkDir = (dir) => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    if (!excludeDirs.includes(item) && !item.startsWith('.')) {
                        walkDir(fullPath);
                    }
                } else {
                    const ext = path.extname(item);
                    if (extensions.includes(ext)) {
                        files.push(fullPath);
                    }
                }
            }
        };

        walkDir(this.projectRoot);
        return files;
    }

    // Hash package.json and package-lock.json for dependencies
    hashDependencies() {
        const depFiles = ['package.json', 'package-lock.json', 'yarn.lock'].filter(file => 
            fs.existsSync(path.join(this.projectRoot, file))
        );
        
        const combinedContent = depFiles
            .map(file => fs.readFileSync(path.join(this.projectRoot, file), 'utf8'))
            .join('\\n');
            
        console.log(`✅ Hashed ${depFiles.length} dependency files`);
        return this.generateHash(combinedContent);
    }

    // Hash configuration files
    hashConfigFiles() {
        const configFiles = [
            'vite.config.js',
            'hardhat.config.cjs',
            'tailwind.config.js',
            'postcss.config.js',
            'eslint.config.js',
            'netlify.toml',
            '.gitignore'
        ].filter(file => fs.existsSync(path.join(this.projectRoot, file)));
        
        const combinedContent = configFiles
            .map(file => fs.readFileSync(path.join(this.projectRoot, file), 'utf8'))
            .join('\\n');
            
        console.log(`✅ Hashed ${configFiles.length} configuration files`);
        return this.generateHash(combinedContent);
    }

    // Hash build artifacts (if they exist)
    hashBuildArtifacts() {
        const buildPaths = ['dist', 'build', 'artifacts'];
        let combinedContent = '';
        
        for (const buildPath of buildPaths) {
            const fullPath = path.join(this.projectRoot, buildPath);
            if (fs.existsSync(fullPath)) {
                const files = this.getBuildFiles(fullPath);
                combinedContent += files
                    .map(file => fs.readFileSync(file, 'utf8'))
                    .join('\\n');
            }
        }
        
        console.log('✅ Hashed build artifacts');
        return this.generateHash(combinedContent || 'no-build-artifacts');
    }

    // Get build files recursively
    getBuildFiles(dir) {
        const files = [];
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                files.push(...this.getBuildFiles(fullPath));
            } else {
                files.push(fullPath);
            }
        }
        
        return files;
    }

    // Hash deployment configuration
    hashDeploymentConfig() {
        const deploymentFiles = [
            '.github/workflows/deploy.yml',
            'scripts/deploy.js',
            'scripts/verification'
        ].filter(file => fs.existsSync(path.join(this.projectRoot, file)));
        
        let combinedContent = '';
        
        for (const file of deploymentFiles) {
            const fullPath = path.join(this.projectRoot, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                const files = this.getSourceFiles().filter(f => f.includes(file));
                combinedContent += files
                    .map(f => fs.readFileSync(f, 'utf8'))
                    .join('\\n');
            } else {
                combinedContent += fs.readFileSync(fullPath, 'utf8');
            }
        }
        
        console.log('✅ Hashed deployment configuration');
        return this.generateHash(combinedContent || 'no-deployment-config');
    }

    // Validate Git status
    validateGitStatus() {
        try {
            const status = execSync('git status --porcelain', { 
                cwd: this.projectRoot,
                encoding: 'utf8' 
            }).trim();
            
            if (status) {
                console.log('⚠️  Warning: Working directory has uncommitted changes:');
                console.log(status);
                return false;
            }
            
            console.log('✅ Git working directory is clean');
            return true;
        } catch (error) {
            console.log('⚠️  Warning: Could not check Git status:', error.message);
            return false;
        }
    }

    // Run security checks
    async runSecurityChecks() {
        console.log('🔒 Running security checks...');
        
        const checks = {
            npmAudit: false,
            eslint: false,
            gitSecrets: false
        };
        
        // NPM Audit
        try {
            execSync('npm audit --audit-level=moderate', { 
                cwd: this.projectRoot,
                stdio: 'pipe'
            });
            checks.npmAudit = true;
            console.log('✅ NPM audit passed');
        } catch (error) {
            console.log('❌ NPM audit found vulnerabilities');
        }
        
        // ESLint
        try {
            execSync('npx eslint src/ --max-warnings 0', { 
                cwd: this.projectRoot,
                stdio: 'pipe'
            });
            checks.eslint = true;
            console.log('✅ ESLint passed');
        } catch (error) {
            console.log('❌ ESLint found issues');
        }
        
        return checks;
    }

    // Generate comprehensive verification report
    async generateReport() {
        console.log('🔍 Starting codebase verification...');
        console.log('📁 Project root:', this.projectRoot);
        
        // Basic info
        this.results.version = this.getProjectVersion();
        this.results.gitCommitHash = this.getGitCommitHash();
        
        // Validate Git status
        const isGitClean = this.validateGitStatus();
        
        // Generate hashes
        this.results.sourceCodeHash = this.hashSourceCode();
        this.results.dependenciesHash = this.hashDependencies();
        this.results.configHash = this.hashConfigFiles();
        this.results.buildArtifactsHash = this.hashBuildArtifacts();
        this.results.deploymentHash = this.hashDeploymentConfig();
        
        // Security checks
        const securityChecks = await this.runSecurityChecks();
        
        // Final verification hash (hash of all hashes)
        const finalHash = this.generateHash(
            this.results.sourceCodeHash +
            this.results.dependenciesHash +
            this.results.configHash +
            this.results.buildArtifactsHash +
            this.results.deploymentHash
        );
        
        const report = {
            ...this.results,
            finalVerificationHash: finalHash,
            isGitClean,
            securityChecks,
            verification: {
                isValid: isGitClean && Object.values(securityChecks).every(check => check),
                timestamp: new Date().toISOString()
            }
        };
        
        // Save report
        const reportPath = path.join(this.projectRoot, 'verification-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log('\\n' + '='.repeat(60));
        console.log('📋 VERIFICATION REPORT');
        console.log('='.repeat(60));
        console.log('Project:', report.projectName);
        console.log('Version:', report.version);
        console.log('Git Commit:', report.gitCommitHash);
        console.log('Source Code Hash:', report.sourceCodeHash);
        console.log('Dependencies Hash:', report.dependenciesHash);
        console.log('Config Hash:', report.configHash);
        console.log('Build Artifacts Hash:', report.buildArtifactsHash);
        console.log('Deployment Hash:', report.deploymentHash);
        console.log('Final Verification Hash:', report.finalVerificationHash);
        console.log('Git Status Clean:', report.isGitClean ? '✅' : '❌');
        console.log('Security Checks:', Object.values(securityChecks).every(c => c) ? '✅' : '❌');
        console.log('Overall Valid:', report.verification.isValid ? '✅' : '❌');
        console.log('='.repeat(60));
        console.log('📄 Report saved to:', reportPath);
        
        return report;
    }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
    const verifier = new CodebaseVerifier();
    verifier.generateReport().catch(console.error);
}

export default CodebaseVerifier;