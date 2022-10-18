const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const PersonsController = require('../controllers/PersonsController');

const resetPasswordRoutes = Router();
const personsController = new PersonsController();

resetPasswordRoutes.patch(
  '/:token',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().min(6).required('Password is required'),
    },
    [Segments.PARAMS]: {
      token: Joi.string().min(6).required('Token is required'),
    },
  }),
  personsController.resetPassword
);

module.exports = resetPasswordRoutes;
