'use strict';

// Make navbar transarent when it is on the top.
const navBar = document.querySelector('#navbar');

const onSticky = () => { 
  // let navTop = navBar.offsetTop;
  let scrollPos = window.scrollY;
  let navbarHeight = navBar.getBoundingClientRect().height;
  
  if (scrollPos > navbarHeight) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
}

document.addEventListener('scroll', onSticky);


