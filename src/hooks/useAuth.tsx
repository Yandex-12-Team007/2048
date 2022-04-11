import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './userContext';
import Routes from 'Constants/Routes';

export default function useAuth() {
  let history = useHistory();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(UserContext);

  const API = 'https://ya-praktikum.tech/api/v2';
  const registerUser = async (fields) => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
      mode: "cors" as "cors",
      credentials: "include" as "include",
    };
    try {
      const fetchResponse = await fetch(`${API}/auth/signup/`, settings);
      if (!fetchResponse.ok) {
        const errorText = await fetchResponse.text();
        throw new Error(errorText);
      }
      const userId = await fetchResponse.json();
      console.log(userId);
      await setUserContext();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      console.error(e) ;
    }
  }

  const getUserInfo = async () => {
    const settings = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: "cors" as "cors",
      credentials: "include" as "include",
    };
    try {
      const fetchResponse = await fetch(`${API}/auth/user`, settings);
      if (!fetchResponse.ok) {
        const errorText = await fetchResponse.text();
        throw new Error(errorText);
      }
      return await fetchResponse.json();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      console.error(e);
    }
  }

  //set user in context and push them home
  const setUserContext = async () => {
    const userInfo = await getUserInfo();
    setUser(userInfo)
    history.push(Routes.HOME);
  }

  return {
    getUserInfo,
    registerUser,
    error
  }
}