import Abstract from "./abstract.js";

export default class Loading extends Abstract {
  _createTemplate() {
    return (
      `<p class="board__no-films">
    Loading...
  </p>`
    );
  }

  getTemplate() {
    return this._createTemplate();
  }
}
