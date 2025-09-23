import React, { useEffect } from 'react';
import { useUser, useClerk, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const RoleRedirect = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const go = async () => {
      if (!isSignedIn) {
        navigate('/');
        return;
      }
      try {
        const token = await getToken();
        await fetch(`${API_BASE_URL}/api/auth/sync`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        // ignore sync error for redirect
      }

      const role = user?.publicMetadata?.role;
      if (!role) {
        navigate('/onboarding', { replace: true });
        return;
      }
      if (role === 'teacher') navigate('/teacher', { replace: true });
      else navigate('/learner', { replace: true });
    };
    go();
  }, [isSignedIn, user, getToken, navigate]);

  return null;
};

export default RoleRedirect;


