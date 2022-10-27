const path = require('path');
const fs = require('fs');

const AppError = require('../../../shared/errors/AppError');

const uploadConfig = require('../../../config/upload');

class UpdatePersonAvatar {
  constructor(personsRepository) {
    this.personsRepository = personsRepository;
  }

  async execute({ personId, avatarFileName }) {
    const person = await this.personsRepository.getPersonById(personId);
    if (!person) throw new AppError('Person not found');

    console.log(person);

    if (person.avatar) {
      const personAvatarFilePath = path.join(
        uploadConfig.directory,
        person.avatar
      );

      const personAvatarExists = await fs.promises.stat(personAvatarFilePath);
      if (personAvatarExists) {
        await fs.promises.unlink(personAvatarFilePath);
      }
    }

    return this.personsRepository.updatePerson({
      id: person.id,
      avatar: avatarFileName,
    });
  }
}

module.exports = UpdatePersonAvatar;
