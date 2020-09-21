import {UpdateType, FilterType} from "../constants.js";

export const humanizeDate = (date, isFilm = true) => {
  date = new Date(date);
  if (isFilm) {
    return date.toLocaleDateString(`en`, {day: `numeric`, year: `numeric`, month: `long`});
  }
  return date.toLocaleDateString(`en`, {day: `numeric`, year: `numeric`, month: `long`, hour: `2-digit`, minute: `2-digit`});
};

export const getRuntime = ({time, onlyHours = false, onlyMinutes = false}) => {
  const hours = Math.floor(time / 60);

  if (onlyHours) {
    return hours;
  }

  const minutes = time < 60 ? time : time % 60;

  if (onlyMinutes) {
    return minutes;
  }

  return hours + ` h ` + minutes + ` m`;
};

export const getUpdateType = ({isCommentsChange, currentFilter, filterType}) => {
  if (isCommentsChange) {
    return UpdateType.MINOR;
  }

  if (currentFilter === FilterType.ALL || currentFilter !== filterType) {
    return UpdateType.PATCH;
  } else {
    return UpdateType.MINOR;
  }
};
