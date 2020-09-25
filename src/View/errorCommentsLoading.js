import Abstract from "./abstract.js";

export default class ErrorCommentsLoading extends Abstract {
  _createTemplate() {
    return (
      `<p class="error-loading">
    Oops! Something went wrong. To see comments reload the page.
  </p>`
    );
  }

  getTemplate() {
    return this._createTemplate();
  }
}