import {createElement} from "../util.js";

export default class FooterStats {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  _createTemplate(films) {
    return (`<section class="footer__statistics">
      <p>${films.length} movies inside</p>
    </section>`);
  }

  getTemplate() {
    return this._createTemplate(this._films);
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
