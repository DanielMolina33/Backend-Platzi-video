/*
  CLEAN ARCHITECTURE

  CONTROLADORES SERVICIOS LIBRERIAS

  Trabajando en la capa de servicios, es la que se encarga de manejar
  la logica es el "corazon de la app"
*/
// const { moviesMock } = require('../utils/mocks/movies');
const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor(){
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  async getMovies({tags}){
    const query = tags && {tags: {$in: tags}};
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie({movieId}){
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }

  async createMovie({movie}){
    const createMovieId = await this.mongoDB.create(this.collection, movie);
    return createMovieId;
  }

  async updateMovie({movieId, movie} = {}){
    const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
    return updatedMovieId;
  }

  // Challenge method
  async updateSingleMovie(){
    const updateSingleMovie = await Promise.resolve(moviesMock[0].id);
    return updateSingleMovie;
  }

  async deleteMovie({movieId}){
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }
}

module.exports = MoviesService;