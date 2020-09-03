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
    this._container = filmContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._mode = Mode.DEFAULT;
    this._extraType = null;
    this._cardComponent = null;
    this._popupComponent = null;
    this._popupContainer = SiteElements.MAIN;

    this._handlers = {
      cardClick: this._cardClickHandler.bind(this),
      popupClose: this._popupCloseHandler.bind(this)
    };
  }

  init(data, extraType) {
    this._data = data;
    this._extraType = extraType;

    this._savePrevComponents();

    this._cardComponent = new FilmCardView(this._data);
    this._popupComponent = new DetailsPopupView(this._data);

    this._setHandlers();

    if (this._isFirstInit()) {
      render({container: this._container, child: this._cardComponent});
    } else {
      this._replaceComponents();
    }
  }

  _setHandlers() {
    this._cardComponent.setClickHandler(this._handlers.cardClick);
    this._cardComponent.setButtonClickHandler(this._changeData);
  }

  _savePrevComponents() {
    this._prevCardComponent = this._cardComponent;
    this._prevPopupComponent = this._popupComponent;
  }

  _isFirstInit() {
    return this._prevCardComponent === null || this._prevPopupComponent === null;
  }

  _replaceComponents() {
    replace(this._cardComponent, this._prevCardComponent);

    if (this._mode === Mode.POPUP) {
      replace(this._popupComponent, this._prevPopupComponent);
    }

    this._removePrevComponents();
  }

  _removePrevComponents() {
    remove(this._prevCardComponent);
    remove(this._prevPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  isExtra() {
    return this._extraType;
  }

  destroy() {
    remove(this._cardComponent);
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

  _popupCloseHandler(film) {
    this._closePopup();
    this._changeData(film);
  }

  _cardClickHandler() {
    this._popupComponent.setClickHandler(this._handlers.popupClose);
    this._popupComponent.setKeydownHandler(this._handlers.popupClose);
    this._popupComponent.setControllsClickHandler();
    this._popupComponent.setEmojiClickHandler();
    this._addPopup();

    this._changeMode();
    this._mode = Mode.POPUP;
  }
}

