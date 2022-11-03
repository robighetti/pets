class GetAllPetsService {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute() {
    return this.petsRepository.getAllPets();
  }
}

module.exports = GetAllPetsService;
