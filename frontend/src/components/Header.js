import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #eee' }}>
      <nav style={{ display: 'flex', gap: '12px' }}>
        <Link to="/">Home</Link>
        <Link to="/identify">Identify</Link>
        <Link to="/practice">Practice</Link>
      </nav>
      <div>
        <SignedOut>
          <Link to="/auth/signup">
            <button>Get Started</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;


