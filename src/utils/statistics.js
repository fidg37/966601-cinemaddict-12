import {FilterType} from "../constants.js";
import {filter} from "./filter.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";

export const StatsFilterType = {
  ALL: `all`,
  TODAY: `day`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const getFilteredFilms = (films, filterType) => {
  if (filterType === FilterType.ALL) {
    return films;
  }

  const dateFrom = moment().startOf(filterType);
  const dateTo = moment();

  return [...films].filter((film) => moment(film.userDetails.watchingDate).isBetween(dateFrom, dateTo));
};

export const getTotalRuntime = (films) => {
  const total = films.reduce((acc, film) => {
    acc += film.filmInfo.runtime;
    return acc;
  }, 0);

  return total;
};

export const getWatchedFilms = (films) => (
  filter[FilterType.HISTORY](films)
);

export const getGenres = (films) => {
  const watchedFilms = getWatchedFilms(films);
  const genres = new Set();

  for (let film of watchedFilms) {
    genres.add(film.filmInfo.genre[0]);
  }

  return Array.from(genres);
};

export const getCountWatchedFilmsByGenre = (films, genres) => {
  const watchedFilms = getWatchedFilms(films);

  const count = watchedFilms.reduce((acc, film) => {
    const index = genres.findIndex((genre) => genre === film.filmInfo.genre[0]);

    acc[index] += 1;

    return acc;
  }, genres.map(() => 0));

  return count;
};

export const getTopGenre = (genres, watchedCount) => {
  const maxCount = Math.max.apply(null, watchedCount);
  const index = watchedCount.findIndex((value) => value === maxCount);
  return genres[index];
};

export const renderColorsChart = (statisticCtx, genres, countWatchedFilmsByGenre) => {
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: countWatchedFilmsByGenre,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};
