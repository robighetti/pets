const PetsRepository = require('../../repositories/PetsRepository');

const CreateNewPetService = require('../../services/CreateNewPetService');
const GetAllPetsService = require('../../services/GetAllPetsService');
const GetOnePetService = require('../../services/GetOnePetService');

const petsRepository = new PetsRepository();

class PetsController {
  async createPets(request, response) {
    const { name, age, race, port, castrated = false, type } = request.body;

    const createPet = new CreateNewPetService(petsRepository);

    const pet = await createPet.execute({
      name,
      age,
      race,
      port,
      castrated,
      type,
    });

    return response.json(pet[0]);
  }

  async updatePets(request, response) {
    return response.json({ ok: 'updatePets' });
  }

  async deletePets(request, response) {
    return response.json({ ok: 'deletePets' });
  }

  async getAllPets(request, response) {
    const getAll = new GetAllPetsService(petsRepository);

    const pets = await getAll.execute();

    return response.json(pets);
  }

  async getOnePet(request, response) {
    const { id } = request.params;

    const getOne = new GetOnePetService(petsRepository);

    const pet = await getOne.execute(id);

    return response.json(pet);
  }
}

module.exports = PetsController;
