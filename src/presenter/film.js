import FilmCardView from "../view/film-card.js";
import DetailsPopupView from "../view/details-popup.js";
import {SiteElements} from "../constants.js";
import {render, remove} from "../utils/render.js";

export default class Film {
  constructor(film, filmContainer) {
    this._film = film;
    this._filmContainer = filmContainer;

    this._filmComponent = new FilmCardView(this._film);
    this._popupComponent = new DetailsPopupView(this._film);
    this._popupContainer = SiteElements.MAIN;

    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onPopupClose = this._onPopupClose.bind(this);
  }

  init() {
    this._filmComponent.setClickHandler(this._onFilmCardClick);
    render({container: this._filmContainer, child: this._filmComponent});
  }

  _addPopup() {
    SiteElements.BODY.classList.toggle(`hide-overflow`);
    render({container: this._popupContainer, child: this._popupComponent});
  }

  _closePopup() {
    SiteElements.BODY.classList.toggle(`hide-overflow`);
    this._popupComponent.removeClickHandler();
    this._popupComponent.removeKeydownHandler();
    remove(this._popupComponent);
  }

  _onPopupClose() {
    this._closePopup();
  }

  _onFilmCardClick() {
    this._popupComponent.setClickHandler(this._onPopupClose);
    this._popupComponent.setKeydownHandler(this._onPopupClose);
    this._addPopup();
  }
}

