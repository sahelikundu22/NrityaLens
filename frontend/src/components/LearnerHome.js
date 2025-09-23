import React from 'react';
import { useUser } from '@clerk/clerk-react';

const LearnerHome = () => {
  const { user } = useUser();
  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: 'linear-gradient(135deg,#ffecd2,#fcb69f)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Welcome, {user?.firstName || 'Learner'} 👋</h2>
        <p style={{ marginTop: 8, color: '#333' }}>Jump back into learning Bharatanatyam mudras.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, background: '#fff' }}>
          <h3 style={{ marginTop: 0 }}>Identify a Mudra</h3>
          <p>Upload an image and get instant identification.</p>
          <a href="/identify">Open</a>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, background: '#fff' }}>
          <h3 style={{ marginTop: 0 }}>Practice Mode</h3>
          <p>Practice with real-time feedback via camera.</p>
          <a href="/practice">Start</a>
        </div>
      </div>
    </div>
  );
};

export default LearnerHome;


