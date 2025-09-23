import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/background.png';
import './LandingPage.css';
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';

const LandingPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleModuleClick = (path) => {
    navigate(path);
  };

  // Determine user role if logged in
  const role = user?.publicMetadata?.role || null; // 'learner' or 'teacher'

  return (
    <div className="landing-page">
      <SignedOut>
        <div className="auth-prompt">
          <h1>Welcome to NrityaLens</h1>
          <p>Please sign in to continue</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <SignInButton mode="modal">
              <button className="cta-button primary">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="cta-button secondary">Sign Up</button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {/* Hero Section */}
        <section 
          className="hero-section"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${background})`,
          }}
        >
          <div className="container">
            <h1>NrityaLens</h1>
            <p>Observing the Art of Bharatanatyam through AI</p>
            {role && <p>Logged in as <strong>{role}</strong></p>}
            <div className="cta-buttons">
              <button 
                className="cta-button primary"
                onClick={() => handleModuleClick('/identify')}
              >
                Identify a Mudra
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => handleModuleClick('/practice')}
              >
                Practice Mode
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2>How Can NrityaLens Help You?</h2>
            <div className="features-grid">
              <div 
                className="feature-card"
                onClick={() => handleModuleClick('/identify')}
              >
                <h3>Which Mudra is This?</h3>
                <p>Upload an image of a hand gesture, and our AI will identify the mudra, provide its meaning, and analyze your shape accuracy.</p>
              </div>
              <div 
                className="feature-card"
                onClick={() => handleModuleClick('/practice')}
              >
                <h3>Mudra Shape Accuracy Camera</h3>
                <p>Test your skills! The app will prompt you with a mudra name, and you must perform it in front of your camera to get a real-time accuracy score.</p>
              </div>
            </div>
          </div>
        </section>
      </SignedIn>
    </div>
  );
};

export default LandingPage;
