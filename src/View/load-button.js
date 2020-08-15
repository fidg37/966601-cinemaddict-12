import {createElement} from "../util.js";

export default class LoadButton {
  constructor() {
    this._element = null;
  }

  _createLoadButtonTemplate() {
    return (`<button class="films-list__show-more">Show more</button>`);
  }

  getTemplate() {
    return this._createLoadButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
