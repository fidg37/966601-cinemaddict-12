import {IterationCount, InsertPlace} from "./constants.js";

export const render = ({
  container,
  template,
  place = InsertPlace.BEFOREEND,
  iteration = IterationCount.DEFAULT
}) => {
  for (let i = 0; i < iteration; i++) {
    container.insertAdjacentHTML(place, template);
  }
};
