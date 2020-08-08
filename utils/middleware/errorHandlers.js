/*
  Trabajando con Middlewares, Express identifica los middlewares de error con los
  cuatro parametros, error, req, res y next.
  el stack es toda la información relacionada al error.
  Express por defecto imprime los errores en formato HTML, pero cuando estamos
  implementando una API es necesario imprimirlos en formato JSON.

  Usando la libreria boom para manejo de errores.
*/
const boom = require('@hapi/boom');
const { config } = require('../../config/index');

function withErrorStack(error, stack){
  if(config.dev){
    return {...error, stack};
  }

  return error;
}

function logErrores(error, req, res, next){
  console.log(error);
  next(error);
}

function wrapError(error, req, res, next){
  if(!error.isBoom){
    next(boom.badImplementation(error));
  }

  next(error);
}

function errorHandler(error, req, res, next){
  const { output: {statusCode, payload} } = error;
  res.status(statusCode);
  res.json(withErrorStack(payload, error.stack));
}

module.exports = {
  logErrores,
  wrapError,
  errorHandler,
}