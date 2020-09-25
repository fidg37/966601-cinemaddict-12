// import {contentType} from "../constants.js";

export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItem(contentType, key, value, commentId) {
    const store = this.getItems();

    if (commentId) {
      store[contentType][key][commentId] = value;
    } else {
      store[contentType][key] = value;
    }

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            store
        )
    );
  }

  setItems(items) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }

  removeItem(contentType, key, id) {
    const store = this.getItems();

    delete store[contentType][key][id];

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(store)
    );
  }
}
