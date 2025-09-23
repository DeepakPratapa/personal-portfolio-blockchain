// scripts/verify.js
import pkg from 'hardhat';
const { run } = pkg;

// Portfolio contract constructor arguments
const portfolioArgs = [
  "Deepak Balaji Pratapa",
  "Full Stack Developer | Cloud Solutions | Cybersecurity Engineer",
  "A recent Computer Science graduate with a strong foundation in both software engineering and cybersecurity. Proven ability to design and build secure, scalable full-stack applications using React, Node.js, and Python. Experienced in cloud-native development with AWS and Firebase, implementing robust CI/CD pipelines, and applying industry-standard security tools for vulnerability assessment, threat detection, and incident response. Eager to apply a blend of software development and security expertise to build and protect innovative digital solutions.",
  "+1-(405)856-9454",
  "deepakpratapa2@gmail.com",
  "https://www.linkedin.com/in/deepak-pratapa-b6316b178",
  "https://github.com/DeepakPratapa"
];

// Deployed addresses (update if needed)
const portfolioAddress = "0x5D82573Fbd78e2e8Cf614B1Ca1663acD19c71903";
const verificationAddress = "0xFaeEEc3c4Ad4BD945faCdFc3E4AEa3d9b14dF91F";

async function main() {
  // Verify Portfolio contract
  try {
    console.log("\n🔍 Verifying Portfolio contract...");
    await run("verify:verify", {
      address: portfolioAddress,
      constructorArguments: portfolioArgs,
      network: "polygon"
    });
    console.log("✅ Portfolio contract verified!");
  } catch (err) {
    console.error("❌ Portfolio verification failed:", err.message || err);
  }

  // Verify ProjectVerification contract (no constructor args)
  try {
    console.log("\n🔍 Verifying ProjectVerification contract...");
    await run("verify:verify", {
      address: verificationAddress,
      constructorArguments: [],
      network: "polygon"
    });
    console.log("✅ ProjectVerification contract verified!");
  } catch (err) {
    console.error("❌ ProjectVerification verification failed:", err.message || err);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
