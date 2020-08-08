/*
  Usando la libreria boom para lanzar errores 404
*/
const boom = require('@hapi/boom');

function notFoundHandler(req, res){
  const { output: {statusCode, payload}} = boom.notFound();
  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;