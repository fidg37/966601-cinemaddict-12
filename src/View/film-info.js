import AbstractView from "./abstract.js";
import {humanizeDate} from "../util.js";

export default class FilmInfo extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
  }

  _createGenreTemplate(genres) {
    return (genres.map((genre) => (
      `<span class="film-details__genre">${genre}</span>`
    )).join(``));
  }

  _getNamesString(names) {
    return [...names].join(`, `);
  }

  _createTemplate({poster, title, rating, director, writers, actors, releaseDate, runtime, country, genres, description, isAdult
  }) {

    return `<div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
  
        <p class="film-details__age">${isAdult ? `18+` : ``}</p>
      </div>
  
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${title}</p>
          </div>
  
          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>
  
        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${this._getNamesString(writers)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${this._getNamesString(actors)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${humanizeDate(releaseDate)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${runtime.hours}h ${runtime.minutes}m</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              ${this._createGenreTemplate(genres)}
          </tr>
        </table>
  
        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>`;
  }

  getTemplate() {
    return this._createTemplate(this._film);
  }
}
