const path = require('path');
const fs = require('fs');

const AppError = require('../../../shared/errors/AppError');

const uploadConfig = require('../../../config/upload');

class UpdatePetsPictureService {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute({ id, filename }) {
    const pet = await this.petsRepository.getOnePet(id);
    if (!pet) throw new AppError('Pet not found');

    if (pet.picture) {
      const petPicturePath = path.join(uploadConfig.directory, pet.picture);

      const petPictureExists = await fs.promises.stat(petPicturePath);
      if (petPictureExists) {
        await fs.promises.unlink(petPicturePath);
      }
    }

    return this.petsRepository.updatePets({
      id,
      picture: filename,
    });
  }
}

module.exports = UpdatePetsPictureService;
