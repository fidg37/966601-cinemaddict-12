import AbstractView from "./abstract.js";
import {getRuntime} from "../utils/film.js";
import {ButtonType, FilterType} from "../constants.js";
import {getUpdateType} from "../utils/film.js";

const MAX_DESCRIPTION_LENGTH = 138;

export default class FilmCard extends AbstractView {
  constructor(film, currentFilter) {
    super();

    this._film = film;
    this._currentFilter = currentFilter;

    this._handlers = {
      click: this._clickHandler.bind(this),
      buttonClick: this._buttonClickHandler.bind(this)
    };
  }

  getTemplate() {
    return this._createTemplate(this._film);
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

  _getDescription(text) {
    if (text.length < MAX_DESCRIPTION_LENGTH) {
      return text;
    }

    return text.slice(0, MAX_DESCRIPTION_LENGTH) + `…`;
  }

  _createTemplate(film) {
    const {poster, title, totalRating, release, runtime, genre, description} = film.filmInfo;
    const {comments} = film;
    const {watchlist, alreadyWatched, favorite} = film.userDetails;
    const {date} = release;
    const currentGenre = genre[0];
    const currentDate = date.toLocaleDateString(`en`, {year: `numeric`});
    const commentsCount = comments === null ? 0 : comments.length;

    return (`<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${currentDate}</span>
        <span class="film-card__duration">${getRuntime({time: runtime})}</span>
        <span class="film-card__genre">${currentGenre}</span>
      </p>
      <img src="${poster}" alt="${title} poster" class="film-card__poster">
      <p class="film-card__description">${this._getDescription(description)}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}" data-type="watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : ``}" data-type="watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}" data-type="favorite">Mark as favorite</button>
      </form>
    </article>`);
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
          this._film.userDetails.watchlist = !this._film.userDetails.watchlist;
          this._filterType = FilterType.WATCHLIST;
          break;
        case ButtonType.WATCHED:
          this._film.userDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
          this._film.userDetails.watchingDate = new Date();
          this._filterType = FilterType.HISTORY;
          break;
        case ButtonType.FAVORITE:
          this._film.userDetails.favorite = !this._film.userDetails.favorite;
          this._filterType = FilterType.FAVORITES;
          break;
      }

      const updateType = getUpdateType({currentFilter: this._currentFilter, filterType: this._filterType});

      this._callback.buttonClick(updateType, this._film);
    }
  }
}
