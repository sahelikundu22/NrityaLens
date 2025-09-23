import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import MudraIdentifier from './components/MudraIdentifier/MudraIdentifier';
import PracticeMode from './components/PracticeMode/PracticeMode';
import { SignedIn } from '@clerk/clerk-react';
import AuthPage from './components/AuthPage'; // We'll create this next
import RoleRedirect from './components/RoleRedirect';
import LearnerHome from './components/LearnerHome';
import TeacherHome from './components/TeacherHome';
import Header from './components/Header';
import Onboarding from './components/Onboarding';
import RequireRole from './components/RequireRole';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Auth */}
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/dashboard" element={<RoleRedirect />} />

        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/identify" element={<MudraIdentifier />} />
        <Route path="/practice" element={<PracticeMode />} />

        {/* Onboarding and role-guarded homepages */}
        <Route path="/onboarding" element={<SignedIn><Onboarding /></SignedIn>} />
        <Route path="/learner" element={<SignedIn><RequireRole role="learner"><LearnerHome /></RequireRole></SignedIn>} />
        <Route path="/teacher" element={<SignedIn><RequireRole role="teacher"><TeacherHome /></RequireRole></SignedIn>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
