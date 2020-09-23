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

const AUTHORIZATION = `Basic akfgIIO558#asfmWff9`;
const EDN_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

// const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
const api = new Api(EDN_POINT, AUTHORIZATION);

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
const movieListPresenter = new MovieList(filterModel, filmsModel, commentsModel, api);

filterPresenter.init();
movieListPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`);
    })
    .catch(() => {
      console.error(`ServiceWorker isn't available`);
    });
});
