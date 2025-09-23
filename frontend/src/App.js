import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import MudraIdentifier from './components/MudraIdentifier/MudraIdentifier';
import PracticeMode from './components/PracticeMode/PracticeMode';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import AuthPage from './components/AuthPage'; // We'll create this next

function App() {
  return (
    <Routes>
      {/* Auth page */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/identify" element={
        <SignedIn>
          <MudraIdentifier />
        </SignedIn>
      } />
      <Route path="/practice" element={
        <SignedIn>
          <PracticeMode />
        </SignedIn>
      } />

      {/* Redirect if signed out */}
      <Route path="*" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
    </Routes>
  );
}

export default App;
