const AppError = require('../../../shared/errors/AppError');

const { generateHash } = require('../../../shared/utils/encrypt');

class ResetPasswordService {
  constructor(personsRepository) {
    this.personsRepository = personsRepository;
  }

  async execute(payload) {
    const { token, password } = payload;

    const person = await this.personsRepository.getTokenUser(token);
    if (!person) throw new AppError('Person not found');

    const passwordHashed = await generateHash(password);

    const data = {
      personId: person.person_id,
      password: passwordHashed,
    };

    const result = await this.personsRepository.updatePasswordAndDeleteToken(
      data
    );

    return result;
  }
}

module.exports = ResetPasswordService;
