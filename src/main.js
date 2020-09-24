import {SiteElements, UpdateType} from "./constants.js";
import {render} from "./utils/render.js";
import UserRankView from "./view/user-rank.js";
import FooterStatsView from "./view/footer-stats.js";
import MovieList from "./presenter/movieList.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import CommentsModel from "./model/comments.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsPresenter from "./presenter/statistics.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic akfgIIO558#asfmWff9`;
const EDN_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(EDN_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const userRankContainer = new UserRankView();
const footerStatsContainer = new FooterStatsView([]);

render({container: SiteElements.HEADER, child: userRankContainer});
render({container: SiteElements.FOOTER, child: footerStatsContainer});

/* const rankChangeHandler = (watchedFilms) => {
  userRankContainer.changeRank();
}; */

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
const movieListPresenter = new MovieList(filterModel, filmsModel, commentsModel, apiWithProvider);

filterPresenter.init();
movieListPresenter.init();

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.syncFilms();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
