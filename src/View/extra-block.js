import AbstractView from "./abstract.js";

export default class ExtraBlock extends AbstractView {
  constructor(films) {
    super();

    this._films = films;
  }

  _createTemplate(films) {
    return (Object.entries(films).map(([filterName]) => {
      return (`<section class="films-list--extra">
      <h2 class="films-list__title">${filterName === `comments` ? `Most commented` : `Top rated`}</h2>
      <div class="films-list__container">
      </div>
      </section>`);
    }).join(``));
  }

  getTemplate() {
    return this._createTemplate(this._films);
  }
}
