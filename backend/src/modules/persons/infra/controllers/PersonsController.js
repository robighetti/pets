const CreatePersonsService = require('../../services/CreatePersonsService');

const PersonsRepository = require('../../repositories/PersonsRepository');

const personsRepository = new PersonsRepository();
class PersonsController {
  async createPersons(request, response) {
    const { name, email, whatsapp, password, cep } = request.body;

    const createPerson = new CreatePersonsService(personsRepository);

    const person = await createPerson.execute({
      name,
      email,
      whatsapp,
      password,
      cep,
    });

    return response.json({ person });
  }

  async getAllPersons(request, response) {
    return response.json({ getAll: true });
  }

  async updatePersons(request, response) {
    return response.json({ update: true });
  }

  async deletePersons(request, response) {
    return response.json({ delete: true });
  }
}

module.exports = PersonsController;
