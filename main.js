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

// Scroll to section when click item.
const menu = document.querySelector('.navbar__menu');

// create border line, scroll to section
const activeItem = (event) => {
  const target = event.target;
  const activedItem = document.querySelector('.active');
  const sectionString = target.textContent.toLowerCase();
  const section = document.querySelector(`#${sectionString}`);
  const sectionY = section.getBoundingClientRect().top;

  activedItem.classList.remove('active');
  target.classList.add('active');
  window.scrollBy({
    top: sectionY,
    behavior: 'smooth'
  });
}

menu.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') activeItem(event);
});
