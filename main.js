'use strict';

const navBar = document.querySelector('#navbar');

const onSticky = () => {
  let navTop = navBar.offsetTop;
  let scrollPos = window.scrollY;

  if (scrollPos > navTop) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
}

window.addEventListener('scroll', onSticky);


