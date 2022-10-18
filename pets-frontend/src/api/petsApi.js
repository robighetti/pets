import { api } from '../shared/services';

const login = async ({ email, password }) => {
  try {
    const response = await api.post('/login', { email, password });

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createPerson = async payload => {
  try {
    const response = await api.post('/persons', payload);

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const forgotPassword = async email => {
  try {
    const response = await api.post('/forgot', {
      email,
    });

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const resetPassword = async ({ token, password }) => {
  try {
    const response = await api.patch(`/reset-password/${token}`, {
      password,
    });

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { login, createPerson, forgotPassword, resetPassword };
