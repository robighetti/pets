const { Router } = require('express');
const multer = require('multer');

const { celebrate, Segments, Joi } = require('celebrate');

const PersonsController = require('../controllers/PersonsController');

const {
  verifyIfEmailAlreadyExists,
} = require('../../middleware/persons.middleware');

const ensureAuthenticated = require('../../middleware/ensure.authenticated');

const uploadConfig = require('../../../../config/upload');

const upload = multer(uploadConfig);

const personsRoutes = Router();
const personsController = new PersonsController();

personsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required('Name is required'),
      email: Joi.string().email().required('Email is required'),
      whatsapp: Joi.string().required('Whatsapp is required'),
      password: Joi.string().min(6).required('Password is required'),
    },
  }),
  verifyIfEmailAlreadyExists,
  personsController.createPersons
);

personsRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  personsController.updatePersonAvatar
);

module.exports = personsRoutes;
