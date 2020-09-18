import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();

    this._comments = [];
  }

  setComments(comments) {
    this._comments = [...comments];
  }

  getComments() {
    return this._comments;
  }

  deleteComment(updateType, filmId, deletedComment) {
    const index = this._comments[filmId].findIndex((comment) => comment.id === deletedComment.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting element`);
    }

    this._comments = [
      ...this._films.slice(0, index),
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType);
  }

  addComment(updateType, filmId, newComment) {
    this._comments[filmId].push(newComment);

    this._notify(updateType, newComment);
  }
}
