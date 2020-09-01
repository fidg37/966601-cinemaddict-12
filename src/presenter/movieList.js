import ContentFieldView from "../view/content-field.js";
import ExtraBlockView from "../view/extra-block.js";
import LoadButtonView from "../view/load-button.js";
import NoFilmsView from "../view/no-films.js";
import SortingView from "../view/sorting.js";
import {SiteElements, SortType} from "../constants.js";
import {render, remove} from "../utils/render.js";
import {getSortedFilms} from "../mock/filter.js";
import FilmPresenter from "./film.js";
import {updateItem} from "../utils/common.js";

const MAX_FILMS_PER_STEP = 5;

export default class MovieList {
  constructor(films, filters) {
    this._films = films;
    this._sortedFilms = this._films;
    this._filters = filters;

    this._contentFieldComponent = new ContentFieldView();
    this._noFilmsComponent = new NoFilmsView();
    this._sortingComponent = new SortingView();
    this._buttonComponent = new LoadButtonView();

    this._filmPresenters = {
      main: {},
      extra: {
        comments: {},
        rating: {}
      }
    };

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._update = this._update.bind(this);
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

  _renderFilm(film, filmContainer = this._filmsList, extraType = null) {
    const filmPresenter = new FilmPresenter(filmContainer, this._update);
    filmPresenter.init(film, extraType);

    if (filmPresenter.isExtraFilm()) {
      this._filmPresenters.extra[filmPresenter.isExtraFilm()][film.id] = filmPresenter;
    } else {
      this._filmPresenters.main[film.id] = filmPresenter;
    }
  }

  _update(film) {
    updateItem(this._films, film);
    updateItem(this._sortedFilms, film);

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
    if (sortType === SortType.DEFAULT) {
      this._renderFilmsList();
      return;
    }

    this._sortedFilms = getSortedFilms([...this._films], sortType);

    this._renderFilmsList(this._sortedFilms);
  }

  _onSortTypeChange(sortType) {
    this._clearFilmsList();
    this._removeLoadButton();
    this._renderSortedFilms(sortType);
  }

  _renderSorting() {
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    render({container: SiteElements.MAIN, child: this._sortingComponent});
  }
}
