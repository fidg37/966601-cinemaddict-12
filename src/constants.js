const SITE_BODY = document.querySelector(`body`);

export const IterationCount = Object.freeze({
  DEFAULT: 1,
  CARD: 20,
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
