/*
  Middleware de validacion de datos.
*/

// Usando la libreria boom para lanzar errores.
const boom = require('@hapi/boom');

// Usando la libreria de joi para validar datos
const joi = require('@hapi/joi');

function validate(data, schema){
  const {error} = joi.object(schema).validate(data);
  return error;
}

function validacionHandler(schema, check='body'){
  return function(req, res, next){
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  }
}

module.exports = validacionHandler;