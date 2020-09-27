import Abstract from "./abstract.js";

export default class Loading extends Abstract {
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<p class="board__no-films">
    Loading...
  </p>`
    );
  }
}
