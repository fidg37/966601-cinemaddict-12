import Abstract from "../view/abstract.js";
import {InsertPlace} from "../constants.js";

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = ({container, child, place = InsertPlace.BEFOREEND}) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (place === InsertPlace.AFTERBEGIN) {
    container.prepend(child);
  } else {
    container.append(child);
  }
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
