require('dotenv').config();

const express = require('express');

const routes = require('../infra/routes');

const app = express();

const port = 3333;

app.use(express.json());

app.use(routes);

app.use((request, response, next) => {
  const error = new Error('Not found');

  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      statusCode: error.status,
      message: error.message,
    },
  });
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
