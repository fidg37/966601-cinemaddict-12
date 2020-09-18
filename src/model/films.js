import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = [...films];

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, newData) {
    const index = this._films.findIndex((film) => film.id === newData.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting element`);
    }

    this._films = [
      ...this._films.slice(0, index),
      newData,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, newData);
  }


  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          filmInfo: {
            actors: film.film_info.actors,
            ageRating: film.film_info.age_rating,
            alternativeTitle: film.film_info.alternative_title,
            description: film.film_info.description,
            director: film.film_info.director,
            genre: film.film_info.genre,
            poster: film.film_info.poster,
            release: {
              date: new Date(film.film_info.release.date),
              releaseCountry: film.film_info.release.release_country
            },
            runtime: film.film_info.runtime,
            title: film.film_info.title,
            totalRating: film.film_info.total_rating,
            writers: film.film_info.writers
          },
          userDetails: {
            alreadyWatched: film.user_details.already_watched,
            favorite: film.user_details.favorite,
            watchingDate: new Date(film.user_details.watching_date),
            watchlist: film.user_details.watchlist
          }
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }
}
