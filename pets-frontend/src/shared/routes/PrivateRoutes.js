import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export const PrivateRoutes = () => {
  const { person } = useAuth();

  console.log(person);

  return person ? <Outlet /> : <Navigate to="/" />;
};
