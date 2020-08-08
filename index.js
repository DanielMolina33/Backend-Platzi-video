/*
  Crear un servidor con express
*/
const express = require('express');
const app = express();
const moviesApi = require('./routes/movies');
const { config } = require('./config/index');
const { logErrores, errorHandler, wrapError } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());

moviesApi(app);
/*
  Middleware En caso de error 404
*/
app.use(notFoundHandler);

/*
  Los middlewares de errores siempre deben ir despues de las
  rutas, que tambien son middlewares.
*/
app.use(logErrores);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('Servidor escuchando en la url http://localhost:' + config.port);
});