export const humanizeDate = (date, isFilm = true) => {
  if (isFilm) {
    return date.toLocaleDateString(`en`, {day: `numeric`, year: `numeric`, month: `long`});
  }
  return date.toLocaleDateString(`en`, {day: `numeric`, year: `numeric`, month: `long`, hour: `2-digit`, minute: `2-digit`});
};

export const getRuntime = ({time, onlyHours = false, onlyMinutes = false}) => {
  const hours = Math.floor(time / 60);

  if (onlyHours) {
    return hours;
  }

  const minutes = time < 60 ? time : time % 60;

  if (onlyMinutes) {
    return minutes;
  }

  return hours + ` h ` + minutes + ` m`;
};
