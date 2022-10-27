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

  async getTokenUser(token) {
    return connection('persons_token')
      .join('persons', 'persons.id', 'persons_token.person_id')
      .where({
        token,
      })
      .first();
  }

  async updatePasswordAndDeleteToken(payload) {
    return connection.transaction(async trx => {
      await trx('persons')
        .update({
          password: payload.password,
        })
        .where({
          id: payload.personId,
        });

      await trx('persons_token').del().where({
        person_id: payload.personId,
      });
    });
  }

  async getPersonById(personId) {
    return connection('persons').where({ id: personId }).first();
  }

  async updatePerson(payload) {
    return connection('persons')
      .update(payload)
      .where({ id: payload.id })
      .returning('*');
  }
}

module.exports = PersonsRepository;
