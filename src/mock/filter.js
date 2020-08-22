import {SortType} from "../constants.js";

const MAX_EXTRA_FILMS_COUNT = 2;

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
  const {filmsWithoutComments, filmsWithComments} = films.reduce((acc, film) => {
    if (film.comments) {
      acc.filmsWithComments.push(film);
    } else {
      acc.filmsWithoutComments.push(film);
    }

    return acc;
  }, {filmsWithoutComments: [], filmsWithComments: []});

  const sortedFilms = filmsWithComments
    .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length)
    .concat(filmsWithoutComments)
    .slice(0, MAX_EXTRA_FILMS_COUNT)
  ;

  return sortedFilms;
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
  extraArray.push({rating: [...films].sort(sortByRating).slice(0, MAX_EXTRA_FILMS_COUNT)});
  extraArray.push({comments: sortByComments(films)});

  return {
    filtersCount: createFiltersCountArray(films),
    filtersExtra: extraArray
  };
};
