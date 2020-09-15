import AbstractView from "./abstract.js";
import FilmInfoView from "./film-info.js";
import PopupControlView from "./popup-control.js";
import {Keycodes, ButtonType, UpdateType} from "../constants.js";
import uniqueId from "lodash.uniqueid";

const IMG_SIZE = 50;

export default class DetailsPopup extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._prevInput = null;

    this._emptyComment = {
      id: uniqueId(),
      comment: null,
      emotion: null,
      author: `John Doe`,
      date: null,
    };

    this._handlers = {
      click: this._clickHandler.bind(this),
      keydown: this._keydownHandler.bind(this),
      controllsClick: this._controllsClickHandler.bind(this),
      emojiClick: this._emojiClickHandler.bind(this),
      newCommentInput: this._newCommentInputHandler.bind(this),
      submitComment: this._submitCommentHandler.bind(this)
    };
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
  
            <ul class="film-details__comments-list"></ul>
  
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
              </div>
  
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
  
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" data-value="smile" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" data-value="sleeping" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" data-value="puke" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" data-value="angry" for="emoji-angry">
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

    this._callback.click(UpdateType.MINOR, this._film);
  }

  _keydownHandler(evt) {
    if (evt.keyCode === Keycodes.ESC) {
      evt.preventDefault();

      this._callback.keydown(UpdateType.MINOR, this._film);
    }
  }

  _controllsClickHandler(evt) {
    if (evt.target.tagName === `INPUT`) {
      switch (evt.target.name) {
        case ButtonType.WATCHLIST:
          this._film.userDetails.watchlist = !this._film.userDetails.watchlist;
          break;
        case ButtonType.WATCHED:
          this._film.userDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
          this._film.userDetails.watchingDate = new Date();
          break;
        case ButtonType.FAVORITE:
          this._film.userDetails.favorite = !this._film.userDetails.favorite;
          break;
      }
    }
  }

  _emojiClickHandler(evt) {
    if (evt.target.tagName === `IMG`) {
      this._emptyComment.emotion = evt.target.parentNode.dataset.value;

      const img = evt.target.parentNode.innerHTML;
      const imgContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

      imgContainer.innerHTML = img;
      imgContainer.querySelector(`img`).width = IMG_SIZE;
      imgContainer.querySelector(`img`).height = IMG_SIZE;

      if (this._prevInput) {
        this._prevInput.removeAttribute(`checked`);
      }

      this._prevInput = evt.target.parentNode;
      evt.target.parentNode.setAttribute(`checked`, ``);
    }
  }

  _newCommentInputHandler(evt) {
    evt.preventDefault();

    this._emptyComment.comment = evt.target.value;
  }

  _submitCommentHandler(evt) {
    if (evt.ctrlKey && evt.keyCode === Keycodes.ENTER) {
      evt.preventDefault();

      this._emptyComment.date = new Date();

      this._film.comments.push(this._emptyComment);

      this._callback.commentSubmit(this._film);
    }
  }

  setSubmitCommentHandler(callback) {
    this._callback.commentSubmit = callback;

    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._handlers.submitComment);
  }

  setNewCommentInputHandler() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._handlers.newCommentInput);
  }

  setEmojiClickHandler() {
    this.getElement().querySelector(`.film-details__new-comment`).addEventListener(`click`, this._handlers.emojiClick);
  }

  setControllsClickHandler(callback) {
    this._callback.controlClick = callback;

    this.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, this._handlers.controllsClick);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._handlers.click);
  }

  setKeydownHandler(callback) {
    this._callback.keydown = callback;

    document.addEventListener(`keydown`, this._handlers.keydown);
  }

  removeClickHandler() {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._handlers.click);
  }

  removeKeydownHandler() {
    document.removeEventListener(`keydown`, this._handlers.keydown);
  }
}
