"use strict";

const createUserRankTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteWorkField = document.querySelector(`body`);
const siteHeader = siteWorkField.querySelector(`.header`);

render(siteHeader, createUserRankTemplate(), `beforeend`);
