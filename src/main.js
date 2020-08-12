import {IterationCount, SiteElements, MAX_FILMS_PER_STEP, InsertPlace} from "./constants.js";
import {renderTemplate, renderElement} from "./util";
import UserRankView from "./View/user-rank.js";
import FilterView from "./View/filter.js";
import SortingView from "./View/sorting.js";
import ContentFieldView from "./View/content-field.js";
import FilmCardView from "./View/film-card.js";
import {createExtra} from "./View/extra-block.js";
import {createFooterStatsTemplate} from "./View/footer-stats.js";
import {createDetailsPopupTemplate} from "./View/details-popup.js";
import {createFilmInfo} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {createLoadButton} from "./load-button-logic.js";

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
export const filters = generateFilter(films);

renderElement({container: SiteElements.HEADER, element: new UserRankView().getElement()});
renderElement({container: SiteElements.MAIN, element: new FilterView(filters).getElement()});
renderElement({container: SiteElements.MAIN, element: new SortingView().getElement()});
renderElement({container: SiteElements.MAIN, element: new ContentFieldView().getElement()});

export const filmsBoard = SiteElements.MAIN.querySelector(`.films`);
export const mainFilms = filmsBoard.querySelector(`.films-list__container`);


for (let i = 0; i < MAX_FILMS_PER_STEP; i++) {
  renderElement({container: mainFilms, element: new FilmCardView(films[i]).getElement()});
}

//createExtra(filters);

renderTemplate({container: SiteElements.FOOTER, template: createFooterStatsTemplate(films)});
//render({container: SiteElements.FOOTER, template: createDetailsPopupTemplate(films[0]), insert: InsertPlace.AFTEREND});

createLoadButton();
