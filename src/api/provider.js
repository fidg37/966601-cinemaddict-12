import FilmsModel from "../model/films.js";

const ContentType = {
  FILMS: `films`,
  COMMENTS: `comments`
};

const getSyncedItems = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.film);
};

export const createStoreStructure = (films) => {
  const store = films.reduce((acc, current) => {
    acc.films[current.id] = current;

    return acc;
  }, {[ContentType.FILMS]: {}, [ContentType.COMMENTS]: {}});

  return store;
};

export const createCommentsStoreStructure = (comments) => {
  const store = comments.reduce((acc, current) => {
    acc[current.id] = current;

    return acc;
  }, {});

  return store;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (Provider.isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return (films);
        });
    }

    const storeFilms = Object.values(this._store.getItems()[ContentType.FILMS]);

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  getComments(film) {
    if (Provider.isOnline()) {
      return this._api.getComments(film)
        .then((comments) => {
          const items = createCommentsStoreStructure(comments);
          this._store.setItem(ContentType.COMMENTS, film.id, items);

          return comments;
        });
    }

    try {
      const storeComments = Object.values(this._store.getItems()[ContentType.COMMENTS][film.id]);

      return Promise.resolve(storeComments);
    } catch (error) {
      return Promise.resolve([]);
    }
  }

  updateFilm(film) {
    if (Provider.isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(ContentType.FILMS, updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._store.setItem(ContentType.FILMS, film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  addComment(id, comment) {
    if (Provider.isOnline()) {
      return this._api.addComment(id, comment)
        .then((newComment) => {
          this._store.setItem(ContentType.COMMENTS, id, newComment, newComment.id);
          return newComment;
        });
    }

    this._store.setItem(ContentType.COMMENTS, id, comment, comment.id);

    return Promise.resolve(comment);
  }

  deleteComment(commentId, filmId) {
    if (Provider.isOnline()) {
      return this._api.deleteComment(commentId)
        .then(() => {
          this._store.removeItem(ContentType.COMMENTS, filmId, commentId);
        });
    }

    this._store.removeItem(ContentType.COMMENTS, filmId, commentId);

    return Promise.resolve();
  }

  syncFilms() {
    if (Provider.isOnline()) {
      const storeFilms = Object.values(this._store.getItems()[ContentType.FILMS]);

      return this._api.syncFilms(storeFilms)
        .then((response) => {
          const updatedFilms = getSyncedItems(response.updated);

          const items = createStoreStructure(updatedFilms);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
