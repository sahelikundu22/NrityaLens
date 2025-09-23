import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

const AuthPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Welcome to NrityaLens</h1>
      <div style={{ margin: '20px' }}>
        <SignIn path="/auth/signin" routing="path" />
      </div>
      <div style={{ margin: '20px' }}>
        <SignUp path="/auth/signup" routing="path" />
      </div>
    </div>
  );
};

export default AuthPage;
