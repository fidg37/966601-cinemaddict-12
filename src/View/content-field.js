import {createElement} from "../util.js";

export default class ContentField {
  constructor() {
    this._element = null;
  }

  _createTemplate() {
    return (`<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`);
  }

  getTemplate() {
    return this._createTemplate();
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
