const filmsToFilterMap = {
  watchlist: (films) => films.filter((film) => !film.isHistory && film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isHistory).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

const sortByRating = (films) => (
  {rating: films.sort((a, b) => b.rating - a.rating).slice(0, 2)}
);

const sortByComments = (films) => {
  const arrayWithoutComments = films.filter((film) => film.comments === null);
  const arrayWithComments = films.filter((film) => film.comments).sort((a, b) => b.comments.length - a.comments.length);
  const sortedArray = arrayWithComments.concat(arrayWithoutComments);

  return {comments: sortedArray.slice(0, 2)};
};

const createFiltersCountArray = (films) => (
  Object.entries(filmsToFilterMap).map(([filterName, filterValue]) => (
    {
      name: filterName,
      count: filterValue(films)
    }
  ))
);

export const generateFilter = (films) => {
  const extraArray = [];
  extraArray.push(sortByRating(films));
  extraArray.push(sortByComments(films));

  return {
    filtersCount: createFiltersCountArray(films),
    filtersExtra: extraArray
  };
};
