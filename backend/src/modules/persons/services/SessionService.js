const jwt = require('jsonwebtoken');

const AppError = require('../../../shared/errors/AppError');

const { compare } = require('../../../shared/utils/encrypt');

class SessionService {
  constructor(personsRepository) {
    this.personsRepository = personsRepository;
  }

  async execute(payload) {
    const { email, password } = payload;

    const person = await this.personsRepository.checkPersonEmail(email);
    if (!person) throw new AppError('Person not found');

    await compare(password, person.password);

    const token = jwt.sign({ id: person.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    delete person.password;

    return {
      token,
      person,
    };
  }
}

module.exports = SessionService;
