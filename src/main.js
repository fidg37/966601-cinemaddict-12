import {IterationCount, SiteElements} from "./constants.js";
import {render} from "./utils/render.js";
import {createFilmInfo} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import UserRankView from "./view/user-rank.js";
import FilterView from "./view/filter.js";
import SortingView from "./view/sorting.js";
import FooterStatsView from "./view/footer-stats.js";
import MovieList from "./presenter/movieList.js";

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
export const filters = generateFilter(films);

render({container: SiteElements.HEADER, child: new UserRankView()});
render({container: SiteElements.MAIN, child: new FilterView(filters)});
render({container: SiteElements.MAIN, child: new SortingView()});
render({container: SiteElements.FOOTER, child: new FooterStatsView(films)});

const presenter = new MovieList(films, filters);
presenter.init();
