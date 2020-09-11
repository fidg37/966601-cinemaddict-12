import ContentFieldView from "../view/content-field.js";
import ExtraBlockView from "../view/extra-block.js";
import LoadButtonView from "../view/load-button.js";
import NoFilmsView from "../view/no-films.js";
import SortingView from "../view/sorting.js";
import {SiteElements, SortType, UpdateType} from "../constants.js";
import {render, remove} from "../utils/render.js";
import {getSortedFilms} from "../mock/filter.js";
import FilmPresenter from "./film.js";

const MAX_FILMS_PER_STEP = 5;

export default class MovieList {
  constructor(filters, filmsModel) {
    this._filters = filters;
    this._filmsModel = filmsModel;
    this._renderedFilmCount = MAX_FILMS_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._contentFieldComponent = null;
    this._noFilmsComponent = null;
    this._sortingComponent = null;
    this._buttonComponent = null;

    this._filmPresenters = {
      main: {},
      extra: {
        comments: {},
        rating: {}
      }
    };

    this._handlers = {
      sortTypeChange: this._sortTypeChangeHandler.bind(this),
      viewAction: this._viewActionHandler.bind(this),
      modChange: this._modChangeHandler.bind(this),
      modelEvent: this._modelEventHandler.bind(this)
    };

    this._filmsModel.addObserver(this._handlers.modelEvent);
  }

  init() {
    this._renderFilmBoard();
  }

  _renderFilmBoard() {
    const films = this._getFilms();
    const filmsCount = films.length;

    this._setComponents();

    this._renderSorting();
    this._renderContentField();
    if (!filmsCount) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms(films.slice(0, this._renderedFilmCount));
    this._renderLoadButton(films, filmsCount);

    this._renderExtraBlock();
  }

  _setComponents() {
    this._contentFieldComponent = new ContentFieldView();
    this._noFilmsComponent = new NoFilmsView();
    this._sortingComponent = new SortingView(this._currentSortType);
    this._buttonComponent = new LoadButtonView();
  }

  _removeComponents() {
    remove(this._contentFieldComponent);
    remove(this._noFilmsComponent);
    remove(this._sortingComponent);
    remove(this._buttonComponent);
  }

  _clearFilmBoard() {
    this._removeComponents();

    this._filmPresenters = {
      main: {},
      extra: {
        comments: {},
        rating: {}
      }
    };
  }

  _getFilms() {
    if (this._currentSortType === SortType.DEFAULT) {
      return this._filmsModel.getFilms();
    } else {
      return getSortedFilms([...this._filmsModel.getFilms()], this._currentSortType);
    }
  }

  _modChangeHandler() {
    const presenters = Object.values(this._filmPresenters.main);

    Object.values(this._filmPresenters.extra).forEach((extra) => (
      Object.values(extra).forEach((film) => (
        presenters.push(film)
      ))
    ));

    presenters.forEach((presenter) => presenter.resetView());
  }

  _renderContentField() {
    this._filmsList = this._contentFieldComponent.getElement().querySelector(`.films-list__container`);

    render({container: SiteElements.MAIN, child: this._contentFieldComponent});
  }

  _renderNoFilms() {
    render({container: this._filmsList, child: this._noFilmsComponent});
  }

  _renderFilm(film, filmContainer = this._filmsList, extraType = null) {
    const filmPresenter = new FilmPresenter(filmContainer, this._handlers.viewAction, this._handlers.modChange);
    filmPresenter.init(film, extraType);

    if (filmPresenter.isExtra()) {
      this._filmPresenters.extra[filmPresenter.isExtra()][film.id] = filmPresenter;
    } else {
      this._filmPresenters.main[film.id] = filmPresenter;
    }
  }

  _modelEventHandler(updateType, newData) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearFilmBoard();
        this._renderFilmBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmBoard();
        this._renderFilmBoard();
        break;
    }
  }

  _viewActionHandler(updateType, film) {
    this._filmsModel.updateFilm(updateType, film);

    if (this._filmPresenters.extra.comments[film.id]) {
      this._filmPresenters.extra.comments[film.id].init(film);
    }

    if (this._filmPresenters.extra.rating[film.id]) {
      this._filmPresenters.extra.rating[film.id].init(film);
    }

    if (this._filmPresenters.main[film.id]) {
      this._filmPresenters.main[film.id].init(film);
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _clearFilmsList() {
    Object.values(this._filmPresenters.main).forEach((presenter) => presenter.destroy());
  }

  _renderExtraBlock() {
    Object.entries(this._filters.extra).map(([extraType, films]) => {
      const extraBlockComponent = new ExtraBlockView(extraType);
      const extraBlockFilms = extraBlockComponent.getElement().querySelector(`.films-list__container`);

      render({container: this._contentFieldComponent.getElement(), child: extraBlockComponent});
      films.forEach((film) => (this._renderFilm(film, extraBlockFilms, extraType)));
    });
  }

  _renderLoadButton(films, filmsCount) {
    if (filmsCount < MAX_FILMS_PER_STEP || this._renderedFilmCount >= filmsCount) {
      return;
    }

    const buttonContainer = this._contentFieldComponent.getElement().querySelector(`.films-list`);

    const onLoadButtonClick = () => {
      const filmsForRendering = films.slice(this._renderedFilmCount, Math.min(this._renderedFilmCount + MAX_FILMS_PER_STEP, filmsCount));

      this._renderFilms(filmsForRendering);
      this._renderedFilmCount = Math.min(this._renderedFilmCount + MAX_FILMS_PER_STEP, filmsCount);
      if (this._renderedFilmCount === filmsCount) {
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

  _sortTypeChangeHandler(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearFilmBoard();
    this._renderFilmBoard();
  }

  _renderSorting() {
    this._sortingComponent.setSortTypeChangeHandler(this._handlers.sortTypeChange);
    render({container: SiteElements.MAIN, child: this._sortingComponent});
  }
}
