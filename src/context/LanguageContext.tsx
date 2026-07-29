import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.universities': 'Universities',
    'nav.programs': 'Programs',
    'nav.compare': 'Compare',
    'nav.calculator': 'Calculator',
    'nav.admission': 'Admission',
    'nav.scholarships': 'Scholarships',
    'nav.community': 'Community',
    'nav.login': 'Log in',
    'nav.signup': 'Sign up',
    
    // Hero
    'hero.badge': 'Fall 2026 Admissions Now Open',
    'hero.title': 'Find the Right University for Your Future',
    'hero.subtitle': 'Compare private universities in Bangladesh by tuition fees, programs, credits, scholarships, admission requirements, campus life, and student experiences.',
    'hero.search_placeholder': 'Search universities, programs, subjects...',
    'hero.search_button': 'Search',
    'hero.popular': 'Popular:',
    
    // Quick Actions
    'action.find_university': 'Find a University',
    'action.find_program': 'Find a Program',
    'action.compare_universities': 'Compare Universities',
    'action.calculate_tuition': 'Calculate Tuition',
    'action.ask_students': 'Ask Students',
    
    // Sections
    'section.how_it_works.title': 'How UniVara Works',
    'section.how_it_works.subtitle': 'Four simple steps to find your perfect university match.',
    'section.popular_universities.title': 'Popular Universities',
    'section.popular_universities.subtitle': 'Top-rated private universities in Bangladesh, chosen by students.',
    'section.popular_universities.view_all': 'View all',
  },
  bn: {
    // Navbar
    'nav.universities': 'বিশ্ববিদ্যালয়',
    'nav.programs': 'প্রোগ্রাম',
    'nav.compare': 'তুলনা',
    'nav.calculator': 'ক্যালকুলেটর',
    'nav.admission': 'ভর্তি',
    'nav.scholarships': 'বৃত্তি',
    'nav.community': 'কমিউনিটি',
    'nav.login': 'লগ ইন',
    'nav.signup': 'সাইন আপ',
    
    // Hero
    'hero.badge': 'ফল ২০২৬ ভর্তি এখন শুরু হয়েছে',
    'hero.title': 'আপনার ভবিষ্যতের জন্য সঠিক বিশ্ববিদ্যালয় খুঁজুন',
    'hero.subtitle': 'বাংলাদেশে বেসরকারি বিশ্ববিদ্যালয়গুলোর টিউশন ফি, প্রোগ্রাম, ক্রেডিট, স্কলারশিপ, ভর্তির প্রয়োজনীয়তা এবং ক্যাম্পাস লাইফ তুলনা করুন।',
    'hero.search_placeholder': 'বিশ্ববিদ্যালয়, প্রোগ্রাম বা বিষয় খুঁজুন...',
    'hero.search_button': 'খুঁজুন',
    'hero.popular': 'জনপ্রিয়:',
    
    // Quick Actions
    'action.find_university': 'বিশ্ববিদ্যালয় খুঁজুন',
    'action.find_program': 'প্রোগ্রাম খুঁজুন',
    'action.compare_universities': 'বিশ্ববিদ্যালয় তুলনা করুন',
    'action.calculate_tuition': 'টিউশন হিসাব করুন',
    'action.ask_students': 'শিক্ষার্থীদের জিজ্ঞাসা করুন',
    
    // Sections
    'section.how_it_works.title': 'ইউনিভারা যেভাবে কাজ করে',
    'section.how_it_works.subtitle': 'আপনার জন্য সঠিক বিশ্ববিদ্যালয় খুঁজে পেতে চারটি সহজ ধাপ।',
    'section.popular_universities.title': 'জনপ্রিয় বিশ্ববিদ্যালয়',
    'section.popular_universities.subtitle': 'শিক্ষার্থীদের দ্বারা নির্বাচিত বাংলাদেশের সেরা বেসরকারি বিশ্ববিদ্যালয়।',
    'section.popular_universities.view_all': 'সব দেখুন',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
