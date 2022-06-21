const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const PersonsController = require('../controllers/PersonsController');

const {
  verifyIfEmailAlreadyExists,
} = require('../../middleware/persons.middleware');

const personsRoutes = Router();
const personsController = new PersonsController();

personsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required('Name is required'),
      email: Joi.string().email().required('Email is required'),
      whatsapp: Joi.string().required('Whatsapp is required'),
      cep: Joi.string().required('CEP is required'),
      password: Joi.string().min(6).required('Password is required'),
    },
  }),
  verifyIfEmailAlreadyExists,
  personsController.createPersons
);

personsRoutes.get('/', personsController.getAllPersons);

personsRoutes.put('/', personsController.updatePersons);

personsRoutes.delete('/', personsController.deletePersons);

module.exports = personsRoutes;
