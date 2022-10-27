const CreatePersonsService = require('../../services/CreatePersonsService');
const ForgotPasswordService = require('../../services/ForgotPasswordService');
const ResetPasswordService = require('../../services/ResetPasswordService');
const UpdatePersonAvatar = require('../../services/UpdatePersonAvatar');

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

  async resetPassword(request, response) {
    const resetPassword = new ResetPasswordService(personsRepository);

    const { token } = request.params;
    const { password } = request.body;

    const result = await resetPassword.execute({
      token,
      password,
    });

    return response.json(result);
  }

  async updatePersonAvatar(request, response) {
    const updateAvatar = new UpdatePersonAvatar(personsRepository);

    const updatedAvatar = await updateAvatar.execute({
      personId: request.person.id,
      avatarFileName: request.file.filename,
    });

    return response.json(updatedAvatar);
  }
}

module.exports = PersonsController;
