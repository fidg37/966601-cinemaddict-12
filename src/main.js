import {IterationCount, SiteElements, MAX_FILMS_PER_STEP} from "./constants.js";
import {renderElement} from "./util";
import {createFilmInfo} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {createLoadButton} from "./loadButtonLogic.js";
import UserRankView from "./View/user-rank.js";
import FilterView from "./View/filter.js";
import SortingView from "./View/sorting.js";
import ContentFieldView from "./View/content-field.js";
import FooterStatsView from "./View/footer-stats.js";
import {renderFilm} from "./renderFilmLogic.js";
import {renderExtra} from "./renderExtraBlockLogic.js";

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
export const filters = generateFilter(films);

renderElement({container: SiteElements.HEADER, element: new UserRankView().getElement()});
renderElement({container: SiteElements.MAIN, element: new FilterView(filters).getElement()});
renderElement({container: SiteElements.MAIN, element: new SortingView().getElement()});
renderElement({container: SiteElements.MAIN, element: new ContentFieldView().getElement()});

export const filmsBoard = SiteElements.MAIN.querySelector(`.films`);
export const mainFilms = filmsBoard.querySelector(`.films-list__container`);

for (let i = 0; i < MAX_FILMS_PER_STEP; i++) {
  renderFilm(mainFilms, films[i]);
}

renderExtra(filters, filmsBoard);

renderElement({container: SiteElements.FOOTER, element: new FooterStatsView(films).getElement()});

const buttonContainer = filmsBoard.querySelector(`.films-list`);

createLoadButton(films, mainFilms, buttonContainer);
