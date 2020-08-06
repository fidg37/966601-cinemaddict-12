import {IterationCount, InsertPlace, SiteElements} from "./constants.js";
import {render} from "./util";
import {createUserRankTemplate} from "./View/user-rank.js";
import {createFilterTemplate} from "./View/filter.js";
import {createSortTemplate} from "./View/sorting.js";
import {createContentFieldTemplate} from "./View/content-field.js";
import {createFilmCardTemplate} from "./View/film-card.js";
import {createLoadButtonTemplate} from "./View/load-button.js";
import {createExtraBlockTemplate} from "./View/extra-block.js";
import {createFooterStatsTemplate} from "./View/footer-stats.js";
import {createDetailsPopupTemplate} from "./View/details-popup.js";
import {createFilmInfo} from "./mock/film.js";

const films = new Array(IterationCount.CARD).fill().map(createFilmInfo);

render({container: SiteElements.HEADER, template: createUserRankTemplate()});
render({container: SiteElements.MAIN, template: createFilterTemplate()});
render({container: SiteElements.MAIN, template: createSortTemplate()});
render({container: SiteElements.MAIN, template: createContentFieldTemplate()});

const filmsBoard = SiteElements.MAIN.querySelector(`.films`);
const mainFilms = filmsBoard.querySelector(`.films-list__container`);

render({container: mainFilms, template: createFilmCardTemplate(films[1]), iteration: IterationCount.CARD});
render({container: mainFilms, template: createLoadButtonTemplate(), place: InsertPlace.AFTEREND});
render({container: filmsBoard, template: createExtraBlockTemplate(), iteration: IterationCount.EXTRA});

filmsBoard.querySelectorAll(`.films-list--extra`).forEach((item) => {
  let filmsList = item.querySelector(`.films-list__container`);

  render({container: filmsList, template: createFilmCardTemplate(), iteration: IterationCount.EXTRA});
});

render({container: SiteElements.FOOTER, template: createFooterStatsTemplate()});
//render({container: SiteElements.FOOTER, template: createDetailsPopupTemplate(films[0]), place: InsertPlace.AFTEREND});
