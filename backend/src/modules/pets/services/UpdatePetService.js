const AppError = require('../../../shared/errors/AppError');

class UpdatePetService {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute(payload) {
    const pet = await this.petsRepository.getOnePet(payload.id);
    if (!pet) throw new AppError('Pet not found');

    return this.petsRepository.updatePets(payload);
  }
}

module.exports = UpdatePetService;
