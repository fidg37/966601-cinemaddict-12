import Abstract from "./View/abstract.js";
import {IterationCount, InsertPlace} from "./constants.js";

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

  return place === InsertPlace.AFTERBEGIN
    ? container.prepend(child)
    : container.append(child);
};

export const renderTemplate = ({
  container,
  template,
  place = InsertPlace.BEFOREEND,
  iteration = IterationCount.DEFAULT
}) => {
  for (let i = 0; i < iteration; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

const getFractionalNumber = (lower, upper) => {
  const fractionalNumber = Number((lower + Math.random() * (upper - lower + 1)).toFixed(1), 10);

  return (fractionalNumber > upper
    ? Math.floor(fractionalNumber)
    : fractionalNumber
  );
};

export const getRandomInteger = ({a = 0, b = 1, isFractional = false}) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return (isFractional ?
    getFractionalNumber(lower, upper) :
    Math.floor(lower + Math.random() * (upper - lower + 1))
  );
};

export const getRandomBoolean = () => (
  Boolean(getRandomInteger(0, 1))
);

export const humanizeDate = (date, isFilm = true) => {
  if (isFilm) {
    return date.toLocaleDateString(`en`, {day: `numeric`, year: `numeric`, month: `long`});
  }
  return date.toLocaleDateString(`en`, {day: `numeric`, year: `numeric`, month: `long`, hour: `2-digit`, minute: `2-digit`});
};
