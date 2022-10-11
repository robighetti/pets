const connection = require('../../../shared/database/connection');

class PersonsRepository {
  async checkPersonEmail(email) {
    return connection('persons').where({ email }).first();
  }

  async createPerson(payload) {
    return connection.transaction(async trx =>
      trx('persons').insert(payload).returning('id')
    );
  }

  async saveTokenInDb(payload) {
    return connection.transaction(async trx =>
      trx('persons_token').insert(payload).returning('token')
    );
  }
}

module.exports = PersonsRepository;
