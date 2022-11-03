class CreateNewPetService {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute(payload) {
    return this.petsRepository.createPets(payload);
  }
}

module.exports = CreateNewPetService;
