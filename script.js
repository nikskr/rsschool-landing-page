// ==================== DARK MODE ====================

const toggleBtn = document.getElementById('toggle-theme-btn');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  htmlElement.classList.add('dark');
}

toggleBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');

  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// ==================== BURGER MENU ====================

const burgerBtn = document.getElementById('burger-btn');
const headerElement = document.querySelector('header');
const burgerMenu = document.querySelector('.burger-menu');
const burgerBtnImg = document.querySelector('.burger-menu-img');

burgerBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('no-scroll');
  headerElement.classList.toggle('burger-menu-active');
  burgerMenu.classList.toggle('inactive');

  if (burgerMenu.classList.contains('inactive')) {
    burgerBtnImg.src = './assets/icons/burger-menu.svg';
  } else {
    burgerBtnImg.src = './assets/icons/close.svg';
    const allHeaderLinks = document.querySelectorAll(
      'header.burger-menu-active a',
    );

    allHeaderLinks.forEach((link) => {
      link.addEventListener('click', () => {
        console.log('LINK CLICKED!');
        closeBurgerMenu();
      });
    });
  }
});

function closeBurgerMenu() {
  htmlElement.classList.remove('no-scroll');
  headerElement.classList.remove('burger-menu-active');
  burgerMenu.classList.add('inactive');
  burgerBtnImg.src = './assets/icons/burger-menu.svg';
}

const isNotMobile = window.matchMedia('(min-width: 769px)');

function closeBurgerMenuByChangeScreen(e) {
  if (e.matches) {
    closeBurgerMenu();
  }
}

isNotMobile.addEventListener('change', closeBurgerMenuByChangeScreen);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBurgerMenu();
  }
});
