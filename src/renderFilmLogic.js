import {SiteElements} from "./constants.js";
import {renderElement} from "./util.js";
import FilmCardView from "./View/film-card.js";
import DetailsPopupView from "./View/details-popup.js";

export const renderFilm = (filmsContainer, film, popupContainer = SiteElements.BODY) => {
  const filmComponent = new FilmCardView(film);
  const popupComponent = new DetailsPopupView(film);
  const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const title = filmComponent.getElement().querySelector(`h3`);
  const commentsCount = filmComponent.getElement().querySelector(`.film-card__comments`);
  const popupCloseButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);

  const addPopup = () => {
    SiteElements.BODY.classList.toggle(`hide-overflow`);
    popupContainer.appendChild(popupComponent.getElement());
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

  renderElement({container: filmsContainer, element: filmComponent.getElement()});
};
