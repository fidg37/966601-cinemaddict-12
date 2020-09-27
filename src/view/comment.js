import AbstractView from "./abstract.js";
import {humanizeDate} from "../utils/film.js";
import he from "he";

export default class Comment extends AbstractView {
  constructor(data, api) {
    super();

    this._data = data;
    this._api = api;

    this._handlers = {
      deleteButtonClick: this._deleteButtonClickHandler.bind(this),
      animationEnd: this._animationEndHandler.bind(this)
    };
  }

  getTemplate() {
    return this._createTemplate(this._data);
  }

  lockComment() {
    this._deleteButton.setAttribute(`disabled`, ``);
    this._deleteButton.innerHTML = `Deleting`;
  }

  unlockComment() {
    this.getElement().classList.add(`shake`);
    this.getElement().addEventListener(`animationend`, this._handlers.animationEnd);
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.delete = callback;

    this._deleteButton = this.getElement().querySelector(`.film-details__comment-delete`);

    this._deleteButton.addEventListener(`click`, this._handlers.deleteButtonClick);
  }

  _createTemplate({author, date, comment, emotion}) {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanizeDate(date, false)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }

  _animationEndHandler() {
    this.getElement().classList.remove(`shake`);
    this._deleteButton.removeAttribute(`disabled`);
    this._deleteButton.innerHTML = `Delete`;
    this.getElement().removeEventListener(`animationend`, this._handlers.animationEnd);
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.delete(this._data);
  }
}
