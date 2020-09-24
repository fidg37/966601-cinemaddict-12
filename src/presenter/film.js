import FilmCardView from "../view/film-card.js";
import DetailsPopupView from "../view/details-popup.js";
import {SiteElements} from "../constants.js";
import {render, remove} from "../utils/render.js";
import {replace} from "../utils/common.js";
import PresenterComment from "../presenter/comment.js";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`
};

export default class Film {
  constructor(filmContainer, changeData, commentsModel, filterModel, api) {
    this._container = filmContainer;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._api = api;

    this._mode = Mode.DEFAULT;
    this._extraType = null;
    this._cardComponent = null;
    this._popupComponent = null;
    this._popupContainer = SiteElements.MAIN;
    this._comments = null;

    this._presenters = [];

    this._handlers = {
      cardClick: this._cardClickHandler.bind(this),
      popupClose: this._popupCloseHandler.bind(this),
      commentChange: this._commentChangeHandler.bind(this)
    };
  }

  init({filmData, extraType, isCommentsChange = false}) {
    this._data = filmData;
    this._extraType = extraType;

    this._savePrevComponents();

    this._cardComponent = new FilmCardView(this._data, this._filterModel.getFilter());
    this._popupComponent = new DetailsPopupView(this._data, this._filterModel.getFilter(), this._api, isCommentsChange);

    this._setHandlers();

    if (this._isFirstInit()) {
      render({container: this._container, child: this._cardComponent});
    } else {
      this._replaceComponents();
    }
  }

  _renderComments(film) {
    if (!film.comments) {
      return;
    }

    this._api.getComments(film)
      .then((comments) => {
        this._comments = comments;
        this._comments.forEach((comment) => this._renderComment(comment));
      });
  }

  _renderComment(commentData) {
    const container = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    const comment = new PresenterComment(container, commentData, this._data, this._handlers.commentChange, this._api);

    this._presenters.push(comment);

    comment.init();
  }

  _commentChangeHandler(newFilmData) {
    this._data = newFilmData;

    this._popupComponent.removeClickHandler();
    this._popupComponent.removeKeydownHandler();

    this.init({filmData: newFilmData, isCommentsChange: true});
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
      this._cardClickHandler();
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
    if (!SiteElements.BODY.classList.contains(`hide-overflow`)) {
      SiteElements.BODY.classList.toggle(`hide-overflow`);
    }

    render({container: this._popupContainer, child: this._popupComponent});
  }

  _closePopup() {
    if (SiteElements.BODY.classList.contains(`hide-overflow`)) {
      SiteElements.BODY.classList.toggle(`hide-overflow`);
    }

    this._popupComponent.removeClickHandler();
    this._popupComponent.removeKeydownHandler();
    remove(this._popupComponent);

    this._mode = Mode.DEFAULT;
  }

  _popupCloseHandler(updateType, film) {
    this._closePopup();
    this._changeData(updateType, film);
  }

  _cardClickHandler() {
    this._popupComponent.setClickHandler(this._handlers.popupClose);
    this._popupComponent.setKeydownHandler(this._handlers.popupClose);
    this._popupComponent.setControllsClickHandler();
    this._popupComponent.setEmojiClickHandler();
    this._popupComponent.setNewCommentInputHandler();
    this._popupComponent.setSubmitCommentHandler(this._handlers.commentChange);

    this._renderComments(this._data);
    this._addPopup();

    this._mode = Mode.POPUP;
  }
}

