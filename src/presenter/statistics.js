import StatsView from "../view/stats.js";
import {render, remove} from "../utils/render.js";
import {replace} from "../utils/common.js";
import {StatsFilterType, getWatchedFilms, getFilteredFilms} from "../utils/statistics.js";

export default class Statistics {
  constructor(container, filmsModel) {
    this._filmsModel = filmsModel;
    this._container = container;

    this._statsComponent = null;

    this._handlers = {
      viewAction: this._viewActionHandler.bind(this)
    };
  }

  init(filterType = StatsFilterType.ALL) {
    const watchedFilms = getWatchedFilms(this._filmsModel.getFilms());
    const filteredFilms = getFilteredFilms(watchedFilms, filterType);
    const prevStatsComponent = this._statsComponent;

    this._statsComponent = new StatsView(filteredFilms, filterType);
    this._statsComponent.setFilterClickHandler(this._handlers.viewAction);

    if (!prevStatsComponent) {
      render({container: this._container, child: this._statsComponent});
      this._statsComponent.renderChart();
      return;
    }

    replace(this._statsComponent, prevStatsComponent);
    this._statsComponent.renderChart();
  }

  _viewActionHandler(filterType) {
    this.init(filterType);
  }

  destroy() {
    remove(this._statsComponent);
    this._statsComponent = null;
  }

}
