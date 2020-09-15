import {IterationCount, SiteElements} from "./constants.js";
import {remove, render} from "./utils/render.js";
import {createFilmInfo} from "./mock/film.js";
import UserRankView from "./view/user-rank.js";
import FooterStatsView from "./view/footer-stats.js";
import MovieList from "./presenter/movieList.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import StatsView from "./view/stats.js";

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

render({container: SiteElements.HEADER, child: new UserRankView()});
render({container: SiteElements.FOOTER, child: new FooterStatsView(films)});

const statsComponent = new StatsView();

const renderStats = () => {
  movieListPresenter._clearFilmBoard();

  render({container: SiteElements.MAIN, child: statsComponent});
};

const removeStats = () => {
  remove(statsComponent);
  filterPresenter.init();
  movieListPresenter.init();
};

const statsHandlers = {
  render: renderStats,
  remove: removeStats
};

const filterPresenter = new FilterPresenter(SiteElements.MAIN, filterModel, filmsModel, statsHandlers);
filterPresenter.init();

const movieListPresenter = new MovieList(filterModel, filmsModel);
movieListPresenter.init();
