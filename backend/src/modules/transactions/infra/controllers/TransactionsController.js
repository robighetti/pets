const CreateAdoptionService = require('../../services/CreateAdoptionService');
const GetAllTransactionsService = require('../../services/GetAllTransactionsService')

const PetsRepository = require('../../../pets/repositories/PetsRepository');
const TransactionsRepository = require('../../repositories/TransactionsRepository');

const petsRepository = new PetsRepository();
const transactionsRepository = new TransactionsRepository();

class TransactionsController {
  async createAdoption(request, response) {
    const { pet_id } = request.body;
    const { id } = request.person;

    const payload = {
      pet_id,
      person_id_adoption: id
    }

    const createAdoption = new CreateAdoptionService(petsRepository, transactionsRepository);

    const adoption = await createAdoption.execute(payload);

    return response.json(adoption)
  }

  async getAllTransactions(_, response) {
    const getAll = new GetAllTransactionsService(transactionsRepository)

    const transactions = await getAll.execute()

    return response.json(transactions)
  }
}

module.exports = TransactionsController;