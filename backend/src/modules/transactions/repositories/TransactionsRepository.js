const connection = require('../../../shared/database/connection');

class TransactionsRepository {
  async saveAdoption(payload) {
    return connection.transaction(async trx => {
      await trx('transactions').insert(payload),
        await trx('pets').update({ status: true }).where({
          id: payload.pet_id
        })
    })
  }
}

module.exports = TransactionsRepository;