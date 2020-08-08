/*
  Implementando cache
*/
require('dotenv').config();

function cacheResponse(res, seconds){
  if(process.env.NODE_ENV.trim() === 'production'){
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;