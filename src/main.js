import {IterationCount, SiteElements} from "./constants.js";
import {render} from "./utils/render.js";
import {createFilmInfo} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import UserRankView from "./view/user-rank.js";
import FilterView from "./view/filter.js";
import FooterStatsView from "./view/footer-stats.js";
import MovieList from "./presenter/movieList.js";
import FilmsModel from "./model/films.js";

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
export const filters = generateFilter(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

render({container: SiteElements.HEADER, child: new UserRankView()});
render({container: SiteElements.MAIN, child: new FilterView(filters)});
render({container: SiteElements.FOOTER, child: new FooterStatsView(films)});

const movieListPresenter = new MovieList(filters, filmsModel);
movieListPresenter.init();
