import {InsertPlace, MAX_FILMS_PER_STEP} from "./constants.js";
import {render} from "./util.js";
import {mainFilms, filmsBoard, films} from "./main.js";
import {createLoadButtonTemplate} from "./View/load-button.js";
import {createFilmCardTemplate} from "./View/film-card.js";

let loadMoreButton = null;

const loadButtonClickEvent = (evt) => {
  evt.preventDefault();

  const renderedFilmCount = mainFilms.querySelectorAll(`.film-card`).length;
  if (renderedFilmCount >= films.length) {
    const button = filmsBoard.querySelector(`.films-list__show-more`);
    button.removeEventListener(`click`, loadButtonClickEvent);
    button.remove();
  } else {
    films
      .slice(renderedFilmCount, renderedFilmCount + MAX_FILMS_PER_STEP)
      .forEach((film) => render({container: mainFilms, template: createFilmCardTemplate(film)}));
  }
};

export const createLoadButton = () => {
  if (films.length > MAX_FILMS_PER_STEP) {
    render({container: mainFilms, template: createLoadButtonTemplate(), place: InsertPlace.AFTEREND});

    loadMoreButton = filmsBoard.querySelector(`.films-list__show-more`);

    loadMoreButton.addEventListener(`click`, loadButtonClickEvent);
  }
};
