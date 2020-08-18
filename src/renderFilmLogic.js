import {SiteElements, Keycodes} from "./constants.js";
import {renderElement} from "./util.js";
import FilmCardView from "./View/film-card.js";
import DetailsPopupView from "./View/details-popup.js";

export const renderFilm = (filmsContainer, film, popupContainer = SiteElements.BODY) => {
  const filmComponent = new FilmCardView(film).getElement();
  const popupComponent = new DetailsPopupView(film).getElement();
  const poster = filmComponent.querySelector(`.film-card__poster`);
  const title = filmComponent.querySelector(`h3`);
  const commentsCount = filmComponent.querySelector(`.film-card__comments`);
  const popupCloseButton = popupComponent.querySelector(`.film-details__close-btn`);

  const addPopup = () => {
    SiteElements.BODY.classList.toggle(`hide-overflow`);
    popupContainer.appendChild(popupComponent);
  };

  const closePopup = () => {
    SiteElements.BODY.classList.toggle(`hide-overflow`);
    popupContainer.removeChild(popupContainer.querySelector(`.film-details`));
  };

  const onPopupKeydown = (evt) => {
    if (evt.keyCode === Keycodes.ESC) {
      closePopup();
      document.removeEventListener(`keydown`, onPopupKeydown);
    }
  };

  const onFilmCardClick = (evt) => {
    evt.preventDefault();

    popupCloseButton.addEventListener(`click`, onCloseButtonClick);
    document.addEventListener(`keydown`, onPopupKeydown);
    addPopup();
  };

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();

    popupCloseButton.removeEventListener(`click`, onCloseButtonClick);
    closePopup();
  };

  poster.addEventListener(`click`, onFilmCardClick);
  title.addEventListener(`click`, onFilmCardClick);
  commentsCount.addEventListener(`click`, onFilmCardClick);

  renderElement({container: filmsContainer, element: filmComponent});
};
