const PersonsRepository = require('../../repositories/PersonsRepository');

const SessionService = require('../../services/SessionService');

const personsRepository = new PersonsRepository();

class SessionsController {
  async login(request, response) {
    const sessionService = new SessionService(personsRepository);

    const person = await sessionService.execute(request.body);

    return response.json(person);
  }
}

module.exports = SessionsController;
