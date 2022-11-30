const AppError = require('../../../shared/errors/AppError');

class CreateAdoptionService {
  constructor(petsRepository, transactionsRepository) {
    this.petsRepository = petsRepository;
    this.transactionsRepository = transactionsRepository;
  }

  async execute(payload) {
    const pet = await this.petsRepository.getOnePet(payload.pet_id);
    if (!pet) throw new AppError("Pet not found");

    if (pet.status) throw new AppError("Pet already adopted")

    Object.assign(payload, { person_id_donation: pet.person_id_donation });

    return this.transactionsRepository.saveAdoption(payload);
  }
}

module.exports = CreateAdoptionService;