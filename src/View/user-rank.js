import {createElement} from "../util.js";

export default class UserRank {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">Movie Buff</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }

  getElement() {
    return !this._element ? createElement(this.getTemplate()) : this._element;
  }

  removeElement() {
    this._element = null;
  }
}
