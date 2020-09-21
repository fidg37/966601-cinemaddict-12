import Abstract from "../view/abstract.js";
import CommentView from "../view/comment.js";
import {render} from "../utils/render.js";

export default class Comment extends Abstract {
  constructor(commentContainer, commentData, filmData, changeData, api) {
    super();

    this._commentData = commentData;
    this._commentContainer = commentContainer;
    this._filmData = filmData;
    this._changeData = changeData;
    this._api = api;
    this._commentComponent = null;

    this._handlers = {
      delete: this.destroy.bind(this)
    };
  }

  init() {
    this._commentComponent = new CommentView(this._commentData, this._api);

    this._commentComponent.setDeleteButtonClickHandler(this._handlers.delete);

    render({container: this._commentContainer, child: this._commentComponent});
  }

  destroy(commentData) {
    this._api.deleteComment(commentData.id)
      .then(() => {
        this._filmData.comments = this._filmData.comments.filter((comment) => comment !== commentData.id);
        this._changeData(this._filmData);
      })
      .catch();
  }
}
