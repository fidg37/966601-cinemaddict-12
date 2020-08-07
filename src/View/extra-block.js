import {render} from "../util.js";
import {filmsBoard} from "../main.js";
import {createFilmCardTemplate} from "./film-card";

export const createExtraBlockTemplate = (filtratedArray) => (
  Object.entries(filtratedArray).map(([filterName, filmsArray]) => {
    let cards = ``;
    filmsArray.forEach((film) => {
      cards += createFilmCardTemplate(film);
      return cards;
    });

    return (`<section class="films-list--extra">
    <h2 class="films-list__title">${filterName === `comments` ? `Most commented` : `Top rated`}</h2>
    <div class="films-list__container">
    ${cards}
    </div>
    </section>`);
  }).join(``)
);

export const createExtra = (filters) => {
  const extraArray = filters.filtersExtra;

  if (extraArray === 0) {
    return;
  }

  extraArray.forEach((extra) => {
    render({container: filmsBoard, template: createExtraBlockTemplate(extra)});
  });
};
