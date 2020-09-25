import AbstractView from "./abstract.js";

export default class ExtraBlock extends AbstractView {
  constructor(extraName) {
    super();

    this._extraName = extraName;
  }

  _createTemplate(extraName) {
    return (`<section class="films-list--extra">
    <h2 class="films-list__title">${extraName === `comments` ? `Most commented` : `Top rated`}</h2>
    <div class="films-list__container">
    </div>
    </section>`);
  }

  getTemplate() {
    return this._createTemplate(this._extraName);
  }
}
