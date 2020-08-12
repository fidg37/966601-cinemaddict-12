import {createElement} from "../util.js";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  createFilters(filters) {
    return ([...filters].map(({name, count}) => {
      return `<a href="#${name}" class="main-navigation__item">${this.createFilterName(name)}<span class="main-navigation__item-count">${count}</span></a>`;
    }).join(``));
  }

  createFilterName(name) {
    return name.split(``).map((letter, index) => (index === 0 ? letter.toUpperCase() : letter)).join(``);
  }

  createFilterTemplate(filters) {
    return (`<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${this.createFilters(filters.filtersCount)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`);
  }

  getTemplate() {
    return this.createFilterTemplate(this._filters);
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
