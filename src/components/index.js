// Export all components for easier imports
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';
export { default as NavBar } from './layout/NavBar';
export { ErrorScreen } from './layout/LoadingAndError';

export { default as SummarySection } from './sections/SummarySection';
export { default as ExperienceSection } from './sections/ExperienceSection';
export { default as ProjectsSection } from './sections/ProjectsSection';
export { default as SkillsSection } from './sections/SkillsSection';
export { default as EducationSection } from './sections/EducationSection';
export { CertificationsSection, ResearchSection, AchievementsSection } from './sections/MiscSections';

export { default as ProjectCaseStudy } from './projects/ProjectCaseStudyComponent';

export { Icon} from './common/Icon';
export {getSkillIcon} from '../utils/IconUtils';
export { SanitizedText, SanitizedList } from './common/SanitizedComponents';