const { generateHash } = require('../../../shared/utils/encrypt');

class CreatePersonsService {
  constructor(personsRepository) {
    this.personsRepository = personsRepository;
  }

  async execute(payload) {
    const { password } = payload;

    Object.assign(payload, {
      password: await generateHash(password),
    });

    const person = await this.personsRepository.createPerson(payload);

    return person;
  }
}

module.exports = CreatePersonsService;
