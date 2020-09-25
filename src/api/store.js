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

    this._setItemToStorage(store);
  }

  setItems(items) {
    this._setItemToStorage(items);
  }

  removeItem(contentType, key, id) {
    const store = this.getItems();

    delete store[contentType][key][id];

    this._setItemToStorage(store);
  }

  _setItemToStorage(item) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(item)
    );
  }
}
