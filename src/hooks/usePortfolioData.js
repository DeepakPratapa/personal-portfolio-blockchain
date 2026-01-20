import { useState, useEffect, useCallback } from 'react';
import { ethers } from "ethers";
import PortfolioContract from "../../artifacts/contracts/Portfolio.sol/Portfolio.json";
import ProjectVerificationContract from "../../artifacts/contracts/ProjectVerification.sol/ProjectVerification.json";
import { BLOCKCHAIN_CONFIG, SKILL_CATEGORIES } from '../utils/constants';
import { CONTRACT_ADDRESSES } from '../utils/contractConstants';
import { getContractAddress } from '../utils/envValidation';
import { 
  createResilientProvider, 
  retryContractCall,
  contractExists,
  getNetworkInfo 
} from '../utils/providerUtils';

/**
 * Custom hook for computing local data hash for verification
 * @returns {function} - Function to compute hash from portfolio data
 */
export const useDataHashComputation = () => {
  const computeLocalDataHash = useCallback((fetchedData) => {
    const solidityTypes = [
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string[]",
      "string[]",
      "string[]",
      "string[]",
      "string[]",
      "string[]",
      "string[]",
      "string[]",
      "tuple(string title, string company, string dates, string[] description)[]",
      "tuple(string title, string[] description, string repo, string caseStudy)[]",
      "tuple(string title, string date, string[] description, string link)[]",
      "tuple(string name, string date, string issuer, string link, string[] description)[]",
      "tuple(string degree, string university, string dates, string gpa)[]",
      "tuple(string title, string date, string[] description)[]",
      "tuple(string title, string description, string iconName)[]"
    ];

    const dataToEncode = [
      fetchedData.name,
      fetchedData.title,
      fetchedData.summary,
      fetchedData.contact.phone,
      fetchedData.contact.email,
      fetchedData.contact.linkedin,
      fetchedData.contact.github,
      fetchedData.skills.languages,
      fetchedData.skills.frameworks,
      fetchedData.skills.databases,
      fetchedData.skills.cloud,
      fetchedData.skills.devops,
      fetchedData.skills.security,
      fetchedData.skills.expertise,
      fetchedData.skills.other,
      fetchedData.experience.map(exp => ({...exp, description: exp.description})),
      fetchedData.projects.map(proj => ({...proj, caseStudy: JSON.stringify(proj.caseStudy)})),
      fetchedData.research.map(res => ({...res, description: res.description})),
      fetchedData.certifications.map(cert => ({...cert, description: cert.description})),
      fetchedData.education,
      fetchedData.achievements.map(ach => ({...ach, description: ach.description})),
      fetchedData.academicFocus || [],
    ];

    try {
        const encodedData = ethers.AbiCoder.defaultAbiCoder().encode(solidityTypes, dataToEncode);
        return ethers.keccak256(encodedData);
    } catch (error) {
        console.error("ABI encoding error:", error);
        console.log("Data to encode:", dataToEncode);
        return null;
    }
  }, []);

  return computeLocalDataHash;
};

/**
 * Custom hook for fetching portfolio data from blockchain
 * @returns {object} - Portfolio data, loading state, verification status, and error
 */
export const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDataVerified, setIsDataVerified] = useState(false);
  const [error, setError] = useState(null);
  
  const computeLocalDataHash = useDataHashComputation();

  const formatProjectData = useCallback((fetchedProjects) => {
    return fetchedProjects.map(proj => {
      let caseStudyContent = {};
      try {
        caseStudyContent = JSON.parse(proj.caseStudy);
      } catch (e) {
        console.error("Failed to parse case study JSON:", e);
        caseStudyContent = {
          challenge: proj.caseStudy,
          conclusion: "Detailed case study data is unavailable due to a parsing error."
        };
      }
      return {
        title: proj.title,
        description: proj.description,
        repo: proj.repo,
        caseStudy: caseStudyContent,
      };
    });
  }, []);

  const fetchPortfolioData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the portfolio contract address from constants
      const contractAddress = CONTRACT_ADDRESSES.PORTFOLIO;
      
      // Create resilient provider with automatic fallback
      const provider = await createResilientProvider();
      
      // Verify contract exists
      const exists = await contractExists(provider, contractAddress);
      if (!exists) {
        throw new Error(
          `No contract found at address ${contractAddress}. Please verify the contract is deployed.`
        );
      }
      
      // Get network info for debugging
      const networkInfo = await getNetworkInfo(provider);
      console.log('📡 Network Info:', networkInfo);
      
      const contract = new ethers.Contract(contractAddress, PortfolioContract.abi, provider);

      // Fetch basic information with retry
      const fetchedName = await retryContractCall(() => contract.name());
      const fetchedTitle = await retryContractCall(() => contract.title());
      const fetchedSummary = await retryContractCall(() => contract.summary());
      const contactData = await retryContractCall(() => contract.getContact());

      // Fetch skills by category with retry
      const fetchedSkills = {};
      for (const category of SKILL_CATEGORIES) {
        fetchedSkills[category] = await retryContractCall(() => contract.getSkills(category));
      }

      // Fetch all other data with retry
      const [
        fetchedExperience,
        fetchedProjects,
        fetchedResearch,
        fetchedCertifications,
        fetchedEducation,
        fetchedAchievements,
        fetchedAcademicFocus
      ] = await Promise.all([
        retryContractCall(() => contract.getExperiences()),
        retryContractCall(() => contract.getProjects()),
        retryContractCall(() => contract.getResearchPapers()),
        retryContractCall(() => contract.getCertifications()),
        retryContractCall(() => contract.getEducationHistory()),
        retryContractCall(() => contract.getAchievements()),
        retryContractCall(() => contract.getAcademicFocusAreas())
      ]);

      // Format the data
      const formattedData = {
        name: fetchedName,
        title: fetchedTitle,
        contact: { 
          phone: contactData[0], 
          email: contactData[1], 
          linkedin: contactData[2], 
          github: contactData[3] 
        },
        summary: fetchedSummary,
        skills: fetchedSkills,
        experience: fetchedExperience.map(exp => ({
          title: exp.title,
          company: exp.company,
          dates: exp.dates,
          description: exp.description,
        })),
        projects: formatProjectData(fetchedProjects),
        research: fetchedResearch.map(res => ({
          title: res.title,
          date: res.date,
          description: res.description,
          link: res.link,
        })),
        certifications: fetchedCertifications.map(cert => ({
          name: cert.name,
          date: cert.date,
          issuer: cert.issuer,
          link: cert.link,
          description: cert.description,
        })),
        education: fetchedEducation.map(edu => ({
          degree: edu.degree,
          university: edu.university,
          dates: edu.dates,
          gpa: edu.gpa,
        })),
        achievements: fetchedAchievements.map(ach => ({
          title: ach.title,
          date: ach.date,
          description: ach.description,
        })),
        academicFocus: fetchedAcademicFocus.map(focus => ({
          title: focus.title,
          description: focus.description,
          iconName: focus.iconName,
        })),
      };
      
      setData(formattedData);

      // Verify data integrity with retry
      const hashFromBlockchain = await retryContractCall(() => contract.getDataHash());
      const localHash = computeLocalDataHash(formattedData);
      const isVerified = localHash && localHash.toLowerCase() === hashFromBlockchain.toLowerCase();
      setIsDataVerified(isVerified);

      console.log("Blockchain Hash:", hashFromBlockchain);
      console.log("Computed Hash:", localHash);
      if (isVerified) {
        console.log("Data integrity successfully verified by blockchain hash.");
      } else {
        console.warn("Data integrity check failed: Computed hash does not match the blockchain hash.");
      }

    } catch (error) {
      console.error("Failed to fetch data from blockchain:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [computeLocalDataHash, formatProjectData]);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  return {
    data,
    loading,
    isDataVerified,
    error,
    refetch: fetchPortfolioData
  };
};