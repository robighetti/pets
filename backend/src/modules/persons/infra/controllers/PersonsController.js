const CreatePersonsService = require('../../services/CreatePersonsService');
const ForgotPasswordService = require('../../services/ForgotPasswordService');

const PersonsRepository = require('../../repositories/PersonsRepository');

const MailProvider = require('../../../../shared/providers/MailProvider');

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

  async forgotPassword(request, response) {
    const mailProvider = new MailProvider();

    const forgotPassword = new ForgotPasswordService(
      personsRepository,
      mailProvider
    );

    const { email } = request.body;

    const forgot = await forgotPassword.execute({ email });

    return response.json(forgot);
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
