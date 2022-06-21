const PersonsRepository = require('../repositories/PersonsRepository');

const AppError = require('../../../shared/errors/AppError');

const personsRepository = new PersonsRepository();

module.exports = {
  verifyPayloadForCreation(request, response, next) {
    const { name, email, whatsapp, password, cep } = request.body;

    if (!name) {
      throw new AppError('Name not found');
    }

    if (!email) {
      throw new AppError('Email not found');
    }

    if (!whatsapp) {
      throw new AppError('Whatsapp not found');
    }

    if (!password) throw new AppError('Password not found');

    if (!cep) throw new AppError('CEP not found', 401);

    next();
  },

  async verifyIfEmailAlreadyExists(request, response, next) {
    const { email } = request.body;

    const emailExists = await personsRepository.checkPersonEmail(email);
    if (emailExists) throw new AppError('Email already exists', 401);

    next();
  },
};
