const SITE_BODY = document.querySelector(`body`);

export const Keycodes = {
  ESC: 27
};

export const IterationCount = Object.freeze({
  DEFAULT: 1,
  CARD: 22,
  EXTRA: 2,
  COMMENT: 4
});

export const InsertPlace = Object.freeze({
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`
});

export const SiteElements = Object.freeze({
  BODY: SITE_BODY,
  HEADER: SITE_BODY.querySelector(`.header`),
  MAIN: SITE_BODY.querySelector(`main`),
  FOOTER: SITE_BODY.querySelector(`.footer`)
});

export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`
};

export const ButtonType = {
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};

export const UpdateType = {
  MINOR: `minor`,
  MAJOR: `major`
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};
