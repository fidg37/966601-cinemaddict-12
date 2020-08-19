import AbstractView from "./abstract.js";

export default class LoadButton extends AbstractView {
  _createTemplate() {
    return (`<button class="films-list__show-more">Show more</button>`);
  }

  getTemplate() {
    return this._createTemplate();
  }
}
