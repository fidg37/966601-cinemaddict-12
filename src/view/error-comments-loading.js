import Abstract from "./abstract.js";

export default class ErrorCommentsLoading extends Abstract {
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<p class="error-loading">
    Oops! Something went wrong. To see comments reload the page.
  </p>`
    );
  }
}
