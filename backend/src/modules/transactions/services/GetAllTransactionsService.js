class GetAllTransactionsService {
  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  async execute() {
    return this.transactionsRepository.getAllTransactions()
  }
}

module.exports = GetAllTransactionsService