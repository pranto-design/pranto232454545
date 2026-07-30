import type {
  University, Program, ProgramOffering, Scholarship, AdmissionNotice,
  Review, CommunityPost, StudentLead,
} from '@/types';

// ============================================================
// UNIVERSITIES
// All tuition figures are realistic estimates in BDT, clearly marked as sample data.
// ============================================================

export const universities: University[] = [
  {
    id: 'u1', slug: 'brac-university', name: 'BRAC University', shortName: 'BRACU',
    logoColor: 'from-rose-500 to-red-600', logoInitials: 'BU',
    location: 'Dhaka', division: 'Dhaka', established: 2001,
    website: 'https://www.bracu.ac.bd', email: 'info@bracu.ac.bd', phone: '+880 2-8824011',
    address: '66 Mohakhali, Dhaka 1212',
    description: 'BRAC University is one of the top-ranked private universities in Bangladesh, known for its strong liberal arts foundation and rigorous engineering and business programs.',
    campusInfo: 'Urban campus in Mohakhali with modern labs, library, and student activity spaces. New Mohakhali campus building with state-of-the-art facilities.',
    accreditation: 'UGC approved, accredited by the University Grants Commission of Bangladesh.',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Sports Complex', 'Auditorium', 'Medical Center', 'Wi-Fi Campus'],
    admissionTestRequired: true, minGPA: 4.0, rating: 4.6, reviewCount: 312, scholarshipAvailable: true,
    programCount: 18, tuitionMin: 850000, tuitionMax: 1450000,
    popularPrograms: ['CSE', 'BBA', 'EEE', 'Architecture', 'English'],
    faculties: [
      { id: 'f1', name: 'School of Engineering & Computer Science', departments: ['CSE', 'EEE', 'Architecture'] },
      { id: 'f2', name: 'BRAC Business School', departments: ['BBA', 'MBA', 'Accounting'] },
      { id: 'f3', name: 'School of General Education', departments: ['English', 'Economics', 'Sociology'] },
    ],
    featured: true, verification: 'university_verified', lastUpdated: '2026-06-15', source: 'University Official Website',
  },
  {
    id: 'u4', slug: 'american-international-university-bangladesh', name: 'American International University-Bangladesh', shortName: 'AIUB',
    logoColor: 'from-amber-500 to-orange-600', logoInitials: 'AI',
    location: 'Dhaka', division: 'Dhaka', established: 1994,
    website: 'https://www.aiub.edu', email: 'info@aiub.edu', phone: '+880 2-8870414',
    address: '408/1, Kuratoli, Khilkhet, Dhaka 1229',
    description: 'AIUB is a large private university known for its engineering, business, and computer science programs with a strong international outlook.',
    campusInfo: 'Large campus in Kuratoli with multiple academic buildings, labs, library, and sports facilities.',
    accreditation: 'UGC approved. ABET-accredited engineering programs (candidate).',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Auditorium', 'Sports Complex', 'Medical Center', 'Wi-Fi'],
    admissionTestRequired: true, minGPA: 3.5, rating: 4.2, reviewCount: 521, scholarshipAvailable: true,
    programCount: 24, tuitionMin: 650000, tuitionMax: 1150000,
    popularPrograms: ['CSE', 'BBA', 'EEE', 'Architecture', 'Pharmacy', 'Data Science'],
    faculties: [
      { id: 'f1', name: 'Faculty of Science and Technology', departments: ['CSE', 'Data Science', 'Cyber Security'] },
      { id: 'f2', name: 'Faculty of Engineering', departments: ['Architecture', 'EEE', 'IPE', 'COE'] },
      { id: 'f3', name: 'Faculty of Business Administration', departments: ['BBA'] },
      { id: 'f4', name: 'Faculty of Arts & Social Sciences', departments: ['English', 'Journalism', 'Economics', 'LLB'] },
      { id: 'f5', name: 'Faculty of Health and Life Sciences', departments: ['Pharmacy', 'Biochemistry'] },
    ],
    featured: true, verification: 'university_verified', lastUpdated: '2026-06-18', source: 'University Official Website',
  }
];

// ============================================================
// PROGRAMS — global program catalog
// ============================================================

export const programs: Program[] = [
  {
    id: 'p1', slug: 'cse', name: 'Computer Science & Engineering', category: 'Computer Science',
    description: 'CSE covers programming, algorithms, software engineering, AI, data science, and computer systems — the most in-demand tech field in Bangladesh.',
    careerOpportunities: ['Software Engineer', 'Data Scientist', 'ML Engineer', 'Backend Developer', 'Mobile Developer', 'DevOps Engineer', 'IT Consultant'],
    avgTuitionMin: 600000, avgTuitionMax: 1200000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u4'],
  },
  {
    id: 'p2', slug: 'bba', name: 'Business Administration (BBA)', category: 'Business',
    description: 'BBA provides foundational and advanced knowledge in management, finance, marketing, accounting, and entrepreneurship.',
    careerOpportunities: ['Business Analyst', 'Marketing Executive', 'Financial Analyst', 'HR Manager', 'Entrepreneur', 'Operations Manager'],
    avgTuitionMin: 500000, avgTuitionMax: 1100000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u4'],
  },
  {
    id: 'p3', slug: 'eee', name: 'Electrical & Electronic Engineering', category: 'Engineering',
    description: 'EEE covers circuits, power systems, electronics, telecommunications, and control systems — the backbone of modern infrastructure.',
    careerOpportunities: ['Electrical Engineer', 'Power Engineer', 'Telecom Engineer', 'Control Systems Engineer', 'Embedded Systems Developer'],
    avgTuitionMin: 650000, avgTuitionMax: 1250000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u4'],
  },
  {
    id: 'p4', slug: 'pharmacy', name: 'Pharmacy', category: 'Pharmacy',
    description: 'BPharm prepares students for careers in pharmaceuticals, clinical practice, drug research, and the healthcare industry.',
    careerOpportunities: ['Pharmacist', 'Clinical Research Associate', 'Drug Safety Associate', 'Production Officer', 'Quality Control Officer'],
    avgTuitionMin: 550000, avgTuitionMax: 950000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p5', slug: 'civil-engineering', name: 'Civil Engineering', category: 'Engineering',
    description: 'Civil Engineering covers structural, geotechnical, transportation, and environmental engineering for infrastructure development.',
    careerOpportunities: ['Structural Engineer', 'Site Engineer', 'Project Manager', 'Urban Planner', 'Construction Manager'],
    avgTuitionMin: 600000, avgTuitionMax: 1100000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: [],
  },
  {
    id: 'p6', slug: 'architecture', name: 'Architecture', category: 'Architecture',
    description: 'BArch combines design, engineering, and urban planning to prepare architects for the built environment.',
    careerOpportunities: ['Architect', 'Urban Designer', 'Interior Designer', 'Project Architect', 'Landscape Architect'],
    avgTuitionMin: 700000, avgTuitionMax: 1450000, avgCredits: 190, avgDurationYears: 5,
    offeringUniversityIds: ['u1', 'u4'],
  },
  {
    id: 'p7', slug: 'english', name: 'English (BA)', category: 'Arts & Humanities',
    description: 'BA in English covers literature, linguistics, and language studies — a versatile humanities degree.',
    careerOpportunities: ['Teacher', 'Content Writer', 'Editor', 'Translator', 'Communications Officer', 'Journalist'],
    avgTuitionMin: 380000, avgTuitionMax: 850000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u4'],
  },
  {
    id: 'p8', slug: 'law', name: 'Law (LLB)', category: 'Law',
    description: 'LLB prepares students for legal practice, judiciary, and corporate legal roles in Bangladesh.',
    careerOpportunities: ['Lawyer', 'Legal Advisor', 'Judge', 'Corporate Counsel', 'Legal Researcher'],
    avgTuitionMin: 380000, avgTuitionMax: 750000, avgCredits: 140, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p9', slug: 'journalism', name: 'Journalism and Mass Communication (JMC)', category: 'Arts & Humanities',
    description: 'BA in JMC covers media studies, journalism, public relations, and digital media.',
    careerOpportunities: ['Journalist', 'PR Specialist', 'Media Producer', 'Content Creator'],
    avgTuitionMin: 350000, avgTuitionMax: 700000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p10', slug: 'economics', name: 'Economics', category: 'Arts & Humanities',
    description: 'BSS in Economics provides a strong foundation in micro, macro, and applied economics.',
    careerOpportunities: ['Economist', 'Financial Analyst', 'Policy Advisor', 'Researcher'],
    avgTuitionMin: 350000, avgTuitionMax: 700000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p11', slug: 'ipe', name: 'Industrial and Production Engineering (IPE)', category: 'Engineering',
    description: 'IPE integrates engineering with management to optimize production processes.',
    careerOpportunities: ['Production Engineer', 'Quality Assurance Manager', 'Supply Chain Manager'],
    avgTuitionMin: 600000, avgTuitionMax: 1100000, avgCredits: 148, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p12', slug: 'coe', name: 'Computer Engineering (COE)', category: 'Engineering',
    description: 'COE blends electrical engineering and computer science to develop computing systems.',
    careerOpportunities: ['Systems Engineer', 'Hardware Engineer', 'Embedded Systems Developer'],
    avgTuitionMin: 600000, avgTuitionMax: 1100000, avgCredits: 148, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p13', slug: 'biochemistry', name: 'Biochemistry and Molecular Biology (BMB)', category: 'Life Sciences',
    description: 'BMB explores the chemical processes within and related to living organisms.',
    careerOpportunities: ['Biotechnologist', 'Research Scientist', 'Clinical Laboratory Scientist'],
    avgTuitionMin: 500000, avgTuitionMax: 900000, avgCredits: 140, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p14', slug: 'data-science', name: 'Data Science (DS)', category: 'Computer Science',
    description: 'Data Science focuses on extracting insights from structured and unstructured data.',
    careerOpportunities: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'],
    avgTuitionMin: 650000, avgTuitionMax: 1200000, avgCredits: 148, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p15', slug: 'cyber-security', name: 'Computer Networks and Cyber Security (CNCS)', category: 'Computer Science',
    description: 'CNCS trains students in protecting systems, networks, and programs from digital attacks.',
    careerOpportunities: ['Cyber Security Analyst', 'Network Engineer', 'Security Consultant'],
    avgTuitionMin: 650000, avgTuitionMax: 1200000, avgCredits: 148, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
];

// ============================================================
// PROGRAM OFFERINGS — per-university program details
// ============================================================

const makeOffering = (
  id: string, programId: string, universityId: string, degree: any,
  durationYears: number, totalCredits: number, tuitionPerCredit: number,
  admissionFee: number, labFee: number, otherFees: number, semesterFee: number,
  requirements: string[], scholarshipAvailable: boolean, facilities: string[],
): ProgramOffering => ({
  id, programId, universityId, degree, durationYears, totalCredits, tuitionPerCredit,
  admissionFee, labFee, otherFees, semesterFee, admissionRequirements: requirements,
  scholarshipAvailable,
  totalTuitionEstimate: totalCredits * tuitionPerCredit + admissionFee,
  facilities,
});

export const programOfferings: ProgramOffering[] = [
  // BRACU
  makeOffering('o1', 'p1', 'u1', 'BSc', 4, 160, 5500, 25000, 4000, 3000, 5000, ['HSC GPA 4.0+', 'Physics, Math', 'Admission test'], true, ['Library', 'Computer Labs (AI/ML)', 'Project Lab', 'Research Center', 'Wi-Fi Campus']),
  makeOffering('o13', 'p2', 'u1', 'BBA', 4, 120, 5000, 25000, 0, 3000, 5000, ['HSC GPA 4.0+', 'Any group', 'Admission test'], true, ['Library', 'Business Case Lab', 'Career Services', 'Wi-Fi Campus', 'Auditorium']),
  
  // AIUB
  makeOffering('o4', 'p1', 'u4', 'BSc', 4, 148, 8500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Advanced AI Lab', 'Data Science Lab', 'IoT Lab', 'Cyber Security Lab', 'Wi-Fi', 'Project Complex', 'Industry Partner Center']),
  makeOffering('o14', 'p2', 'u4', 'BBA', 4, 140, 8000, 25000, 0, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Finance Lab', 'Marketing Simulation Lab', 'Career Services', 'Wi-Fi', 'Auditorium', 'Incubation Center']),
  makeOffering('o15', 'p3', 'u4', 'BSc', 4, 148, 7500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Power Electronics Lab', 'Telecom Lab', 'VLSI Lab', 'Wi-Fi', 'Project Workspace']),
  makeOffering('o16', 'p6', 'u4', 'BArch', 5, 190, 6500, 25000, 2000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Design Studios', '3D Printing Lab', 'Materials Lab', 'Wi-Fi', 'Exhibition Gallery']),
  makeOffering('o17', 'p7', 'u4', 'BA', 4, 120, 6500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Language Lab', 'Media Studio', 'Wi-Fi', 'Auditorium']),
  makeOffering('o18', 'p8', 'u4', 'LLB', 4, 140, 8500, 25000, 0, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Moot Court', 'Wi-Fi', 'Auditorium', 'Legal Clinic']),
  // AIUB Additional Offerings
  makeOffering('o19', 'p9', 'u4', 'BA', 4, 130, 5000, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Media Studio', 'Editing Suite', 'Wi-Fi', 'Press Club']), // JMC
  makeOffering('o20', 'p10', 'u4', 'BSS', 4, 130, 5500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Econometrics Lab', 'Wi-Fi', 'Research Center']), // Economics
  makeOffering('o21', 'p11', 'u4', 'BSc', 4, 148, 6500, 25000, 2000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Production Lab', 'Quality Control Lab', 'Wi-Fi', 'Simulation Lab']), // IPE
  makeOffering('o22', 'p12', 'u4', 'BSc', 4, 148, 6000, 25000, 2000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Digital Systems Lab', 'Embedded Systems Lab', 'Wi-Fi', 'Hardware Lab']), // COE
  makeOffering('o23', 'p4', 'u4', 'BPharm', 4, 160, 8500, 25000, 3000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Biology & Chemistry', 'Admission test'], true, ['Library', 'Pharmaceutical Lab', 'Microbiology Lab', 'Organic Chemistry Lab', 'Wi-Fi', 'Pilot Plant']), // Pharmacy
  makeOffering('o24', 'p13', 'u4', 'BSc', 4, 140, 7000, 25000, 3000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Biology & Chemistry', 'Admission test'], true, ['Library', 'Molecular Biology Lab', 'Biochemistry Lab', 'Wi-Fi', 'Research Facility']), // BMB
  makeOffering('o25', 'p14', 'u4', 'BSc', 4, 148, 8500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Data Science Lab', 'GPU Cluster', 'Big Data Lab', 'Wi-Fi', 'Industry AI Center']), // DS
  makeOffering('o26', 'p15', 'u4', 'BSc', 4, 148, 8500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Network Security Lab', 'Ethical Hacking Lab', 'SOC Lab', 'Wi-Fi', 'Red/Blue Team Range']), // CNCS
];

// ============================================================
// SCHOLARSHIPS
// ============================================================

export const scholarships: Scholarship[] = [
  { id: 's1', universityId: 'u1', name: 'BRAC University Merit Scholarship', eligibility: 'Top performers in admission test', gpaRequirement: 4.5, percentage: 50, applicationProcess: 'Automatic consideration on admission', verification: 'university_verified', lastUpdated: '2026-06-15', source: 'University Official Website' },
];

// ============================================================
// ADMISSION NOTICES
// ============================================================

export const admissionNotices: AdmissionNotice[] = [
  { id: 'a1', universityId: 'u1', title: 'Fall 2026 Admission Open — CSE, BBA, EEE', applicationStart: '2026-07-01', deadline: '2026-08-15', admissionTestDate: '2026-08-25', applicationLink: 'https://www.bracu.ac.bd/admissions', officialSource: 'BRACU Admissions Office', lastUpdated: '2026-07-20', verification: 'university_verified' },
];

// ============================================================
// REVIEWS
// ============================================================

export const reviews: Review[] = [
  { id: 'r1', universityId: 'u1', authorName: 'Tanvir Ahmed', authorType: 'alumni', verified: true, graduationYear: 2023, programName: 'CSE', ratings: { academics: 5, faculty: 4, campus: 4, studentLife: 4, career: 5, costValue: 3, facilities: 4 }, overall: 4.6, writtenReview: 'BRACU gave me a strong foundation in software engineering. The CSE curriculum is rigorous and the faculty is supportive.', helpfulVotes: 47, date: '2026-05-10' },
];

// ============================================================
// COMMUNITY POSTS
// ============================================================

export const communityPosts: CommunityPost[] = [
  {
    id: 'c1', universityId: 'u1', authorName: 'Rifat Hossain', authorAvatarColor: 'bg-brand-600',
    universityAffiliation: 'BRAC University', verifiedBadge: 'student',
    category: 'CSE & Engineering', type: 'question',
    title: 'How is the CSE program at BRAC University compared to NSU?',
    content: 'I got admission offers from both BRACU and NSU for CSE. Which one should I choose?',
    tags: ['cse', 'bracu', 'nsu', 'admission'], upvotes: 124, date: '2026-07-22',
    comments: [],
  },
];

// ============================================================
// STUDENT LEADS (sample)
// ============================================================

export const studentLeads: StudentLead[] = [
  { id: 'l1', name: 'Rahim Uddin', phone: '+8801712345678', email: 'rahim@example.com', preferredUniversityId: 'u1', preferredProgramId: 'p1', background: 'HSC Science, GPA 4.5', consent: true, date: '2026-07-20' },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export const getUniversity = (slug: string) => universities.find((u) => u.slug === slug);
export const getUniversityById = (id: string) => universities.find((u) => u.id === id);
export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);
export const getProgramById = (id: string) => programs.find((p) => p.id === id);
export const getOfferingsByUniversity = (universityId: string) =>
  programOfferings.filter((o) => o.universityId === universityId);
export const getOfferingsByProgram = (programId: string) =>
  programOfferings.filter((o) => o.programId === programId);
export const getOfferingById = (id: string) =>
  programOfferings.find((o) => o.id === id);
export const getSimilarOfferings = (offeringId: string) => {
  const base = programOfferings.find((o) => o.id === offeringId);
  if (!base) return [];
  return programOfferings.filter((o) => o.programId === base.programId && o.id !== offeringId);
};
export const getReviewsByUniversity = (universityId: string) =>
  reviews.filter((r) => r.universityId === universityId);
export const getScholarshipsByUniversity = (universityId: string) =>
  scholarships.filter((s) => s.universityId === universityId);
export const getNoticesByUniversity = (universityId: string) =>
  admissionNotices.filter((a) => a.universityId === universityId);
export const getPostsByUniversity = (universityId: string) =>
  communityPosts.filter((p) => p.universityId === universityId);
export const getCommunityCategories = () => [
  'Admission Help', 'University Selection', 'Tuition & Fees', 'Scholarships',
  'CSE & Engineering', 'Business', 'Pharmacy', 'Campus Life',
  'Career & Jobs', 'Student Life', 'Accommodation', 'General Discussion',
];

export const formatBDT = (amount: number): string => {
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)}L`;
  return `৳${amount.toLocaleString('en-BD')}`;
};

export const formatBDTFull = (amount: number): string => `৳${amount.toLocaleString('en-BD')}`;
