/*
  Trabajando con mongoDB
*/
const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

/*
  EncodeURIComponent lo que hace es manejar los caracteres
  especiales de una cadena o url.
*/
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

/*
  Conexion a la base de datos mongo
*/
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:/${DB_NAME}?retryrites=true&w=majority`;

/*
  Usar la libreria de mongo
*/
class MongoLib {
  constructor(){
    this.client = new MongoClient(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology: true});
    this.dbName = DB_NAME;
  }

  connect(){
    if(!MongoLib.connection){
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(error => {
          if(error){
            reject(error);
          }
          console.log('Conexion exitosa a mongoDB');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  /*
    Acciones CRUD
  */
  getAll(collection, query){
    return this.connect()
      .then(db => {
        return db.collection(collection).find(query).toArray();
      });
  }

  get(collection, id){
    return this.connect()
      .then(db => {
        return db.collection(collection).findOne({_id: ObjectId(id)});
      });
  }

  create(collection, data){
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data){
    return this.connect()
      .then(db => {
        return db.collection(collection).updateOne({_id: ObjectId(id)}, {$set: data}, {upsert: true});
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id){
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({_id: ObjectId(id)});
      })
      .then(() => id);
  }
}

module.exports = MongoLib;