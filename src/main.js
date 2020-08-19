import {IterationCount, SiteElements, MAX_FILMS_PER_STEP} from "./constants.js";
import {render} from "./util";
import {createFilmInfo} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {createLoadButton} from "./loadButtonLogic.js";
import UserRankView from "./View/user-rank.js";
import FilterView from "./View/filter.js";
import SortingView from "./View/sorting.js";
import ContentFieldView from "./View/content-field.js";
import FooterStatsView from "./View/footer-stats.js";
import NoFilmsView from "./View/no-films.js";
import {renderFilm} from "./renderFilmLogic.js";
import {renderExtra} from "./renderExtraBlockLogic.js";

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
export const filters = generateFilter(films);

render({container: SiteElements.HEADER, child: new UserRankView()});
render({container: SiteElements.MAIN, child: new FilterView(filters)});
render({container: SiteElements.MAIN, child: new SortingView()});
render({container: SiteElements.MAIN, child: new ContentFieldView()});

export const filmsBoard = SiteElements.MAIN.querySelector(`.films`);
export const mainFilms = filmsBoard.querySelector(`.films-list__container`);

if (!films.length) {
  render({container: mainFilms, child: new NoFilmsView()});
}

for (let i = 0; i < MAX_FILMS_PER_STEP; i++) {
  renderFilm(mainFilms, films[i]);
}

renderExtra(filters, filmsBoard);

render({container: SiteElements.FOOTER, child: new FooterStatsView(films)});

const buttonContainer = filmsBoard.querySelector(`.films-list`);

createLoadButton(films, mainFilms, buttonContainer);
