import AbstractView from "./abstract.js";

export default class NoFilms extends AbstractView {
  _createTemplate() {
    return (
      `<h2 class="films-list__title">There are no movies in our database</h2>`
    );
  }

  getTemplate() {
    return this._createTemplate();
  }
}
