import { Routes, Route, Navigate } from 'react-router-dom';

import {
  SignIn,
  SignUp,
  Home,
  ForgotPassword,
  ResetPassword,
  Pets,
  FindPets,
} from '../../pages';

import { PrivateRoutes } from './PrivateRoutes';
import { Layout } from '../components';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<PrivateRoutes />}>
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/pets"
          element={
            <Layout>
              <Pets />
            </Layout>
          }
        />

        <Route
          path="/find-pets"
          element={
            <Layout>
              <FindPets />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
