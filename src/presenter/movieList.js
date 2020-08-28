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
import FilmPresenter from "./film.js";

const MAX_FILMS_PER_STEP = 5;

export default class MovieList {
  constructor(films, filters) {
    this._films = films;
    this._filters = filters;

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
    const filmPresenter = new FilmPresenter(film, filmContainer);

    filmPresenter.init();
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
    if (sortType === SortType.DEFAULT) {
      this._renderFilmsList();
      return;
    }

    this._renderFilmsList(getSortedFilms([...this._films], sortType));
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
