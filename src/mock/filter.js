const filmsToFilterMap = {
  whatchlist: (films) => films
    .filter((film) => !film.isHistory)
    .filter((film) => film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isHistory).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmsToFilterMap).map(([filterName, filterValue]) => {
    return {
      name: filterName,
      count: filterValue(films)
    };
  });
};
