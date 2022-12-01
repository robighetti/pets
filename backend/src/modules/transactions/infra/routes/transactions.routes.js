const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const TransactionsController = require('../controllers/TransactionsController');

const transactionsRoutes = Router();
const transactionsController = new TransactionsController();

transactionsRoutes.post('/adoption',
  celebrate({
    [Segments.BODY]: {
      pet_id: Joi.number().required("Pet ID is required")
    }
  })
  , transactionsController.createAdoption);


transactionsRoutes.get('/', transactionsController.getAllTransactions)

module.exports = transactionsRoutes;
