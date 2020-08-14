import {createElement} from "../util.js";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  _createFilters(filters) {
    return filters.map(({name, count}) => {
      return `<a href="#${name}" class="main-navigation__item">${this._createFilterName(name)}<span class="main-navigation__item-count">${count}</span></a>`;
    }).join(``);
  }

  _createFilterName(name) {
    return name.split(``).map((letter, index) => (index === 0 ? letter.toUpperCase() : letter)).join(``);
  }

  _createFilterTemplate(filters) {
    return (`<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${this._createFilters(filters.filtersCount)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`);
  }

  getTemplate() {
    return this._createFilterTemplate(this._filters);
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
