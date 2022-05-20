const { Router } = require('express');

const PersonsController = require('../controllers/PersonsController');

const personsRoutes = Router();
const personsController = new PersonsController();

personsRoutes.get('/', personsController.getAllPersons);

personsRoutes.post('/', personsController.createPersons);

personsRoutes.put('/', personsController.updatePersons);

personsRoutes.delete('/', personsController.deletePersons);

module.exports = personsRoutes;
