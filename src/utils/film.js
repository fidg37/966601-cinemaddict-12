import {UpdateType, FilterType, UserRank} from "../constants.js";
import moment from "moment";

export const humanizeDate = (date, isFilm = true) => {
  date = new Date(date);
  if (isFilm) {
    return moment(date).format(`DD MMMM YYYY`);
  }

  const dateFrom = moment().add(-1, `m`);
  const dateTo = moment().add(5, `m`);

  if (moment(date).isBetween(dateFrom, dateTo)) {
    return `a few minutes ago`;
  }

  return moment(date).format(`YYYY/MM/DD HH:mm`);
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

export const getRank = (watchedFilmsCount) => {
  if (watchedFilmsCount === UserRank.NONE.count) {
    return UserRank.NONE.name;
  }

  if (watchedFilmsCount > UserRank.NONE.count && watchedFilmsCount <= UserRank.NOVICE.count) {
    return UserRank.NOVICE.name;
  }

  if (watchedFilmsCount > UserRank.NOVICE.count && watchedFilmsCount <= UserRank.FAN.count) {
    return UserRank.FAN.name;
  }

  return UserRank.MOVIE_BUFF.name;
};
