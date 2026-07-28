// Core domain types for the UniVara platform

export type VerificationStatus = 'verified' | 'university_verified' | 'community_reported' | 'needs_verification';

export type Division =
  | 'Dhaka'
  | 'Chattogram'
  | 'Khulna'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Barishal'
  | 'Rangpur'
  | 'Mymensingh';

export type ProgramCategory =
  | 'Engineering'
  | 'Computer Science'
  | 'Business'
  | 'Pharmacy'
  | 'Life Sciences'
  | 'Social Sciences'
  | 'Arts & Humanities'
  | 'Law'
  | 'Architecture'
  | 'Other';

export type DegreeType = 'BSc' | 'BA' | 'BBA' | 'BPharm' | 'BArch' | 'LLB' | 'MBA' | 'MSc';

export interface Faculty {
  id: string;
  name: string;
  departments: string[];
}

export interface ProgramOffering {
  id: string;
  programId: string;          // links to global Program
  universityId: string;
  degree: DegreeType;
  durationYears: number;
  totalCredits: number;
  tuitionPerCredit: number;   // BDT
  admissionFee: number;        // BDT
  labFee: number;              // BDT per semester
  otherFees: number;          // BDT per semester
  semesterFee: number;        // BDT per semester
  admissionRequirements: string[];
  scholarshipAvailable: boolean;
  totalTuitionEstimate: number; // precomputed: credits * perCredit + admissionFee
}

export interface Scholarship {
  id: string;
  universityId: string;
  name: string;
  eligibility: string;
  gpaRequirement: number;     // HSC GPA (out of 5.0)
  percentage: number;          // % off tuition
  applicationProcess: string;
  verification: VerificationStatus;
  lastUpdated: string;
  source: string;
}

export interface AdmissionNotice {
  id: string;
  universityId: string;
  programId?: string;
  title: string;
  applicationStart: string;
  deadline: string;
  admissionTestDate?: string;
  applicationLink: string;
  officialSource: string;
  lastUpdated: string;
  verification: VerificationStatus;
}

export interface ReviewCategoryRating {
  academics: number;
  faculty: number;
  campus: number;
  studentLife: number;
  career: number;
  costValue: number;
  facilities: number;
}

export interface Review {
  id: string;
  universityId: string;
  authorName: string;
  authorType: 'student' | 'alumni';
  verified: boolean;
  graduationYear: number;
  programName: string;
  ratings: ReviewCategoryRating;
  overall: number;
  writtenReview: string;
  helpfulVotes: number;
  date: string;
}

export interface CommunityPost {
  id: string;
  universityId?: string;
  authorName: string;
  authorAvatarColor: string;
  universityAffiliation?: string;
  verifiedBadge?: 'student' | 'alumni' | 'rep' | 'top';
  category: string;
  type: 'question' | 'discussion';
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  comments: Comment[];
  date: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatarColor: string;
  verifiedBadge?: 'student' | 'alumni' | 'rep' | 'top';
  content: string;
  upvotes: number;
  date: string;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  logoColor: string;          // tailwind gradient classes
  logoInitials: string;
  location: string;
  division: Division;
  established: number;
  website: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  campusInfo: string;
  accreditation: string;
  facilities: string[];
  admissionTestRequired: boolean;
  minGPA: number;             // HSC GPA out of 5.0
  rating: number;
  reviewCount: number;
  scholarshipAvailable: boolean;
  programCount: number;
  tuitionMin: number;         // BDT total estimate
  tuitionMax: number;         // BDT total estimate
  popularPrograms: string[];
  faculties: Faculty[];
  featured: boolean;
  verification: VerificationStatus;
  lastUpdated: string;
  source: string;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  category: ProgramCategory;
  description: string;
  careerOpportunities: string[];
  avgTuitionMin: number;
  avgTuitionMax: number;
  avgCredits: number;
  avgDurationYears: number;
  offeringUniversityIds: string[];
}

export interface StudentLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredUniversityId?: string;
  preferredProgramId?: string;
  background: string;
  consent: boolean;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'alumni' | 'rep' | 'admin';
  university?: string;
  program?: string;
  graduationYear?: number;
  bio?: string;
  verified: boolean;
}
