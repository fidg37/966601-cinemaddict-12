import AbstractView from "./abstract.js";

export default class FooterStats extends AbstractView {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return this._createTemplate(this._films);
  }

  setFilmsCount(filmsCount) {
    this.getElement().querySelector(`p`).innerHTML = `${filmsCount} movies inside`;
  }

  _createTemplate(films) {
    return (`<section class="footer__statistics">
      <p>${films.length} movies inside</p>
    </section>`);
  }
}
