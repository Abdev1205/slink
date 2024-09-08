// useSession.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import Cookies from 'js-cookie';

const useSession = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/shorten/auth/user', { withCredentials: true });
        if (response?.data?.user) {
          setUser(response.data.user);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
        setLoggedIn(false);
      }
    };

    fetchUser();
    return () => setUser(null);
  }, []);

  const logout = async () => {
    try {
      const res = await api.get('/api/shorten/auth/logout', { withCredentials: true });
      console.log(res.data)
      setUser(null);
      setLoggedIn(false);
      Cookies.remove('accessToken');
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { user, loading, loggedIn, logout };
};

export default useSession;
