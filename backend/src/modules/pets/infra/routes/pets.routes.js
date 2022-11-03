const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const PetsController = require('../controllers/PetsController');

const petsRoutes = Router();
const petsController = new PetsController();

petsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required('Name is required'),
      age: Joi.number().required('Age is required'),
      race: Joi.string().required('Race is required'),
      port: Joi.string().required('Port is required'),
      castrated: Joi.boolean(),
      type: Joi.string().required('Type is required'),
    },
  }),
  petsController.createPets
);

petsRoutes.put('/:id', petsController.updatePets);

petsRoutes.delete('/:id', petsController.deletePets);

petsRoutes.get('/', petsController.getAllPets);

petsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required('ID is require'),
    },
  }),
  petsController.getOnePet
);

module.exports = petsRoutes;
