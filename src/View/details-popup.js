import AbstractView from "./abstract.js";
import FilmInfoView from "./film-info.js";
import PopupControlView from "./popup-control.js";
import CommentsView from "./comment.js";
import {Keycodes, ButtonType} from "../constants.js";

export default class DetailsPopup extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
    this._controllsClickHandler = this._controllsClickHandler.bind(this);
  }

  _createTemplate(film) {
    return (
      `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${new FilmInfoView(film).getTemplate()}
          ${new PopupControlView(film).getTemplate()}
        </div>
  
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments !== null ? film.comments.length : `0`}</span></h3>
  
            <ul class="film-details__comments-list">${new CommentsView(film).getTemplate()}</ul>
  
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
  
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
  
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
    );
  }

  getTemplate() {
    return this._createTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click(this._film);
  }

  _keydownHandler(evt) {
    if (evt.keyCode === Keycodes.ESC) {
      evt.preventDefault();

      this._callback.keydown(this._film);
    }
  }

  _controllsClickHandler(evt) {
    if (evt.target.tagName === `INPUT`) {
      switch (evt.target.name) {
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
    }
  }

  setControllsClickHandler(callback) {
    this._callback.controlClick = callback;

    this.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, this._controllsClickHandler);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setKeydownHandler(callback) {
    this._callback.keydown = callback;

    document.addEventListener(`keydown`, this._keydownHandler);
  }

  removeClickHandler() {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._clickHandler);
  }

  removeKeydownHandler() {
    document.removeEventListener(`keydown`, this._keydownHandler);
  }
}
