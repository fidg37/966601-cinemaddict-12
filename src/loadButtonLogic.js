import {MAX_FILMS_PER_STEP} from "./constants.js";
import {renderElement} from "./util.js";
import LoadButtonView from "./View/load-button.js";
import FilmCardView from "./View/film-card.js";

let handler;

const loadButtonClickEvent = (films, filmsContainer, button) => (evt) => {
  evt.preventDefault();

  const renderedFilmsCount = filmsContainer.querySelectorAll(`.film-card`).length;

  films
    .slice(renderedFilmsCount, renderedFilmsCount + MAX_FILMS_PER_STEP)
    .forEach((film) => renderElement({container: filmsContainer, element: new FilmCardView(film).getElement()}));

  if (renderedFilmsCount + MAX_FILMS_PER_STEP >= films.length) {
    button.removeEventListener(`click`, handler);
    button.remove();
  }
};

export const createLoadButton = (films, filmsContainer, buttonContainer) => {
  if (films.length > MAX_FILMS_PER_STEP) {
    const button = new LoadButtonView().getElement();
    handler = loadButtonClickEvent(films, filmsContainer, button);

    button.addEventListener(`click`, handler);

    renderElement({container: buttonContainer, element: button});
  }
};
