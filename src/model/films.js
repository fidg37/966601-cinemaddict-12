import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(films) {
    this._films = [...films];
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
}
