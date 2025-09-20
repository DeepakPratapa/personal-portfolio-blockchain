// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract Portfolio {
    address public owner;

    struct Contact {
        string phone;
        string email;
        string linkedin;
        string github;
    }

    struct Experience {
        string title;
        string company;
        string dates;
        string[] description; // Updated to array of strings
    }

    struct Project {
        string title;
        string[] description; // Updated to array of strings
        string repo;
        string caseStudy;
    }

    struct Research {
        string title;
        string date;
        string[] description; // Updated to array of strings
        string link;
    }

    struct Certification {
        string name;
        string date;
        string issuer;
        string link;
        string[] description; // Updated to array of strings
    }

    struct Education {
        string degree;
        string university;
        string dates;
        string gpa;
    }

    struct Achievement {
        string title;
        string date;
        string[] description; // Updated to array of strings
    }

    struct AcademicFocus {
        string title;
        string description;
        string iconName;
    }

    string public name;
    string public title;
    string public summary;
    
    mapping(string => string[]) public skills;
    Experience[] private experiences;
    Project[] private projects;
    Research[] private researchPapers;
    Certification[] private certifications;
    Education[] private educationHistory;
    Achievement[] private achievements;
    AcademicFocus[] private academicFocusAreas;

    mapping(string => bool) private projectExists;

    mapping(string => string) public contact;

    event DataUpdated(string key);
    event DataDeleted(string key, uint256 index);

    constructor(
        string memory _name,
        string memory _title,
        string memory _summary,
        string memory _phone,
        string memory _email,
        string memory _linkedin,
        string memory _github
    ) {
        owner = msg.sender;
        name = _name;
        title = _title;
        summary = _summary;
        contact["phone"] = _phone;
        contact["email"] = _email;
        contact["linkedin"] = _linkedin;
        contact["github"] = _github;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function.");
        _;
    }

    function addSkillCategory(string memory _category, string[] memory _skills) public onlyOwner {
        require(bytes(_category).length > 0, "Category cannot be empty.");
        require(_skills.length > 0, "Skills list cannot be empty.");
        for (uint i = 0; i < _skills.length; i++) {
            require(bytes(_skills[i]).length > 0, "Skill cannot be empty.");
        }
        skills[_category] = _skills; 
        emit DataUpdated("skills");
    }

    function addExperience(string memory _title, string memory _company, string memory _dates, string[] memory _description) public onlyOwner {
        require(bytes(_title).length > 0 && bytes(_company).length > 0, "Title and company cannot be empty.");
        experiences.push(Experience(_title, _company, _dates, _description));
        emit DataUpdated("experiences");
    }
    
    function addProject(string memory _title, string[] memory _description, string memory _repo, string memory _caseStudy) public onlyOwner {
        require(bytes(_title).length > 0, "Project title cannot be empty.");
        require(!projectExists[_title], "Project with this title already exists.");
        
        projects.push(Project(_title, _description, _repo, _caseStudy));
        projectExists[_title] = true;
        emit DataUpdated("projects");
    }

    function addResearch(string memory _title, string memory _date, string[] memory _description, string memory _link) public onlyOwner {
        require(bytes(_title).length > 0 && bytes(_date).length > 0, "Title and date cannot be empty.");
        researchPapers.push(Research(_title, _date, _description, _link));
        emit DataUpdated("research");
    }

    function addCertification(string memory _name, string memory _date, string memory _issuer, string memory _link, string[] memory _description) public onlyOwner {
        require(bytes(_name).length > 0, "Certification name cannot be empty.");
        certifications.push(Certification(_name, _date, _issuer, _link, _description));
        emit DataUpdated("certifications");
    }
    
    function addEducation(string memory _degree, string memory _university, string memory _dates, string memory _gpa) public onlyOwner {
        require(bytes(_degree).length > 0, "Degree cannot be empty.");
        educationHistory.push(Education(_degree, _university, _dates, _gpa));
        emit DataUpdated("education");
    }

    function addAchievement(string memory _title, string memory _date, string[] memory _description) public onlyOwner {
        require(bytes(_title).length > 0, "Achievement title cannot be empty.");
        achievements.push(Achievement(_title, _date, _description));
        emit DataUpdated("achievements");
    }

    function addAcademicFocus(string memory _title, string memory _description, string memory _iconName) public onlyOwner {
        require(bytes(_title).length > 0, "Academic focus title cannot be empty.");
        require(bytes(_description).length > 0, "Academic focus description cannot be empty.");
        require(bytes(_iconName).length > 0, "Icon name cannot be empty.");
        academicFocusAreas.push(AcademicFocus(_title, _description, _iconName));
        emit DataUpdated("academicFocus");
    }

    function deleteProject(uint256 _index) public onlyOwner {
        require(_index < projects.length, "Index out of bounds.");
        string memory titleToDelete = projects[_index].title;
        
        projects[_index] = projects[projects.length - 1];
        projects.pop();
        
        projectExists[titleToDelete] = false;
        
        emit DataDeleted("projects", _index);
    }
    
    function getContact() public view returns (string memory phone, string memory email, string memory linkedin, string memory github) {
        return (contact["phone"], contact["email"], contact["linkedin"], contact["github"]);
    }

    function getSkills(string memory _category) public view returns (string[] memory) {
        return skills[_category];
    }
    
    function getExperiences() public view returns (Experience[] memory) {
        return experiences;
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function getResearchPapers() public view returns (Research[] memory) {
        return researchPapers;
    }

    function getCertifications() public view returns (Certification[] memory) {
        return certifications;
    }

    function getEducationHistory() public view returns (Education[] memory) {
        return educationHistory;
    }

    function getAchievements() public view returns (Achievement[] memory) {
        return achievements;
    }

    function getAcademicFocusAreas() public view returns (AcademicFocus[] memory) {
        return academicFocusAreas;
    }

    function getDataHash() public view returns (bytes32) {
        bytes memory data = abi.encode(
            name,
            title,
            summary,
            contact["phone"],
            contact["email"],
            contact["linkedin"],
            contact["github"],
            getSkills("languages"),
            getSkills("frameworks"),
            getSkills("databases"),
            getSkills("cloud"),
            getSkills("devops"),
            getSkills("security"),
            getSkills("expertise"),
            getSkills("other"),
            getExperiences(),
            getProjects(),
            getResearchPapers(),
            getCertifications(),
            getEducationHistory(),
            getAchievements(),
            getAcademicFocusAreas()
        );
        return keccak256(data);
    }
}