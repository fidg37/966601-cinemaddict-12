import {FilterType, SortType} from "../constants.js";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => !film.isHistory && film.isWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isHistory),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite)
};

export const getFilmsSortedByComments = (films) => {
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
  ;

  return sortedFilms;
};

const sortByRating = (filmA, filmB) => (
  filmB.filmInfo.totalRating - filmA.filmInfo.totalRating
);

const sortByDate = (filmA, filmB) => (
  filmB.filmInfo.release.date.getTime() - filmA.filmInfo.release.date.getTime()
);

export const getSortedFilms = (films, sortType) => (
  sortType === SortType.BY_DATE
    ? films.sort(sortByDate)
    : films.sort(sortByRating)
);
