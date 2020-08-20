import {getRandomInteger, getRandomBoolean} from "../utils/common.js";

const MAX_SENTENCE_COUNT = 5;
const MIN_RATING = 0.1;
const MAX_RATING = 10;
const MAX_WRITERS_COUNT = 3;
const MAX_ACTORS_COUNT = 5;
const MAX_GENRES = 3;
const MAX_COMMENTS = 22;

const NAMES = [
  `Dan Duryea`,
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`
];

const GENRES = [
  `Drama`,
  `Horror`,
  `Triller`,
  `Trash`,
  `Road movie`,
  `Film-Noir`,
  `Mystery`
];

const COUNTRIES = [
  `Cambodia`,
  `Thailand`,
  `Malaysia`,
  `Mexico`,
  `Peru`,
  `Argentina`,
  `Vietnam`,
  `Nepal`,
  `Pakistan`
];

const FILM_TITLES = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush trail`,
  `Santa Claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const EMOTIONS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const textLorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getRandomText = (text, count, separator = `. `) => {
  const textArray = text.split(separator);
  const sentenceCount = getRandomInteger({a: 1, b: count});
  const randomizedTextArray = new Array(sentenceCount).fill().map(() => (
    textArray[getRandomInteger({a: 0, b: textArray.length - 1})]
  ));

  return randomizedTextArray.map((sentence) => sentence).join(separator);
};

const getRandomDate = () => {
  const currentDate = new Date();
  const randomDate = new Date(getRandomInteger({a: 0, b: currentDate.getTime()}));

  return new Date(randomDate);
};

const getRandomTime = () => {
  const hours = getRandomInteger({a: 0, b: 24});
  const minutes = getRandomInteger({a: 0, b: 60});

  return {hours, minutes};
};

const createComment = (count) => {
  if (count === 0) {
    return null;
  }

  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push({
      text: getRandomText(textLorem, MAX_SENTENCE_COUNT),
      emotion: EMOTIONS[getRandomInteger({a: 0, b: EMOTIONS.length - 1})],
      author: NAMES[getRandomInteger({a: 0, b: NAMES.length - 1})],
      date: getRandomDate(),
    });
  }

  return comments;
};

export const createFilmInfo = () => {
  const randomPosterNumber = getRandomInteger({a: 0, b: POSTERS.length - 1});

  return {
    poster: POSTERS[randomPosterNumber],
    title: FILM_TITLES[randomPosterNumber],
    rating: getRandomInteger({a: MIN_RATING, b: MAX_RATING, isFractional: true}),
    director: NAMES[getRandomInteger({a: 0, b: NAMES.length - 1})],
    writers: new Array(MAX_WRITERS_COUNT).fill().map(() => NAMES[getRandomInteger({a: 0, b: NAMES.length - 1})]),
    actors: new Array(MAX_ACTORS_COUNT).fill().map(() => NAMES[getRandomInteger({a: 0, b: NAMES.length - 1})]),
    releaseDate: getRandomDate(),
    runtime: getRandomTime(),
    country: COUNTRIES[getRandomInteger({a: 0, b: COUNTRIES.length - 1})],
    genres: new Array(MAX_GENRES).fill().map(() => GENRES[getRandomInteger({a: 0, b: GENRES.length - 1})]),
    description: getRandomText(textLorem, MAX_SENTENCE_COUNT),
    isAdult: getRandomBoolean(),
    comments: createComment(getRandomInteger({a: 0, b: MAX_COMMENTS})),
    isWatchlist: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    isHistory: getRandomBoolean()
  };
};
