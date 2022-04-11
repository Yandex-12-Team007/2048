import { useState, useEffect } from 'react';
import useAuth from './useAuth';

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const { getUserInfo } = useAuth();
  useEffect(() => {
    async function setUserInfo() {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    }

    setUserInfo();
  }, []);

  return {
    user,
    setUser
  }
}