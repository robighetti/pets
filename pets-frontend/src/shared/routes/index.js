import { Routes, Route, Navigate } from 'react-router-dom';

import { SignIn } from '../../pages';

import { Layout } from '../components';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route path="/layout" element={<Layout />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
