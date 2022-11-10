const AppError = require('../../../shared/errors/AppError');

class DeletePetService {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute(idPet) {
    const pet = await this.petsRepository.getOnePet(idPet);
    if (!pet) throw new AppError('Pet not found');

    return this.petsRepository.deletePets(idPet);
  }
}

module.exports = DeletePetService;
