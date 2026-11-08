
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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
import ResetPasswordPage from '@/pages/ResetPasswordPage';

import AdminPage from '@/pages/AdminPage';
import RepPortalPage from '@/pages/RepPortalPage';
import AdvertisePage from '@/pages/AdvertisePage';
import SubmitInformationPage from '@/pages/SubmitInformationPage';

import { supabase } from '@/lib/supabase';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from('universities')
        .select('id')
        .limit(1);

      if (error) {
        console.error('Supabase Connection Error:', error);
      } else {
        console.log('Supabase Connected Successfully!');
        console.log('Database Response:', data);
      }
    }

    testConnection();
  }, []);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <CompareProvider>
          <SavedProvider>
            <ScrollToTop />

            <Routes>
              {/* Main Website Pages */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />

                <Route
                  path="/universities"
                  element={<UniversitiesPage />}
                />

                <Route
                  path="/universities/:slug"
                  element={<UniversityProfilePage />}
                />

                <Route path="/programs" element={<ProgramsPage />} />

                <Route
                  path="/programs/:slug"
                  element={<ProgramDetailsPage />}
                />

                <Route path="/compare" element={<ComparePage />} />

                <Route path="/calculator" element={<CalculatorPage />} />

                <Route path="/community" element={<CommunityPage />} />

                <Route
                  path="/community/university/:slug"
                  element={<UniversityCommunityPage />}
                />

                <Route path="/admission" element={<AdmissionPage />} />

                <Route
                  path="/scholarships"
                  element={<ScholarshipsPage />}
                />

                <Route path="/search" element={<SearchPage />} />

                <Route path="/advertise" element={<AdvertisePage />} />

                <Route
                  path="/submit-information"
                  element={<SubmitInformationPage />}
                />
              </Route>

              {/* Authentication Pages */}
              <Route
                path="/login"
                element={<AuthPage mode="login" />}
              />

              <Route
                path="/signup"
                element={<AuthPage mode="signup" />}
              />

              {/* Password Recovery Page */}
              <Route
                path="/reset-password"
                element={<ResetPasswordPage />}
              />

              {/* Admin Pages */}
              <Route path="/admin" element={<AdminPage />} />

              <Route
                path="/rep-portal"
                element={<RepPortalPage />}
              />
            </Routes>
          </SavedProvider>
        </CompareProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
