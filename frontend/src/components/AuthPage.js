import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Routes, Route } from 'react-router-dom';

const AuthPage = () => {
  return (
    <Routes>
      <Route
        path="/signin"
        element={<SignIn routing="path" path="/auth/signin" afterSignInUrl="/onboarding" />} />
      <Route
        path="/signup"
        element={<SignUp routing="path" path="/auth/signup" afterSignUpUrl="/onboarding" />} />
    </Routes>
  );
};

export default AuthPage;
