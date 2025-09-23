import React from 'react';
import { useUser } from '@clerk/clerk-react';

const TeacherHome = () => {
  const { user } = useUser();
  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: 'linear-gradient(135deg,#c3cfe2,#cfd9df)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Welcome, {user?.firstName || 'Teacher'} 🎓</h2>
        <p style={{ marginTop: 8, color: '#333' }}>Manage your teachings and engage learners.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, background: '#fff' }}>
          <h3 style={{ marginTop: 0 }}>Create Practice Sets</h3>
          <p>Define mudra drills for your learners.</p>
          <a href="#">Coming soon</a>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, background: '#fff' }}>
          <h3 style={{ marginTop: 0 }}>Review Submissions</h3>
          <p>Review learner practice results.</p>
          <a href="#">Coming soon</a>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;


