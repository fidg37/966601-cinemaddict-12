import {SortType} from "../constants.js";

const filmsToFilterMap = {
  watchlist: (films) => films.filter((film) => !film.isHistory && film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isHistory).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

const sortByRating = (filmA, filmB) => (
  filmB.rating - filmA.rating
);

const sortByDate = (filmA, filmB) => (
  filmB.releaseDate.getTime() - filmA.releaseDate.getTime()
);

const sortByComments = (films) => {
  const arrayWithoutComments = films.filter((film) => film.comments === null);
  const arrayWithComments = films.filter((film) => film.comments).sort((a, b) => b.comments.length - a.comments.length);
  const sortedArray = arrayWithComments.concat(arrayWithoutComments);

  return {comments: sortedArray.slice(0, 2)};
};

export const getSortedFilms = (films, sortType) => (
  sortType === SortType.BY_DATE
    ? films.sort(sortByDate)
    : films.sort(sortByRating)
);

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
  extraArray.push({rating: [...films].sort(sortByRating).slice(0, 2)});
  extraArray.push(sortByComments(films));

  return {
    filtersCount: createFiltersCountArray(films),
    filtersExtra: extraArray
  };
};
