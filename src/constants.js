const SITE_BODY = document.querySelector(`body`);

export const MAX_FILMS_PER_STEP = 5;
export const MAX_DESCRIPTION_LENGTH = 138;

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
