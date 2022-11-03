const AppError = require('../../../shared/errors/AppError');

class GetOnePetService {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute(idPet) {
    const pet = await this.petsRepository.getOnePet(idPet);
    if (!pet) throw new AppError('No Pet found');

    return pet;
  }
}

module.exports = GetOnePetService;
