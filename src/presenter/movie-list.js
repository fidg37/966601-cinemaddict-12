import ContentFieldView from "../view/content-field.js";
import ExtraBlockView from "../view/extra-block.js";
import LoadButtonView from "../view/load-button.js";
import LoadingView from "../view/loading.js";
import NoFilmsView from "../view/no-films.js";
import SortingView from "../view/sorting.js";
import {FilterType, SiteElements, SortType, UpdateType} from "../constants.js";
import {render, remove} from "../utils/render.js";
import FilmPresenter from "./film.js";
import {filter, getSortedFilms, getFilmsSortedByComments} from "../utils/filter.js";

const MAX_FILMS_PER_STEP = 5;

export default class MovieList {
  constructor(filterModel, filmsModel, api, rankChangeHandler) {
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._api = api;
    this._changeRank = rankChangeHandler;
    this._renderedFilmCount = MAX_FILMS_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;

    this._loadingComponent = new LoadingView();

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
      modelEvent: this._modelEventHandler.bind(this)
    };

    this._filterModel.addObserver(this._handlers.modelEvent);
    this._filmsModel.addObserver(this._handlers.modelEvent);
  }

  init() {
    this._renderFilmBoard();
  }

  destroy() {
    remove(this._contentFieldComponent);
    remove(this._loadingComponent);
    remove(this._noFilmsComponent);
    remove(this._sortingComponent);
    remove(this._buttonComponent);

    this._contentFieldComponent = null;
    this._noFilmsComponent = null;
    this._sortingComponent = null;
    this._buttonComponent = null;
  }

  _renderFilmBoard({stats = false} = {}) {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmsCount = films.length;

    this._setComponents();

    this._renderSorting();

    if (stats) {
      this._renderStats();
      return;
    }

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

  _clearFilmBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    remove(this._loadingComponent);

    this.destroy();

    this._filmPresenters = {
      main: {},
      extra: {
        comments: {},
        rating: {}
      }
    };

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = MAX_FILMS_PER_STEP;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _getFilms() {
    const filteredFilms = filter[this._filterModel.getFilter()](this._filmsModel.getFilms());

    if (this._currentSortType === SortType.DEFAULT) {
      return filteredFilms;
    }

    return getSortedFilms(filteredFilms, this._currentSortType);
  }

  _renderContentField() {
    this._filmsList = this._contentFieldComponent.getElement().querySelector(`.films-list__container`);

    render({container: SiteElements.MAIN, child: this._contentFieldComponent});
  }

  _renderNoFilms() {
    render({container: this._filmsList, child: this._noFilmsComponent});
  }

  _renderFilm(film, filmContainer = this._filmsList, extraType = null) {
    const filmPresenter = new FilmPresenter(filmContainer, this._handlers.viewAction, this._filterModel, this._api);
    filmPresenter.init({filmData: film, extraType});

    if (filmPresenter.isExtra()) {
      this._filmPresenters.extra[filmPresenter.isExtra()][film.id] = filmPresenter;
    } else {
      this._filmPresenters.main[film.id] = filmPresenter;
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderLoading() {
    render({container: SiteElements.MAIN, child: this._loadingComponent});
  }

  _renderExtraBlock() {
    const extra = {
      rating: getSortedFilms([...this._filmsModel.getFilms()], SortType.BY_RATING).slice(0, 2).filter((film) => film.filmInfo.totalRating !== 0),
      comments: getFilmsSortedByComments([...this._filmsModel.getFilms()]).slice(0, 2).filter((film) => film.comments.length !== 0)
    };

    Object.entries(extra).map(([extraType, films]) => {
      if (films.length === 0) {
        return;
      }

      const extraBlockComponent = new ExtraBlockView(extraType);
      const extraBlockFilms = extraBlockComponent.getElement().querySelector(`.films-list__container`);

      render({container: this._contentFieldComponent.getElement(), child: extraBlockComponent});
      films.forEach((film) => (this._renderFilm(film, extraBlockFilms, extraType)));
    });
  }

  _renderSorting() {
    this._sortingComponent.setSortTypeChangeHandler(this._handlers.sortTypeChange);
    render({container: SiteElements.MAIN, child: this._sortingComponent});
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

  _modelEventHandler(updateType, film) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearFilmBoard();
        this._renderFilmBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._filterModel.setFilter(UpdateType.MINOR, FilterType.ALL);
        break;
      case UpdateType.PATCH:
        if (this._filmPresenters.extra.comments[film.id]) {
          this._filmPresenters.extra.comments[film.id].init({filmData: film});
        }

        if (this._filmPresenters.extra.rating[film.id]) {
          this._filmPresenters.extra.rating[film.id].init({filmData: film});
        }

        if (this._filmPresenters.main[film.id]) {
          this._filmPresenters.main[film.id].init({filmData: film});
        }
        break;
    }

    this._changeRank(filter[FilterType.HISTORY](this._filmsModel.getFilms()).length);
  }

  _viewActionHandler(updateType, film) {
    this._api.updateFilm(film)
        .then((response) => {
          this._filmsModel.updateFilm(updateType, response);
          this._filterModel.setFilter(UpdateType, this._filterModel.getFilter());
        });
  }
}
