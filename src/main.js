import {IterationCount, SiteElements} from "./constants.js";
import {render} from "./utils/render.js";
import {createFilmInfo} from "./mock/film.js";
import UserRankView from "./view/user-rank.js";
import FooterStatsView from "./view/footer-stats.js";
import MovieList from "./presenter/movieList.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsPresenter from "./presenter/statistics.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic akfgIIO558#asfmWff9`;
const EDN_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
const api = new Api(EDN_POINT, AUTHORIZATION);

api.getFilms().then((array) => {
  console.log(array);
});

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

render({container: SiteElements.HEADER, child: new UserRankView()});
render({container: SiteElements.FOOTER, child: new FooterStatsView(films)});

const statisticsPresenter = new StatisticsPresenter(SiteElements.MAIN, filmsModel);

const renderStatsHandler = () => {
  statisticsPresenter.init();
  movieListPresenter.destroy();
};

const removeStatsHandler = () => {
  statisticsPresenter.destroy();
  filterPresenter.init();
  movieListPresenter.init();
};

const statsHandlers = {
  render: renderStatsHandler,
  remove: removeStatsHandler
};

const filterPresenter = new FilterPresenter(SiteElements.MAIN, filterModel, filmsModel, statsHandlers);
filterPresenter.init();

const movieListPresenter = new MovieList(filterModel, filmsModel);
movieListPresenter.init();
