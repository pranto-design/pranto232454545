// UniVara CMS Types

export type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'rejected' | 'archived';

export type UniversityType = 'Private' | 'Public' | 'International' | 'Specialized';

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}

export interface UniversityBasicInfo {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  logoUrl?: string;
  coverImage?: string;
  type: UniversityType;
  established: number;
  accreditation: string;
  ugcApproved: boolean;
  ugcApprovalInfo?: string;
  location: string;
  division: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  socialLinks: SocialLinks;
  description: string;
  status: ContentStatus;
  isPublished: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HomepageSectionContent {
  heroTitle: string;
  heroSubtitle: string;
  bannerImages: string[];
  ctaButtonText: string;
  ctaButtonLink: string;
  introduction: string;
  statistics: { label: string; value: string; icon?: string }[];
  announcementText?: string;
  announcementLink?: string;
  featuredProgramIds?: string[];
  featuredDepartmentIds?: string[];
}

export interface AboutSectionContent {
  overview: string;
  history: string;
  mission: string;
  vision: string;
  coreValues: string[];
  leadershipMessage: {
    title: string;
    author: string;
    authorDesignation: string;
    message: string;
    photoUrl?: string;
  };
  vcMessage?: {
    author: string;
    message: string;
    photoUrl?: string;
  };
  achievements: string[];
  accreditations: string[];
  recognitions: string[];
}

export interface AcademicProgramCMS {
  id: string;
  name: string;
  degree: string;
  facultyName: string;
  departmentName: string;
  durationYears: number;
  totalCredits: number;
  tuitionPerCredit: number;
  admissionFee: number;
  semesterFee: number;
  totalTuitionEstimate: number;
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'PhD';
  curriculumSummary?: string;
  curriculumPdfUrl?: string;
  academicCalendar?: string;
  scholarshipAvailable: boolean;
}

export interface DepartmentCMS {
  id: string;
  name: string;
  facultyName: string;
  headOfDepartment: string;
  description: string;
  imageUrl?: string;
  researchAreas: string[];
  contactEmail?: string;
  contactPhone?: string;
  availableProgramNames?: string[];
}

export interface AdmissionSectionContent {
  requirements: string[];
  eligibilityCriteria: string[];
  applicationProcess: string[];
  applicationStartDate?: string;
  applicationDeadline?: string;
  admissionCircularPdfUrl?: string;
  admissionTestInfo?: string;
  requiredDocuments: string[];
  importantDates: { event: string; date: string }[];
  onlineApplicationUrl?: string;
  admissionFaqs: { question: string; answer: string }[];
}

export interface ProgramFeeStructure {
  programId: string;
  programName: string;
  admissionFee: number;
  perCreditFee: number;
  semesterFee: number;
  labFee: number;
  libraryFee: number;
  otherFees: number;
  totalCredits: number;
  totalEstimatedCost: number;
  waiverInfo: string;
  scholarshipInfo: string;
}

export interface CampusFacilitiesContent {
  overview: string;
  campusImages: string[];
  libraryDetails: string;
  laboratoriesDetails: string;
  researchCentersDetails: string;
  computerLabsDetails: string;
  auditoriumDetails: string;
  sportsFacilitiesDetails: string;
  medicalCenterDetails: string;
  cafeteriaDetails: string;
  transportationDetails: string;
  residentialHallsDetails: string;
  studentClubsDetails: string;
  campusMapEmbedUrl?: string;
}

export interface FacultyMemberCMS {
  id: string;
  name: string;
  designation: string;
  department: string;
  photoUrl?: string;
  education: string;
  researchInterests: string;
  email: string;
  phone?: string;
}

export interface ResearchSectionContent {
  overview: string;
  researchCenters: { name: string; focus: string; director?: string }[];
  keyProjects: { title: string; investigator: string; description: string }[];
  publicationsSummary: string;
  researchAreas: string[];
  collaborations: string[];
}

export interface StudentLifeContent {
  overview: string;
  organizationsAndClubs: { name: string; category: string; description: string }[];
  culturalActivities: string[];
  sportsActivities: string[];
  annualEvents: { name: string; time: string; description: string }[];
  supportServices: string[];
  careerServices: string;
  alumniNetwork: string;
}

export interface UniversityNoticeCMS {
  id: string;
  title: string;
  category: 'Admission' | 'Academic' | 'Exam' | 'General' | 'Events';
  content: string;
  fileUrl?: string;
  publishDate: string;
  expiryDate?: string;
  isPinned: boolean;
  status: 'draft' | 'published';
}

export interface GalleryItemCMS {
  id: string;
  title?: string;
  caption?: string;
  category: 'Campus' | 'Event' | 'Laboratory' | 'Classroom' | 'Video';
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
}

export interface ContactSectionContent {
  address: string;
  phone: string;
  email: string;
  website: string;
  googleMapsEmbedUrl?: string;
  socialLinks: SocialLinks;
  contactFormEnabled: boolean;
  admissionOfficeContact?: string;
  hotline?: string;
}

export interface WebsiteDesignSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  heroLayout: 'banner_carousel' | 'centered_card' | 'split_image';
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'Roboto' | 'Poppins';
  navbarStyle: 'transparent' | 'solid' | 'floating';
  footerStyle: 'detailed' | 'minimal';
  sectionOrder: string[];
  sectionVisibility: {
    hero: boolean;
    about: boolean;
    academics: boolean;
    departments: boolean;
    admission: boolean;
    tuition: boolean;
    campus: boolean;
    faculty: boolean;
    research: boolean;
    studentLife: boolean;
    notices: boolean;
    gallery: boolean;
    contact: boolean;
  };
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImageUrl?: string;
  canonicalUrl?: string;
}

export interface UniversityFullCMS {
  basic: UniversityBasicInfo;
  homepage: HomepageSectionContent;
  about: AboutSectionContent;
  academic: {
    faculties: string[];
    academicCalendarSummary: string;
    programs: AcademicProgramCMS[];
  };
  departments: DepartmentCMS[];
  admission: AdmissionSectionContent;
  tuition: {
    generalPolicy: string;
    programFees: ProgramFeeStructure[];
  };
  campus: CampusFacilitiesContent;
  faculty: FacultyMemberCMS[];
  research: ResearchSectionContent;
  studentLife: StudentLifeContent;
  notices: UniversityNoticeCMS[];
  gallery: GalleryItemCMS[];
  contact: ContactSectionContent;
  design: WebsiteDesignSettings;
  seo: SEOSettings;
}

export interface CMSAuditLog {
  id: string;
  universityId?: string;
  actorEmail?: string;
  action: 'create' | 'update' | 'submit_review' | 'approve' | 'publish' | 'reject' | 'delete' | 'duplicate';
  entityType: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  createdAt: string;
}

