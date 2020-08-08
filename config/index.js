require('dotenv').config();

/*
  Configurando variables de entorno, es muy recomentable no
  hardcodear el puerto sino establecerlo por medio de una variable
  de entorno
*/
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME
}

module.exports = { config };