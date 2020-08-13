import {IterationCount, SiteElements, MAX_FILMS_PER_STEP} from "./constants.js";
import {renderElement} from "./util";
import UserRankView from "./View/user-rank.js";
import FilterView from "./View/filter.js";
import SortingView from "./View/sorting.js";
import ContentFieldView from "./View/content-field.js";
import FilmCardView from "./View/film-card.js";
import ExtraBlockView from "./View/extra-block.js";
import FooterStatsView from "./View/footer-stats.js";
import DetailsPopupView from "./View/details-popup.js";
import {createFilmInfo} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {createLoadButton} from "./loadButtonLogic.js";

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

for (let i = 0; i < filters.filtersExtra.length; i++) {
  const extraBlock = new ExtraBlockView(filters.filtersExtra[i]).getElement();
  const extraBlockFilms = extraBlock.querySelector(`.films-list__container`);
  const extraFilms = Object.values(filters.filtersExtra[i])[0];

  renderElement({container: filmsBoard, element: extraBlock});

  extraFilms.forEach((film) => (renderElement({container: extraBlockFilms, element: new FilmCardView(film).getElement()})));
}

renderElement({container: SiteElements.FOOTER, element: new FooterStatsView(films).getElement()});
renderElement({container: SiteElements.BODY, element: new DetailsPopupView(films[0]).getElement()});

const buttonContainer = filmsBoard.querySelector(`.films-list`);

createLoadButton(films, mainFilms, buttonContainer);
