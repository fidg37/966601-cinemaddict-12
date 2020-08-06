export const createFilterTemplate = (filters) => {
  const createFilterName = (name) => {
    const nameArray = name.split(``);

    nameArray[0] = nameArray[0].toUpperCase();

    return nameArray.join(``);
  };

  const createFilters = (items) => (
    items.map(({name, count}) => {
      return `<a href="#${name}" class="main-navigation__item">${createFilterName(name)}<span class="main-navigation__item-count">${count}</span></a>`;
    }).join(``)
  );

  return (`<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createFilters(filters)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`);
};
