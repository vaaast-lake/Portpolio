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
  onSticky(scrollPos);
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

const selectItem = (currentTarget, target) => {
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
  // setTimeout(() => {
    selectItem(currentTarget, target);
  // }, 50);

  navbar.classList.remove('active');
  navbarMenu.classList.remove('active');
  // 클릭으로 변경된 class list 요소를 아래 selectedNavItem 변수에도 적용해준다.
  selectNavItem(target);
});

// Toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
  navbarMenu.classList.toggle('active');
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
  selectItem(element.currentTarget, button);
});

// 1. 모든 섹션 요소와 메뉴 아이템을 가져온다
// 2. intersectionObserver를 이용, 모든 섹션을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact'
]
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => navbarMenu.querySelector(`[data-link="${id}"]`));

let selectedNavIdx = 0;
let selectedNavItem = navItems[selectedNavIdx];

const selectNavItem = (selected) => {
  selectedNavItem.classList.remove('selected');
  selectedNavItem = selected;
  selectedNavItem.classList.add('selected');
}

const scrollIntoViews = (selector) => {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({block: 'start', behavior: 'smooth'});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIdx = index + 1;
      } else {
        selectedNavIdx = index - 1;
      }
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIdx = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight) {
    selectedNavIdx = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIdx]);
  // console.log('eventListener end');
});