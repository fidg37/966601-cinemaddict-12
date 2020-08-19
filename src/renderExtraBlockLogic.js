import {render} from "./util.js";
import ExtraBlockView from "./View/extra-block.js";
import {renderFilm} from "./renderFilmLogic.js";

export const renderExtra = (filters, extraBlockContainer) => {
  for (let i = 0; i < filters.filtersExtra.length; i++) {
    const extraBlock = new ExtraBlockView(filters.filtersExtra[i]).getElement();
    const extraBlockFilms = extraBlock.querySelector(`.films-list__container`);
    const extraFilms = Object.values(filters.filtersExtra[i])[0];

    render({container: extraBlockContainer, child: extraBlock});

    extraFilms.forEach((film) => (renderFilm(extraBlockFilms, film)));
  }
};
