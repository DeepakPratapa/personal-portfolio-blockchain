import pkg from 'hardhat';
const { ethers } = pkg;

// Helper function to execute and log transactions without changing any data
async function executeTransaction(txPromise, description) {
  console.log(`\nSubmitting transaction for: ${description}...`);
  const tx = await txPromise;
  console.log(`... Transaction Hash: ${tx.hash}`);
  console.log(`⏳ Waiting for confirmation...`);
  await tx.wait(1); // Wait for 1 block confirmation
  console.log(`✅ Transaction confirmed for: "${description}"`);
}

async function main() {
    console.log("🔄 Initializing deployment...");
    console.log("📅 Timestamp:", new Date().toISOString());
    
    console.log("🔗 Connecting to network...");
    const [deployer] = await ethers.getSigners();
    const network = await ethers.provider.getNetwork();

    console.log("✅ Connected successfully!");
    console.log("🚀 Deploying contracts with the account:", deployer.address);
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);
    console.log("💰 Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "MATIC");

    // Deploy Portfolio Contract
    console.log("\n📄 Deploying Portfolio contract...");
    const Portfolio = await ethers.getContractFactory("Portfolio");
    const portfolio = await Portfolio.deploy(
      "Deepak Balaji Pratapa",
      "Full Stack Developer | Cloud Solutions | Cybersecurity Engineer",
      "A recent Computer Science graduate with a strong foundation in both software engineering and cybersecurity. Proven ability to design and build secure, scalable full-stack applications using React, Node.js, and Python. Experienced in cloud-native development with AWS and Firebase, implementing robust CI/CD pipelines, and applying industry-standard security tools for vulnerability assessment, threat detection, and incident response. Eager to apply a blend of software development and security expertise to build and protect innovative digital solutions.",
      "+1-(405)856-9454",
      "deepakpratapa2@gmail.com",
      "https://www.linkedin.com/in/deepak-pratapa-b6316b178",
      "https://github.com/DeepakPratapa"
    );

    console.log("... Portfolio Deployment Transaction Hash:", portfolio.deploymentTransaction().hash);
    console.log("⏳ Waiting for Portfolio contract to be deployed...");
    await portfolio.waitForDeployment();
    const portfolioAddress = await portfolio.getAddress();
    console.log("✅ Portfolio deployed to:", portfolioAddress);

    // Deploy ProjectVerification Contract
    console.log("\n📄 Deploying ProjectVerification contract...");
    const ProjectVerification = await ethers.getContractFactory("ProjectVerification");
    const projectVerification = await ProjectVerification.deploy();

    console.log("... ProjectVerification Deployment Transaction Hash:", projectVerification.deploymentTransaction().hash);
    console.log("⏳ Waiting for ProjectVerification contract to be deployed...");
    await projectVerification.waitForDeployment();
    const verificationAddress = await projectVerification.getAddress();
    console.log("✅ ProjectVerification deployed to:", verificationAddress);

    console.log("\n" + "=".repeat(80));
    console.log("🚀 POPULATING PORTFOLIO DATA...");
    console.log("=".repeat(80));

    // Populate skills
    await executeTransaction(portfolio.addSkillCategory("languages", ['JavaScript', 'Go', 'Python', 'C++', 'C', 'C#', 'PHP', 'Bash', 'TypeScript', 'Solidity']), "Add Skill: Languages");
    await executeTransaction(portfolio.addSkillCategory("frameworks", ['ReactJS', 'Node.js', 'Django', '.NET', 'Flask', 'Hardhat', 'Truffle']), "Add Skill: Frameworks");
    await executeTransaction(portfolio.addSkillCategory("databases", ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite']), "Add Skill: Databases");
    await executeTransaction(portfolio.addSkillCategory("cloud", ['AWS', 'Firebase']), "Add Skill: Cloud");
    await executeTransaction(portfolio.addSkillCategory("devops", ['Docker', 'Git', 'GitHub Actions', 'CI/CD Pipelines']), "Add Skill: DevOps");
    await executeTransaction(portfolio.addSkillCategory("security", ['Wireshark', 'Nmap', 'Metasploit', 'Kali Linux', 'Burp Suite', 'Suricata', 'OPNsense', 'Nessus', 'Security Onion', 'Volatility', 'Autopsy', 'Sleuth Kit', 'Sysinternals Suite', 'FTK Imager', 'OpenVAS', 'Qualys', 'Alien Vault OTX', 'VirusTotal']), "Add Skill: Security");
    await executeTransaction(portfolio.addSkillCategory("expertise", ['Secure Coding', 'API Design', 'Vulnerability Assessment', 'Incident Response', 'Penetration Testing', 'Network Defense', 'Threat Intelligence', 'Malware Analysis', 'Risk Management', 'Smart Contract Development', 'Cryptographic Hash Verification']), "Add Skill: Expertise");
    await executeTransaction(portfolio.addSkillCategory("blockchain", ['Ethereum', 'Polygon', 'Smart Contracts', 'Solidity', 'Web3.js', 'Ethers.js', 'DeFi', 'Cryptographic Verification', 'Blockchain Security']), "Add Skill: Blockchain");
    await executeTransaction(portfolio.addSkillCategory("other", ['REST APIs', 'Blockchain Development', 'Cryptography', 'Code Verification Systems']), "Add Skill: Other");

    // Populate experience as an array of strings
    await executeTransaction(portfolio.addExperience('Application Developer Intern', 'Precistat IT Solutions', 'Jun 2022 -- Jul 2022', [
     'Automated and secured Python data workflows for a US tax consulting firm, applying robust cryptographic data protection and requirements-based error handling to ensure client confidentiality. This work reduced manual workflow time by 30% and significantly improved operational efficiency.',
     'Developed and maintained internal tools in Python, focusing on writing clean, well-tested code that integrated seamlessly with existing accounting systems to streamline daily operations.',
     'Partnered with management and participated in Agile team meetings to enhance data integrity and streamline processes, contributing to a collaborative environment that supported production deployments and refined overall code quality.'
    ]), "Add Experience: Precistat IT Solutions");

    await executeTransaction(portfolio.addExperience('Graduate Research Assistant', 'University of Central Oklahoma', 'Feb 2024 -- Apr 2024', [
     'Built and deployed a secure Django web application with HTTPS, which enabled secure data visualization and facilitated seamless collaboration for a research project.',
     'Engineered an enhanced network monitoring system using OPNsense and Suricata, which included automated TLS decryption, to provide real-time threat intelligence and strengthen lab security.',
     'Simulated the IEEE 2030.5 protocol for smart grid communication using Python to assess and mitigate cybersecurity risks, contributing to forward-thinking research in secure energy systems.'
    ]), "Add Experience: UCO Research Assistant");

    await executeTransaction(portfolio.addExperience('Graduate Teaching Assistant', 'University of Central Oklahoma', 'Jan 2025 -- May 2025', [
     'Led hands-on lab sessions and workshops on secure software development, network security, and penetration testing tools like Wireshark, Metasploit, and Burp Suite, equipping over 30 students with practical cybersecurity skills.',
     'Mentored students on their projects, providing constructive feedback on code quality, cryptographic protocols, and security best practices, which significantly improved the quality and security of their work.',
     'Contributed to the design of course modules that emphasized secure coding, modular design, and robust integration testing, enhancing the curriculum to meet modern engineering standards.'
    ]), "Add Experience: UCO Teaching Assistant");
 
    // Populate projects with array descriptions
    const projects = [
        {
         title: 'Blockchain-Verified Portfolio Application with Comprehensive Codebase Integrity System',
         description: [
           'Architected and developed a revolutionary portfolio application utilizing a two-layer blockchain verification system on Polygon, demonstrating advanced blockchain development, smart contract engineering, and cryptographic security principles.',
           'Engineered a comprehensive codebase verification system with automated pre-deployment security checks, reproducible build verification, and post-deployment integrity validation, ensuring complete transparency and immutable proof of code authenticity.',
           'Implemented smart contracts in Solidity for portfolio data storage and cryptographic hash verification, featuring automated deployment pipelines, dependency integrity checks, and public auditability mechanisms that allow anyone to verify the deployed application\'s authenticity.',
           'Built advanced verification tools including deterministic build systems, Git integrity validation, security vulnerability scanning, and blockchain-based hash storage, creating a tamper-proof deployment process that sets new standards for transparent software delivery.'
         ],
         repo: 'https://github.com/DeepakPratapa/personal-portfolio-blockchain',
         caseStudy: '{"challenge":"Modern web applications lack transparency and verifiable integrity, making it difficult to prove that deployed code matches the source code. Traditional deployment processes are vulnerable to tampering, lack public auditability, and provide no cryptographic proof of authenticity. The challenge was to create a revolutionary system that provides immutable proof of code integrity while maintaining usability and demonstrating advanced blockchain development skills.","architecture":{"title":"Two-Layer Blockchain Architecture","content":"The solution implements a sophisticated two-layer blockchain system on Polygon, combining data storage with cryptographic verification to create an unprecedented level of transparency and security.","stack":[{"name":"Solidity Smart Contracts","desc":"Two main contracts: Portfolio contract for data storage and ProjectVerification contract for cryptographic hash storage. Implements advanced features like role-based access control, automated verification functions, and gas-optimized operations."},{"name":"React Frontend","desc":"Modern, responsive portfolio interface built with React, Vite, and Tailwind CSS. Features real-time blockchain data fetching, interactive project showcases, and built-in verification tools for public auditing."},{"name":"Hardhat Development Framework","desc":"Complete smart contract development environment with automated testing, deployment scripts, and network configuration. Includes custom verification tools and reproducible build systems."},{"name":"Polygon Blockchain","desc":"Layer 2 solution chosen for low gas costs and high throughput while maintaining Ethereum compatibility. Enables cost-effective deployment and verification operations."},{"name":"Cryptographic Verification System","desc":"SHA256-based hash generation for source code, dependencies, configuration files, and build artifacts. Implements deterministic build verification and multi-layer integrity checking."},{"name":"Automated Security Pipeline","desc":"Pre-deployment security checks including Git status validation, dependency vulnerability scanning, ESLint code quality verification, and reproducible build testing."}]},"implementation":"The project was implemented using cutting-edge blockchain development practices. The smart contracts were developed with security-first principles, featuring comprehensive access controls and gas optimization. A sophisticated verification system generates cryptographic hashes of all project components including source code, dependencies, configuration files, and build artifacts. The deployment process includes automated security checks, vulnerability scanning, and reproducible build verification. Post-deployment tools enable public verification, allowing anyone to cryptographically verify the deployed application against its source code. The system includes comprehensive monitoring, automated integrity checking, and detailed audit trails.","scalability":"The blockchain-based architecture provides inherent scalability and immutability. Smart contracts are deployed on Polygon for cost-effective operations while maintaining security. The verification system is designed to handle large codebases efficiently, with optimized hash generation and minimal on-chain storage requirements. The public verification tools can be used by unlimited users simultaneously without affecting the system\'s performance.","security":"Security is paramount throughout the entire system. Pre-deployment checks prevent compromised deployments, cryptographic hashing ensures data integrity, blockchain storage provides immutability, and public verification enables transparent auditing. The system includes vulnerability scanning, dependency integrity checking, environment security validation, and automated security monitoring.","innovation":"This project represents a groundbreaking approach to software deployment transparency. It combines advanced blockchain development, cryptographic security, and automated verification to create a new standard for trustworthy software delivery. The system demonstrates expertise in smart contract development, security engineering, and blockchain architecture while providing practical value for establishing trust in deployed applications.","conclusion":"This blockchain-verified portfolio application showcases mastery of advanced blockchain development, smart contract engineering, cryptographic security, and software architecture. It demonstrates not only technical expertise but also innovative thinking in solving real-world problems of software transparency and trust. The comprehensive verification system sets a new standard for verifiable software deployment and serves as a powerful demonstration of cutting-edge blockchain development skills."}'
       },
       {
         title: 'Cloud-Based Serverless Image Processing Platform (AWS)',
         description: [
           'Designed and implemented a scalable, multi-user serverless web application utilizing AWS Lambda, S3, API Gateway, and Amplify. The platform supports real-time image uploads and processing.',
           'Engineered a robust CI/CD pipeline using AWS CloudFormation and GitHub Actions to automate code testing, packaging, and deployment, reducing manual errors and accelerating the development lifecycle.',
           'Ensured platform security by configuring secure IAM roles and S3 bucket policies. Proactively monitored performance with AWS CloudWatch to ensure high availability and reliability and allow for rapid troubleshooting.'
         ],
         repo: 'https://github.com/DeepakPratapa/serverless-img-proc-aws',
         caseStudy: '{"challenge":"The objective was to create a scalable, cost-effective, and secure platform for real-time image processing. Traditional server-based solutions often lead to high operational costs and underutilization of resources, especially for a workload like image processing, which can be highly variable. The platform needed to handle concurrent user uploads and processing requests without manual scaling or maintenance.","architecture":{"title":"Architecture and Design Decisions","content":"The solution was built using a serverless architecture on AWS, which was an ideal choice for this use case because it provides automatic scaling, cost-effectiveness, and high availability for variable workloads like image processing while eliminating server management overhead.","stack":[{"name":"AWS Amplify","desc":"Used to host the static front-end application and manage the full-stack deployment. Its seamless integration with GitHub Actions simplified the CI/CD pipeline."},{"name":"Amazon S3","desc":"Employed for its high durability and scalability as the primary storage solution for raw and processed images. S3\'s event notification system was crucial for triggering downstream processing."},{"name":"AWS API Gateway","desc":"The entry point for the application\'s API. It provides secure, managed endpoints that trigger the backend logic and handle authentication, routing, and rate limiting."},{"name":"AWS Lambda","desc":"This was the core of the processing logic. Lambda functions were used for several key tasks. It was the ideal choice because image processing is an intermittent, event-driven task, making the solution highly cost-efficient and infinitely scalable. An S3 event notification would trigger a Lambda function to process an image as soon as it was uploaded to a specific bucket. This enabled a real-time, responsive user experience."},{"name":"AWS CloudFormation","desc":"This \\"Infrastructure as Code\\" service was used to define and deploy all the AWS resources. This ensures that the entire infrastructure is version-controlled and reproducible, making it easy to deploy the application in different environments."}]},"implementation":"The project was implemented in distinct, modular stages. First, a React front end was built to handle user authentication and image uploads. Upon a successful upload, an event was triggered in S3, which invoked a Lambda function. This function then performed the necessary image manipulation (e.g., resizing, watermarking) and stored the processed image in a separate S3 bucket. A robust CI/CD pipeline was created using GitHub Actions. This workflow automated code testing and resource provisioning with CloudFormation, ensuring that every code change was securely and reliably deployed to production. This automation significantly reduced deployment time and minimized human error.","scalability":"The serverless architecture guarantees horizontal scalability out of the box. As the number of concurrent users and image uploads increases, AWS Lambda automatically scales by running multiple instances of the processing function, with no manual intervention required. Security was a primary consideration. All interactions were secured via AWS IAM roles, granting each service the minimum necessary permissions to perform its function. S3 bucket policies were configured to prevent public access, and API Gateway endpoints were secured to ensure that only authenticated requests could access the backend. Proactive monitoring with AWS CloudWatch was implemented to track performance, identify potential issues, and log all activities for auditing and troubleshooting purposes.","conclusion":"This project demonstrates a comprehensive understanding of secure, scalable, and cost-effective cloud-native development. By leveraging a serverless architecture, the platform offers a powerful solution that can handle unpredictable loads while minimizing operational overhead. The entire system—from front-end to backend and deployment pipeline—reflects a modern, best-practices approach to software engineering."}'
       },
       {
         title: 'Cloud-Based Task Management and Scheduling Application',
         description: [
           'Developed a full-stack web application with React and Firebase for real-time task management and collaboration. The app features secure authentication and real-time data synchronization.',
           'Implemented advanced event categorization and filtering to help users organize and prioritize tasks efficiently, and automated email notifications with Google Cloud Functions to improve user engagement and task completion rates.',
           'Demonstrated expertise in serverless architectures, modular component design, and cloud-based notification systems, creating a seamless and secure user experience.'
         ],
         repo: 'https://github.com/DeepakPratapa/serverless-task-manager-firebase',
         caseStudy: '{"challenge":"The objective was to create a user-friendly task management application that could handle real-time data synchronization and provide automated notifications to improve user productivity. The challenge was to build a scalable and secure platform with minimal overhead and a focus on real-time functionality.","architecture":{"title":"Architecture and Design Decisions","content":"The solution was built using a serverless approach to simplify development and deployment. The combination of React for the front-end and Firebase for the backend provided a robust, real-time platform with built-in scalability and security features.","stack":[{"name":"React","desc":"The front-end was built with React for its component-based architecture, which allowed for a modular and maintainable codebase. It provided a responsive user interface that could handle dynamic data efficiently."},{"name":"Firebase","desc":"Firebase was chosen as the backend-as-a-service for its real-time database (Firestore), secure authentication (Firebase Auth), and serverless functions (Cloud Functions). This eliminated the need to manage a backend server and simplified the implementation of real-time features."},{"name":"Google Cloud Functions","desc":"Used to automate business logic and notifications. Cloud Functions were triggered by events in the Firestore database, such as a task being added or a deadline approaching, to send automated email notifications to users. This improved user engagement and ensured timely task completion."},{"name":"Firebase Auth","desc":"Provided secure and easy-to-implement user authentication, including email/password and social logins, ensuring that user data was protected and access was restricted to authorized users."}]},"implementation":"The application was developed using an Agile methodology, with features implemented in small, iterative cycles. The React front-end was designed with a focus on user experience, providing an intuitive interface for creating, managing, and categorizing tasks. Firestore was used to store all task data, with a real-time listener on the front-end to ensure that all changes were instantly reflected for all users, enabling collaborative features. Cloud Functions were implemented to handle backend logic, such as sending email reminders, and were triggered by events from Firestore. The entire codebase was version-controlled with Git and deployed seamlessly using Firebase Hosting.","scalability":"The Firebase platform provides excellent scalability out of the box. Firestore automatically scales with the number of documents and users, while Cloud Functions can handle a large number of concurrent requests. This means the application can grow with its user base without requiring any manual server scaling or maintenance. Firebase Auth provides a secure and scalable way to manage user accounts.","conclusion":"This project showcases a strong grasp of full-stack development, serverless architectures, and real-time application design. By leveraging Firebase, the solution delivers a powerful and secure application with features that enhance user productivity. The project highlights a blend of security principles, full-stack development, and distributed ledger technology."}'
       },
       {
         title: 'Decentralizing CVE Registration Using Blockchain',
         description: [
           'Engineered a decentralized CVE registration system on Hyperledger Fabric to enhance transparency and security in vulnerability reporting. The platform uses smart contracts for schema validation and role-based access control.',
           'Built a secure, web-based UI that integrates with the blockchain backend, allowing for streamlined submission, categorization, and real-time interaction for stakeholders.',
           'Implemented certificate-based authentication and peer-to-peer governance mechanisms, ensuring secure onboarding and access management for all users, and demonstrating a deep understanding of blockchain application security.',
           'Assessed the system\'s scalability and security for global vulnerability data sharing, highlighting its potential to transform how vulnerabilities are tracked and shared.'
         ],
         repo: '',
         caseStudy: '{"challenge":"The centralized nature of current Common Vulnerabilities and Exposures (CVE) registration processes can lead to single points of failure, lack of transparency, and delays in reporting. The objective was to design and prototype a decentralized system that enhances the security, transparency, and integrity of the CVE registration process using blockchain technology.","architecture":{"title":"Architecture and Design Decisions","content":"The solution was built on Hyperledger Fabric, a permissioned blockchain platform, which was an ideal choice for this use case because it provides privacy and confidentiality for sensitive vulnerability data while still offering a verifiable, immutable ledger.","stack":[{"name":"Hyperledger Fabric","desc":"This permissioned blockchain was used to create a network of trusted nodes for CVE registration. Its channels and private data collections were leveraged to ensure that only authorized parties could access specific vulnerability data."},{"name":"Smart Contracts (Chaincode)","desc":"Written in Go, smart contracts were used to define the rules for submitting, updating, and validating CVEs. This ensured that all data was consistent and that only valid entries were added to the blockchain."},{"name":"Web-Based UI","desc":"A front-end was built to allow users to interact with the blockchain. This user interface provided a simple and intuitive way for security researchers and vendors to submit and view CVEs, abstracting the complexity of the blockchain backend."},{"name":"Certificate-Based Authentication","desc":"Fabric\'s identity management system was used to provide secure, certificate-based authentication. This ensured that only authorized participants could join the network and submit data, strengthening the security posture of the entire system."}]},"implementation":"The project was implemented by first setting up a local Hyperledger Fabric network with multiple peers and an ordering service. Smart contracts were developed in Go to define the business logic for CVE submissions and validations. The web UI was then built to connect to the blockchain via a gateway, allowing users to send transactions and query the ledger. The system was tested to ensure that transactions were immutable and that data could not be tampered with once recorded. The peer-to-peer governance model of Hyperledger was a key component, ensuring that the network was resilient and decentralized.","scalability":"Hyperledger Fabric is designed for enterprise-grade applications and offers high transaction throughput and low latency, making it suitable for a large-scale, global vulnerability database. The permissioned nature of the network also helps in managing governance and ensuring that all participants are known and trusted.","conclusion":"This project demonstrates a comprehensive understanding of secure, scalable, and cost-effective cloud-native development. By leveraging a serverless architecture, the platform offers a powerful solution that can handle unpredictable loads while minimizing operational overhead. The entire system—from front-end to backend and deployment pipeline—reflects a modern, best-practices approach to software engineering."}'
       }
    ];

    for (const [index, proj] of projects.entries()) {
        await executeTransaction(portfolio.addProject(proj.title, proj.description, proj.repo, proj.caseStudy), `Add Project ${index + 1}: ${proj.title}`);
    }
    
    // Populate research
    await executeTransaction(portfolio.addResearch('Secure Data Encryption for ATM Transactions', 'Sep 2022', [
     'Authored a research paper proposing advanced encryption for ATM transactions, enhancing security and mitigating common attack vectors. The work was published in the International Research Journal of Engineering and Technology (IRJET).',
     'Developed a prototype in Python using Hash and RSA algorithms, which was validated to significantly reduce key exposure and unauthorized data access, demonstrating improved resistance to man-in-the-middle and reconnaissance attacks.'
    ], 'https://www.irjet.net/archives/V9/i9/IRJET-V9I9127.pdf'), "Add Research: ATM Encryption");
    
    // Populate certifications
    await executeTransaction(portfolio.addCertification('Cyber Operations', 'Dec 2024', 'University of Central Oklahoma', 'https://www.credly.com/badges/db433472-9a95-4f15-b35d-2e8504613636/public_url', [
     'Gained practical engineering skills in network defense, offensive security, and penetration testing through coursework and labs.',
     'Used Wireshark, Metasploit, Nmap, Kali Linux, and Burp Suite for vulnerability assessment and attack simulations.'
    ]), "Add Certification: Cyber Operations");

    await executeTransaction(portfolio.addCertification('Incident Analysis and Response', 'May 2024', 'University of Central Oklahoma', 'https://www.credly.com/badges/3f8b10b4-9373-4b61-b081-ec5142ed1792/public_url', [
     'Completed hands-on labs on incident response, threat intelligence, and vulnerability scanning with Wireshark, Volatility, and Nessus.',
     'Applied risk management and security controls in simulated cyberattack scenarios, strengthening practical cybersecurity skills critical for secure software delivery.'
    ]), "Add Certification: Incident Analysis and Response");

    await executeTransaction(portfolio.addCertification('JavaScript for Front End Web', 'Dec 2023', 'University of Central Oklahoma', 'https://www.credly.com/badges/68301bfc-6518-4c96-9f9c-6f2514f53b8f/public_url', [
     'Designed front-end modules leveraging modular and event-driven design, debugging, and modern web standards.'
    ]), "Add Certification: JavaScript for Front End Web");

    await executeTransaction(portfolio.addCertification('Web Application Technologies and Django', 'Mar 2022', 'University of Michigan (Coursera)', 'https://www.coursera.org/account/accomplishments/verify/6HDVCAJXZ6PN', [
     'Strengthened backend development for secure web applications using Django, REST APIs, Python, and industry best practices.'
    ]), "Add Certification: Django");
    
    // Populate education
    await executeTransaction(portfolio.addEducation('Masters in Computer Science', 'University of Central Oklahoma', '2023--2025', '3.72'), "Add Education: UCO Masters");
    await executeTransaction(portfolio.addEducation('B.Tech. in Computer Science and Engineering, Specialization in Information Security', 'Vellore Institute Of Technology', '2019--2023', '7.94'), "Add Education: VIT B.Tech");

    // Populate achievements
    await executeTransaction(portfolio.addAchievement('President\'s Honor Roll, University of Central Oklahoma', 'Fall 2023', [
     'Recognized for outstanding academic performance and maintaining a high GPA, reflecting commitment to excellence and continuous learning in computer science.'
    ]), "Add Achievement: Honor Roll");

    // Populate academic focus areas
    await executeTransaction(portfolio.addAcademicFocus(
     'Information Security',
     'Specialized Focus on Cybersecurity, Data Protection, and Secure Systems Design',
     'Security'
    ), "Add Focus: Information Security");
    await executeTransaction(portfolio.addAcademicFocus(
     'Computer Science',
     'Advanced Algorithms, Software Engineering, Web and Cloud Development',
     'Skills'
    ), "Add Focus: Computer Science");
    await executeTransaction(portfolio.addAcademicFocus(
     'Research & Development',
     'Academic Research in Security Protocols and System Architecture',
     'Projects'
    ), "Add Focus: Research & Development");

    console.log("\n" + "=".repeat(80));
    console.log("🎉 DEPLOYMENT AND DATA POPULATION COMPLETE");
    console.log("=".repeat(80));
    console.log("Portfolio Contract:", portfolioAddress);
    console.log("ProjectVerification Contract:", verificationAddress);
    console.log("Deployer Address:", deployer.address);
    console.log("Network:", network.name, "(Chain ID:", String(network.chainId) + ")");
    console.log("=".repeat(80));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("❌ DEPLOYMENT FAILED:", error);
        process.exit(1);
    });