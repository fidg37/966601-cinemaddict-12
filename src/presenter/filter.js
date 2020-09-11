import FilterView from "../view/filter.js";
import {render, remove} from "../utils/render.js";
import {replace} from "../utils/common.js";
import {UpdateType} from "../constants.js";

export default class Filter {
  constructor(renderPosition, filterModel, filmsModel) {
    this._renderPosition = renderPosition;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handlers = {
      modelEvent: this._modelEventHandler.bind(this),
      filterTypeChange: this._filterTypeChangeHandler.bind(this)
    };

    this._filterModel.addObserver(this._handlers.modelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._filmsModel.getFilms(), this._currentFilter);

    this._filterComponent.setFilterClickHandler(this._handlers.filterTypeChange);

    if (prevFilterComponent === null) {
      render({container: this._renderPosition, child: this._filterComponent});
      return;
    }

    replace(this._filterComponent, prevFilterComponent);

    remove(prevFilterComponent);
  }

  _modelEventHandler() {
    this.init();
  }

  _filterTypeChangeHandler(filterType) {
    if (filterType === this._currentFilter) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
