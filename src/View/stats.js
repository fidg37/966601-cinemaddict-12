import AbstractView from "./abstract.js";
import {getRuntime} from "../utils/film.js";
import {getGenres, getCountWatchedFilmsByGenre, getTopGenre, renderColorsChart, StatsFilterType, getTotalRuntime} from "../utils/statistics.js";

const BAR_HEIGHT = 50;

export default class Stats extends AbstractView {
  constructor(films, currentFilter, currentRank) {
    super();

    this._films = films;
    this._currentFilter = currentFilter;
    this._currentRank = currentRank;

    this._genres = getGenres(this._films);
    this._counts = getCountWatchedFilmsByGenre(this._films, this._genres);
    this._topGenre = getTopGenre(this._genres, this._counts);

    this._handlers = {
      filterClick: this._filterClickHandler.bind(this)
    };
  }

  _createTemplate() {
    const totalTime = getTotalRuntime(this._films);

    return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${this._currentRank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="day" ${this._currentFilter === StatsFilterType.TODAY ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this._currentFilter === StatsFilterType.WEEK ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this._currentFilter === StatsFilterType.MONTH ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this._currentFilter === StatsFilterType.YEAR ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getRuntime({time: totalTime, onlyHours: true})} <span class="statistic__item-description">h</span> ${getRuntime({time: totalTime, onlyMinutes: true})} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${this._topGenre ? this._topGenre : ``}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
    );
  }

  _filterClickHandler(evt) {
    if (evt.target.tagName === `INPUT`) {
      evt.preventDefault();

      this._callback.filterClick(evt.target.value);
    }
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;

    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, this._handlers.filterClick);
  }

  getTemplate() {
    return this._createTemplate();
  }

  renderChart() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    const genres = getGenres(this._films);
    const counts = getCountWatchedFilmsByGenre(this._films, genres);

    statisticCtx.height = BAR_HEIGHT * genres.length;

    renderColorsChart(statisticCtx, genres, counts);
  }

}
