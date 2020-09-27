import AbstractView from "./abstract.js";

export default class UserRank extends AbstractView {
  getTemplate() {
    return this._createTemplate();
  }

  changeRank(newRank) {
    this.getElement().querySelector(`.profile__rating`).innerHTML = newRank;
  }

  _createTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating"></p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
