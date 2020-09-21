import AbstractView from "./abstract.js";
import {humanizeDate} from "../utils/film.js";
import he from "he";

export default class Comment extends AbstractView {
  constructor(data, api) {
    super();

    this._data = data;
    this._api = api;

    this._handlers = {
      deleteButtonClick: this._deleteButtonClickHandler.bind(this)
    };
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

  getTemplate() {
    return this._createTemplate(this._data);
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();
    // переменная для блокировки формы
    const commentsForm = this.getElement().parentNode.parentNode;

    this._callback.delete(this._data);
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.delete = callback;

    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._handlers.deleteButtonClick);
  }
}
