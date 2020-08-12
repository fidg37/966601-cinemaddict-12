import {renderTemplate} from "../util.js";
import {filmsBoard} from "../main.js";
import {createFilmCardTemplate} from "./film-card";

export const createExtraBlockTemplate = (films) => (
  Object.entries(films).map(([filterName, extraFilms]) => {
    const filmsLayout = extraFilms.map((film) => (
      createFilmCardTemplate(film)
    )).join(``);

    return (`<section class="films-list--extra">
    <h2 class="films-list__title">${filterName === `comments` ? `Most commented` : `Top rated`}</h2>
    <div class="films-list__container">
    ${filmsLayout}
    </div>
    </section>`);
  }).join(``)
);

export const createExtra = (filters) => {
  if (filters.filtersExtra === 0) {
    return;
  }

  filters.filtersExtra.forEach((extra) => {
    renderTemplate({container: filmsBoard, template: createExtraBlockTemplate(extra)});
  });
};
