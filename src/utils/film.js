export const humanizeDate = (date, isFilm = true) => {
  if (isFilm) {
    return date.toLocaleDateString(`en`, {day: `numeric`, year: `numeric`, month: `long`});
  }
  return date.toLocaleDateString(`en`, {day: `numeric`, year: `numeric`, month: `long`, hour: `2-digit`, minute: `2-digit`});
};
