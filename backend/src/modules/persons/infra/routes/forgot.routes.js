const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const PersonsController = require('../controllers/PersonsController');

const forgotRoutes = Router();
const personsController = new PersonsController();

forgotRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required('Email is required'),
    },
  }),
  personsController.forgotPassword
);

module.exports = forgotRoutes;
