import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();

    this._comments = {};
  }

  setComments(film, comments) {
    this._comments[film.id] = comments;
  }

  getComments(film) {
    return this._comments[film.id];
  }

  deleteComment(updateType, film, deletedComment) {
    const index = this._comments[film.id].findIndex((comment) => comment.id === deletedComment.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting element`);
    }

    this._comments = [
      ...this._comments[film.id].slice(0, index),
      ...this._comments[film.id].slice(index + 1)
    ];

    this._notify(updateType);
  }

  addComment(updateType, film, newComment) {
    this._comments[film.id].push(newComment);

    this._notify(updateType);
  }
}
