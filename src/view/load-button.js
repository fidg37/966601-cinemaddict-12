import AbstractView from "./abstract.js";

export default class LoadButton extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return this._createTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  removeClickHandler() {
    this.getElement().removeEventListener(`click`, this._clickHandler);
  }

  _createTemplate() {
    return (`<button class="films-list__show-more">Show more</button>`);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }
}
