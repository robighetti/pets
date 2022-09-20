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

export { login, createPerson };
