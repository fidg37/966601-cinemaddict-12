import AbstractView from "./abstract.js";
import {SortType} from "../constants.js";

export default class Sorting extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  _createTemplate() {
    return (`<ul class="sort">
      <li><a href="#" class="sort__button ${this._currentSortType === SortType.DEFAULT ? `sort__button--active` : ``}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button ${this._currentSortType === SortType.BY_DATE ? `sort__button--active` : ``}" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button ${this._currentSortType === SortType.BY_RATING ? `sort__button--active` : ``}" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
    </ul>`);
  }

  getTemplate() {
    return this._createTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A` || evt.target === this._currentSort) {
      return;
    }

    evt.preventDefault();

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;

    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
