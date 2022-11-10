import { useState, useCallback, createContext, useContext } from 'react';

import { login } from '../../api/petsApi';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const petsData = JSON.parse(localStorage.getItem('@pets'));

    if (petsData) {
      return {
        token: petsData.token,
        person: petsData.person,
      };
    }

    return undefined;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await login({ email, password });

    const { token, person } = response;

    setData(person);

    localStorage.setItem('@pets', JSON.stringify({ token, person }));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@pets');
    setData(undefined);
  }, []);
  return (
    <AuthContext.Provider value={{ signIn, signOut, payload: data }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
