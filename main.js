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

// sticky navbar & navbar selected depend on scroll position.
document.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  // const bodyHeight = document.querySelector('body').scrollHeight;
  // const selectedItem = navbar.querySelector('.selected');
  // const navbarItems = document.querySelectorAll('.navbar__menu__item');

  // navbarItems.forEach(item => {
  //   const link = item.dataset.link; // #home
  //   const section = document.querySelector(link);
  //   const distanceToTop = window.scrollY + section.getBoundingClientRect().top;
  //   const sectionHeinght = section.getBoundingClientRect().height;
  //   const activingItem = navbar.querySelector(`[data-link="${link}"]`);

  //   if (Math.floor(scrollPos + window.innerHeight) == Math.floor(bodyHeight)) {
  //     const contact = navbar.querySelector('[data-link="#contact"]');
  //     selectedItem.classList.remove('selected');
  //     contact.classList.add('selected');
  //   }
  //   else if ((scrollPos + 300 >= distanceToTop) && (scrollPos + 300 < distanceToTop + sectionHeinght)) {
  //     selectedItem.classList.remove('selected');
  //     activingItem.classList.add('selected');
  //   }
  // });
  onSticky(scrollPos);
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

const selectedItem = (currentTarget, target) => {
  const selectedItem = currentTarget.querySelector('.selected');
  selectedItem.classList.remove('selected');
  target.classList.add('selected');
}

navbarMenu.addEventListener('click', (event) => {
  const currentTarget = event.currentTarget;
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) return;

  scrollIntoViews(link);
  setTimeout(() => {
    selectedItem(currentTarget, target);
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

// filtering with "category button"
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (element) => {
  if (element.target === element.currentTarget) return;
  const button = element.target.tagName === 'BUTTON' ? element.target : element.target.parentNode;
  const filter = element.target.dataset.filter || element.target.parentNode.dataset.filter;

  // Project animation
  if (filter == null) return;
  
  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    projects.forEach((project) =>{
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);

  // Project button selected
  selectedItem(element.currentTarget, button);
});

// Toggle button
navbar.addEventListener('click', e => {
  const toggleBtn = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;

  if (toggleBtn === null) return;

  navbar.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});