import {MAX_FILMS_PER_STEP} from "./constants.js";
import {render} from "./util.js";
import LoadButtonView from "./View/load-button.js";
import {renderFilm} from "./renderFilmLogic.js";

let handler;

const onLoadButtonClick = (films, filmsContainer, button) => (evt) => {
  evt.preventDefault();

  const renderedFilmsCount = filmsContainer.querySelectorAll(`.film-card`).length;

  films
    .slice(renderedFilmsCount, renderedFilmsCount + MAX_FILMS_PER_STEP)
    .forEach((film) => renderFilm(filmsContainer, film));

  if (renderedFilmsCount + MAX_FILMS_PER_STEP >= films.length) {
    button.removeEventListener(`click`, handler);
    button.remove();
  }
};

export const createLoadButton = (films, filmsContainer, buttonContainer) => {
  if (films.length > MAX_FILMS_PER_STEP) {
    const button = new LoadButtonView().getElement();
    handler = onLoadButtonClick(films, filmsContainer, button);

    button.addEventListener(`click`, handler);

    render({container: buttonContainer, child: button});
  }
};
