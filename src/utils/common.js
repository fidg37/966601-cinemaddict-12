import Abstract from "../view/abstract.js";

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

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;
  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
