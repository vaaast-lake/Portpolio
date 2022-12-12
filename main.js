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
    const sectionTop = section.offsetTop;
    const sectionHeinght = section.getBoundingClientRect().height;
    const activingItem = navbar.querySelector(`[data-link="${link}"]`);

    if (Math.floor(scrollPos + window.innerHeight + 200) >= Math.floor(bodyHeight)) {
      const contact = navbar.querySelector('[data-link="#contact"]');
      activedItem.classList.remove('active');
      contact.classList.add('active');
    }
    else if ((scrollPos + 150 >= sectionTop) && (scrollPos + 150 < sectionTop + sectionHeinght)) {
      activedItem.classList.remove('active');
      activingItem.classList.add('active');
    }
  });

  onSticky(scrollPos);
});

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

  if (link == null) return;

  scrollIntoViews(link);
  setTimeout(() => {
    activeItem(target);
  }, 50);
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');

homeContactBtn.addEventListener('click', () => {
  scrollIntoViews('#contact')
});

const scrollIntoViews = (selector) => {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}