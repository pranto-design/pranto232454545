/**
 * First-party seed facts only. This is a migration seed/read-model bridge, not the
 * long-term database. Fees, dates and media are intentionally absent until their
 * individual official source pages are reviewed and imported.
 */
export const eastWestUniversitySeed = {
  slug: 'east-west-university',
  name: 'East West University',
  shortName: 'EWU',
  website: 'https://www.ewubd.edu/',
  address: 'A/2, Jahurul Islam Avenue, Jahurul Islam City, Aftabnagar, Dhaka-1212, Bangladesh',
  phone: '09666775577, Ext. - 234',
  additionalPhones: ['+8801755587224', '+8801851933094'],
  emails: ['admissions@ewubd.edu', 'info@ewubd.edu'],
  faculties: [
    { name: 'Faculty of Sciences and Engineering', departments: ['Computer Science & Engineering', 'Electrical and Electronic Engineering', 'Genetic Engineering & Biotechnology', 'Pharmacy', 'Civil Engineering', 'Mathematics & Data Science'] },
    { name: 'Faculty of Liberal Arts and Social Sciences', departments: ['English', 'Law', 'Social Relations', 'Information Studies', 'Sociology'] },
    { name: 'Faculty of Business and Economics', departments: ['Business Administration', 'Economics Policy'] },
  ],
  source: 'https://www.ewubd.edu/',
  sourceReviewedOn: '2026-11-08',
  verification: 'official_source_reviewed' as const,
} satisfies {
  slug: string; name: string; shortName: string; website: string; address: string; phone: string;
  additionalPhones: string[]; emails: string[]; faculties: { name: string; departments: string[] }[];
  source: string; sourceReviewedOn: string; verification: string;
};
