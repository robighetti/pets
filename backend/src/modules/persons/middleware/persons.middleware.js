const PersonsRepository = require('../repositories/PersonsRepository');

const personsRepository = new PersonsRepository();

module.exports = {
  verifyPayloadForCreation(request, response, next) {
    const { name, email, whatsapp, password, cep } = request.body;

    if (!name) {
      throw new Error('Name not found');
    }

    if (!email) {
      throw new Error('Email not found');
    }

    if (!whatsapp) {
      throw new Error('Whatsapp not found');
    }

    if (!password) throw new Error('Password not found');

    if (!cep) throw new Error('CEP not found');

    next();
  },

  async verifyIfEmailAlreadyExists(request, response, next) {
    const { email } = request.body;

    const emailExists = await personsRepository.checkPersonEmail(email);

    if (!emailExists) throw new Error('Email already exists');

    next();
  },
};
