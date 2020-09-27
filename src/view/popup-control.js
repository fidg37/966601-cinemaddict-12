import AbstractView from "./abstract.js";

export default class PopupControl extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return this._createTemplate(this._film);
  }

  _createTemplate(film) {
    const {watchlist, alreadyWatched, favorite} = film.userDetails;

    return (`<section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`);
  }
}
