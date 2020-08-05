import {IterationCount, InsertPlace} from "./constants.js";

export const render = ({
  container,
  template,
  place = InsertPlace.BEFOREEND,
  iteration = IterationCount.DEFAULT
}) => {
  for (let i = 0; i < iteration; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

export const getRandomInteger = ({a = 0, b = 1, isFractional = false}) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  if (isFractional) {
    let fractionalNumber = Number((lower + Math.random() * (upper - lower + 1)).toFixed(1), 10);

    fractionalNumber = fractionalNumber > upper
      ? Math.floor(fractionalNumber)
      : fractionalNumber;

    return fractionalNumber;
  }

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomBoolean = () => (
  Boolean(getRandomInteger(0, 1))
);
