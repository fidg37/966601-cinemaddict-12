import {createElement} from "../util.js";

export default class ExtraBlock {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  createExtraBlockTemplate(films) {
    return (Object.entries(films).map(([filterName]) => {
      return (`<section class="films-list--extra">
      <h2 class="films-list__title">${filterName === `comments` ? `Most commented` : `Top rated`}</h2>
      <div class="films-list__container">
      </div>
      </section>`);
    }).join(``));
  }

  getTemplate() {
    return this.createExtraBlockTemplate(this._films);
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
