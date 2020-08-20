import AbstractView from "./abstract.js";

export default class Filter extends AbstractView {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  _createItems(filters) {
    return filters.map(({name, count}) => {
      return `<a href="#${name}" class="main-navigation__item">${this._createName(name)} <span class="main-navigation__item-count">${count}</span></a>`;
    }).join(``);
  }

  _createName(name) {
    return name.split(``).map((letter, index) => (index === 0 ? letter.toUpperCase() : letter)).join(``);
  }

  _createTemplate(filters) {
    return (`<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${this._createItems(filters.filtersCount)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`);
  }

  getTemplate() {
    return this._createTemplate(this._filters);
  }
}
