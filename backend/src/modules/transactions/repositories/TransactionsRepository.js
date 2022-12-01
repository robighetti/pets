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

  async getAllTransactions() {
    return connection('transactions')
      .select(
        'transactions.id as transaction_id',
        'transactions.created_at as transaction_date',
        'pets.id as pet_id',
        'pets.name as pet_name',
        'pets.age as pet_age',
        'pets.race as pet_race',
        'pets.castrated as pet_castrated',
        'pets.port as pet_port',
        'pets.type as pet_type',
        'pets.picture as pet_picture',
        'persons_donate.name as donate_name',
        'persons_adoption.name as adoption_name'
      )
      .join('pets', 'pets.id', 'transactions.pet_id')
      .join('persons as persons_donate', 'persons_donate.id', 'transactions.person_id_donation')
      .join('persons as persons_adoption', 'persons_adoption.id', 'transactions.person_id_adoption')
  }
}

module.exports = TransactionsRepository;