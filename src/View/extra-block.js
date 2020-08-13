import {createElement} from "../util.js";

export default class ExtraBlock {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  _createExtraBlockTemplate(films) {
    return (Object.entries(films).map(([filterName]) => {
      return (`<section class="films-list--extra">
      <h2 class="films-list__title">${filterName === `comments` ? `Most commented` : `Top rated`}</h2>
      <div class="films-list__container">
      </div>
      </section>`);
    }).join(``));
  }

  getTemplate() {
    return this._createExtraBlockTemplate(this._films);
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
