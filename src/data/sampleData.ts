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
    id: 'u3', slug: 'north-south-university', name: 'North South University', shortName: 'NSU',
    logoColor: 'from-green-600 to-teal-700', logoInitials: 'NS',
    location: 'Dhaka', division: 'Dhaka', established: 1992,
    website: 'https://www.northsouth.edu', email: 'info@northsouth.edu', phone: '+880 2-55668200',
    address: 'Plot 15, Block B, Bashundhara R/A, Dhaka 1229',
    description: 'North South University (NSU) is Bangladesh\'s first private university, established in 1992. Recognized as one of the top private universities in the country and consistently ranked among the best in South Asia, NSU enrolls over 25,000 students across undergraduate and graduate programs. The university is renowned for its research output, globally connected faculty, modern campus, and strong alumni network spanning government, industry, and academia.',
    campusInfo: 'NSU operates a state-of-the-art campus in Bashundhara R/A, Dhaka — one of the most modern university campuses in Bangladesh. The campus features a 13-story academic tower, a dedicated research building, a central library with over 70,000 volumes and digital access to thousands of journals, smart classrooms, advanced engineering and science labs, a student center, a gymnasium, an indoor sports complex, multiple cafeteria outlets, a health center, and high-speed Wi-Fi across all facilities. Admission application fee is BDT 1,000.',
    accreditation: 'Approved by the University Grants Commission (UGC) of Bangladesh. Engineering programs accredited by BAETE (Board of Accreditation for Engineering and Technical Education) under IEB. Pharmacy program accredited by the Pharmacy Council of Bangladesh. Business programs aligned with AACSB standards. Member of Association of Commonwealth Universities (ACU) and Association of Private Universities of Bangladesh (APUB).',
    facilities: ['Central Library (70,000+ volumes)', 'Advanced Engineering Labs', 'Computer Labs', 'Science Research Labs', 'Smart Classrooms', 'Gymnasium & Indoor Sports Complex', 'Cafeteria', 'Health Center', 'Student Activity Center', 'Wi-Fi Campus', 'Career Services Office', 'Auditorium'],
    admissionTestRequired: true, minGPA: 3.0, rating: 4.7, reviewCount: 576, scholarshipAvailable: true,
    programCount: 32, tuitionMin: 966000, tuitionMax: 1600000,
    popularPrograms: ['CSE', 'BBA', 'EEE', 'ECE', 'Civil Engineering', 'Pharmacy', 'Biochemistry', 'Microbiology', 'Economics', 'English', 'Law', 'Public Health', 'Environmental Science'],
    faculties: [
      { id: 'f1', name: 'School of Engineering & Physical Sciences (SEPS)', departments: ['CSE', 'EEE', 'ECE', 'Civil Engineering', 'Environmental Science'] },
      { id: 'f2', name: 'School of Business & Economics (SBE)', departments: ['BBA', 'Economics'] },
      { id: 'f3', name: 'School of Health & Life Sciences (SHLS)', departments: ['Pharmacy', 'Biochemistry', 'Microbiology', 'Public Health'] },
      { id: 'f4', name: 'School of Humanities & Social Sciences (SHSS)', departments: ['English', 'Sociology', 'Political Science & Sociology'] },
      { id: 'f5', name: 'School of Law (SoL)', departments: ['Law'] },
    ],
    featured: true, verification: 'university_verified', lastUpdated: '2026-10-18', source: 'University Official Website (northsouth.edu)',
  },
  {
    id: 'u5', slug: 'daffodil-international-university', name: 'Daffodil International University', shortName: 'DIU',
    logoColor: 'from-yellow-500 to-orange-500', logoInitials: 'DI',
    location: 'Savar, Dhaka', division: 'Dhaka', established: 2002,
    website: 'https://www.daffodilvarsity.edu.bd', email: 'info@diu.edu.bd', phone: '+880 2-9138234-5',
    address: 'Daffodil Smart City, Birulia, Savar, Dhaka-1216',
    description: 'Daffodil International University (DIU) is one of Bangladesh\'s fastest-growing private universities, established in 2002 and ranked #1 in Bangladesh and in the Global Top-20 for SDG 4 (Quality Education) and Top-40 for SDG 8 (Decent Work & Economic Growth) by Times Higher Education Impact Rankings. DIU enrolls over 55,000 students across 51 undergraduate and graduate programs in 6 faculties, with a strong focus on technology, innovation, and industry-ready education. The university operates its own Daffodil Smart City campus in Savar — a self-contained academic township — and maintains a distinguished international faculty community drawn from 19+ countries. DIU has produced 55,000+ alumni working across 19 countries worldwide.',
    campusInfo: 'DIU operates from the landmark Daffodil Smart City campus in Birulia, Savar, Dhaka — a pioneering smart academic township spread across a vast green campus. The campus features fully air-conditioned academic buildings, a central research library, smart classrooms, advanced STEM and AI labs, IoT and Robotics labs, Multimedia studios, a dedicated Textile technology wing, a 400-seat auditorium, cafeteria, student dormitories (hostels 5 minutes from class), 25 AC buses covering Dhaka & nearby districts, a medical center, and 60+ active student clubs. The university also operates the DIU Permanent Campus in Dhanmondi (City Campus) for executive and part-time students, and maintains strong internet connectivity and e-learning infrastructure through its DIU e-Learn platform.',
    accreditation: 'Approved and recognized by the University Grants Commission (UGC) of Bangladesh. Engineering programs accredited by Board of Accreditation for Engineering and Technical Education (BAETE) under the Institution of Engineers Bangladesh (IEB). Pharmacy program accredited by the Pharmacy Council of Bangladesh (PCB). Textile programs recognized by the Bangladesh Textile Mills Association (BTMA). Member of the Association of Commonwealth Universities (ACU) and the Association of Private Universities of Bangladesh (APUB). Ranked by Times Higher Education (THE) Impact Rankings — Global Top-20 SDG 4, Top-40 SDG 8.',
    facilities: ['Central Library & Digital Resources', 'AI & Machine Learning Lab', 'IoT & Robotics Lab', 'Multimedia & Animation Studio', 'Textile Technology Lab', 'Software Development Lab', 'Smart Classrooms', 'Research & Innovation Hub', '400-Seat Auditorium', 'Hostel Facilities', 'Medical Center', '25 AC Buses (Transport)', 'Cafeteria & Food Court', 'Career & Employment Center', 'DIU e-Learn Platform', '60+ Student Clubs', 'Sports Complex', 'Wi-Fi Smart Campus'],
    admissionTestRequired: true, minGPA: 2.5, rating: 4.4, reviewCount: 284, scholarshipAvailable: true,
    programCount: 34, tuitionMin: 720000, tuitionMax: 1650000,
    popularPrograms: ['CSE', 'SWE', 'BBA', 'EEE', 'ETE', 'Pharmacy', 'Law', 'English', 'Multimedia & Creative Technology', 'Textile Engineering', 'Civil Engineering', 'Architecture'],
    faculties: [
      { id: 'f1', name: 'Faculty of Science & Information Technology (FSIT)', departments: ['Computer Science and Engineering (CSE)', 'Software Engineering (SWE)', 'Computing and Information System (CIS)', 'Multimedia & Creative Technology (MCT)', 'General Educational Development (GED)', 'Cyber Security'] },
      { id: 'f2', name: 'Faculty of Engineering (FoE)', departments: ['Electrical and Electronic Engineering (EEE)', 'Electronic and Telecommunication Engineering (ETE)', 'Civil Engineering (CE)', 'Mechanical Engineering (ME)', 'Textile Engineering (TE)', 'Architecture'] },
      { id: 'f3', name: 'Faculty of Business & Entrepreneurship (FBE)', departments: ['Business Administration (BBA)', 'Innovation and Entrepreneurship', 'Real Estate', 'Tourism and Hospitality Management (THM)', 'Human Resource Management (HRM)', 'Management Information Systems (MIS)', 'International Business (IB)', 'Accounting and Information Systems (AIS)', 'Banking and Insurance'] },
      { id: 'f4', name: 'Faculty of Allied Health Sciences (FAHS)', departments: ['Pharmacy', 'Public Health', 'Nutrition and Food Engineering (NFE)', 'Nursing', 'Physical Education and Sports Science (PESS)'] },
      { id: 'f5', name: 'Faculty of Humanities & Social Science (FHSS)', departments: ['English', 'Journalism and Mass Communication (JMC)', 'Development Studies', 'Economics'] },
      { id: 'f6', name: 'Faculty of Law (FoL)', departments: ['Law', 'Criminology'] },
    ],
    featured: true, verification: 'university_verified', lastUpdated: '2026-10-20', source: 'University Official Website (daffodilvarsity.edu.bd)',
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
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5'],
  },
  {
    id: 'p2', slug: 'bba', name: 'Business Administration (BBA)', category: 'Business',
    description: 'BBA provides foundational and advanced knowledge in management, finance, marketing, accounting, and entrepreneurship.',
    careerOpportunities: ['Business Analyst', 'Marketing Executive', 'Financial Analyst', 'HR Manager', 'Entrepreneur', 'Operations Manager'],
    avgTuitionMin: 966000, avgTuitionMax: 1310000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5'],
  },
  {
    id: 'p3', slug: 'eee', name: 'Electrical & Electronic Engineering', category: 'Engineering',
    description: 'EEE covers circuits, power systems, electronics, telecommunications, and control systems — the backbone of modern infrastructure.',
    careerOpportunities: ['Electrical Engineer', 'Power Engineer', 'Telecom Engineer', 'Control Systems Engineer', 'Embedded Systems Developer'],
    avgTuitionMin: 1061000, avgTuitionMax: 1360000, avgCredits: 136, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5'],
  },
  {
    id: 'p4', slug: 'pharmacy', name: 'Pharmacy', category: 'Pharmacy',
    description: 'BPharm prepares students for careers in pharmaceuticals, clinical practice, drug research, and the healthcare industry.',
    careerOpportunities: ['Pharmacist', 'Clinical Research Associate', 'Drug Safety Associate', 'Production Officer', 'Quality Control Officer'],
    avgTuitionMin: 1405000, avgTuitionMax: 1650000, avgCredits: 164, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5'],
  },
  {
    id: 'p5', slug: 'civil-engineering', name: 'Civil Engineering', category: 'Engineering',
    description: 'Civil Engineering covers structural, geotechnical, transportation, and environmental engineering for infrastructure development.',
    careerOpportunities: ['Structural Engineer', 'Site Engineer', 'Project Manager', 'Urban Planner', 'Construction Manager'],
    avgTuitionMin: 1100000, avgTuitionMax: 1350000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u3', 'u5'],
  },
  {
    id: 'p6', slug: 'architecture', name: 'Architecture', category: 'Architecture',
    description: 'BArch combines design, engineering, and urban planning to prepare architects for the built environment.',
    careerOpportunities: ['Architect', 'Urban Designer', 'Interior Designer', 'Project Architect', 'Landscape Architect'],
    avgTuitionMin: 1480000, avgTuitionMax: 1998300, avgCredits: 207, avgDurationYears: 5,
    offeringUniversityIds: ['u1', 'u4', 'u5'],
  },
  {
    id: 'p7', slug: 'english', name: 'English (BA)', category: 'Arts & Humanities',
    description: 'BA in English covers literature, linguistics, and language studies — a versatile humanities degree.',
    careerOpportunities: ['Teacher', 'Content Writer', 'Editor', 'Translator', 'Communications Officer', 'Journalist'],
    avgTuitionMin: 901000, avgTuitionMax: 1225000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5'],
  },
  {
    id: 'p8', slug: 'law', name: 'Law (LLB)', category: 'Law',
    description: 'LLB prepares students for legal practice, judiciary, and corporate legal roles in Bangladesh.',
    careerOpportunities: ['Lawyer', 'Legal Advisor', 'Judge', 'Corporate Counsel', 'Legal Researcher'],
    avgTuitionMin: 1219000, avgTuitionMax: 1480000, avgCredits: 135, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4', 'u5'],
  },
  {
    id: 'p9', slug: 'journalism', name: 'Media and Communication (JMC)', category: 'Arts & Humanities',
    description: 'BA in Media and Communication covers digital journalism, film, advertising, public relations, and mass media.',
    careerOpportunities: ['Journalist', 'PR Specialist', 'Media Producer', 'Content Creator', 'Broadcaster'],
    avgTuitionMin: 825000, avgTuitionMax: 966000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u2', 'u4', 'u5'],
  },
  {
    id: 'p10', slug: 'economics', name: 'Economics', category: 'Arts & Humanities',
    description: 'BSS in Economics provides a strong foundation in micro, macro, and applied economics.',
    careerOpportunities: ['Economist', 'Financial Analyst', 'Policy Advisor', 'Researcher'],
    avgTuitionMin: 890000, avgTuitionMax: 1260000, avgCredits: 124, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3', 'u4'],
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
    offeringUniversityIds: ['u1', 'u2', 'u3'],
  },
  {
    id: 'p17', slug: 'microbiology', name: 'Microbiology', category: 'Life Sciences',
    description: 'BSc in Microbiology covers bacteriology, virology, mycology, immunology, and applied microbiology — preparing students for research, healthcare, and pharmaceutical industries.',
    careerOpportunities: ['Microbiologist', 'Research Scientist', 'Quality Control Officer', 'Clinical Lab Scientist', 'Pharmaceutical Researcher', 'Biotech Analyst'],
    avgTuitionMin: 1035000, avgTuitionMax: 1360000, avgCredits: 136, avgDurationYears: 4,
    offeringUniversityIds: ['u1', 'u2', 'u3'],
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
    offeringUniversityIds: ['u2', 'u3'],
  },
  // DIU-specific programs
  {
    id: 'p24', slug: 'software-engineering', name: 'Software Engineering (SWE)', category: 'Computer Science',
    description: 'BSc in Software Engineering focuses on software design, development methodologies, quality assurance, DevOps, cloud computing, and enterprise software systems — producing industry-ready software engineers.',
    careerOpportunities: ['Software Engineer', 'Full-Stack Developer', 'DevOps Engineer', 'Cloud Architect', 'QA Engineer', 'System Analyst', 'Tech Lead'],
    avgTuitionMin: 900000, avgTuitionMax: 1050000, avgCredits: 136, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p25', slug: 'multimedia-creative-technology', name: 'Multimedia & Creative Technology (MCT)', category: 'Arts & Humanities',
    description: 'BSc in Multimedia & Creative Technology covers digital animation, 2D/3D graphics, game development, UI/UX design, film production, and creative digital media — blending technology with artistic creativity.',
    careerOpportunities: ['Multimedia Designer', 'Game Developer', 'UI/UX Designer', 'Animation Artist', 'Film & Video Producer', 'Creative Director', 'Digital Marketing Specialist'],
    avgTuitionMin: 820000, avgTuitionMax: 960000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p26', slug: 'iot-robotics-automation-engineering', name: 'IoT & Robotics Automation Engineering', category: 'Engineering',
    description: 'BSc in IoT & Robotics Automation Engineering covers embedded systems, Internet of Things, robotics design, automation control, AI-driven systems, and industrial automation — preparing graduates for Industry 4.0.',
    careerOpportunities: ['IoT Engineer', 'Robotics Engineer', 'Automation Engineer', 'Embedded Systems Developer', 'AI Systems Specialist', 'Industrial Automation Expert', 'R&D Engineer'],
    avgTuitionMin: 980000, avgTuitionMax: 1150000, avgCredits: 140, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p27', slug: 'textile-engineering', name: 'Textile Engineering', category: 'Engineering',
    description: 'BSc in Textile Engineering covers fiber science, yarn and fabric technology, dyeing and finishing, textile machinery, garment manufacturing, and quality assurance — supporting Bangladesh\'s largest export industry.',
    careerOpportunities: ['Textile Engineer', 'Production Manager', 'Quality Assurance Officer', 'Dyeing & Finishing Expert', 'Garment Technologist', 'R&D Officer', 'Export Manager'],
    avgTuitionMin: 850000, avgTuitionMax: 1000000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p28', slug: 'nutrition-food-engineering', name: 'Nutrition & Food Engineering', category: 'Life Sciences',
    description: 'BSc in Nutrition & Food Engineering covers human nutrition, food technology, food safety, processing engineering, and dietary science — preparing graduates for the food industry and public health sectors.',
    careerOpportunities: ['Nutritionist', 'Food Technologist', 'Food Safety Officer', 'Quality Control Manager', 'Dietitian', 'Research Scientist', 'Food Processing Engineer'],
    avgTuitionMin: 780000, avgTuitionMax: 920000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p29', slug: 'real-estate', name: 'Real Estate (BBA in Real Estate)', category: 'Business',
    description: 'BBA in Real Estate covers property valuation, real estate investment, urban development, land law, project management, and construction economics — a unique business program aligned with Bangladesh\'s growing real estate sector.',
    careerOpportunities: ['Real Estate Developer', 'Property Valuator', 'Urban Development Consultant', 'Real Estate Investment Analyst', 'Land Administration Officer', 'Construction Project Manager'],
    avgTuitionMin: 750000, avgTuitionMax: 880000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p30', slug: 'computing-information-system', name: 'Computing and Information System (CIS)', category: 'Computer Science',
    description: 'BSc in Computing and Information System bridges business management and information technology, covering enterprise systems, database management, IT project management, and business intelligence.',
    careerOpportunities: ['IT Consultant', 'Systems Analyst', 'Database Administrator', 'IT Project Manager', 'Business Intelligence Analyst', 'Enterprise System Specialist'],
    avgTuitionMin: 850000, avgTuitionMax: 980000, avgCredits: 130, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p31', slug: 'tourism-hospitality-management', name: 'Tourism and Hospitality Management (THM)', category: 'Business',
    description: 'BBA in Tourism and Hospitality Management covers hotel operations, tourism economics, event management, airline ticketing, resort management, and global hospitality customer service.',
    careerOpportunities: ['Hotel Manager', 'Tour Operator', 'Event Coordinator', 'Airline Executive', 'Resort Manager', 'Hospitality Consultant'],
    avgTuitionMin: 760000, avgTuitionMax: 890000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p32', slug: 'accounting-information-systems', name: 'Accounting and Information Systems (AIS)', category: 'Business',
    description: 'BSc/BBA in Accounting and Information Systems integrates financial accounting, auditing, taxation, corporate finance with computerized accounting information systems and ERP solutions.',
    careerOpportunities: ['Chartered Accountant', 'Financial Auditor', 'Tax Consultant', 'ERP Systems Consultant', 'Corporate Accountant', 'Financial Controller'],
    avgTuitionMin: 800000, avgTuitionMax: 940000, avgCredits: 124, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p33', slug: 'nursing', name: 'Nursing (BSc in Nursing)', category: 'Life Sciences',
    description: 'BSc in Nursing prepares professional registered nurses with clinical skills, patient care ethics, community health nursing, medical-surgical nursing, and healthcare administration.',
    careerOpportunities: ['Registered Nurse', 'Clinical Nurse Specialist', 'Healthcare Administrator', 'Public Health Nurse', 'Nursing Educator'],
    avgTuitionMin: 700000, avgTuitionMax: 820000, avgCredits: 140, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p34', slug: 'development-studies', name: 'Development Studies', category: 'Social Sciences',
    description: 'BA/BSS in Development Studies explores poverty alleviation, sustainable development goals, NGO management, gender studies, economic policy, and rural development in developing nations.',
    careerOpportunities: ['Development Officer', 'NGO Project Manager', 'Policy Analyst', 'Research Fellow', 'Community Outreach Coordinator'],
    avgTuitionMin: 720000, avgTuitionMax: 850000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p35', slug: 'economics-diu', name: 'Economics', category: 'Social Sciences',
    description: 'BSS in Economics covers microeconomics, macroeconomics, econometrics, monetary policy, development economics, and quantitative analysis.',
    careerOpportunities: ['Economic Analyst', 'Financial Consultant', 'Policy Researcher', 'Data Analyst', 'Banking Executive'],
    avgTuitionMin: 740000, avgTuitionMax: 870000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p36', slug: 'mechanical-engineering', name: 'Mechanical Engineering', category: 'Engineering',
    description: 'BSc in Mechanical Engineering covers thermodynamics, fluid mechanics, machine design, manufacturing processes, robotics, and energy systems.',
    careerOpportunities: ['Mechanical Engineer', 'Design Engineer', 'Production Engineer', 'Energy Systems Consultant', 'Maintenance Manager'],
    avgTuitionMin: 980000, avgTuitionMax: 1150000, avgCredits: 160, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p37', slug: 'innovation-entrepreneurship', name: 'Innovation and Entrepreneurship', category: 'Business',
    description: 'BBA in Innovation and Entrepreneurship fosters startup creation, venture capital, business model innovation, product incubation, and entrepreneurial leadership.',
    careerOpportunities: ['Startup Founder', 'Venture Capital Analyst', 'Innovation Consultant', 'Product Manager', 'Business Incubator Director'],
    avgTuitionMin: 760000, avgTuitionMax: 890000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p38', slug: 'human-resource-management', name: 'Human Resource Management (HRM)', category: 'Business',
    description: 'BBA in HRM covers talent acquisition, organizational behavior, labor law, performance management, training & development, and strategic human resource planning.',
    careerOpportunities: ['HR Manager', 'Recruitment Specialist', 'Training Coordinator', 'HR Business Partner', 'Compensation Manager'],
    avgTuitionMin: 750000, avgTuitionMax: 880000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p39', slug: 'management-information-systems', name: 'Management Information Systems (MIS)', category: 'Business',
    description: 'BBA in MIS bridges business and technology, covering enterprise resource planning (ERP), database management, IT infrastructure, and data analytics for business decision making.',
    careerOpportunities: ['MIS Specialist', 'Data Analyst', 'ERP Consultant', 'IT Business Analyst', 'Systems Administrator'],
    avgTuitionMin: 780000, avgTuitionMax: 910000, avgCredits: 124, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p40', slug: 'international-business', name: 'International Business (IB)', category: 'Business',
    description: 'BBA in International Business covers global trade, multinational management, international finance, cross-cultural negotiations, and global supply chain logistics.',
    careerOpportunities: ['International Trade Specialist', 'Global Supply Chain Manager', 'Export-Import Executive', 'Multinational Consultant'],
    avgTuitionMin: 770000, avgTuitionMax: 900000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
  },
  {
    id: 'p41', slug: 'banking-insurance', name: 'Banking and Insurance', category: 'Business',
    description: 'BBA in Banking and Insurance covers commercial banking operations, risk management, actuarial science, investment banking, credit analysis, and insurance underwriting.',
    careerOpportunities: ['Banker', 'Risk Analyst', 'Insurance Underwriter', 'Credit Officer', 'Financial Advisor'],
    avgTuitionMin: 750000, avgTuitionMax: 880000, avgCredits: 120, avgDurationYears: 4,
    offeringUniversityIds: ['u5'],
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
  // NSU — Program Offerings (Bashundhara Campus, Spring 2027 rates)
  makeOffering('o60', 'p1',  'u3', 'BSc',    4, 136, 7000, 20000, 2500, 1500, 10000, ['HSC GPA 3.0+', 'Physics & Math', 'NSU Admission Test'], true, ['Central Library', 'AI/ML Lab', 'Robotics Lab', 'Networking Lab', 'Computer Labs', 'Wi-Fi Campus'], 1021500),
  makeOffering('o61', 'p2',  'u3', 'BBA',    4, 130, 6500, 20000,    0, 1500,  8000, ['HSC GPA 3.0+', 'Any group', 'NSU Admission Test'],      true, ['Central Library', 'Bloomberg Terminal', 'Business Simulation Lab', 'Career Services', 'Auditorium'], 966000),
  makeOffering('o62', 'p3',  'u3', 'BSc',    4, 136, 7000, 20000, 2500, 1500,  9000, ['HSC GPA 3.0+', 'Physics & Math', 'NSU Admission Test'], true, ['Central Library', 'EEE Lab', 'Power Systems Lab', 'PCB Design Lab', 'Electronics Lab'], 1003000),
  makeOffering('o63', 'p4',  'u3', 'BPharm', 4, 164, 7500, 20000, 3000, 1500, 11000, ['HSC GPA 3.0+', 'Biology & Chemistry', 'NSU Admission Test'], true, ['Central Library', 'Pharmaceutical Lab', 'Microbiology Lab', 'Chemistry Lab', 'Biosafety Cabinet'], 1318000),
  makeOffering('o64', 'p5',  'u3', 'BSc',    4, 160, 7000, 20000, 2500, 1500,  9500, ['HSC GPA 3.0+', 'Physics & Math', 'NSU Admission Test'], true, ['Central Library', 'Structural Lab', 'Geotechnical Lab', 'CAD Lab', 'Survey Equipment'], 1196000),
  makeOffering('o65', 'p8',  'u3', 'LLB',    4, 130, 6800, 20000,    0, 1500,  9500, ['HSC GPA 3.0+', 'Any group', 'NSU Admission Test'],      true, ['Central Library', 'Moot Court', 'Legal Research Database', 'Seminar Hall'], 1015400),
  makeOffering('o66', 'p10', 'u3', 'BSS',    4, 124, 6500, 20000,    0, 1500,  8000, ['HSC GPA 3.0+', 'Any group', 'NSU Admission Test'],      true, ['Central Library', 'Econometrics Lab', 'SPSS Lab', 'Seminar Hall'], 942000),
  makeOffering('o67', 'p16', 'u3', 'BSc',    4, 136, 7000, 20000, 2500, 1500,  9000, ['HSC GPA 3.0+', 'Physics & Math', 'NSU Admission Test'], true, ['Central Library', 'Electronics Lab', 'DSP Lab', 'RF & Antenna Lab', 'Communication Lab'], 1003000),
  makeOffering('o68', 'p17', 'u3', 'BSc',    4, 136, 7000, 20000, 3000, 1500,  9000, ['HSC GPA 3.0+', 'Biology & Chemistry', 'NSU Admission Test'], true, ['Central Library', 'Microbiology Lab', 'Molecular Biology Lab', 'Immunology Lab', 'Biosafety Lab'], 1012000),

  // DIU — Program Offerings (Daffodil Smart City, Savar, Spring 2027 rates)
  makeOffering('o70', 'p1',  'u5', 'BSc',    4, 136, 5500, 15000, 2000, 1000,  6000, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Math or ICT in HSC', 'DIU Admission Test / Viva'], true, ['Central Library', 'AI & Machine Learning Lab', 'Software Development Lab', 'Smart Classrooms', 'Wi-Fi Smart Campus'], 884800),
  makeOffering('o71', 'p24', 'u5', 'BSc',    4, 136, 5500, 15000, 2000, 1000,  6000, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Math or ICT in HSC', 'DIU Admission Test / Viva'], true, ['Software Engineering Lab', 'Cloud Computing Lab', 'DevOps Studio', 'Central Library'], 884800),
  makeOffering('o72', 'p2',  'u5', 'BBA',    4, 130, 5200, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['Business Incubation Center', 'Financial Trading Lab', 'Case Study Room', 'Smart Campus'], 831000),
  makeOffering('o73', 'p3',  'u5', 'BSc',    4, 136, 5800, 15000, 2500, 1000,  6500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Physics & Math in HSC', 'DIU Admission Test / Viva'], true, ['Advanced EEE Lab', 'Power Systems Lab', 'Electrical Workshop', 'Central Library'], 934800),
  makeOffering('o74', 'p16', 'u5', 'BSc',    4, 136, 5800, 15000, 2500, 1000,  6500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Physics & Math in HSC', 'DIU Admission Test / Viva'], true, ['Telecommunication Lab', 'IoT Lab', 'RF Antenna Lab', 'Smart Campus'], 934800),
  makeOffering('o75', 'p4',  'u5', 'BPharm', 4, 164, 6200, 15000, 3000, 1000,  7000, ['HSC GPA 2.5+ or Combined GPA 7.0+ (Biology & Chem)', 'DIU Admission Test'], true, ['Pharmaceutical Chemistry Lab', 'Pharmaceutics Lab', 'Pharmacology Lab', 'Medicinal Garden'], 1199800),
  makeOffering('o76', 'p8',  'u5', 'LLB',    4, 135, 5000, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group in HSC', 'DIU Admission Test / Viva'], true, ['Moot Court Room', 'Law Library', 'Legal Aid Clinic', 'Seminar Room'], 825000),
  makeOffering('o77', 'p7',  'u5', 'BA',     4, 120, 4800, 15000,    0, 1000,  5000, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group in HSC', 'DIU Admission Test / Viva'], true, ['Language Laboratory', 'English Literature Club', 'Smart Library', 'Wi-Fi'], 735000),
  makeOffering('o78', 'p25', 'u5', 'BSc',    4, 130, 5200, 15000, 2000, 1000,  6000, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group in HSC', 'DIU Admission Test / Viva'], true, ['Multimedia & Animation Studio', 'Game Dev Lab', 'Editing Suites', 'VR Lab'], 846000),
  makeOffering('o79', 'p26', 'u5', 'BSc',    4, 140, 5800, 15000, 3000, 1000,  6500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Physics & Math in HSC', 'DIU Admission Test / Viva'], true, ['IoT & Robotics Lab', 'Automation Workshop', 'AI Lab', 'Smart Smart City'], 978200),
  makeOffering('o80', 'p27', 'u5', 'BSc',    4, 160, 5200, 15000, 2500, 1000,  6000, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Science background', 'DIU Admission Test / Viva'], true, ['Textile Testing Lab', 'Wet Processing Lab', 'Yarn & Fabric Manufacturing Lab'], 1057000),
  makeOffering('o81', 'p5',  'u5', 'BSc',    4, 160, 5800, 15000, 2500, 1000,  6500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Physics & Math in HSC', 'DIU Admission Test / Viva'], true, ['Structural Engineering Lab', 'Geotechnical Lab', 'CAD & Surveying Studio'], 1105000),
  makeOffering('o82', 'p6',  'u5', 'BArch',  5, 200, 6000, 15000, 3000, 1000,  7000, ['HSC GPA 2.5+ or Combined GPA 6.5+', 'Physics & Math in HSC', 'Portfolio / Viva'], true, ['Architecture Design Studio', 'Model Making Workshop', '3D Visualization Lab'], 1435000),
  makeOffering('o83', 'p30', 'u5', 'BSc',    4, 130, 5200, 15000, 2000, 1000,  6000, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['CIS Lab', 'Enterprise Systems Lab', 'Central Library'], 831000),
  makeOffering('o84', 'p31', 'u5', 'BBA',    4, 120, 5000, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['Hospitality Training Suite', 'Event Management Studio', 'Smart Campus'], 775000),
  makeOffering('o85', 'p32', 'u5', 'BBA',    4, 124, 5200, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['Accounting Lab', 'ERP Training Center', 'Central Library'], 810800),
  makeOffering('o86', 'p33', 'u5', 'BSc',    4, 140, 4800, 15000, 3000, 1000,  6000, ['HSC GPA 2.5+ or Combined GPA 6.5+ (Biology)', 'DIU Admission Test / Viva'], true, ['Nursing Skills Lab', 'Anatomy Lab', 'Clinical Practice Center'], 777000),
  makeOffering('o87', 'p34', 'u5', 'BA',     4, 120, 4800, 15000,    0, 1000,  5000, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['Research Center', 'Social Science Lab', 'Central Library'], 735000),
  makeOffering('o88', 'p35', 'u5', 'BSS',    4, 120, 4800, 15000,    0, 1000,  5000, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Math or Economics in HSC', 'DIU Admission Test / Viva'], true, ['Econometrics Lab', 'Data Analysis Center', 'Library'], 735000),
  makeOffering('o89', 'p36', 'u5', 'BSc',    4, 160, 5800, 15000, 3000, 1000,  6500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Physics & Math in HSC', 'DIU Admission Test / Viva'], true, ['Thermodynamics Lab', 'Machine Shop', 'CAD Studio', 'Robotics Workshop'], 1105000),
  makeOffering('o90', 'p37', 'u5', 'BBA',    4, 120, 5000, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['Incubation Center', 'Startup Lab', 'Mentorship Hub'], 775000),
  makeOffering('o91', 'p38', 'u5', 'BBA',    4, 120, 5000, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['HR Simulation Suite', 'Case Study Room', 'Training Center'], 775000),
  makeOffering('o92', 'p39', 'u5', 'BBA',    4, 124, 5200, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['MIS Lab', 'ERP Center', 'Database Lab'], 810800),
  makeOffering('o93', 'p40', 'u5', 'BBA',    4, 120, 5000, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['Global Trade Center', 'Language Lab', 'Negotiation Room'], 775000),
  makeOffering('o94', 'p41', 'u5', 'BBA',    4, 120, 5000, 15000,    0, 1000,  5500, ['HSC GPA 2.5+ or Combined GPA 6.0+', 'Any group', 'DIU Admission Test / Viva'], true, ['Banking Simulation Lab', 'Finance Center', 'Library'], 775000),
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
  // NSU Scholarships
  { id: 's10', universityId: 'u3', name: 'NSU Vice Chancellor Scholarship (Golden GPA)', eligibility: 'Students with Golden GPA 5.0 in both SSC & HSC (or O/A Levels equivalent)', gpaRequirement: 5.0, percentage: 100, applicationProcess: 'Automatically applied upon admission based on academic results. No separate application required.', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'northsouth.edu/admissions/financial-aid' },
  { id: 's11', universityId: 'u3', name: 'NSU Merit Scholarship (50% waiver)', eligibility: 'Students with combined GPA 9.5+ in SSC & HSC with minimum GPA 4.75 in HSC', gpaRequirement: 4.75, percentage: 50, applicationProcess: 'Automatic waiver based on SSC, HSC results and NSU admission test performance', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'northsouth.edu/admissions/financial-aid' },
  { id: 's12', universityId: 'u3', name: 'NSU Merit Scholarship (25% waiver)', eligibility: 'Students with combined GPA 9.0+ in SSC & HSC with minimum GPA 4.5 in HSC', gpaRequirement: 4.5, percentage: 25, applicationProcess: 'Automatic consideration upon semester registration based on academic results', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'northsouth.edu/admissions/financial-aid' },
  { id: 's13', universityId: 'u3', name: 'NSU Need-Based Financial Aid', eligibility: 'Financially disadvantaged students with minimum GPA 3.0 in HSC demonstrating genuine need', gpaRequirement: 3.0, percentage: 50, applicationProcess: 'Submit financial hardship application with income certificate, utility bills, and supporting documents to the Financial Aid Office within 2 weeks of admission', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'northsouth.edu/admissions/financial-aid' },
  { id: 's14', universityId: 'u3', name: 'NSU Freedom Fighter Ward Scholarship', eligibility: 'Children and grandchildren of gazetted freedom fighters', gpaRequirement: 3.0, percentage: 100, applicationProcess: 'Submit freedom fighter gazette certificate and supporting documents to the Scholarship Office', verification: 'university_verified', lastUpdated: '2026-10-18', source: 'northsouth.edu/admissions/financial-aid' },
  // DIU Scholarships
  { id: 's15', universityId: 'u5', name: 'DIU Golden GPA Scholarship (GPA 5.0)', eligibility: 'Students with GPA 5.0 in both SSC and HSC (without 4th subject / with 4th subject criteria)', gpaRequirement: 5.0, percentage: 100, applicationProcess: 'Automatic 100% tuition fee waiver upon admission based on academic board results', verification: 'university_verified', lastUpdated: '2026-10-20', source: 'daffodilvarsity.edu.bd/scholarship' },
  { id: 's16', universityId: 'u5', name: 'DIU Merit Scholarship (GPA 4.80 - 4.99)', eligibility: 'Combined GPA 9.5+ in SSC & HSC or HSC GPA 4.80+', gpaRequirement: 4.8, percentage: 50, applicationProcess: 'Automatic consideration during admission counseling and course registration', verification: 'university_verified', lastUpdated: '2026-10-20', source: 'daffodilvarsity.edu.bd/scholarship' },
  { id: 's17', universityId: 'u5', name: 'DIU Chairman Endowment Fund Scholarship', eligibility: 'Meritorious students with financial need and strong academic track record', gpaRequirement: 4.0, percentage: 100, applicationProcess: 'Apply via DIU Financial Aid Office with recommendation and income proofs', verification: 'university_verified', lastUpdated: '2026-10-20', source: 'daffodilvarsity.edu.bd/scholarship' },
  { id: 's18', universityId: 'u5', name: 'DIU Female Student Special Waiver', eligibility: 'All female students enrolling in undergraduate programs at DIU', gpaRequirement: 3.0, percentage: 10, applicationProcess: 'Automatic 10% tuition fee waiver applied to all admitted female students', verification: 'university_verified', lastUpdated: '2026-10-20', source: 'daffodilvarsity.edu.bd/scholarship' },
  { id: 's19', universityId: 'u5', name: 'DIU Freedom Fighter Ward & Siblings Waiver', eligibility: 'Children of recognized Freedom Fighters or siblings studying concurrently at DIU', gpaRequirement: 3.0, percentage: 25, applicationProcess: 'Submit freedom fighter certificate or sibling declaration form to Admission Office', verification: 'university_verified', lastUpdated: '2026-10-20', source: 'daffodilvarsity.edu.bd/scholarship' },
];

// ============================================================
// ADMISSION NOTICES
// ============================================================

export const admissionNotices: AdmissionNotice[] = [
  { id: 'a1', universityId: 'u1', title: 'Spring 2027 Admission Open — CSE, BBA, EEE, Architecture, Law, Pharmacy & More', applicationStart: '2026-10-01', deadline: '2026-12-15', admissionTestDate: '2027-01-10', applicationLink: 'https://www.bracu.ac.bd/admissions', officialSource: 'BRACU Admissions Office (bracu.ac.bd)', lastUpdated: '2026-10-15', verification: 'university_verified' },
  { id: 'a2', universityId: 'u2', title: 'Spring 2027 Undergraduate Admission Open — SETS, SBE, SELS, SLASS, SPPH & Law', applicationStart: '2026-10-01', deadline: '2026-12-20', admissionTestDate: '2027-01-08', applicationLink: 'https://iub.ac.bd/admissions', officialSource: 'IUB Admissions Office (iub.ac.bd)', lastUpdated: '2026-10-18', verification: 'university_verified' },
  { id: 'a3', universityId: 'u3', title: 'Spring 2027 Undergraduate Admission Open — CSE, BBA, EEE, ECE, Civil Engineering, Pharmacy & More', applicationStart: '2026-10-01', deadline: '2026-12-18', admissionTestDate: '2027-01-12', applicationLink: 'https://www.northsouth.edu/admissions', officialSource: 'NSU Admissions Office (northsouth.edu)', lastUpdated: '2026-10-18', verification: 'university_verified' },
  { id: 'a4', universityId: 'u5', title: 'Spring 2027 Undergraduate & Graduate Admission Open — Daffodil Smart City, Savar (CSE, SWE, BBA, EEE, Pharmacy, Textile & More)', applicationStart: '2026-10-01', deadline: '2026-12-25', admissionTestDate: '2027-01-15', applicationLink: 'https://www.daffodilvarsity.edu.bd/admission', officialSource: 'DIU Admissions Office (daffodilvarsity.edu.bd)', lastUpdated: '2026-10-20', verification: 'university_verified' },
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
  // NSU Reviews
  { id: 'r9',  universityId: 'u3', authorName: 'Saad Hossain', authorType: 'alumni', verified: true, graduationYear: 2024, programName: 'CSE', ratings: { academics: 5, faculty: 5, campus: 5, studentLife: 4, career: 5, costValue: 4, facilities: 5 }, overall: 4.8, writtenReview: 'NSU is Bangladesh\'s first private university and it really shows in the quality of everything — faculty, labs, curriculum, and alumni network. The CSE department has world-class labs, top professors with PhDs from the US, UK, and Canada, and a great career placement track record. One of the best decisions I ever made.', helpfulVotes: 74, date: '2026-05-18' },
  { id: 'r10', universityId: 'u3', authorName: 'Farzana Akter', authorType: 'student', verified: true, graduationYear: 2027, programName: 'BBA', ratings: { academics: 5, faculty: 4, campus: 5, studentLife: 5, career: 4, costValue: 4, facilities: 5 }, overall: 4.6, writtenReview: 'The School of Business & Economics at NSU is one of the strongest in the country. The BBA program covers everything from finance and marketing to entrepreneurship and operations. The faculty are experienced and the campus in Bashundhara is super modern and comfortable.', helpfulVotes: 58, date: '2026-08-09' },
  { id: 'r11', universityId: 'u3', authorName: 'Mehedi Hasan', authorType: 'alumni', verified: true, graduationYear: 2023, programName: 'EEE', ratings: { academics: 5, faculty: 5, campus: 4, studentLife: 4, career: 5, costValue: 4, facilities: 5 }, overall: 4.7, writtenReview: 'EEE at NSU is extremely rigorous and the labs are equipped with the latest power electronics, embedded systems, and communication equipment. Got a great job at a telecom company right after graduation. Highly recommended for aspiring engineers.', helpfulVotes: 49, date: '2026-06-22' },
  // DIU Reviews
  { id: 'r12', universityId: 'u5', authorName: 'Md. Al-Amin', authorType: 'alumni', verified: true, graduationYear: 2024, programName: 'CSE', ratings: { academics: 5, faculty: 4, campus: 5, studentLife: 5, career: 5, costValue: 5, facilities: 5 }, overall: 4.7, writtenReview: 'Daffodil Smart City in Savar is an absolute game changer! The green smart campus, 25 AC buses, AI & ML labs, and vibrant student clubs made my university life unforgettable. DIU truly focuses on innovation and entrepreneurship.', helpfulVotes: 89, date: '2026-06-15' },
  { id: 'r13', universityId: 'u5', authorName: 'Sumaiya Akter', authorType: 'student', verified: true, graduationYear: 2027, programName: 'Software Engineering', ratings: { academics: 4, faculty: 5, campus: 5, studentLife: 5, career: 4, costValue: 4, facilities: 5 }, overall: 4.6, writtenReview: 'The Software Engineering program at DIU is practical and industry-aligned. We get hands-on coding experience, cloud labs, and internship support. The scholarship waivers also make quality education affordable.', helpfulVotes: 54, date: '2026-08-20' },
  { id: 'r14', universityId: 'u5', authorName: 'Nazmul Islam', authorType: 'alumni', verified: true, graduationYear: 2023, programName: 'Textile Engineering', ratings: { academics: 5, faculty: 4, campus: 5, studentLife: 4, career: 5, costValue: 5, facilities: 4 }, overall: 4.5, writtenReview: 'DIU has top-notch textile laboratories and strong industry links with Bangladesh\'s garment sector. Got placed before my final semester. Great campus facilities and hostel life.', helpfulVotes: 43, date: '2026-04-12' },
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
  // NSU Community Posts
  {
    id: 'c5', universityId: 'u3', authorName: 'Raiyan Ahmed', authorAvatarColor: 'bg-green-600',
    universityAffiliation: 'North South University', verifiedBadge: 'student',
    category: 'CSE & Engineering', type: 'question',
    title: 'NSU CSE vs BRACU CSE — which is actually better in 2026?',
    content: "I have offers from both NSU and BRACU for CSE. NSU is Bangladesh's first private university with a big campus and strong alumni, but BRACU has AACSB and top rankings. Looking for current students or recent alumni perspective on placement, faculty quality, and lab facilities.",
    tags: ['nsu', 'bracu', 'cse', 'comparison', 'admission', 'private-university'], upvotes: 198, date: '2026-09-15',
    comments: [],
  },
  {
    id: 'c6', universityId: 'u3', authorName: 'Nusrat Jahan', authorAvatarColor: 'bg-teal-600',
    universityAffiliation: 'North South University', verifiedBadge: 'student',
    category: 'Scholarships', type: 'discussion',
    title: 'NSU Scholarship Breakdown 2026 — VC, Merit 50%, Merit 25%, Need-Based & More',
    content: "For those wondering about NSU scholarships: VC Scholarship (100% waiver) = Golden GPA 5.0 in both SSC & HSC. Merit 50% waiver = combined 9.5+ with HSC 4.75+. Merit 25% = combined 9.0+ with HSC 4.5+. Need-based = 3.0+ GPA + income proof. Freedom Fighter Ward = 100% waiver with gazette certificate. All academic waivers are automatic — no application needed!",
    tags: ['nsu', 'scholarship', 'merit', 'vc-scholarship', 'financial-aid', 'waiver'], upvotes: 231, date: '2026-10-05',
    comments: [],
  },
  {
    id: 'c7', universityId: 'u3', authorName: 'Ashrafur Rahman', authorAvatarColor: 'bg-emerald-700',
    universityAffiliation: 'North South University', verifiedBadge: 'alumni',
    category: 'Admission Help', type: 'question',
    title: 'NSU Admission Test Format & Preparation Tips (Spring 2027)',
    content: "Applying to NSU for Spring 2027? The admission test is MCQ-based covering English, Math (for Engineering/CS), and IQ/logical reasoning. For BBA it's English, Math & analytical skills. Time: 1 hour. Minimum 40/100 to qualify. Tips: practice English comprehension and basic calculus for CSE/EEE, focus on verbal reasoning for BBA.",
    tags: ['nsu', 'admission-test', 'preparation', 'spring-2027', 'cse', 'bba', 'eee'], upvotes: 165, date: '2026-10-11',
    comments: [],
  },
  // DIU Community Posts
  {
    id: 'c8', universityId: 'u5', authorName: 'Kazi Nazmul', authorAvatarColor: 'bg-orange-600',
    universityAffiliation: 'Daffodil International University', verifiedBadge: 'student',
    category: 'Campus Life', type: 'discussion',
    title: 'Daffodil Smart City (DSC) Savar Campus Experience — Hostels, Buses & Facilities',
    content: "If you're joining DIU at Daffodil Smart City in Savar, here is what you need to know: the campus is huge, lush green, and self-contained. There are 25 AC buses running across Dhaka daily. Hostels are super modern and just 5 minutes walk from class. The food court, sports complex, and 60+ clubs make campus life amazing!",
    tags: ['diu', 'daffodil-smart-city', 'savar', 'campus-life', 'hostel', 'transport'], upvotes: 142, date: '2026-09-20',
    comments: [],
  },
  {
    id: 'c9', universityId: 'u5', authorName: 'Farhana Yasmin', authorAvatarColor: 'bg-yellow-600',
    universityAffiliation: 'Daffodil International University', verifiedBadge: 'alumni',
    category: 'Scholarships', type: 'discussion',
    title: 'DIU Scholarship & Waiver Guide 2026 — Golden GPA, Merit & 10% Female Waiver',
    content: "DIU offers generous waivers: Golden GPA 5.0 gets 100% tuition waiver. Merit waivers range from 25% to 50% based on SSC & HSC results. Plus, all female undergraduate students get an automatic 10% tuition waiver! Chairman Endowment Fund is also available for need-based students. Check your waiver using the DIU waiver calculator on the site.",
    tags: ['diu', 'scholarship', 'waiver', 'financial-aid', 'golden-gpa', 'female-waiver'], upvotes: 178, date: '2026-10-02',
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
