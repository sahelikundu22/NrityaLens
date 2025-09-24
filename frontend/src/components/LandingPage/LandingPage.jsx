import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/background.png';
import './LandingPage.css';
import { useUser } from '@clerk/clerk-react';
import { FiMessageCircle } from 'react-icons/fi'; 
import { FaHandsHelping, FaCameraRetro } from 'react-icons/fa';
import { Hand, Camera } from 'lucide-react';
/*import { FaChalkboardTeacher } from 'react-icons/fa'; // Teacher icon
import { MdSchool } from 'react-icons/md'; // Learner icon
*/
const LandingPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleModuleClick = (path) => {
    navigate(path);
  };
const handleChatClick = () => {
    window.open('http://localhost:8501', '_blank');
  };
  // Determine user role if logged in
  const role = user?.publicMetadata?.role || null; // 'learner' or 'teacher'

  return (
    <div className="landing-page">
      {/* Hero Section - always visible */}
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

      {/* Features Section - Beautified */}
<section className="features-section">
  <div className="container">
    <h2>How Can NrityaLens Help You?</h2>
    <div className="features-grid">

      {/* Feature Card 1 */}
      <div className="feature-card" onClick={() => handleModuleClick('/identify')}>
        <div className="feature-icon-wrapper">
          <Hand size={50} className="feature-icon" />
        </div>
        <h3>Which Mudra is This?</h3>
        <p>
          Upload an image of a hand gesture, and our AI will identify the mudra, provide its meaning, and analyze your shape accuracy.
        </p>
        <span className="feature-cta">Try Now →</span>
      </div>

      {/* Feature Card 2 */}
      <div className="feature-card" onClick={() => handleModuleClick('/practice')}>
        <div className="feature-icon-wrapper">
          <Camera size={50} className="feature-icon" />
        </div>
        <h3>Mudra Shape Accuracy Camera</h3>
        <p>
          Test your skills! The app will prompt you with a mudra name, and you must perform it in front of your camera to get a real-time accuracy score.
        </p>
        <span className="feature-cta">Practice Now →</span>
      </div>

    </div>
  </div>
</section>

      {/* Floating Chat Icon */}
      <button className="chat-icon" onClick={handleChatClick}>
        <FiMessageCircle size={30} />
      </button>
    </div>
  );
};

export default LandingPage;
