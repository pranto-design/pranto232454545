import type {
  University, Program, ProgramOffering, Scholarship, AdmissionNotice,
  Review, CommunityPost, StudentLead,
} from '@/types';

// ============================================================
// UNIVERSITIES — 12 well-known Bangladeshi private universities
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
    id: 'u2', slug: 'north-south-university', name: 'North South University', shortName: 'NSU',
    logoColor: 'from-blue-600 to-indigo-700', logoInitials: 'NS',
    location: 'Dhaka', division: 'Dhaka', established: 1992,
    website: 'https://www.northsouth.edu', email: 'info@northsouth.edu', phone: '+880 2-55668200',
    address: 'Plot 15, Block B, Bashundhara, Dhaka 1229',
    description: 'The first private university in Bangladesh, NSU is renowned for its business and engineering programs and a large, modern campus in Bashundhara.',
    campusInfo: 'Sprawling campus in Bashundhara R/A with library, auditorium, sports facilities, and research centers.',
    accreditation: 'UGC approved. AACSB-accredited business school (candidate).',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Gymnasium', 'Auditorium', 'Sports Ground', 'Research Centers', 'Wi-Fi'],
    admissionTestRequired: true, minGPA: 3.5, rating: 4.4, reviewCount: 458, scholarshipAvailable: true,
    programCount: 22, tuitionMin: 750000, tuitionMax: 1300000,
    popularPrograms: ['BBA', 'CSE', 'EEE', 'Architecture', 'Pharmacy'],
    faculties: [
      { id: 'f1', name: 'School of Business & Economics', departments: ['BBA', 'MBA', 'Economics'] },
      { id: 'f2', name: 'School of Engineering & Physical Sciences', departments: ['CSE', 'EEE', 'Civil', 'Architecture'] },
      { id: 'f3', name: 'School of Health & Life Sciences', departments: ['Pharmacy', 'Public Health', 'Biochemistry'] },
    ],
    featured: true, verification: 'university_verified', lastUpdated: '2026-06-10', source: 'University Official Website',
  },
  {
    id: 'u3', slug: 'independent-university-bangladesh', name: 'Independent University, Bangladesh', shortName: 'IUB',
    logoColor: 'from-emerald-600 to-teal-700', logoInitials: 'IU',
    location: 'Dhaka', division: 'Dhaka', established: 1993,
    website: 'https://www.iub.edu.bd', email: 'info@iub.edu.bd', phone: '+880 2-8431645',
    address: 'Plot 16, Block B, Aftabuddin Road, Bashundhara, Dhaka 1229',
    description: 'IUB offers a liberal arts-style education with strong engineering, business, and environmental science programs.',
    campusInfo: 'Modern campus in Bashundhara with research labs, library, and sports complex.',
    accreditation: 'UGC approved. Member of AACSB and ACBSP.',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Sports Complex', 'Auditorium', 'Research Labs', 'Wi-Fi'],
    admissionTestRequired: true, minGPA: 3.5, rating: 4.3, reviewCount: 287, scholarshipAvailable: true,
    programCount: 16, tuitionMin: 700000, tuitionMax: 1200000,
    popularPrograms: ['CSE', 'BBA', 'EEE', 'Environmental Science', 'English'],
    faculties: [
      { id: 'f1', name: 'School of Engineering & Computer Science', departments: ['CSE', 'EEE'] },
      { id: 'f2', name: 'School of Business', departments: ['BBA', 'MBA'] },
      { id: 'f3', name: 'School of Liberal Arts & Social Sciences', departments: ['English', 'Sociology', 'Media Studies'] },
    ],
    featured: false, verification: 'university_verified', lastUpdated: '2026-05-28', source: 'University Official Website',
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
    popularPrograms: ['CSE', 'BBA', 'EEE', 'Civil Engineering', 'Architecture'],
    faculties: [
      { id: 'f1', name: 'Faculty of Engineering', departments: ['CSE', 'EEE', 'Civil', 'Architecture'] },
      { id: 'f2', name: 'Faculty of Business Administration', departments: ['BBA', 'MBA'] },
      { id: 'f3', name: 'Faculty of Arts & Social Sciences', departments: ['English', 'Media'] },
    ],
    featured: true, verification: 'university_verified', lastUpdated: '2026-06-18', source: 'University Official Website',
  },
  {
    id: 'u5', slug: 'east-west-university', name: 'East West University', shortName: 'EWU',
    logoColor: 'from-sky-600 to-cyan-700', logoInitials: 'EW',
    location: 'Dhaka', division: 'Dhaka', established: 1995,
    website: 'https://www.ewubd.edu', email: 'info@ewubd.edu', phone: '+880 2-47894300',
    address: 'A/2 Jahurul Islam Avenue, Jahangir Nagar Garden, Dhaka 1212',
    description: 'East West University is known for its affordable tuition, strong CSE and business programs, and a centrally located campus.',
    campusInfo: 'Urban campus with modern academic building, library, and labs in Jahurul Islam Avenue.',
    accreditation: 'UGC approved.',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Auditorium', 'Sports', 'Wi-Fi'],
    admissionTestRequired: true, minGPA: 3.5, rating: 4.1, reviewCount: 398, scholarshipAvailable: true,
    programCount: 14, tuitionMin: 550000, tuitionMax: 950000,
    popularPrograms: ['CSE', 'BBA', 'EEE', 'Pharmacy', 'English'],
    faculties: [
      { id: 'f1', name: 'Faculty of Sciences & Engineering', departments: ['CSE', 'EEE', 'Pharmacy'] },
      { id: 'f2', name: 'Faculty of Business Administration', departments: ['BBA', 'MBA'] },
      { id: 'f3', name: 'Faculty of Liberal Arts & Social Sciences', departments: ['English', 'Economics'] },
    ],
    featured: false, verification: 'university_verified', lastUpdated: '2026-05-20', source: 'University Official Website',
  },
  {
    id: 'u6', slug: 'university-of-liberal-arts-bangladesh', name: 'University of Liberal Arts Bangladesh', shortName: 'ULAB',
    logoColor: 'from-violet-600 to-purple-700', logoInitials: 'UL',
    location: 'Dhaka', division: 'Dhaka', established: 2002,
    website: 'https://www.ulab.edu.bd', email: 'info@ulab.edu.bd', phone: '+880 2-9671237',
    address: '66 Road 4/A, Dhanmondi, Dhaka 1209',
    description: 'ULAB specializes in liberal arts, media, and communication studies with a focus on whole-person education.',
    campusInfo: 'Dhanmondi campus with library, media lab, and student activity spaces. Permanent campus under construction.',
    accreditation: 'UGC approved.',
    facilities: ['Library', 'Media Lab', 'Cafeteria', 'Auditorium', 'Wi-Fi'],
    admissionTestRequired: false, minGPA: 3.0, rating: 4.0, reviewCount: 176, scholarshipAvailable: true,
    programCount: 12, tuitionMin: 500000, tuitionMax: 850000,
    popularPrograms: ['English', 'Media Studies', 'BBA', 'CSE', 'Sociology'],
    faculties: [
      { id: 'f1', name: 'School of Arts & Humanities', departments: ['English', 'Media Studies'] },
      { id: 'f2', name: 'School of Business', departments: ['BBA', 'MBA'] },
      { id: 'f3', name: 'School of Science & Engineering', departments: ['CSE'] },
    ],
    featured: false, verification: 'community_reported', lastUpdated: '2026-04-30', source: 'University Official Website',
  },
  {
    id: 'u7', slug: 'university-of-asia-pacific', name: 'University of Asia Pacific', shortName: 'UAP',
    logoColor: 'from-teal-600 to-emerald-700', logoInitials: 'UA',
    location: 'Dhaka', division: 'Dhaka', established: 1996,
    website: 'https://www.uap-bd.edu', email: 'info@uap-bd.edu', phone: '+880 2-9666801',
    address: '73/A Green Road, Farmgate, Dhaka 1215',
    description: 'UAP is well-regarded for its engineering and architecture programs, located centrally in Farmgate.',
    campusInfo: 'Urban campus in Farmgate with engineering labs, library, and design studios.',
    accreditation: 'UGC approved.',
    facilities: ['Library', 'Engineering Labs', 'Architecture Studios', 'Cafeteria', 'Wi-Fi'],
    admissionTestRequired: true, minGPA: 3.5, rating: 4.1, reviewCount: 203, scholarshipAvailable: true,
    programCount: 10, tuitionMin: 600000, tuitionMax: 1000000,
    popularPrograms: ['CSE', 'Civil Engineering', 'Architecture', 'EEE', 'BBA'],
    faculties: [
      { id: 'f1', name: 'Faculty of Engineering', departments: ['CSE', 'EEE', 'Civil', 'Architecture'] },
      { id: 'f2', name: 'Faculty of Business', departments: ['BBA', 'MBA'] },
    ],
    featured: false, verification: 'university_verified', lastUpdated: '2026-05-15', source: 'University Official Website',
  },
  {
    id: 'u8', slug: 'aust-american-university-of-science-technology', name: 'Ahsanullah University of Science & Technology', shortName: 'AUST',
    logoColor: 'from-indigo-600 to-blue-700', logoInitials: 'AU',
    location: 'Dhaka', division: 'Dhaka', established: 1995,
    website: 'https://www.aust.edu', email: 'info@aust.edu', phone: '+880 2-8813046',
    address: '141 & 142, Love Road, Tejgaon I/A, Dhaka 1208',
    description: 'AUST is a leading engineering-focused private university, strong in civil, mechanical, and architectural engineering.',
    campusInfo: 'Tejgaon campus with extensive engineering workshops, labs, and design studios.',
    accreditation: 'UGC approved.',
    facilities: ['Engineering Labs', 'Workshops', 'Library', 'Architecture Studios', 'Cafeteria', 'Wi-Fi'],
    admissionTestRequired: true, minGPA: 3.5, rating: 4.3, reviewCount: 245, scholarshipAvailable: true,
    programCount: 11, tuitionMin: 700000, tuitionMax: 1100000,
    popularPrograms: ['Civil Engineering', 'CSE', 'Architecture', 'EEE', 'Mechanical'],
    faculties: [
      { id: 'f1', name: 'Faculty of Engineering', departments: ['CSE', 'EEE', 'Civil', 'Mechanical', 'Architecture'] },
      { id: 'f2', name: 'Faculty of Business', departments: ['BBA'] },
    ],
    featured: false, verification: 'university_verified', lastUpdated: '2026-06-02', source: 'University Official Website',
  },
  {
    id: 'u9', slug: 'university-of-chittagong-private', name: 'Chittagong Independent University', shortName: 'CIU',
    logoColor: 'from-rose-600 to-pink-700', logoInitials: 'CI',
    location: 'Chattogram', division: 'Chattogram', established: 1999,
    website: 'https://www.ciu.edu.bd', email: 'info@ciu.edu.bd', phone: '+880 31-654321',
    address: '12 Jamal Khan, Chattogram 4000',
    description: 'CIU is a leading private university in Chattogram, offering business, engineering, and social science programs.',
    campusInfo: 'City campus in Jamal Khan with library, labs, and student facilities.',
    accreditation: 'UGC approved.',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Auditorium', 'Wi-Fi'],
    admissionTestRequired: true, minGPA: 3.0, rating: 4.0, reviewCount: 132, scholarshipAvailable: true,
    programCount: 9, tuitionMin: 450000, tuitionMax: 800000,
    popularPrograms: ['BBA', 'CSE', 'English', 'Economics'],
    faculties: [
      { id: 'f1', name: 'School of Business', departments: ['BBA', 'MBA'] },
      { id: 'f2', name: 'School of Science & Engineering', departments: ['CSE'] },
      { id: 'f3', name: 'School of Liberal Arts', departments: ['English', 'Economics'] },
    ],
    featured: false, verification: 'community_reported', lastUpdated: '2026-04-12', source: 'University Official Website',
  },
  {
    id: 'u10', slug: 'khulna-university-of-engineering-technology-private', name: 'Northern University of Business & Technology Khulna', shortName: 'NUBTK',
    logoColor: 'from-green-600 to-lime-700', logoInitials: 'NU',
    location: 'Khulna', division: 'Khulna', established: 2001,
    website: 'https://www.nubtk.edu.bd', email: 'info@nubtk.edu.bd', phone: '+880 41-720123',
    address: '7 Maijdee Court, Khulna 9100',
    description: 'NUBTK serves the southern region with business, engineering, and technology programs.',
    campusInfo: 'Khulna campus with labs, library, and workshop facilities.',
    accreditation: 'UGC approved.',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Wi-Fi'],
    admissionTestRequired: false, minGPA: 3.0, rating: 3.8, reviewCount: 89, scholarshipAvailable: true,
    programCount: 8, tuitionMin: 400000, tuitionMax: 700000,
    popularPrograms: ['BBA', 'CSE', 'English', 'Civil Engineering'],
    faculties: [
      { id: 'f1', name: 'Faculty of Business', departments: ['BBA'] },
      { id: 'f2', name: 'Faculty of Engineering', departments: ['CSE', 'Civil'] },
    ],
    featured: false, verification: 'needs_verification', lastUpdated: '2026-03-20', source: 'Community Reported',
  },
  {
    id: 'u11', slug: 'sylhet-international-university', name: 'Sylhet International University', shortName: 'SIU',
    logoColor: 'from-fuchsia-600 to-purple-700', logoInitials: 'SI',
    location: 'Sylhet', division: 'Sylhet', established: 2001,
    website: 'https://www.siu.edu.bd', email: 'info@siu.edu.bd', phone: '+880 821-713245',
    address: 'Zindabazar, Sylhet 3100',
    description: 'SIU offers business, law, and social science programs serving the Sylhet region.',
    campusInfo: 'City campus in Zindabazar with library and computer labs.',
    accreditation: 'UGC approved.',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Wi-Fi'],
    admissionTestRequired: false, minGPA: 3.0, rating: 3.7, reviewCount: 64, scholarshipAvailable: true,
    programCount: 7, tuitionMin: 380000, tuitionMax: 650000,
    popularPrograms: ['Law', 'English', 'BBA', 'Sociology'],
    faculties: [
      { id: 'f1', name: 'Faculty of Law', departments: ['LLB'] },
      { id: 'f2', name: 'Faculty of Business', departments: ['BBA'] },
      { id: 'f3', name: 'Faculty of Arts & Social Sciences', departments: ['English', 'Sociology'] },
    ],
    featured: false, verification: 'needs_verification', lastUpdated: '2026-02-18', source: 'Community Reported',
  },
  {
    id: 'u12', slug: 'dhaka-international-university', name: 'Dhaka International University', shortName: 'DIU',
    logoColor: 'from-cyan-600 to-sky-700', logoInitials: 'DI',
    location: 'Dhaka', division: 'Dhaka', established: 1995,
    website: 'https://www.diu.edu.bd', email: 'info@diu.edu.bd', phone: '+880 2-9882301',
    address: 'House 74, Road 7, Banani, Dhaka 1213',
    description: 'DIU offers a range of programs in business, engineering, and law at its Banani campus.',
    campusInfo: 'Banani campus with library, labs, and student facilities.',
    accreditation: 'UGC approved.',
    facilities: ['Library', 'Computer Labs', 'Cafeteria', 'Auditorium', 'Wi-Fi'],
    admissionTestRequired: false, minGPA: 3.0, rating: 3.9, reviewCount: 118, scholarshipAvailable: true,
    programCount: 10, tuitionMin: 420000, tuitionMax: 750000,
    popularPrograms: ['Law', 'BBA', 'CSE', 'English', 'Pharmacy'],
    faculties: [
      { id: 'f1', name: 'Faculty of Law', departments: ['LLB'] },
      { id: 'f2', name: 'Faculty of Business', departments: ['BBA', 'MBA'] },
      { id: 'f3', name: 'Faculty of Science & Engineering', departments: ['CSE', 'Pharmacy'] },
    ],
    featured: false, verification: 'community_reported', lastUpdated: '2026-04-05', source: 'University Official Website',
  },
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
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u7', 'u8', 'u9', 'u10', 'u12'],
  },
  {
    id: 'p2', slug: 'bba', name: 'Business Administration (BBA)', category: 'Business',
    description: 'BBA provides foundational and advanced knowledge in management, finance, marketing, accounting, and entrepreneurship.',
    careerOpportunities: ['Business Analyst', 'Marketing Executive', 'Financial Analyst', 'HR Manager', 'Entrepreneur', 'Operations Manager'],
    avgTuitionMin: 500000, avgTuitionMax: 1100000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10', 'u11', 'u12'],
  },
  {
    id: 'p3', slug: 'eee', name: 'Electrical & Electronic Engineering', category: 'Engineering',
    description: 'EEE covers circuits, power systems, electronics, telecommunications, and control systems — the backbone of modern infrastructure.',
    careerOpportunities: ['Electrical Engineer', 'Power Engineer', 'Telecom Engineer', 'Control Systems Engineer', 'Embedded Systems Developer'],
    avgTuitionMin: 650000, avgTuitionMax: 1250000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u7', 'u8'],
  },
  {
    id: 'p4', slug: 'pharmacy', name: 'Pharmacy', category: 'Pharmacy',
    description: 'BPharm prepares students for careers in pharmaceuticals, clinical practice, drug research, and the healthcare industry.',
    careerOpportunities: ['Pharmacist', 'Clinical Research Associate', 'Drug Safety Associate', 'Production Officer', 'Quality Control Officer'],
    avgTuitionMin: 550000, avgTuitionMax: 950000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u2', 'u5', 'u12'],
  },
  {
    id: 'p5', slug: 'civil-engineering', name: 'Civil Engineering', category: 'Engineering',
    description: 'Civil Engineering covers structural, geotechnical, transportation, and environmental engineering for infrastructure development.',
    careerOpportunities: ['Structural Engineer', 'Site Engineer', 'Project Manager', 'Urban Planner', 'Construction Manager'],
    avgTuitionMin: 600000, avgTuitionMax: 1100000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u4', 'u7', 'u8', 'u10'],
  },
  {
    id: 'p6', slug: 'architecture', name: 'Architecture', category: 'Architecture',
    description: 'BArch combines design, engineering, and urban planning to prepare architects for the built environment.',
    careerOpportunities: ['Architect', 'Urban Designer', 'Interior Designer', 'Project Architect', 'Landscape Architect'],
    avgTuitionMin: 700000, avgTuitionMax: 1450000, avgCredits: 190, avgDurationYears: 5,
    offeringUniversityIds: ['u1', 'u2', 'u4', 'u7', 'u8'],
  },
  {
    id: 'p7', slug: 'english', name: 'English (BA)', category: 'Arts & Humanities',
    description: 'BA in English covers literature, linguistics, and language studies — a versatile humanities degree.',
    careerOpportunities: ['Teacher', 'Content Writer', 'Editor', 'Translator', 'Communications Officer', 'Journalist'],
    avgTuitionMin: 380000, avgTuitionMax: 850000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u3', 'u5', 'u6', 'u9', 'u11', 'u12'],
  },
  {
    id: 'p8', slug: 'law', name: 'Law (LLB)', category: 'Law',
    description: 'LLB prepares students for legal practice, judiciary, and corporate legal roles in Bangladesh.',
    careerOpportunities: ['Lawyer', 'Legal Advisor', 'Judge', 'Corporate Counsel', 'Legal Researcher'],
    avgTuitionMin: 380000, avgTuitionMax: 750000, avgCredits: 140, avgDurationYears: 4,
    offeringUniversityIds: ['u11', 'u12'],
  },
  {
    id: 'p9', slug: 'economics', name: 'Economics', category: 'Social Sciences',
    description: 'Economics studies markets, policy, development, and finance — analytical skills for many sectors.',
    careerOpportunities: ['Economist', 'Policy Analyst', 'Data Analyst', 'Bank Officer', 'Researcher'],
    avgTuitionMin: 450000, avgTuitionMax: 900000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u9'],
  },
  {
    id: 'p10', slug: 'sociology', name: 'Sociology', category: 'Social Sciences',
    description: 'Sociology studies society, institutions, and human behavior — useful for development, NGO, and research careers.',
    careerOpportunities: ['Researcher', 'NGO Worker', 'Social Worker', 'HR Officer', 'Community Organizer'],
    avgTuitionMin: 380000, avgTuitionMax: 700000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u6', 'u11'],
  },
  {
    id: 'p11', slug: 'media-studies', name: 'Media Studies & Communication', category: 'Arts & Humanities',
    description: 'Media Studies covers journalism, film, advertising, and digital communication.',
    careerOpportunities: ['Journalist', 'Content Producer', 'PR Executive', 'Social Media Manager', 'Filmmaker'],
    avgTuitionMin: 400000, avgTuitionMax: 800000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u6', 'u4'],
  },
  {
    id: 'p12', slug: 'environmental-science', name: 'Environmental Science', category: 'Life Sciences',
    description: 'Environmental Science studies ecosystems, climate, sustainability, and environmental management.',
    careerOpportunities: ['Environmental Analyst', 'Sustainability Consultant', 'Researcher', 'NGO Worker'],
    avgTuitionMin: 500000, avgTuitionMax: 900000, avgCredits: 140, avgDurationYears: 4,
    offeringUniversityIds: ['u3'],
  },
];

// ============================================================
// PROGRAM OFFERINGS — per-university program details
// ============================================================

const makeOffering = (
  id: string, programId: string, universityId: string, degree: any,
  durationYears: number, totalCredits: number, tuitionPerCredit: number,
  admissionFee: number, labFee: number, otherFees: number, semesterFee: number,
  requirements: string[], scholarshipAvailable: boolean,
): ProgramOffering => ({
  id, programId, universityId, degree, durationYears, totalCredits, tuitionPerCredit,
  admissionFee, labFee, otherFees, semesterFee, admissionRequirements: requirements,
  scholarshipAvailable,
  totalTuitionEstimate: totalCredits * tuitionPerCredit + admissionFee,
});

export const programOfferings: ProgramOffering[] = [
  // CSE
  makeOffering('o1', 'p1', 'u1', 'BSc', 4, 160, 5500, 25000, 4000, 3000, 5000, ['HSC GPA 4.0+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o2', 'p1', 'u2', 'BSc', 4, 160, 5000, 20000, 3500, 3000, 5000, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o3', 'p1', 'u3', 'BSc', 4, 160, 4500, 18000, 3000, 2500, 4500, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o4', 'p1', 'u4', 'BSc', 4, 160, 4200, 15000, 3000, 2500, 4000, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o5', 'p1', 'u5', 'BSc', 4, 160, 3800, 12000, 2500, 2000, 3500, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o6', 'p1', 'u7', 'BSc', 4, 160, 4000, 14000, 2500, 2000, 3500, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o7', 'p1', 'u8', 'BSc', 4, 160, 4500, 16000, 3000, 2500, 4000, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o8', 'p1', 'u9', 'BSc', 4, 160, 3200, 10000, 2000, 1500, 3000, ['HSC GPA 3.0+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o9', 'p1', 'u10', 'BSc', 4, 160, 2800, 8000, 1500, 1500, 2500, ['HSC GPA 3.0+', 'Physics, Math'], false),
  makeOffering('o10', 'p1', 'u12', 'BSc', 4, 160, 3000, 9000, 2000, 1500, 2500, ['HSC GPA 3.0+', 'Physics, Math'], true),
  // BBA
  makeOffering('o11', 'p2', 'u1', 'BBA', 4, 120, 5000, 25000, 0, 3000, 5000, ['HSC GPA 4.0+', 'Any group', 'Admission test'], true),
  makeOffering('o12', 'p2', 'u2', 'BBA', 4, 120, 4500, 20000, 0, 3000, 5000, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o13', 'p2', 'u3', 'BBA', 4, 120, 4200, 18000, 0, 2500, 4500, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o14', 'p2', 'u4', 'BBA', 4, 120, 3800, 15000, 0, 2500, 4000, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o15', 'p2', 'u5', 'BBA', 4, 120, 3500, 12000, 0, 2000, 3500, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o16', 'p2', 'u6', 'BBA', 4, 120, 3200, 12000, 0, 2000, 3500, ['HSC GPA 3.0+', 'Any group'], true),
  makeOffering('o17', 'p2', 'u7', 'BBA', 4, 120, 3800, 14000, 0, 2000, 3500, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o18', 'p2', 'u8', 'BBA', 4, 120, 4200, 16000, 0, 2500, 4000, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o19', 'p2', 'u9', 'BBA', 4, 120, 2800, 10000, 0, 1500, 3000, ['HSC GPA 3.0+', 'Any group', 'Admission test'], true),
  makeOffering('o20', 'p2', 'u10', 'BBA', 4, 120, 2500, 8000, 0, 1500, 2500, ['HSC GPA 3.0+', 'Any group'], false),
  makeOffering('o21', 'p2', 'u11', 'BBA', 4, 120, 2400, 8000, 0, 1500, 2500, ['HSC GPA 3.0+', 'Any group'], false),
  makeOffering('o22', 'p2', 'u12', 'BBA', 4, 120, 2600, 9000, 0, 1500, 2500, ['HSC GPA 3.0+', 'Any group'], true),
  // EEE
  makeOffering('o23', 'p3', 'u1', 'BSc', 4, 160, 5500, 25000, 5000, 3000, 5000, ['HSC GPA 4.0+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o24', 'p3', 'u2', 'BSc', 4, 160, 5000, 20000, 4500, 3000, 5000, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o25', 'p3', 'u3', 'BSc', 4, 160, 4500, 18000, 4000, 2500, 4500, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o26', 'p3', 'u4', 'BSc', 4, 160, 4200, 15000, 4000, 2500, 4000, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o27', 'p3', 'u5', 'BSc', 4, 160, 3800, 12000, 3500, 2000, 3500, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o28', 'p3', 'u7', 'BSc', 4, 160, 4000, 14000, 3500, 2000, 3500, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o29', 'p3', 'u8', 'BSc', 4, 160, 4500, 16000, 4500, 2500, 4000, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  // Pharmacy
  makeOffering('o30', 'p4', 'u2', 'BPharm', 4, 160, 4800, 20000, 5000, 3000, 5000, ['HSC GPA 3.5+', 'Biology/Chemistry', 'Admission test'], true),
  makeOffering('o31', 'p4', 'u5', 'BPharm', 4, 160, 3800, 12000, 4000, 2000, 3500, ['HSC GPA 3.5+', 'Biology/Chemistry', 'Admission test'], true),
  makeOffering('o32', 'p4', 'u12', 'BPharm', 4, 160, 3000, 9000, 3000, 1500, 2500, ['HSC GPA 3.0+', 'Biology/Chemistry'], true),
  // Civil
  makeOffering('o33', 'p5', 'u4', 'BSc', 4, 160, 4200, 15000, 4000, 2500, 4000, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o34', 'p5', 'u7', 'BSc', 4, 160, 4000, 14000, 4000, 2000, 3500, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o35', 'p5', 'u8', 'BSc', 4, 160, 4500, 16000, 5000, 2500, 4000, ['HSC GPA 3.5+', 'Physics, Math', 'Admission test'], true),
  makeOffering('o36', 'p5', 'u10', 'BSc', 4, 160, 2800, 8000, 3000, 1500, 2500, ['HSC GPA 3.0+', 'Physics, Math'], false),
  // Architecture
  makeOffering('o37', 'p6', 'u1', 'BArch', 5, 190, 5500, 25000, 5000, 3000, 5000, ['HSC GPA 4.0+', 'Physics, Math', 'Drawing test'], true),
  makeOffering('o38', 'p6', 'u2', 'BArch', 5, 190, 5000, 20000, 4500, 3000, 5000, ['HSC GPA 3.5+', 'Physics, Math', 'Drawing test'], true),
  makeOffering('o39', 'p6', 'u4', 'BArch', 5, 190, 4200, 15000, 4000, 2500, 4000, ['HSC GPA 3.5+', 'Physics, Math', 'Drawing test'], true),
  makeOffering('o40', 'p6', 'u7', 'BArch', 5, 190, 4000, 14000, 4000, 2000, 3500, ['HSC GPA 3.5+', 'Physics, Math', 'Drawing test'], true),
  makeOffering('o41', 'p6', 'u8', 'BArch', 5, 190, 4500, 16000, 5000, 2500, 4000, ['HSC GPA 3.5+', 'Physics, Math', 'Drawing test'], true),
  // English
  makeOffering('o42', 'p7', 'u1', 'BA', 4, 120, 4500, 25000, 0, 3000, 5000, ['HSC GPA 4.0+', 'Any group', 'Admission test'], true),
  makeOffering('o43', 'p7', 'u3', 'BA', 4, 120, 3800, 18000, 0, 2500, 4500, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o44', 'p7', 'u5', 'BA', 4, 120, 3200, 12000, 0, 2000, 3500, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o45', 'p7', 'u6', 'BA', 4, 120, 3000, 12000, 0, 2000, 3500, ['HSC GPA 3.0+', 'Any group'], true),
  makeOffering('o46', 'p7', 'u9', 'BA', 4, 120, 2500, 10000, 0, 1500, 3000, ['HSC GPA 3.0+', 'Any group', 'Admission test'], true),
  makeOffering('o47', 'p7', 'u11', 'BA', 4, 120, 2400, 8000, 0, 1500, 2500, ['HSC GPA 3.0+', 'Any group'], false),
  makeOffering('o48', 'p7', 'u12', 'BA', 4, 120, 2600, 9000, 0, 1500, 2500, ['HSC GPA 3.0+', 'Any group'], true),
  // Law
  makeOffering('o49', 'p8', 'u11', 'LLB', 4, 140, 2400, 8000, 0, 1500, 2500, ['HSC GPA 3.0+', 'Any group'], false),
  makeOffering('o50', 'p8', 'u12', 'LLB', 4, 140, 2600, 9000, 0, 1500, 2500, ['HSC GPA 3.0+', 'Any group'], true),
  // Economics
  makeOffering('o51', 'p9', 'u1', 'BA', 4, 120, 4500, 25000, 0, 3000, 5000, ['HSC GPA 4.0+', 'Any group', 'Admission test'], true),
  makeOffering('o52', 'p9', 'u2', 'BA', 4, 120, 4500, 20000, 0, 3000, 5000, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  makeOffering('o53', 'p9', 'u9', 'BA', 4, 120, 2800, 10000, 0, 1500, 3000, ['HSC GPA 3.0+', 'Any group', 'Admission test'], true),
  // Sociology
  makeOffering('o54', 'p10', 'u1', 'BA', 4, 120, 4500, 25000, 0, 3000, 5000, ['HSC GPA 4.0+', 'Any group'], true),
  makeOffering('o55', 'p10', 'u6', 'BA', 4, 120, 3000, 12000, 0, 2000, 3500, ['HSC GPA 3.0+', 'Any group'], true),
  makeOffering('o56', 'p10', 'u11', 'BA', 4, 120, 2400, 8000, 0, 1500, 2500, ['HSC GPA 3.0+', 'Any group'], false),
  // Media
  makeOffering('o57', 'p11', 'u6', 'BA', 4, 120, 3000, 12000, 1000, 2000, 3500, ['HSC GPA 3.0+', 'Any group'], true),
  makeOffering('o58', 'p11', 'u4', 'BA', 4, 120, 3800, 15000, 1000, 2500, 4000, ['HSC GPA 3.5+', 'Any group', 'Admission test'], true),
  // Env Science
  makeOffering('o59', 'p12', 'u3', 'BSc', 4, 140, 4500, 18000, 3000, 2500, 4500, ['HSC GPA 3.5+', 'Biology/Chemistry', 'Admission test'], true),
];

// ============================================================
// SCHOLARSHIPS
// ============================================================

export const scholarships: Scholarship[] = [
  { id: 's1', universityId: 'u1', name: 'BRAC University Merit Scholarship', eligibility: 'Top performers in admission test', gpaRequirement: 4.5, percentage: 50, applicationProcess: 'Automatic consideration on admission', verification: 'university_verified', lastUpdated: '2026-06-15', source: 'University Official Website' },
  { id: 's2', universityId: 'u1', name: 'Financial Aid Grant', eligibility: 'Need-based, family income below ৳3L/year', gpaRequirement: 3.5, percentage: 25, applicationProcess: 'Submit financial aid form with income documents', verification: 'university_verified', lastUpdated: '2026-06-15', source: 'University Official Website' },
  { id: 's3', universityId: 'u2', name: 'NSU Merit Scholarship', eligibility: 'GPA 5.0 in HSC and high admission score', gpaRequirement: 5.0, percentage: 100, applicationProcess: 'Apply after admission with transcript', verification: 'university_verified', lastUpdated: '2026-06-10', source: 'University Official Website' },
  { id: 's4', universityId: 'u2', name: 'NSU Need-based Waiver', eligibility: 'Financial need', gpaRequirement: 3.5, percentage: 30, applicationProcess: 'Financial aid office application', verification: 'university_verified', lastUpdated: '2026-06-10', source: 'University Official Website' },
  { id: 's5', universityId: 'u3', name: 'IUB Tuition Waiver', eligibility: 'High academic achievers', gpaRequirement: 4.5, percentage: 40, applicationProcess: 'Apply with HSC transcript', verification: 'university_verified', lastUpdated: '2026-05-28', source: 'University Official Website' },
  { id: 's6', universityId: 'u4', name: 'AIUB Merit Waiver', eligibility: 'GPA 5.0 in HSC', gpaRequirement: 5.0, percentage: 50, applicationProcess: 'Automatic on admission', verification: 'university_verified', lastUpdated: '2026-06-18', source: 'University Official Website' },
  { id: 's7', universityId: 'u5', name: 'EWU Scholarship', eligibility: 'Top admission test scores', gpaRequirement: 4.0, percentage: 30, applicationProcess: 'Apply after admission', verification: 'university_verified', lastUpdated: '2026-05-20', source: 'University Official Website' },
  { id: 's8', universityId: 'u6', name: 'ULAB Liberal Arts Scholarship', eligibility: 'Strong humanities background', gpaRequirement: 4.0, percentage: 25, applicationProcess: 'Essay + transcript submission', verification: 'community_reported', lastUpdated: '2026-04-30', source: 'University Official Website' },
  { id: 's9', universityId: 'u7', name: 'UAP Engineering Scholarship', eligibility: 'STEM excellence', gpaRequirement: 4.5, percentage: 35, applicationProcess: 'Apply with HSC results', verification: 'university_verified', lastUpdated: '2026-05-15', source: 'University Official Website' },
  { id: 's10', universityId: 'u8', name: 'AUST Merit Award', eligibility: 'Top engineering students', gpaRequirement: 4.5, percentage: 40, applicationProcess: 'Automatic consideration', verification: 'university_verified', lastUpdated: '2026-06-02', source: 'University Official Website' },
  { id: 's11', universityId: 'u9', name: 'CIU Regional Scholarship', eligibility: 'Chattogram region students', gpaRequirement: 4.0, percentage: 20, applicationProcess: 'Apply with local residency proof', verification: 'community_reported', lastUpdated: '2026-04-12', source: 'University Official Website' },
  { id: 's12', universityId: 'u12', name: 'DIU Need Waiver', eligibility: 'Financial need', gpaRequirement: 3.5, percentage: 25, applicationProcess: 'Financial aid application', verification: 'community_reported', lastUpdated: '2026-04-05', source: 'University Official Website' },
];

// ============================================================
// ADMISSION NOTICES
// ============================================================

export const admissionNotices: AdmissionNotice[] = [
  { id: 'a1', universityId: 'u1', title: 'Fall 2026 Admission Open — CSE, BBA, EEE', applicationStart: '2026-07-01', deadline: '2026-08-15', admissionTestDate: '2026-08-25', applicationLink: 'https://www.bracu.ac.bd/admissions', officialSource: 'BRACU Admissions Office', lastUpdated: '2026-07-20', verification: 'university_verified' },
  { id: 'a2', universityId: 'u2', title: 'Fall 2026 Undergraduate Admission', applicationStart: '2026-07-10', deadline: '2026-08-20', admissionTestDate: '2026-08-30', applicationLink: 'https://www.northsouth.edu/admissions', officialSource: 'NSU Admissions', lastUpdated: '2026-07-18', verification: 'university_verified' },
  { id: 'a3', universityId: 'u4', title: 'AIUB Fall 2026 Admission Circular', applicationStart: '2026-07-05', deadline: '2026-08-10', admissionTestDate: '2026-08-18', applicationLink: 'https://www.aiub.edu/admissions', officialSource: 'AIUB Admissions', lastUpdated: '2026-07-15', verification: 'university_verified' },
  { id: 'a4', universityId: 'u3', title: 'IUB Fall 2026 Admission Notice', applicationStart: '2026-07-15', deadline: '2026-08-25', admissionTestDate: '2026-09-01', applicationLink: 'https://www.iub.edu.bd/admissions', officialSource: 'IUB Admissions', lastUpdated: '2026-07-12', verification: 'university_verified' },
  { id: 'a5', universityId: 'u5', title: 'EWU Fall 2026 Admission', applicationStart: '2026-07-20', deadline: '2026-09-05', admissionTestDate: '2026-09-12', applicationLink: 'https://www.ewubd.edu/admissions', officialSource: 'EWU Admissions', lastUpdated: '2026-07-10', verification: 'university_verified' },
  { id: 'a6', universityId: 'u8', title: 'AUST Fall 2026 Engineering Admission', applicationStart: '2026-07-01', deadline: '2026-08-12', admissionTestDate: '2026-08-20', applicationLink: 'https://www.aust.edu/admissions', officialSource: 'AUST Admissions', lastUpdated: '2026-07-22', verification: 'university_verified' },
  { id: 'a7', universityId: 'u7', title: 'UAP Fall 2026 Admission Circular', applicationStart: '2026-07-08', deadline: '2026-08-18', admissionTestDate: '2026-08-28', applicationLink: 'https://www.uap-bd.edu/admissions', officialSource: 'UAP Admissions', lastUpdated: '2026-07-16', verification: 'university_verified' },
  { id: 'a8', universityId: 'u9', title: 'CIU Fall 2026 Admission', applicationStart: '2026-07-15', deadline: '2026-08-30', admissionTestDate: '2026-09-05', applicationLink: 'https://www.ciu.edu.bd/admissions', officialSource: 'CIU Admissions', lastUpdated: '2026-07-08', verification: 'community_reported' },
];

// ============================================================
// REVIEWS
// ============================================================

export const reviews: Review[] = [
  { id: 'r1', universityId: 'u1', authorName: 'Tanvir Ahmed', authorType: 'alumni', verified: true, graduationYear: 2023, programName: 'CSE', ratings: { academics: 5, faculty: 4, campus: 4, studentLife: 4, career: 5, costValue: 3, facilities: 4 }, overall: 4.6, writtenReview: 'BRACU gave me a strong foundation in software engineering. The CSE curriculum is rigorous and the faculty is supportive. Career services helped me land a job at a top tech company.', helpfulVotes: 47, date: '2026-05-10' },
  { id: 'r2', universityId: 'u1', authorName: 'Sadia Rahman', authorType: 'student', verified: true, graduationYear: 2027, programName: 'BBA', ratings: { academics: 4, faculty: 4, campus: 5, studentLife: 5, career: 4, costValue: 3, facilities: 4 }, overall: 4.4, writtenReview: 'BBA program is well-structured with great industry connections. Campus life is vibrant with many clubs. Tuition is on the higher side but worth it.', helpfulVotes: 32, date: '2026-04-22' },
  { id: 'r3', universityId: 'u2', authorName: 'Rakib Hasan', authorType: 'alumni', verified: true, graduationYear: 2022, programName: 'CSE', ratings: { academics: 4, faculty: 4, campus: 5, studentLife: 4, career: 5, costValue: 4, facilities: 5 }, overall: 4.5, writtenReview: 'NSU has excellent infrastructure and a huge library. CSE program is competitive. Bashundhara campus is beautiful but far from central Dhaka.', helpfulVotes: 58, date: '2026-05-02' },
  { id: 'r4', universityId: 'u2', authorName: 'Nusrat Jahan', authorType: 'student', verified: true, graduationYear: 2026, programName: 'BBA', ratings: { academics: 5, faculty: 5, campus: 5, studentLife: 4, career: 5, costValue: 3, facilities: 5 }, overall: 4.7, writtenReview: 'BBA at NSU is top-tier. Faculty bring real industry experience. Networking opportunities are excellent. Expensive but the brand value is real.', helpfulVotes: 41, date: '2026-06-01' },
  { id: 'r5', universityId: 'u4', authorName: 'Imran Khan', authorType: 'alumni', verified: true, graduationYear: 2021, programName: 'EEE', ratings: { academics: 4, faculty: 4, campus: 4, studentLife: 4, career: 4, costValue: 5, facilities: 4 }, overall: 4.2, writtenReview: 'AIUB offers great value for money. EEE labs are well-equipped. Large student body means lots of networking. Some classes are crowded though.', helpfulVotes: 36, date: '2026-03-15' },
  { id: 'r6', universityId: 'u5', authorName: 'Farhana Islam', authorType: 'student', verified: true, graduationYear: 2026, programName: 'CSE', ratings: { academics: 4, faculty: 4, campus: 3, studentLife: 4, career: 4, costValue: 5, facilities: 3 }, overall: 4.0, writtenReview: 'EWU is the best bang for your buck. CSE program is solid and affordable. Campus is small but the location is convenient. Good placement record.', helpfulVotes: 28, date: '2026-04-18' },
  { id: 'r7', universityId: 'u8', authorName: 'Sabbir Hossain', authorType: 'alumni', verified: true, graduationYear: 2020, programName: 'Civil Engineering', ratings: { academics: 5, faculty: 4, campus: 4, studentLife: 3, career: 4, costValue: 4, facilities: 5 }, overall: 4.3, writtenReview: 'AUST is the place for serious engineering students. Civil department is excellent with great lab facilities. Less focus on extracurriculars.', helpfulVotes: 24, date: '2026-02-20' },
  { id: 'r8', universityId: 'u3', authorName: 'Mitu Akter', authorType: 'student', verified: true, graduationYear: 2025, programName: 'CSE', ratings: { academics: 4, faculty: 5, campus: 4, studentLife: 5, career: 4, costValue: 4, facilities: 4 }, overall: 4.3, writtenReview: 'IUB has a unique liberal arts approach. Small class sizes mean personal attention. CSE faculty are approachable and knowledgeable.', helpfulVotes: 19, date: '2026-05-25' },
  { id: 'r9', universityId: 'u6', authorName: 'Arif Mahmud', authorType: 'alumni', verified: true, graduationYear: 2022, programName: 'English', ratings: { academics: 4, faculty: 5, campus: 3, studentLife: 5, career: 3, costValue: 4, facilities: 3 }, overall: 3.9, writtenReview: 'ULAB is great for humanities lovers. English department faculty are excellent. Campus is small. Career services could be stronger.', helpfulVotes: 15, date: '2026-01-30' },
  { id: 'r10', universityId: 'u7', authorName: 'Jannatul Ferdous', authorType: 'student', verified: false, graduationYear: 2026, programName: 'Architecture', ratings: { academics: 4, faculty: 4, campus: 3, studentLife: 3, career: 4, costValue: 4, facilities: 4 }, overall: 4.0, writtenReview: 'UAP architecture program is underrated. Studios are well-equipped. Faculty are practicing architects. Central location is a plus.', helpfulVotes: 12, date: '2026-03-08' },
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
    content: 'I got admission offers from both BRACU and NSU for CSE. Which one should I choose considering faculty, curriculum, and job prospects? Any current students or alumni please share your experience.',
    tags: ['cse', 'bracu', 'nsu', 'admission'], upvotes: 124, date: '2026-07-22',
    comments: [
      { id: 'cm1', authorName: 'Tanvir Ahmed', authorAvatarColor: 'bg-emerald-600', verifiedBadge: 'alumni', content: 'I graduated from BRACU CSE in 2023. Curriculum is rigorous, lots of project work. Faculty is research-oriented. NSU has better infrastructure but BRACU has stronger industry connections for tech jobs.', upvotes: 38, date: '2026-07-22' },
      { id: 'cm2', authorName: 'Rakib Hasan', authorAvatarColor: 'bg-indigo-600', verifiedBadge: 'alumni', content: 'NSU CSE here. Both are good. Choose based on location preference and budget. BRACU is more expensive but has smaller cohorts.', upvotes: 22, date: '2026-07-23' },
    ],
  },
  {
    id: 'c2', universityId: 'u2', authorName: 'Sabbir Ahmed', authorAvatarColor: 'bg-accent-600',
    universityAffiliation: 'North South University', verifiedBadge: 'student',
    category: 'Tuition & Fees', type: 'question',
    title: 'What is the actual total cost of studying BBA at NSU?',
    content: 'The website shows per-credit fees but I want to know the real total cost including all hidden fees, semester fees, and other charges for the full 4-year BBA program.',
    tags: ['bba', 'nsu', 'tuition', 'fees'], upvotes: 89, date: '2026-07-20',
    comments: [
      { id: 'cm3', authorName: 'Nusrat Jahan', authorAvatarColor: 'bg-rose-600', verifiedBadge: 'student', content: 'I am in my final year BBA at NSU. Total cost comes to around ৳10-11 lakh including everything. Per semester around ৳1.4 lakh. Scholarships can reduce this significantly.', upvotes: 45, date: '2026-07-21' },
    ],
  },
  {
    id: 'c3', authorName: 'Mim Akter', authorAvatarColor: 'bg-emerald-600',
    category: 'Admission Help', type: 'question',
    title: 'Minimum GPA requirements for private universities in 2026?',
    content: 'I have GPA 3.8 in HSC. Which good private universities can I apply to for CSE? Do all require admission tests?',
    tags: ['admission', 'gpa', 'cse'], upvotes: 156, date: '2026-07-19',
    comments: [
      { id: 'cm4', authorName: 'Admin Team', authorAvatarColor: 'bg-ink-700', verifiedBadge: 'top', content: 'With GPA 3.8 you can apply to EWU, AIUB, UAP, AUST, IUB. BRACU and NSU require 4.0+ and 3.5+ respectively. Most require admission tests; ULAB and DIU do not.', upvotes: 67, date: '2026-07-19' },
    ],
  },
  {
    id: 'c4', universityId: 'u4', authorName: 'Karim Uddin', authorAvatarColor: 'bg-amber-600',
    universityAffiliation: 'AIUB', verifiedBadge: 'alumni',
    category: 'Career & Jobs', type: 'discussion',
    title: 'AIUB CSE graduates: where are you working now?',
    content: 'Curious to know the career outcomes for AIUB CSE alumni. Share your company, role, and year of graduation. This will help current students.',
    tags: ['aiub', 'cse', 'career', 'alumni'], upvotes: 73, date: '2026-07-18',
    comments: [
      { id: 'cm5', authorName: 'Imran Khan', authorAvatarColor: 'bg-cyan-600', verifiedBadge: 'alumni', content: '2021 EEE graduate, now working at Samsung R&D Bangladesh as Senior Engineer. AIUB has decent placement for engineering.', upvotes: 31, date: '2026-07-18' },
    ],
  },
  {
    id: 'c5', authorName: 'Tania Sultana', authorAvatarColor: 'bg-violet-600',
    category: 'Scholarships', type: 'question',
    title: 'Best scholarships for GPA 5.0 students?',
    content: 'I got GPA 5.0 in HSC. Which private universities offer full or 50%+ scholarships for CSE? Looking for the best financial aid options.',
    tags: ['scholarship', 'gpa5', 'cse'], upvotes: 112, date: '2026-07-17',
    comments: [
      { id: 'cm6', authorName: 'Admin Team', authorAvatarColor: 'bg-ink-700', verifiedBadge: 'top', content: 'NSU offers 100% merit scholarship for GPA 5.0. BRACU has 50% merit scholarship. AIUB has 50% waiver. Check our Scholarships page for full list.', upvotes: 54, date: '2026-07-17' },
    ],
  },
  {
    id: 'c6', universityId: 'u8', authorName: 'Hasibul Islam', authorAvatarColor: 'bg-teal-600',
    universityAffiliation: 'AUST', verifiedBadge: 'student',
    category: 'Campus Life', type: 'question',
    title: 'How is the campus life at AUST?',
    content: 'Considering AUST for Civil Engineering. How are the labs, library, and extracurricular activities? Is it only study-focused or is there a social scene?',
    tags: ['aust', 'campus', 'civil'], upvotes: 41, date: '2026-07-15',
    comments: [],
  },
  {
    id: 'c7', authorName: 'Rashed Khan', authorAvatarColor: 'bg-sky-600',
    category: 'University Selection', type: 'question',
    title: 'BRACU vs AIUB for Architecture?',
    content: 'Confused between BRACU and AIUB for BArch. Both seem good. Which has better studios, faculty, and reputation in the architecture industry?',
    tags: ['architecture', 'bracu', 'aiub'], upvotes: 38, date: '2026-07-14',
    comments: [],
  },
  {
    id: 'c8', authorName: 'Sumaiya Akter', authorAvatarColor: 'bg-pink-600',
    category: 'Accommodation', type: 'question',
    title: 'Best areas to live near Bashundhara universities?',
    content: 'Going to attend NSU this fall. What are affordable areas to rent near Bashundhara? Any female-only hostels or mess facilities?',
    tags: ['accommodation', 'dhaka', 'nsu'], upvotes: 67, date: '2026-07-12',
    comments: [
      { id: 'cm7', authorName: 'Nusrat Jahan', authorAvatarColor: 'bg-rose-600', verifiedBadge: 'student', content: 'Bashundhara R/A has many mess options. Beraid and Nodda are cheaper. Expect ৳6,000-12,000/month for shared mess. Some female-only hostels near NSU campus.', upvotes: 28, date: '2026-07-13' },
    ],
  },
];

// ============================================================
// STUDENT LEADS (sample)
// ============================================================

export const studentLeads: StudentLead[] = [
  { id: 'l1', name: 'Rahim Uddin', phone: '+8801712345678', email: 'rahim@example.com', preferredUniversityId: 'u1', preferredProgramId: 'p1', background: 'HSC Science, GPA 4.5', consent: true, date: '2026-07-20' },
  { id: 'l2', name: 'Karima Begum', phone: '+8801812345679', email: 'karima@example.com', preferredUniversityId: 'u2', preferredProgramId: 'p2', background: 'HSC Commerce, GPA 4.2', consent: true, date: '2026-07-18' },
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
