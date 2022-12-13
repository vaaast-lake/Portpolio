'use strict';

// Make navbar transarent when it is on the top.
const navbar = document.querySelector('#navbar');

const onSticky = (scrollPos) => { 
  // let navTop = navBar.offsetTop;
  const navbarHeight = navbar.getBoundingClientRect().height;

  if (scrollPos > navbarHeight) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}

// sticky navbar & navbar active depend on scroll position.
document.addEventListener('scroll', () => {
  const bodyHeight = document.querySelector('body').scrollHeight;
  const scrollPos = window.scrollY;
  const activedItem = navbar.querySelector('.active');
  const navbarItems = document.querySelectorAll('.navbar__menu__item');

  navbarItems.forEach(item => {
    const link = item.dataset.link; // #home
    const section = document.querySelector(link);
    const distanceToTop = window.scrollY + section.getBoundingClientRect().top;
    const sectionHeinght = section.getBoundingClientRect().height;
    const activingItem = navbar.querySelector(`[data-link="${link}"]`);

    if (Math.floor(scrollPos + window.innerHeight) == Math.floor(bodyHeight)) {
      const contact = navbar.querySelector('[data-link="#contact"]');
      activedItem.classList.remove('active');
      contact.classList.add('active');
    }
    else if ((scrollPos + 500 >= distanceToTop) && (scrollPos + 500 < distanceToTop + sectionHeinght)) {
      activedItem.classList.remove('active');
      activingItem.classList.add('active');
    }
  });

  onSticky(scrollPos);
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

const activeItem = (currentTarget, target) => {
  const activedItem = currentTarget.querySelector('.active');
  activedItem.classList.remove('active');
  target.classList.add('active');
}

navbarMenu.addEventListener('click', (event) => {
  const currentTarget = event.currentTarget;
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) return;

  scrollIntoViews(link);
  setTimeout(() => {
    activeItem(currentTarget, target);
  }, 50);
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');

homeContactBtn.addEventListener('click', () => {
  scrollIntoViews('#contact')
});

// Make home slowly fade to transparent as the window scrolls down.
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow-up" button when scrolling down.
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('active');
  } else {
    arrowUp.classList.remove('active');
  }
});

// Handle click on the "arrow up" button.
arrowUp.addEventListener('click', () => {
  scrollIntoViews('#home');
});

const scrollIntoViews = (selector) => {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({block: 'center', behavior: 'smooth'});
}