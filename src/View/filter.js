const createFilters = (filters) => (
  [...filters].map(({name, count}) => {
    return `<a href="#${name}" class="main-navigation__item">${createFilterName(name)}<span class="main-navigation__item-count">${count}</span></a>`;
  }).join(``)
);

const createFilterName = (name) => (
  name.split(``).map((letter, index) => (index === 0 ? letter.toUpperCase() : letter)).join(``)
);

export const createFilterTemplate = (filters) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createFilters(filters.filtersCount)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);
