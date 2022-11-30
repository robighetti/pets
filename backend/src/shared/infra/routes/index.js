const { Router } = require('express');

const personsRoutes = require('../../../modules/persons/infra/routes/persons.routes');
const sessionsRoutes = require('../../../modules/persons/infra/routes/sessions.routes');
const forgotRoutes = require('../../../modules/persons/infra/routes/forgot.routes');
const resetPasswordRoutes = require('../../../modules/persons/infra/routes/resetPassword.routes');
const petsRoutes = require('../../../modules/pets/infra/routes/pets.routes');
const transactionsRoutes = require('../../../modules/transactions/infra/routes/transactions.routes');

const ensureAuthenticated = require('../../../modules/persons/middleware/ensure.authenticated');

const routes = Router();

routes.use('/persons', personsRoutes);

routes.use('/login', sessionsRoutes);

routes.use('/forgot', forgotRoutes);

routes.use('/reset-password', resetPasswordRoutes);

routes.use(ensureAuthenticated);

routes.use('/pets', petsRoutes);

routes.use('/transactions', transactionsRoutes);

module.exports = routes;
