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
    website: 'https://www.bracu.ac.bd', email: 'info@bracu.ac.bd', phone: '+880 2-9844051',
    address: 'Kha 224, Pragati Sarani, Merul Badda, Dhaka 1212',
    description: 'BRAC University (BRACU) is a private research university in Dhaka, Bangladesh, founded in 2001 by BRAC and its founder Sir Fazle Hasan Abed. It is one of the top-ranked private universities in Bangladesh, offering a liberal arts–enriched curriculum across engineering, business, law, public health, architecture, and social sciences. The university enrolls over 20,000 students and employs 649 faculty members, with instruction conducted in English.',
    campusInfo: 'Urban campus spread over 5 acres in Merul Badda, Pragati Sarani, Dhaka. The state-of-the-art permanent campus features modern academic buildings, research labs, a central library, auditorium, cafeteria, student lounge, and Wi-Fi throughout. The university maintains a residential campus in Savar — all undergraduate students undergo a compulsory residential semester (BDT 88,000 fee, effective Spring 2025) fostering teamwork and community living — and operates the James P. Grant School of Public Health in Mohakhali. Application fee for admission is BDT 1,500 (non-refundable, payable via bKash, Nagad, Rocket, or card).',
    accreditation: 'Affiliated with University Grants Commission (UGC) of Bangladesh. Accredited by: Bangladesh Bar Council, Institute of Architects Bangladesh (IAB), Pharmacy Council of Bangladesh (PCB), Institution of Engineers Bangladesh (IEB), Association of Commonwealth Universities (ACU), Association to Advance Collegiate Schools of Business (AACSB), and Association of Private Universities of Bangladesh (APUB).',
    facilities: ['Central Library', 'Computer Labs', 'Research Laboratories', 'Cafeteria', 'Auditorium', 'Medical Center', 'Wi-Fi Campus', 'Student Lounge', 'Sports Facilities', 'Seminar Rooms', 'Maker Space', 'Career Services Center'],
    admissionTestRequired: true, minGPA: 3.5, rating: 4.6, reviewCount: 312, scholarshipAvailable: true,
    programCount: 38, tuitionMin: 1224100, tuitionMax: 1998300,
    popularPrograms: ['CSE', 'BBA', 'EEE', 'ECE', 'Architecture', 'Law', 'Pharmacy', 'Microbiology', 'Biotechnology', 'Mathematics', 'Physics', 'Economics', 'English', 'Anthropology'],
    faculties: [
      { id: 'f1', name: 'School of Engineering (BSRM SoE)', departments: ['CSE', 'EEE', 'ECE'] },
      { id: 'f2', name: 'BRAC Business School (BBS)', departments: ['BBA'] },
      { id: 'f3', name: 'School of Architecture & Design (SoAD)', departments: ['Architecture'] },
      { id: 'f4', name: 'School of Law (SoL)', departments: ['Law'] },
      { id: 'f5', name: 'School of Pharmacy (SOP)', departments: ['Pharmacy'] },
      { id: 'f6', name: 'School of Life Sciences (SLS)', departments: ['Microbiology', 'Biotechnology'] },
      { id: 'f7', name: 'Department of Mathematics and Physical Sciences (MPS)', departments: ['Mathematics', 'Physics', 'Applied Physics & Electronics'] },
      { id: 'f8', name: 'School of Humanities & Social Sciences (SHSS)', departments: ['Economics', 'Anthropology', 'English'] },
    ],
    featured: true, verification: 'university_verified', lastUpdated: '2026-10-15', source: 'Wikipedia / University Official Website (bracu.ac.bd)',
  },
  {
    id: 'u2', slug: 'independent-university-bangladesh', name: 'Independent University, Bangladesh', shortName: 'IUB',
    logoColor: 'from-blue-600 to-indigo-700', logoInitials: 'IUB',
    location: 'Dhaka', division: 'Dhaka', established: 1993,
    website: 'https://iub.ac.bd', email: 'info@iub.ac.bd', phone: '+880 2-8431645-53',
    address: 'Plot 16, Block B, Aftabuddin Ahmed Road, Bashundhara R/A, Dhaka 1229',
    description: 'Independent University, Bangladesh (IUB) is a premier private research university in Dhaka, founded in 1993. Ranked among the leading universities in Bangladesh by QS and Times Higher Education, IUB enrolls over 19,000 students and features pioneering research centers in robotics, space science, and climate change, alongside its signature Live-in-Field Experience (LFE) program.',
    campusInfo: 'State-of-the-art permanent campus situated on 3 acres in Bashundhara R/A, Dhaka. Highlights include world-class digital classrooms, high-tech robotics and FabLab, an international-standard swimming pool, gymnasium, squash courts, table tennis complex, central library, rooftop gardens, cafeteria, and student activity centers.',
    accreditation: 'Approved by UGC. Engineering programs accredited by Board of Accreditation for Engineering and Technical Education (BAETE) under IEB. Pharmacy program accredited by Pharmacy Council of Bangladesh (PCB). Member of Association of Commonwealth Universities (ACU) and AACSB business alliance.',
    facilities: ['Central Library', 'Advanced AI & Robotics Lab', 'FabLab & Maker Space', 'Indoor Swimming Pool', 'Gymnasium & Fitness Center', 'Squash & Table Tennis Courts', 'Auditorium & Amphitheater', 'Cafeteria', 'Medical Center', 'Wi-Fi Campus', 'Career Guidance & Placement Center', 'Student Activity Center'],
    admissionTestRequired: true, minGPA: 3.5, rating: 4.5, reviewCount: 418, scholarshipAvailable: true,
    programCount: 28, tuitionMin: 901000, tuitionMax: 1405000,
    popularPrograms: ['CSE', 'BBA', 'EEE', 'Pharmacy', 'Biochemistry', 'Microbiology', 'Economics', 'English', 'Environmental Science', 'Law'],
    faculties: [
      { id: 'f1', name: 'School of Engineering, Technology and Sciences (SETS)', departments: ['CSE', 'EEE', 'ETE'] },
      { id: 'f2', name: 'School of Business and Entrepreneurship (SBE)', departments: ['BBA', 'Economics'] },
      { id: 'f3', name: 'School of Environment and Life Sciences (SELS)', departments: ['Biochemistry', 'Microbiology', 'Environmental Science'] },
      { id: 'f4', name: 'School of Liberal Arts and Social Sciences (SLASS)', departments: ['English', 'Media and Communication'] },
      { id: 'f5', name: 'School of Pharmacy and Public Health (SPPH)', departments: ['Pharmacy'] },
      { id: 'f6', name: 'School of Law (SL)', departments: ['Law'] },
    ],
    featured: true, verification: 'university_verified', lastUpdated: '2026-10-18', source: 'University Official Website (iub.ac.bd)',
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
    programCount: 24, tuitionMin: 825000, tuitionMax: 1535000,
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
    avgTuitionMin: 1350000, avgTuitionMax: 1450000, avgCredits: 136, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u4'],
  },
  {
    id: 'p2', slug: 'bba', name: 'Business Administration (BBA)', category: 'Business',
    description: 'BBA provides foundational and advanced knowledge in management, finance, marketing, accounting, and entrepreneurship.',
    careerOpportunities: ['Business Analyst', 'Marketing Executive', 'Financial Analyst', 'HR Manager', 'Entrepreneur', 'Operations Manager'],
    avgTuitionMin: 966000, avgTuitionMax: 1310000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u4'],
  },
  {
    id: 'p3', slug: 'eee', name: 'Electrical & Electronic Engineering', category: 'Engineering',
    description: 'EEE covers circuits, power systems, electronics, telecommunications, and control systems — the backbone of modern infrastructure.',
    careerOpportunities: ['Electrical Engineer', 'Power Engineer', 'Telecom Engineer', 'Control Systems Engineer', 'Embedded Systems Developer'],
    avgTuitionMin: 1061000, avgTuitionMax: 1360000, avgCredits: 136, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u4'],
  },
  {
    id: 'p4', slug: 'pharmacy', name: 'Pharmacy', category: 'Pharmacy',
    description: 'BPharm prepares students for careers in pharmaceuticals, clinical practice, drug research, and the healthcare industry.',
    careerOpportunities: ['Pharmacist', 'Clinical Research Associate', 'Drug Safety Associate', 'Production Officer', 'Quality Control Officer'],
    avgTuitionMin: 1405000, avgTuitionMax: 1650000, avgCredits: 164, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u4'],
  },
  {
    id: 'p5', slug: 'civil-engineering', name: 'Civil Engineering', category: 'Engineering',
    description: 'Civil Engineering covers structural, geotechnical, transportation, and environmental engineering for infrastructure development.',
    careerOpportunities: ['Structural Engineer', 'Site Engineer', 'Project Manager', 'Urban Planner', 'Construction Manager'],
    avgTuitionMin: 1100000, avgTuitionMax: 1350000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: [],
  },
  {
    id: 'p6', slug: 'architecture', name: 'Architecture', category: 'Architecture',
    description: 'BArch combines design, engineering, and urban planning to prepare architects for the built environment.',
    careerOpportunities: ['Architect', 'Urban Designer', 'Interior Designer', 'Project Architect', 'Landscape Architect'],
    avgTuitionMin: 1480000, avgTuitionMax: 1998300, avgCredits: 207, avgDurationYears: 5,
    offeringUniversityIds: ['u1', 'u4'],
  },
  {
    id: 'p7', slug: 'english', name: 'English (BA)', category: 'Arts & Humanities',
    description: 'BA in English covers literature, linguistics, and language studies — a versatile humanities degree.',
    careerOpportunities: ['Teacher', 'Content Writer', 'Editor', 'Translator', 'Communications Officer', 'Journalist'],
    avgTuitionMin: 901000, avgTuitionMax: 1225000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u4'],
  },
  {
    id: 'p8', slug: 'law', name: 'Law (LLB)', category: 'Law',
    description: 'LLB prepares students for legal practice, judiciary, and corporate legal roles in Bangladesh.',
    careerOpportunities: ['Lawyer', 'Legal Advisor', 'Judge', 'Corporate Counsel', 'Legal Researcher'],
    avgTuitionMin: 1219000, avgTuitionMax: 1480000, avgCredits: 135, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u4'],
  },
  {
    id: 'p9', slug: 'journalism', name: 'Media and Communication (JMC)', category: 'Arts & Humanities',
    description: 'BA in Media and Communication covers digital journalism, film, advertising, public relations, and mass media.',
    careerOpportunities: ['Journalist', 'PR Specialist', 'Media Producer', 'Content Creator', 'Broadcaster'],
    avgTuitionMin: 825000, avgTuitionMax: 966000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u2', 'u4'],
  },
  {
    id: 'p10', slug: 'economics', name: 'Economics', category: 'Arts & Humanities',
    description: 'BSS in Economics provides a strong foundation in micro, macro, and applied economics.',
    careerOpportunities: ['Economist', 'Financial Analyst', 'Policy Advisor', 'Researcher'],
    avgTuitionMin: 890000, avgTuitionMax: 1260000, avgCredits: 124, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u4'],
  },
  {
    id: 'p11', slug: 'ipe', name: 'Industrial and Production Engineering (IPE)', category: 'Engineering',
    description: 'IPE integrates engineering with management to optimize production processes.',
    careerOpportunities: ['Production Engineer', 'Quality Assurance Manager', 'Supply Chain Manager'],
    avgTuitionMin: 1137000, avgTuitionMax: 1250000, avgCredits: 148, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p12', slug: 'coe', name: 'Computer Engineering (COE)', category: 'Engineering',
    description: 'COE blends electrical engineering and computer science to develop computing systems.',
    careerOpportunities: ['Systems Engineer', 'Hardware Engineer', 'Embedded Systems Developer'],
    avgTuitionMin: 1063000, avgTuitionMax: 1200000, avgCredits: 148, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p13', slug: 'biochemistry', name: 'Biochemistry and Molecular Biology (BMB)', category: 'Life Sciences',
    description: 'BMB explores the chemical processes within and related to living organisms.',
    careerOpportunities: ['Biotechnologist', 'Research Scientist', 'Clinical Laboratory Scientist'],
    avgTuitionMin: 1035000, avgTuitionMax: 1250000, avgCredits: 140, avgDurationYears: 4,
    offeringUniversityIds: ['u2', 'u4'],
  },
  {
    id: 'p14', slug: 'data-science', name: 'Data Science (DS)', category: 'Computer Science',
    description: 'Data Science focuses on extracting insights from structured and unstructured data.',
    careerOpportunities: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'],
    avgTuitionMin: 1350000, avgTuitionMax: 1450000, avgCredits: 148, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p15', slug: 'cyber-security', name: 'Computer Networks and Cyber Security (CNCS)', category: 'Computer Science',
    description: 'CNCS trains students in protecting systems, networks, and programs from digital attacks.',
    careerOpportunities: ['Cyber Security Analyst', 'Network Engineer', 'Security Consultant'],
    avgTuitionMin: 1350000, avgTuitionMax: 1450000, avgCredits: 148, avgDurationYears: 4,
    offeringUniversityIds: ['u4'],
  },
  {
    id: 'p16', slug: 'ece', name: 'Electronics & Communication / Telecommunication Engineering', category: 'Engineering',
    description: 'ECE/ETE focuses on electronic circuits, signal processing, communication systems, optical fiber, and wireless technologies.',
    careerOpportunities: ['Electronics Engineer', 'Communication Engineer', 'Signal Processing Engineer', 'RF Engineer', 'Telecom Specialist', 'IoT Developer'],
    avgTuitionMin: 1061000, avgTuitionMax: 1360000, avgCredits: 136, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2'],
  },
  {
    id: 'p17', slug: 'microbiology', name: 'Microbiology', category: 'Life Sciences',
    description: 'BSc in Microbiology covers bacteriology, virology, mycology, immunology, and applied microbiology — preparing students for research, healthcare, and pharmaceutical industries.',
    careerOpportunities: ['Microbiologist', 'Research Scientist', 'Quality Control Officer', 'Clinical Lab Scientist', 'Pharmaceutical Researcher', 'Biotech Analyst'],
    avgTuitionMin: 1035000, avgTuitionMax: 1360000, avgCredits: 136, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2'],
  },
  {
    id: 'p18', slug: 'anthropology', name: 'Anthropology (BSS)', category: 'Social Sciences',
    description: 'BSS in Anthropology explores human societies, cultures, evolution, and social change — preparing students for development, research, policy, and NGO roles.',
    careerOpportunities: ['Social Researcher', 'Development Worker', 'Policy Analyst', 'NGO Program Officer', 'Cultural Consultant', 'Community Organizer'],
    avgTuitionMin: 950000, avgTuitionMax: 1225000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1'],
  },
  {
    id: 'p19', slug: 'biotechnology', name: 'Biotechnology', category: 'Life Sciences',
    description: 'BSc in Biotechnology explores genetic engineering, cellular biology, bioinformatics, and bioprocess technology.',
    careerOpportunities: ['Biotechnologist', 'Biomedical Scientist', 'Genetic Analyst', 'Bioinformatics Specialist', 'Pharmaceutical Developer'],
    avgTuitionMin: 1150000, avgTuitionMax: 1360000, avgCredits: 136, avgDurationYears: 4,
    offeringUniversityIds: ['u1'],
  },
  {
    id: 'p20', slug: 'mathematics', name: 'Mathematics', category: 'Other',
    description: 'Bachelor of Science in Mathematics provides rigorous training in pure and applied mathematics, mathematical modeling, and computational statistics.',
    careerOpportunities: ['Data Analyst', 'Actuary', 'Quantitative Analyst', 'Mathematical Modeler', 'Academic Researcher', 'Software Developer'],
    avgTuitionMin: 1200000, avgTuitionMax: 1300000, avgCredits: 127, avgDurationYears: 4,
    offeringUniversityIds: ['u1'],
  },
  {
    id: 'p21', slug: 'physics', name: 'Physics', category: 'Other',
    description: 'Bachelor of Science in Physics covers classical mechanics, quantum theory, electromagnetism, and modern experimental physics.',
    careerOpportunities: ['Physicist', 'Research Scientist', 'Laboratory Analyst', 'Scientific Programmer', 'Geophysicist', 'Data Scientist'],
    avgTuitionMin: 1200000, avgTuitionMax: 1320000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u1'],
  },
  {
    id: 'p22', slug: 'ape', name: 'Applied Physics & Electronics (APE)', category: 'Engineering',
    description: 'Bachelor of Science in Applied Physics and Electronics bridges fundamental physical principles with advanced electronic circuit design, instrumentation, and telecommunications.',
    careerOpportunities: ['Electronics Engineer', 'Instrumentation Engineer', 'Hardware Developer', 'Telecommunications Specialist', 'R&D Engineer'],
    avgTuitionMin: 1200000, avgTuitionMax: 1320000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u1'],
  },
  {
    id: 'p23', slug: 'environmental-science', name: 'Environmental Science and Management', category: 'Life Sciences',
    description: 'BSc in Environmental Science and Management prepares students to tackle climate change, ecological sustainability, environmental impact assessment, and natural resource management.',
    careerOpportunities: ['Environmental Consultant', 'Climate Change Analyst', 'Sustainability Officer', 'EIA Specialist', 'Conservation Officer', 'GIS Analyst'],
    avgTuitionMin: 996000, avgTuitionMax: 1100000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u2'],
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
  overrideTotalEstimate?: number,
): ProgramOffering => {
  const semesters = durationYears * 3;
  const computedTotal =
    totalCredits * tuitionPerCredit +
    admissionFee +
    semesters * semesterFee +
    semesters * labFee +
    semesters * otherFees +
    (universityId === 'u1' ? 88000 : 0);

  return {
    id, programId, universityId, degree, durationYears, totalCredits, tuitionPerCredit,
    admissionFee, labFee, otherFees, semesterFee, admissionRequirements: requirements,
    scholarshipAvailable,
    totalTuitionEstimate: overrideTotalEstimate ?? computedTotal,
    facilities,
  };
};

export const programOfferings: ProgramOffering[] = [
  // BRACU — Official Real Fees (Spring 2025/2026 Rate + Mandatory Savar Residential Semester ৳88,000 + 15/12 Semesters)
  makeOffering('o1',  'p1',  'u1', 'BSc',    4, 136, 8250, 33900, 3000, 2000, 12600, ['HSC GPA 3.5+', 'Physics & Math', 'BRACU Admission Test'], true,  ['Central Library', 'AI/ML Lab', 'Robotics Lab', 'Research Center', 'Wi-Fi Campus', 'Maker Space'], 1395100),
  makeOffering('o13', 'p2',  'u1', 'BBA',    4, 130, 8250, 33900,    0, 2000,  9350, ['HSC GPA 3.5+', 'Any group', 'BRACU Admission Test'],      true,  ['Central Library', 'Bloomberg Terminal Lab', 'Business Case Lab', 'Career Services', 'Wi-Fi Campus', 'Auditorium'], 1306600),
  makeOffering('o27', 'p3',  'u1', 'BSc',    4, 136, 8250, 33900, 3000, 2000,  9350, ['HSC GPA 3.5+', 'Physics & Math', 'BRACU Admission Test'], true,  ['Central Library', 'EEE Lab', 'Power Systems Lab', 'Electronics Lab', 'Wi-Fi Campus'], 1356100),
  makeOffering('o28', 'p6',  'u1', 'BArch',  5, 207, 8800, 33900, 3000, 2000, 12600, ['HSC GPA 3.5+', 'Physics & Math', 'BRACU Admission Test', 'Portfolio Review'], true, ['Central Library', 'Architecture Design Studio', '3D Printing Lab', 'Model Workshop', 'Wi-Fi Campus'], 1998300),
  makeOffering('o29', 'p7',  'u1', 'BA',     4, 120, 8250, 33900,    0, 2000,  9350, ['HSC GPA 3.5+', 'Any group', 'BRACU Admission Test'],      true,  ['Central Library', 'Language Lab', 'Writing Center', 'Wi-Fi Campus', 'Auditorium'], 1224100),
  makeOffering('o30', 'p8',  'u1', 'LLB',    4, 135, 8800, 33900,    0, 2000, 14000, ['HSC GPA 3.5+', 'Any group', 'BRACU Admission Test'],      true,  ['Central Library', 'Moot Court Room', 'Legal Aid Clinic', 'Wi-Fi Campus', 'Seminar Hall'], 1477900),
  makeOffering('o31', 'p4',  'u1', 'BPharm', 4, 164, 8250, 33900, 3500, 2000, 14000, ['HSC GPA 3.5+', 'Biology & Chemistry', 'BRACU Admission Test'], true, ['Central Library', 'Pharmaceutical Lab', 'Microbiology Lab', 'Organic Chemistry Lab', 'Wi-Fi Campus'], 1642900),
  makeOffering('o32', 'p16', 'u1', 'BSc',    4, 136, 8250, 33900, 3000, 2000,  9350, ['HSC GPA 3.5+', 'Physics & Math', 'BRACU Admission Test'], true, ['Central Library', 'Electronics Lab', 'Communication Systems Lab', 'Signal Processing Lab', 'RF & Antenna Lab', 'Wi-Fi Campus'], 1356100),
  makeOffering('o33', 'p17', 'u1', 'BSc',    4, 136, 8250, 33900, 3500, 2000,  9350, ['HSC GPA 3.5+', 'Biology & Chemistry', 'BRACU Admission Test'], true, ['Central Library', 'Microbiology Lab', 'Molecular Biology Lab', 'Immunology Lab', 'Research Facility', 'Wi-Fi Campus'], 1356100),
  makeOffering('o34', 'p18', 'u1', 'BSS',    4, 120, 8250, 33900,    0, 2000,  9350, ['HSC GPA 3.5+', 'Any group', 'BRACU Admission Test'], true, ['Central Library', 'Social Research Lab', 'Seminar Hall', 'Auditorium', 'Wi-Fi Campus'], 1224100),
  makeOffering('o35', 'p10', 'u1', 'BSS',    4, 124, 8250, 33900,    0, 2000,  9350, ['HSC GPA 3.5+', 'Any group', 'BRACU Admission Test'], true, ['Central Library', 'Econometrics Lab', 'Social Data Lab', 'Wi-Fi Campus'], 1257100),
  makeOffering('o36', 'p19', 'u1', 'BSc',    4, 136, 8250, 33900, 3500, 2000,  9350, ['HSC GPA 3.5+', 'Biology & Chemistry', 'BRACU Admission Test'], true, ['Central Library', 'Biotechnology Lab', 'Genetic Engineering Lab', 'Tissue Culture Lab', 'Wi-Fi Campus'], 1356100),
  makeOffering('o37', 'p20', 'u1', 'BSc',    4, 127, 8250, 33900, 2000, 2000,  9350, ['HSC GPA 3.5+', 'Mathematics', 'BRACU Admission Test'], true, ['Central Library', 'Computational Math Lab', 'Data Science Lab', 'Wi-Fi Campus'], 1281850),
  makeOffering('o38', 'p21', 'u1', 'BSc',    4, 130, 8250, 33900, 3500, 2000,  9350, ['HSC GPA 3.5+', 'Physics & Math', 'BRACU Admission Test'], true, ['Central Library', 'General Physics Lab', 'Modern Physics Lab', 'Optics Lab', 'Wi-Fi Campus'], 1306600),
  makeOffering('o39', 'p22', 'u1', 'BSc',    4, 130, 8250, 33900, 3500, 2000,  9350, ['HSC GPA 3.5+', 'Physics & Math', 'BRACU Admission Test'], true, ['Central Library', 'Electronics Lab', 'Solid State Physics Lab', 'Microprocessor Lab', 'Wi-Fi Campus'], 1306600),
  
  // AIUB — Official Real Fees (aiub.edu 2025/2026 Structure)
  makeOffering('o4',  'p1',  'u4', 'BSc',    4, 140, 8500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Advanced AI Lab', 'Data Science Lab', 'IoT Lab', 'Cyber Security Lab', 'Wi-Fi', 'Project Complex', 'Industry Partner Center'], 1365000),
  makeOffering('o14', 'p2',  'u4', 'BBA',    4, 124, 8000, 25000,    0, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Finance Lab', 'Marketing Simulation Lab', 'Career Services', 'Wi-Fi', 'Auditorium', 'Incubation Center'], 1167000),
  makeOffering('o15', 'p3',  'u4', 'BSc',    4, 140, 7500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Power Electronics Lab', 'Telecom Lab', 'VLSI Lab', 'Wi-Fi', 'Project Workspace'], 1225000),
  makeOffering('o16', 'p6',  'u4', 'BArch',  5, 195, 6500, 25000, 2000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Design Studios', '3D Printing Lab', 'Materials Lab', 'Wi-Fi', 'Exhibition Gallery'], 1480000),
  makeOffering('o17', 'p7',  'u4', 'BA',     4, 120, 6500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Language Lab', 'Media Studio', 'Wi-Fi', 'Auditorium'], 955000),
  makeOffering('o18', 'p8',  'u4', 'LLB',    4, 140, 8500, 25000,    0, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Moot Court', 'Wi-Fi', 'Auditorium', 'Legal Clinic'], 1365000),
  makeOffering('o19', 'p9',  'u4', 'BA',     4, 130, 5000, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Media Studio', 'Editing Suite', 'Wi-Fi', 'Press Club'], 825000),
  makeOffering('o20', 'p10', 'u4', 'BSS',    4, 130, 5500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Any group', 'Admission test'], true, ['Library', 'Econometrics Lab', 'Wi-Fi', 'Research Center'], 890000),
  makeOffering('o21', 'p11', 'u4', 'BSc',    4, 148, 6500, 25000, 2000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Production Lab', 'Quality Control Lab', 'Wi-Fi', 'Simulation Lab'], 1137000),
  makeOffering('o22', 'p12', 'u4', 'BSc',    4, 148, 6000, 25000, 2000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Digital Systems Lab', 'Embedded Systems Lab', 'Wi-Fi', 'Hardware Lab'], 1063000),
  makeOffering('o23', 'p4',  'u4', 'BPharm', 4, 160, 8500, 25000, 3000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Biology & Chemistry', 'Admission test'], true, ['Library', 'Pharmaceutical Lab', 'Microbiology Lab', 'Organic Chemistry Lab', 'Wi-Fi', 'Pilot Plant'], 1535000),
  makeOffering('o24', 'p13', 'u4', 'BSc',    4, 140, 7000, 25000, 3000, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Biology & Chemistry', 'Admission test'], true, ['Library', 'Molecular Biology Lab', 'Biochemistry Lab', 'Wi-Fi', 'Research Facility'], 1155000),
  makeOffering('o25', 'p14', 'u4', 'BSc',    4, 148, 8500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Data Science Lab', 'GPU Cluster', 'Big Data Lab', 'Wi-Fi', 'Industry AI Center'], 1433000),
  makeOffering('o26', 'p15', 'u4', 'BSc',    4, 148, 8500, 25000, 2500, 2000, 12500, ['SSC & HSC GPA 3.5+', 'Total GPA 8.0+', 'Math & Physics', 'Admission test'], true, ['Library', 'Network Security Lab', 'Ethical Hacking Lab', 'SOC Lab', 'Wi-Fi', 'Red/Blue Team Range'], 1433000),

  // IUB — Official Real Fees (iub.ac.bd Spring 2025/2026: ৳6,500/cr general, ৳7,500/cr law & pharmacy, ৳25,000 admission fee, ৳8,000/sem general, ৳12,000/sem specialized)
  makeOffering('o40', 'p1',  'u2', 'BSc',    4, 140, 6500, 25000, 2500, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 8.0+', 'Physics & Mathematics in HSC', 'IUB Admission Test'], true, ['Advanced AI & Robotics Lab', 'FabLab & Maker Space', 'Central Library', 'HPC Cluster', 'Wi-Fi Campus'], 1061000),
  makeOffering('o41', 'p2',  'u2', 'BBA',    4, 130, 6500, 25000,    0, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 7.5+', 'Any group in HSC', 'IUB Admission Test'],             true, ['Bloomberg Financial Lab', 'Business Incubation Center', 'Central Library', 'Career Guidance Center', 'Auditorium'], 966000),
  makeOffering('o42', 'p3',  'u2', 'BSc',    4, 140, 6500, 25000, 2500, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 8.0+', 'Physics & Mathematics in HSC', 'IUB Admission Test'], true, ['Power & Energy Systems Lab', 'VLSI & Circuit Design Lab', 'Telecommunications Lab', 'FabLab', 'Central Library'], 1061000),
  makeOffering('o43', 'p16', 'u2', 'BSc',    4, 140, 6500, 25000, 2500, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 8.0+', 'Physics & Mathematics in HSC', 'IUB Admission Test'], true, ['Wireless Communications Lab', 'Optical Fiber Lab', 'DSP Lab', 'Central Library', 'Wi-Fi Campus'], 1061000),
  makeOffering('o44', 'p10', 'u2', 'BSS',    4, 124, 6500, 25000,    0, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 7.5+', 'Mathematics in HSC preferred', 'IUB Admission Test'],  true, ['Econometrics & Data Analysis Lab', 'Central Library', 'Policy Research Unit', 'Wi-Fi Campus'], 927000),
  makeOffering('o45', 'p13', 'u2', 'BSc',    4, 136, 6500, 25000, 3000, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 8.0+', 'Biology & Chemistry in HSC', 'IUB Admission Test'],    true, ['Molecular Biology Lab', 'Biochemistry & Analytical Lab', 'Cell Culture Facility', 'Central Library'], 1035000),
  makeOffering('o46', 'p17', 'u2', 'BSc',    4, 136, 6500, 25000, 3000, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 8.0+', 'Biology & Chemistry in HSC', 'IUB Admission Test'],    true, ['Microbiology Research Lab', 'Immunology & Virological Lab', 'Biohazard Biosafety Facility', 'Central Library'], 1035000),
  makeOffering('o47', 'p23', 'u2', 'BSc',    4, 130, 6500, 25000, 2500, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 7.5+', 'Science background in HSC', 'IUB Admission Test'],      true, ['Climate Change & Environmental Lab', 'GIS & Remote Sensing Lab', 'LFE Field Research Hub', 'Central Library'], 996000),
  makeOffering('o48', 'p7',  'u2', 'BA',     4, 120, 6500, 25000,    0, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 7.5+', 'Good proficiency in English', 'IUB Admission Test'],   true, ['Language Laboratory', 'Writing Center', 'Auditorium & Amphitheater', 'Central Library'], 901000),
  makeOffering('o49', 'p9',  'u2', 'BA',     4, 130, 6500, 25000, 2500, 2000,  8000, ['SSC & HSC GPA 3.5+', 'Combined GPA 7.5+', 'Any group in HSC', 'IUB Admission Test'],             true, ['Digital Media Studio', 'Video Production & Editing Suite', 'Sound Recording Lab', 'Central Library'], 966000),
  makeOffering('o50', 'p4',  'u2', 'BPharm', 4, 160, 7500, 25000, 3500, 2000, 12000, ['SSC & HSC GPA 3.5+', 'Combined GPA 8.0+ with B in Biology & Chemistry', 'IUB Admission Test'], true, ['Pharmaceutical Technology Lab', 'Pharmacology Lab', 'Microbiology Lab', 'Medicinal Chemistry Lab', 'Animal House'], 1405000),
  makeOffering('o51', 'p8',  'u2', 'LLB',    4, 140, 7500, 25000,    0, 2000, 12000, ['SSC & HSC GPA 3.5+', 'Combined GPA 8.0+', 'Any group in HSC', 'IUB Admission Test & Interview'],   true, ['Moot Court Room', 'Law Library', 'Legal Aid Clinic', 'Seminar & Debate Hall'], 1219000),
];

// ============================================================
// SCHOLARSHIPS
// ============================================================

export const scholarships: Scholarship[] = [
  { id: 's1', universityId: 'u1', name: 'BRAC University Vice Chancellor\'s Scholarship', eligibility: 'Students with GPA 5.0 in both SSC & HSC (or equivalent)', gpaRequirement: 5.0, percentage: 100, applicationProcess: 'Automatic consideration based on admission result', verification: 'university_verified', lastUpdated: '2026-10-15', source: 'bracu.ac.bd/admissions/scholarships' },
  { id: 's2', universityId: 'u1', name: 'BRAC University Merit Scholarship', eligibility: 'SSC GPA 5.0 & HSC GPA 4.5 or above (Science/Commerce/Arts)', gpaRequirement: 4.5, percentage: 50, applicationProcess: 'Automatic on admission; no separate application required', verification: 'university_verified', lastUpdated: '2026-10-15', source: 'bracu.ac.bd/admissions/scholarships' },
  { id: 's3', universityId: 'u1', name: 'BRAC University Need-Based Scholarship', eligibility: 'Students with genuine financial hardship; minimum GPA 3.5', gpaRequirement: 3.5, percentage: 30, applicationProcess: 'Submit application with income certificate and supporting documents to Financial Aid Office', verification: 'university_verified', lastUpdated: '2026-10-15', source: 'bracu.ac.bd/admissions/scholarships' },
  { id: 's4', universityId: 'u1', name: 'BRAC Staff Ward Scholarship', eligibility: 'Children of BRAC staff members', gpaRequirement: 3.0, percentage: 50, applicationProcess: 'Apply via HR department with BRAC employment certificate', verification: 'university_verified', lastUpdated: '2026-10-15', source: 'bracu.ac.bd/admissions/scholarships' },
  { id: 's5', universityId: 'u1', name: 'BRAC University Freedom Fighter Ward Scholarship', eligibility: 'Children and grandchildren of gazetted freedom fighters (Bir Protik or above)', gpaRequirement: 3.0, percentage: 100, applicationProcess: 'Submit freedom fighter gazette certificate and supporting documents to the Scholarship Office before semester starts', verification: 'university_verified', lastUpdated: '2026-10-15', source: 'bracu.ac.bd/admissions/scholarships' },
  { id: 's6', universityId: 'u2', name: 'IUB Merit Scholarship (Golden GPA 5.0)', eligibility: 'Students with Golden GPA 5.0 in both SSC & HSC (or equivalent O/A Levels)', gpaRequirement: 5.0, percentage: 100, applicationProcess: 'Automatic waiver on admission test performance and academic results', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'iub.ac.bd/admissions/financial-aid' },
  { id: 's7', universityId: 'u2', name: 'IUB General Merit Waiver (GPA 4.80+)', eligibility: 'Combined GPA 9.5+ in SSC & HSC with minimum GPA 4.8 in HSC', gpaRequirement: 4.8, percentage: 50, applicationProcess: 'Automatic consideration upon semester course registration', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'iub.ac.bd/admissions/financial-aid' },
  { id: 's8', universityId: 'u2', name: 'IUB Female Student Special Waiver', eligibility: 'All admitted female undergraduate students in any department', gpaRequirement: 3.5, percentage: 10, applicationProcess: 'Automatic 10% tuition fee reduction applied to all female enrollees', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'iub.ac.bd/admissions/financial-aid' },
  { id: 's9', universityId: 'u2', name: 'IUB Financial Hardship & Freedom Fighter Ward Aid', eligibility: 'Children of recognized Freedom Fighters (100%) or demonstrated financial hardship (20%-100%)', gpaRequirement: 3.0, percentage: 100, applicationProcess: 'Submit financial aid or freedom fighter certification form to the Financial Aid Office', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'iub.ac.bd/admissions/financial-aid' },
];

// ============================================================
// ADMISSION NOTICES
// ============================================================

export const admissionNotices: AdmissionNotice[] = [
  { id: 'a1', universityId: 'u1', title: 'Spring 2027 Admission Open — CSE, BBA, EEE, Architecture, Law, Pharmacy & More', applicationStart: '2026-10-01', deadline: '2026-12-15', admissionTestDate: '2027-01-10', applicationLink: 'https://www.bracu.ac.bd/admissions', officialSource: 'BRACU Admissions Office (bracu.ac.bd)', lastUpdated: '2026-10-15', verification: 'university_verified' },
  { id: 'a2', universityId: 'u2', title: 'Spring 2027 Undergraduate Admission Open — SETS, SBE, SELS, SLASS, SPPH & Law', applicationStart: '2026-10-01', deadline: '2026-12-20', admissionTestDate: '2027-01-08', applicationLink: 'https://iub.ac.bd/admissions', officialSource: 'IUB Admissions Office (iub.ac.bd)', lastUpdated: '2026-10-18', verification: 'university_verified' },
];

// ============================================================
// REVIEWS
// ============================================================

export const reviews: Review[] = [
  { id: 'r1', universityId: 'u1', authorName: 'Tanvir Ahmed', authorType: 'alumni', verified: true, graduationYear: 2023, programName: 'CSE', ratings: { academics: 5, faculty: 4, campus: 4, studentLife: 4, career: 5, costValue: 3, facilities: 4 }, overall: 4.6, writtenReview: 'BRACU gave me a strong foundation in software engineering. The CSE curriculum is rigorous and the faculty is supportive. The alumni network has been invaluable for career opportunities.', helpfulVotes: 47, date: '2026-05-10' },
  { id: 'r2', universityId: 'u1', authorName: 'Nusrat Jahan', authorType: 'student', verified: true, graduationYear: 2027, programName: 'BBA', ratings: { academics: 4, faculty: 5, campus: 4, studentLife: 5, career: 4, costValue: 3, facilities: 4 }, overall: 4.4, writtenReview: 'The BRAC Business School offers an excellent BBA program with experienced faculty. The Bloomberg Terminal lab and the business case competitions are real highlights. Campus life is vibrant.', helpfulVotes: 31, date: '2026-07-18' },
  { id: 'r3', universityId: 'u1', authorName: 'Rakib Hasan', authorType: 'alumni', verified: true, graduationYear: 2022, programName: 'Architecture', ratings: { academics: 5, faculty: 5, campus: 5, studentLife: 4, career: 4, costValue: 3, facilities: 5 }, overall: 4.8, writtenReview: 'The School of Architecture at BRACU is outstanding. The design studios, 3D printing labs, and the faculty\'s international exposure make it one of the best Architecture programs in Bangladesh.', helpfulVotes: 62, date: '2026-03-22' },
  { id: 'r4', universityId: 'u1', authorName: 'Farhan Rahman', authorType: 'alumni', verified: true, graduationYear: 2024, programName: 'EEE', ratings: { academics: 5, faculty: 4, campus: 4, studentLife: 4, career: 4, costValue: 3, facilities: 5 }, overall: 4.5, writtenReview: 'The EEE program at BRACU is excellent with well-equipped power systems, electronics, and telecom labs. The faculty brings real industry experience. The Savar residential semester was an unexpected highlight — it built real friendships and a strong team spirit.', helpfulVotes: 38, date: '2026-08-14' },
  { id: 'r5', universityId: 'u1', authorName: 'Sabrina Khanam', authorType: 'student', verified: true, graduationYear: 2027, programName: 'Law', ratings: { academics: 4, faculty: 5, campus: 4, studentLife: 4, career: 4, costValue: 3, facilities: 4 }, overall: 4.3, writtenReview: 'The School of Law at BRACU has outstanding faculty with real-world legal experience. The Moot Court sessions and Legal Aid Clinic give practical exposure that most universities in Bangladesh cannot match. Highly recommended for aspiring lawyers.', helpfulVotes: 29, date: '2026-09-05' },
  { id: 'r6', universityId: 'u2', authorName: 'Zubair Hossain', authorType: 'student', verified: true, graduationYear: 2026, programName: 'CSE', ratings: { academics: 5, faculty: 5, campus: 5, studentLife: 5, career: 4, costValue: 4, facilities: 5 }, overall: 4.7, writtenReview: 'IUB has arguably the best campus infrastructure among private universities in Bashundhara. The FabLab, AI/Robotics equipment, and high-speed Wi-Fi everywhere are unmatched. The Live-in-Field Experience (LFE) is an eye-opening 10-day village immersion course that creates lifelong memories.', helpfulVotes: 52, date: '2026-06-14' },
  { id: 'r7', universityId: 'u2', authorName: 'Sadia Rahman', authorType: 'student', verified: true, graduationYear: 2027, programName: 'BBA', ratings: { academics: 4, faculty: 5, campus: 5, studentLife: 5, career: 4, costValue: 4, facilities: 5 }, overall: 4.6, writtenReview: 'The School of Business and Entrepreneurship (SBE) is rigorous and globally benchmarked. Having access to the Bloomberg Financial Terminal right in the department gives us a huge edge. Plus, the 10% female student waiver is a real plus.', helpfulVotes: 41, date: '2026-08-02' },
  { id: 'r8', universityId: 'u2', authorName: 'Ahsan Habib', authorType: 'alumni', verified: true, graduationYear: 2023, programName: 'Pharmacy', ratings: { academics: 5, faculty: 4, campus: 5, studentLife: 4, career: 5, costValue: 4, facilities: 5 }, overall: 4.6, writtenReview: 'Graduated from the School of Pharmacy and Public Health. The labs are PCB-accredited and equipped with modern HPLC and spectrophotometer machines. Got placed in a top pharmaceutical firm in Dhaka right after graduation.', helpfulVotes: 36, date: '2026-04-19' },
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
  {
    id: 'c2', universityId: 'u1', authorName: 'Maliha Chowdhury', authorAvatarColor: 'bg-rose-500',
    universityAffiliation: 'BRAC University', verifiedBadge: 'student',
    category: 'Admission Help', type: 'question',
    title: 'O-Level students: What is the minimum GPA requirement for BRACU?',
    content: 'I have O-Levels with 5 Bs and 2 As (A=5, B=4 scale), and A-Levels with 2 Bs. Do I qualify for BRACU CSE admission? The official site says min GPA 2.5 for O-Level and 2.5 for A-Level — does anyone have experience with this?',
    tags: ['bracu', 'o-level', 'a-level', 'admission', 'cse', 'requirement'], upvotes: 88, date: '2026-09-12',
    comments: [],
  },
  {
    id: 'c3', universityId: 'u1', authorName: 'Imran Hossain', authorAvatarColor: 'bg-emerald-600',
    universityAffiliation: 'BRAC University', verifiedBadge: 'alumni',
    category: 'Scholarships', type: 'discussion',
    title: 'BRACU Scholarship Guide: Who gets what and how to apply',
    content: 'Sharing a quick breakdown: VC Scholarship (100% off) needs GPA 5.0 in both SSC & HSC. Merit Scholarship (50%) needs SSC 5.0 + HSC 4.5. Need-based (30%) for financial hardship with min GPA 3.5. Freedom Fighter Ward Scholarship gives 100% waiver. All automatic on admission except need-based — just submit income documents.',
    tags: ['bracu', 'scholarship', 'financial-aid', 'merit', 'vc-scholarship'], upvotes: 156, date: '2026-10-01',
    comments: [],
  },
  {
    id: 'c4', universityId: 'u2', authorName: 'Tanzeem Chowdhury', authorAvatarColor: 'bg-indigo-600',
    universityAffiliation: 'Independent University, Bangladesh', verifiedBadge: 'student',
    category: 'Campus Life', type: 'discussion',
    title: 'Inside IUB Bashundhara Campus: Swimming pool, Gym, Squash courts & LFE',
    content: 'For anyone considering IUB: the campus sports facilities are top notch! We have an Olympic-standard indoor heated swimming pool, modern multi-gym, and squash courts open daily for students. Also, the 10-day LFE (Live-in-Field Experience) in rural Bangladesh is compulsory for all undergraduates and one of the best parts of studying here.',
    tags: ['iub', 'campus-life', 'facilities', 'sports', 'lfe', 'bashundhara'], upvotes: 112, date: '2026-09-28',
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
