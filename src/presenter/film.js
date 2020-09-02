import FilmCardView from "../view/film-card.js";
import DetailsPopupView from "../view/details-popup.js";
import {SiteElements} from "../constants.js";
import {render, remove} from "../utils/render.js";
import {replace} from "../utils/common.js";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`
};

export default class Film {
  constructor(filmContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._mode = Mode.DEFAULT;
    this._extraType = null;
    this._filmComponent = null;
    this._popupComponent = null;
    this._popupContainer = SiteElements.MAIN;

    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onPopupClose = this._onPopupClose.bind(this);
  }

  init(film, extraType) {
    this._film = film;
    this._extraType = extraType;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new FilmCardView(this._film);
    this._popupComponent = new DetailsPopupView(this._film);

    this._filmComponent.setClickHandler(this._onFilmCardClick);
    this._filmComponent.setButtonClickHandler(this._changeData);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render({container: this._filmContainer, child: this._filmComponent});
      return;
    }

    replace(this._filmComponent, prevFilmComponent);

    if (this._mode === Mode.POPUP) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  isExtraFilm() {
    return this._extraType;
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
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

    this._mode = Mode.DEFAULT;
  }

  _onPopupClose(film) {
    this._closePopup();
    this._changeData(film);
  }

  _onFilmCardClick() {
    this._popupComponent.setClickHandler(this._onPopupClose);
    this._popupComponent.setKeydownHandler(this._onPopupClose);
    this._popupComponent.setControllsClickHandler();
    this._popupComponent.setEmojiClickHandler();
    this._addPopup();

    this._changeMode();
    this._mode = Mode.POPUP;
  }
}

