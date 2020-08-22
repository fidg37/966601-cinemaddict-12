import ContentFieldView from "../view/content-field.js";
import FilmCardView from "../view/film-card.js";
import DetailsPopupView from "../view/details-popup.js";
import ExtraBlockView from "../view/extra-block.js";
import LoadButtonView from "../view/load-button.js";
import NoFilmsView from "../view/no-films.js";
import SortingView from "../view/sorting.js";
import {SiteElements, SortType} from "../constants.js";
import {render, remove} from "../utils/render.js";
import {getSortedFilms} from "../mock/filter.js";

const MAX_FILMS_PER_STEP = 5;

export default class MovieList {
  constructor(films, filters) {
    this._films = films;
    this._filters = filters;

    this._currentSortType = SortType.DEFAULT;

    this._contentFieldComponent = new ContentFieldView();
    this._noFilmsComponent = new NoFilmsView();
    this._sortingComponent = new SortingView();
    this._buttonComponent = new LoadButtonView();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  init() {
    this._renderSorting();
    this._renderContentField();
    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmsList();
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

  _renderFilms(from, to, films) {
    films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderFilmsList(films = this._films) {
    this._renderFilms(0, MAX_FILMS_PER_STEP, films);
    this._renderLoadButton(films);
  }

  _clearFilmsList() {
    this._filmsList.innerHTML = ``;
  }

  _renderExtraBlock() {
    this._filters.filtersExtra.forEach((extraData) => {
      const extraBlockComponent = new ExtraBlockView(extraData);
      const extraBlockFilms = extraBlockComponent.getElement().querySelector(`.films-list__container`);
      const extraFilms = Object.values(extraData)[0];

      render({container: this._contentFieldComponent.getElement(), child: extraBlockComponent});

      extraFilms.forEach((film) => (this._renderFilm(film, extraBlockFilms)));
    });
  }

  _renderLoadButton(films) {
    if (this._films.length < MAX_FILMS_PER_STEP) {
      return;
    }

    const buttonContainer = this._contentFieldComponent.getElement().querySelector(`.films-list`);

    const onLoadButtonClick = () => {
      const renderedFilmsCount = this._filmsList.querySelectorAll(`.film-card`).length;

      this._renderFilms(renderedFilmsCount, renderedFilmsCount + MAX_FILMS_PER_STEP, films);
      if (renderedFilmsCount + MAX_FILMS_PER_STEP >= this._films.length) {
        this._removeLoadButton();
      }
    };

    this._buttonComponent.setClickHandler(onLoadButtonClick);

    render({container: buttonContainer, child: this._buttonComponent});
  }

  _removeLoadButton() {
    this._buttonComponent.removeClickHandler();
    remove(this._buttonComponent);
  }

  _renderSortedFilms(sortType) {
    switch (sortType) {
      case SortType.BY_RATING:
        this._renderFilmsList(getSortedFilms([...this._films], sortType));
        break;
      case SortType.BY_DATE:
        this._renderFilmsList(getSortedFilms([...this._films], sortType));
        break;
      default:
        this._renderFilmsList();
    }
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._clearFilmsList();
    this._removeLoadButton();
    this._renderSortedFilms(sortType);

    this._currentSortType = sortType;
  }

  _renderSorting() {
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    render({container: SiteElements.MAIN, child: this._sortingComponent});
  }
}
