import {createElement} from "../util.js";

export default class Sorting {
  constructor() {
    this._element = null;
  }

  createSortTemplate() {
    return (`<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`);
  }

  getTemplate() {
    return this.createSortTemplate();
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
