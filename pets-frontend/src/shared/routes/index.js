import { Routes, Route, Navigate } from 'react-router-dom';

import { SignIn, SignUp } from '../../pages';

import { Layout } from '../components';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/layout" element={<Layout />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
