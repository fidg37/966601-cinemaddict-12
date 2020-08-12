import {getRandomInteger} from "../util.js";
import {createElement} from "../util.js";

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
    this._MAX_DESCRIPTION_LENGTH = 138;
  }

  getDescription(text) {
    if (text.length < this._MAX_DESCRIPTION_LENGTH) {
      return text;
    }

    return text.slice(0, this._MAX_DESCRIPTION_LENGTH) + `…`;
  }

  createFilmCardTemplate(film) {
    const {poster, title, rating, releaseDate, runtime, genres, comments, description} = film;
    const {hours, minutes} = runtime;
    const genre = genres.length > 1 ? genres[getRandomInteger({a: 0, b: genres.length - 1})] : genres[0];
    const date = releaseDate.toLocaleDateString(`en`, {year: `numeric`});
    const commentsCount = comments === null ? 0 : comments.length;

    return (`<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${hours}h ${minutes}m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title} poster" class="film-card__poster">
      <p class="film-card__description">${this.getDescription(description)}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`);
  }

  getTemplate() {
    return this.createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      return createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
