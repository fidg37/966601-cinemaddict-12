import {IterationCount, SiteElements, MAX_FILMS_PER_STEP, InsertPlace} from "./constants.js";
import {render} from "./util";
import {createUserRankTemplate} from "./View/user-rank.js";
import {createFilterTemplate} from "./View/filter.js";
import {createSortTemplate} from "./View/sorting.js";
import {createContentFieldTemplate} from "./View/content-field.js";
import {createFilmCardTemplate} from "./View/film-card.js";
import {createExtra} from "./View/extra-block.js";
import {createFooterStatsTemplate} from "./View/footer-stats.js";
import {createDetailsPopupTemplate} from "./View/details-popup.js";
import {createFilmInfo} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {createLoadButton} from "./load-button-logic.js";

export const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);
export const filters = generateFilter(films);

render({container: SiteElements.HEADER, template: createUserRankTemplate()});
render({container: SiteElements.MAIN, template: createFilterTemplate(filters)});
render({container: SiteElements.MAIN, template: createSortTemplate()});
render({container: SiteElements.MAIN, template: createContentFieldTemplate()});

export const filmsBoard = SiteElements.MAIN.querySelector(`.films`);
export const mainFilms = filmsBoard.querySelector(`.films-list__container`);


for (let i = 0; i < MAX_FILMS_PER_STEP; i++) {
  render({container: mainFilms, template: createFilmCardTemplate(films[i])});
}

createExtra(filters);

render({container: SiteElements.FOOTER, template: createFooterStatsTemplate(films)});
render({container: SiteElements.FOOTER, template: createDetailsPopupTemplate(films[0]), insert: InsertPlace.AFTEREND});

createLoadButton();
