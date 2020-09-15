import AbstractView from "./abstract.js";
import {filter} from "../utils/filter.js";
import {FilterType, SiteElements} from "../constants.js";

const MAX_VISIBLE_FILTER_VALUE = 5;

export default class Filter extends AbstractView {
  constructor(films, currentFilter) {
    super();

    this._films = films;
    this._currentFilter = currentFilter;

    this._handlers = {
      stastClick: this._statsClickHandler.bind(this),
      filterClick: this._filterClickHandler.bind(this)
    };
  }

  _createItems(films) {
    return Object.keys(filter).map((name) => {
      const filmsCount = filter[name](films).length;

      return `
      <a href="#${name}" value="${name}" class="main-navigation__item ${this._currentFilter === name ? `main-navigation__item--active` : ``}">
        ${this._createName(name)}
        ${filmsCount <= MAX_VISIBLE_FILTER_VALUE ? `<span class="main-navigation__item-count">${filmsCount}</span>` : ``}
      </a>`;
    }).join(``);
  }

  _createName(name) {
    return name.split(``).map((letter, index) => (index === 0 ? letter.toUpperCase() : letter)).join(``);
  }

  _createTemplate(films) {
    return (`<nav class="main-navigation">
      <div class="main-navigation__items">
        ${this._createItems(films)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`);
  }

  getTemplate() {
    return this._createTemplate(this._films);
  }

  _statsClickHandler(evt) {
    evt.preventDefault();

    if (SiteElements.MAIN.classList.contains(`stats--active`)) {
      SiteElements.MAIN.classList.toggle(`stats--active`);

      this._callback.stats.remove();
      this._callback.filterClick(FilterType.ALL);
    } else {
      SiteElements.MAIN.classList.toggle(`stats--active`);

      this._callback.stats.render();
      this._callback.filterClick(FilterType.ALL);
    }
  }

  setStatsClickHandler(callback) {
    this._callback.stats = callback;

    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._handlers.stastClick);
  }

  _filterClickHandler(evt) {
    if (evt.target.tagName === `A`) {
      evt.preventDefault();

      if (SiteElements.MAIN.classList.contains(`stats--active`)) {
        SiteElements.MAIN.classList.toggle(`stats--active`);

        this._callback.stats.remove();
      }

      this._callback.filterClick(evt.target.attributes.value.nodeValue);
    }
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;

    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._handlers.filterClick);
  }
}
