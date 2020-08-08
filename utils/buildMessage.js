/*
  Trabajando con TDD, primero crear test y luego la logica de la app
*/

function buildMessage(entity, action){
  if(action === 'list'){
    return `${entity}s ${action}ed`;
  }

  return `${entity} ${action}d`;
}

module.exports = buildMessage;