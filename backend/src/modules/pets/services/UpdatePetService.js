class UpdatePetService {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute(payload) {
    return payload;
  }
}

module.exports = UpdatePetService;
