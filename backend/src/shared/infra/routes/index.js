const { Router } = require('express');

const personsRoutes = require('../../../modules/persons/infra/routes/persons.routes');
const sessionsRoutes = require('../../../modules/persons/infra/routes/sessions.routes');
const forgotRoutes = require('../../../modules/persons/infra/routes/forgot.routes');

const routes = Router();

routes.use('/persons', personsRoutes);

routes.use('/login', sessionsRoutes);

routes.use('/forgot', forgotRoutes);

//routes.use('/pets');

//routes.use('/transactions');

module.exports = routes;
