import Observer from "../utils/observer.js";
import {FilterType} from "../constants.js";

export default class Filter extends Observer {
  constructor() {
    super();

    this._currentFilter = FilterType.ALL;
  }

  setFilter(updateType, filterType) {
    this._currentFilter = filterType;

    this._notify(updateType, filterType);
  }

  getFilter() {
    return this._currentFilter;
  }
}
