import {createElement} from "../util.js";

export default class LoadButton {
  constructor() {
    this._element = null;
  }

  createLoadButtonTemplate() {
    return (`<button class="films-list__show-more">Show more</button>`);
  }

  getTemplate() {
    return this.createLoadButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      return createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
