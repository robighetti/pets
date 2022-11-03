const connection = require('../../../shared/database/connection');

class PetsRepository {
  async createPets(payload) {
    return connection.transaction(async trx =>
      trx('pets').insert(payload).returning('*')
    );
  }

  async updatePets(payload) {
    return connection('pets')
      .update(payload)
      .where({ id: payload.id })
      .returning('*');
  }

  async deletePets(idPet) {
    return connection('pets').del().where({ id: idPet });
  }

  async getAllPets() {
    return connection('pets');
  }

  async getOnePet(idPet) {
    return connection('pets').where({ id: idPet }).first();
  }
}

module.exports = PetsRepository;
