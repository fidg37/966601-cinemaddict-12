import ContentFieldView from "../view/content-field.js";
import FilmCardView from "../view/film-card.js";
import DetailsPopupView from "../view/details-popup.js";
import ExtraBlockView from "../view/extra-block.js";
import LoadButtonView from "../view/load-button.js";
import NoFilmsView from "../view/no-films.js";
import {SiteElements} from "../constants.js";
import {render, remove} from "../utils/render.js";

const MAX_FILMS_PER_STEP = 5;

export default class MovieList {
  constructor(films, filters) {
    this._films = films;
    this._filters = filters;

    this._contentFieldComponent = new ContentFieldView();
    this._noFilmsComponent = new NoFilmsView();
  }

  init() {
    this._renderContentField();

    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms(0, MAX_FILMS_PER_STEP);

    if (this._films.length > MAX_FILMS_PER_STEP) {
      this._renderLoadButton();
    }

    this._renderExtraBlock();
  }

  _renderContentField() {
    this._filmsList = this._contentFieldComponent.getElement().querySelector(`.films-list__container`);

    render({container: SiteElements.MAIN, child: this._contentFieldComponent});
  }

  _renderNoFilms() {
    render({container: this._filmsList, child: this._noFilmsComponent});
  }

  _renderFilm(film, filmContainer = this._filmsList) {
    const filmComponent = new FilmCardView(film);
    const popupComponent = new DetailsPopupView(film);
    const popupContainer = SiteElements.MAIN;

    const addPopup = () => {
      SiteElements.BODY.classList.toggle(`hide-overflow`);
      render({container: popupContainer, child: popupComponent});
    };

    const closePopup = () => {
      SiteElements.BODY.classList.toggle(`hide-overflow`);
      popupComponent.removeClickHandler();
      popupComponent.removeKeydownHandler();
      remove(popupComponent);
    };

    const onPopupClose = () => {
      closePopup();
    };

    const onFilmCardClick = () => {

      popupComponent.setClickHandler(onPopupClose);
      popupComponent.setKeydownHandler(onPopupClose);
      addPopup();
    };

    filmComponent.setClickHandler(onFilmCardClick);

    render({container: filmContainer, child: filmComponent});
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderExtraBlock() {
    for (let i = 0; i < this._filters.filtersExtra.length; i++) {
      const extraBlockComponent = new ExtraBlockView(this._filters.filtersExtra[i]);
      const extraBlockFilms = extraBlockComponent.getElement().querySelector(`.films-list__container`);
      const extraFilms = Object.values(this._filters.filtersExtra[i])[0];

      render({container: this._contentFieldComponent.getElement(), child: extraBlockComponent});

      extraFilms.forEach((film) => (this._renderFilm(film, extraBlockFilms)));
    }
  }

  _renderLoadButton() {
    const buttonComponent = new LoadButtonView();
    const buttonContainer = this._contentFieldComponent.getElement().querySelector(`.films-list`);

    const onLoadButtonClick = () => {
      const renderedFilmsCount = this._filmsList.querySelectorAll(`.film-card`).length;

      this._renderFilms(renderedFilmsCount, renderedFilmsCount + MAX_FILMS_PER_STEP);
      if (renderedFilmsCount + MAX_FILMS_PER_STEP >= this._films.length) {
        buttonComponent.removeClickHandler();
        remove(buttonComponent);
      }
    };

    buttonComponent.setClickHandler(onLoadButtonClick);

    render({container: buttonContainer, child: buttonComponent});
  }
}
