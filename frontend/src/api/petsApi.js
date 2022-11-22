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

const getPets = async () => {
  try {
    const response = await api.get('/pets');

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createPet = async (payload) => {
  try {
    const response = await api.post('/pets', payload);

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

const updateAvatarPet = async ({ id, data }) => {
  try {
    const response = await api.patch(`/pets/${id}/picture`, data);

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getPetDetails = async (id) => {
  try {
    const response = await api.get(`/pets/${id}`);

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

const editPet = async (payload) => {
  try {
    const response = await api.put(`/pets/${payload.id}`, payload);

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export {
  login,
  createPerson,
  forgotPassword,
  resetPassword,
  getPets,
  createPet,
  updateAvatarPet,
  getPetDetails,
  editPet
};
