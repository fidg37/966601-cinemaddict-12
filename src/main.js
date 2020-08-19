import {IterationCount, SiteElements} from "./constants.js";
import {render} from "./util";
import {createFilmInfo} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import UserRankView from "./View/user-rank.js";
import FilterView from "./View/filter.js";
import SortingView from "./View/sorting.js";
import FooterStatsView from "./View/footer-stats.js";
import MovieList from "./presenter/movieList.js";

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
export const filters = generateFilter(films);

render({container: SiteElements.HEADER, child: new UserRankView()});
render({container: SiteElements.MAIN, child: new FilterView(filters)});
render({container: SiteElements.MAIN, child: new SortingView()});
render({container: SiteElements.FOOTER, child: new FooterStatsView(films)});

const presenter = new MovieList(films, filters);
presenter.init();
