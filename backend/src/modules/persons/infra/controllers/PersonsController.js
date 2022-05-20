class PersonsController {
  async createPersons(request, response) {
    return response.json({ create: true });
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
