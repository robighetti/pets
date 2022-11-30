const PetsRepository = require('../../repositories/PetsRepository');

const CreateNewPetService = require('../../services/CreateNewPetService');
const GetAllPetsService = require('../../services/GetAllPetsService');
const GetOnePetService = require('../../services/GetOnePetService');
const UpdatePetService = require('../../services/UpdatePetService');
const DeletePetService = require('../../services/DeletePetService');
const UpdatePetsPictureService = require('../../services/UpdatePetsPictureService');

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
      person_id_donation: request.person.id
    });

    return response.json(pet[0]);
  }

  async updatePets(request, response) {
    const { id } = request.params;

    const payload = {
      id,
      ...request.body,
    };

    const updatePet = new UpdatePetService(petsRepository);

    const petUpdated = await updatePet.execute(payload);

    return response.json(petUpdated);
  }

  async updatePetsPicture(request, response) {
    const updatePetService = new UpdatePetsPictureService(petsRepository);

    const { id } = request.params;

    const updatedPetPicture = await updatePetService.execute({
      id,
      filename: request.file.filename,
    });

    return response.json(updatedPetPicture);
  }

  async deletePets(request, response) {
    const { id } = request.params;

    const deletePet = new DeletePetService(petsRepository);

    await deletePet.execute(id);

    return response.json({
      pet: {
        id,
        deleted: true,
      },
    });
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
