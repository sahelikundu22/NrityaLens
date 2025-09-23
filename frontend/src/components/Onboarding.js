import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Onboarding = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState('learner');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [subjects, setSubjects] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Pre-fill from Clerk
    if (user) {
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
      if (fullName && !name) setName(fullName);
    }
  }, [user, name]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = await getToken();
      const body = { role };
      if (name) body.name = name;
      if (phone) body.phone = phone;
      if (address) body.address = address;
      if (city) body.city = city;
      if (country) body.country = country;
      if (role === 'teacher') {
        if (bio) body.bio = bio;
        if (subjects) body.subjects = subjects.split(',').map(s => s.trim()).filter(Boolean);
      }
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save profile');
      if (role === 'teacher') navigate('/teacher', { replace: true });
      else navigate('/learner', { replace: true });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 12, background: '#fff', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>
      <h1 style={{ marginTop: 0, marginBottom: 6, textAlign: 'center' }}>Welcome!</h1>
      <p style={{ color: '#666', marginBottom: 22, textAlign: 'center' }}>Select your role and confirm your details to continue</p>
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 18 }}>
          {[{key:'learner',title:'Learner',desc:'I want to learn and practice',emoji:'🧑‍🎓'},{key:'teacher',title:'Teacher',desc:'I teach and guide learners',emoji:'👩‍🏫'}].map(c => (
            <div key={c.key} onClick={() => setRole(c.key)} style={{ cursor:'pointer', padding: 18, border: role===c.key?'2px solid #111':'1px solid #eee', borderRadius: 14, background:'#fff' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{c.emoji}</div>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div style={{ color:'#666', marginTop:6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 12, fontSize: 18 }}>Your Details</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
              <input value={user?.primaryEmailAddress?.emailAddress || ''} readOnly placeholder="Email" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', background:'#f8f8f8' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Mobile number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., +91 98765 43210" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Address</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, Area" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Country</label>
              <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
            </div>
          </div>
        </div>
        {role === 'teacher' && (
          <>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Bio (optional)</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short bio" rows={3} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Subjects (comma separated)</label>
              <input value={subjects} onChange={(e) => setSubjects(e.target.value)} placeholder="e.g., Bharatanatyam, Abhinaya" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
            </div>
          </>
        )}
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ padding: '12px 24px', borderRadius: 8, background: '#111', color: '#fff', fontSize: 16, fontWeight: 600 }}>{loading ? 'Saving...' : 'Continue'}</button>
      </form>
    </div>
  );
};

export default Onboarding;


