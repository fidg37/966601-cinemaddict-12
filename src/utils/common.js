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
