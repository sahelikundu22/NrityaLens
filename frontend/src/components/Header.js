import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import icon from '../assets/icons/icon.jpg'; // your icon path

const Header = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid #eee',
        background: 'linear-gradient(135deg, #fff8dc, #fdf5e6)',
      }}
    >
      {/* Left: Icon + Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img src={icon} alt="Icon" style={{ height: '40px', width: '40px' }} />
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={textLinkStyle}>Home</Link>
          <Link to="/identify" style={textLinkStyle}>Identify</Link>
          <Link to="/practice" style={textLinkStyle}>Practice</Link>
        </nav>
      </div>

      {/* Right: Get Started / User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <SignedOut>
          <Link to="/auth/signup">
            <button style={getStartedStyle}>Get Started</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
};

// Text-only nav links style
const textLinkStyle = {
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1rem',
  background: 'linear-gradient(90deg, #D2691E, #8B4513)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

// Get Started button style
const getStartedStyle = {
  padding: '8px 20px',
  fontWeight: 'bold',
  color: '#fff', // white text
  backgroundColor: '#c41e3a', // box background
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
};

export default Header;
