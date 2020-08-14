import {SiteElements} from "./constants.js";
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

  const removePopup = () => {
    SiteElements.BODY.classList.toggle(`hide-overflow`);
    popupContainer.removeChild(popupContainer.querySelector(`.film-details`));
  };

  const popupOpenClickEvent = (evt) => {
    evt.preventDefault();

    popupCloseButton.addEventListener(`click`, popupCloseClickEvent);
    addPopup();
  };

  const popupCloseClickEvent = (evt) => {
    evt.preventDefault();

    popupCloseButton.removeEventListener(`click`, popupCloseClickEvent);
    removePopup();
  };

  poster.addEventListener(`click`, popupOpenClickEvent);
  title.addEventListener(`click`, popupOpenClickEvent);
  commentsCount.addEventListener(`click`, popupOpenClickEvent);

  renderElement({container: filmsContainer, element: filmComponent});
};
