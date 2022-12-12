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

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

const activeItem = (target) => {
  const activedItem = document.querySelector('.active');
  activedItem.classList.remove('active');
  target.classList.add('active');
}

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  const scrollToSection = document.querySelector(link);

  if (link == null) return;

  scrollToSection.scrollIntoView({behavior: 'smooth'});
  activeItem(target);
});
