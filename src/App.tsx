import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CompareProvider } from '@/context/CompareContext';
import { SavedProvider } from '@/context/SavedContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import UniversitiesPage from '@/pages/UniversitiesPage';
import UniversityProfilePage from '@/pages/UniversityProfilePage';
import ProgramsPage from '@/pages/ProgramsPage';
import ProgramDetailsPage from '@/pages/ProgramDetailsPage';
import ComparePage from '@/pages/ComparePage';
import CalculatorPage from '@/pages/CalculatorPage';
import CommunityPage from '@/pages/CommunityPage';
import UniversityCommunityPage from '@/pages/UniversityCommunityPage';
import AdmissionPage from '@/pages/AdmissionPage';
import ScholarshipsPage from '@/pages/ScholarshipsPage';
import SearchPage from '@/pages/SearchPage';
import AuthPage from '@/pages/AuthPage';
import AdminPage from '@/pages/AdminPage';
import RepPortalPage from '@/pages/RepPortalPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CompareProvider>
          <SavedProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/universities" element={<UniversitiesPage />} />
                <Route path="/universities/:slug" element={<UniversityProfilePage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/programs/:slug" element={<ProgramDetailsPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/community/university/:slug" element={<UniversityCommunityPage />} />
                <Route path="/admission" element={<AdmissionPage />} />
                <Route path="/scholarships" element={<ScholarshipsPage />} />
                <Route path="/search" element={<SearchPage />} />
              </Route>
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/rep-portal" element={<RepPortalPage />} />
            </Routes>
          </SavedProvider>
        </CompareProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
