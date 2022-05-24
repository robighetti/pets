require('dotenv').config();

const express = require('express');

const routes = require('../infra/routes');

const app = express();

const port = 3333;

app.use(express.json());

app.use(routes);

app.listen(port, () => console.log(`Rodando na porta ${port}`));
