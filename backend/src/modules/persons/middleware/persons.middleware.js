const PersonsRepository = require('../repositories/PersonsRepository');

const AppError = require('../../../shared/errors/AppError');

const personsRepository = new PersonsRepository();

module.exports = {
  async verifyIfEmailAlreadyExists(request, response, next) {
    const { email } = request.body;

    const emailExists = await personsRepository.checkPersonEmail(email);
    if (emailExists) throw new AppError('Email already exists', 401);

    next();
  },
};
