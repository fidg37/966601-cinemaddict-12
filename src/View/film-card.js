import AbstractView from "./abstract.js";
import {getRandomInteger} from "../utils/common.js";
import {ButtonType, UpdateType} from "../constants.js";

const MAX_DESCRIPTION_LENGTH = 138;

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();

    this._film = film;

    this._handlers = {
      click: this._clickHandler.bind(this),
      buttonClick: this._buttonClickHandler.bind(this)
    };
  }

  _getDescription(text) {
    if (text.length < MAX_DESCRIPTION_LENGTH) {
      return text;
    }

    return text.slice(0, MAX_DESCRIPTION_LENGTH) + `…`;
  }

  _createTemplate({poster, title, rating, releaseDate, runtime, genres, comments, description, isWatchlist, isHistory, isFavorite}) {
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
      <p class="film-card__description">${this._getDescription(description)}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist ? `film-card__controls-item--active` : ``}" data-type="watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isHistory ? `film-card__controls-item--active` : ``}" data-type="watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}" data-type="favorite">Mark as favorite</button>
      </form>
    </article>`);
  }

  getTemplate() {
    return this._createTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  _buttonClickHandler(evt) {
    if (evt.target.tagName === `BUTTON`) {
      evt.preventDefault();

      evt.target.classList.toggle(`film-card__controls-item--active`);

      switch (evt.target.dataset.type) {
        case ButtonType.WATCHLIST:
          this._film.isWatchlist = !this._film.isWatchlist;
          break;
        case ButtonType.WATCHED:
          this._film.isHistory = !this._film.isHistory;
          break;
        case ButtonType.FAVORITE:
          this._film.isFavorite = !this._film.isFavorite;
          break;
      }

      this._callback.buttonClick(UpdateType.MINOR, this._film);
    }
  }

  setButtonClickHandler(callback) {
    this._callback.buttonClick = callback;

    this.getElement().querySelector(`.film-card__controls`).addEventListener(`click`, this._handlers.buttonClick);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelectorAll(`.film-card__poster, h3, .film-card__comments`)
      .forEach((element) => {
        element.addEventListener(`click`, this._handlers.click);
      })
    ;
  }
}
