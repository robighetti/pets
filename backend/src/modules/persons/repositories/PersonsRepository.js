const connection = require('../../../shared/database/connection');

class PersonsRepository {
  async checkPersonEmail(email) {
    return connection('persons').where({ email });
  }

  async createPerson(payload) {
    return connection.transaction(async trx =>
      trx('persons').insert(payload).returning('id')
    );
  }
}

module.exports = PersonsRepository;
