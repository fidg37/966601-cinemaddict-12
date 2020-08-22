import AbstractView from "./abstract.js";
import {SortType} from "../constants.js";

export default class Sorting extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  _createTemplate() {
    return (`<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
    </ul>`);
  }

  getTemplate() {
    return this._createTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    evt.target.classList.add(`sort__button--active`);

    this._currentSort.classList.remove(`sort__button--active`);
    this._currentSort = evt.target;

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this._currentSort = this.getElement().querySelector(`a:first-child`);

    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
