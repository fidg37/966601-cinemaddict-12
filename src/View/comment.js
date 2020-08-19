import AbstractView from "./abstract.js";
import {humanizeDate} from "../utils/film.js";

export default class Comments extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
  }

  _createTemplate({comments}) {
    if (comments === null) {
      return ``;
    }

    return comments.map(({author, date, text, emotion}) => (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanizeDate(date, false)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    )).join(``);
  }

  getTemplate() {
    return this._createTemplate(this._film);
  }
}
