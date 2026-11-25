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

const isMobile = window.matchMedia('(max-width: 768px)');

const burgerBtn = document.getElementById('burger-btn');
const headerElement = document.querySelector('header');
const burgerMenu = document.querySelector('.burger-menu');
const burgerBtnSvg = document.getElementById('burger-icon');

function toggleBurgerBtnSvg() {
  if (burgerMenu.classList.contains('inactive')) {
    burgerBtnSvg.innerHTML = `<path d="M0.75 0.75H16.75" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0.75 8.75H16.75" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    burgerBtnSvg.setAttribute('width', '18');
    burgerBtnSvg.setAttribute('height', '10');
    burgerBtnSvg.setAttribute('viewBox', '0 0 18 10');
  } else {
    burgerBtnSvg.innerHTML = `<path d="M0.75 0.75L12.0637 12.0637" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0.75 12.0637L12.0637 0.750013" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    burgerBtnSvg.setAttribute('width', '13');
    burgerBtnSvg.setAttribute('height', '13');
    burgerBtnSvg.setAttribute('viewBox', '0 0 13 13');

    const allHeaderLinks = document.querySelectorAll(
      'header.burger-menu-active a',
    );

    allHeaderLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeBurgerMenu();
      });
    });
  }
}

burgerBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('no-scroll');
  headerElement.classList.toggle('burger-menu-active');
  burgerMenu.classList.toggle('inactive');
  toggleBurgerBtnSvg();
});

function closeBurgerMenu() {
  htmlElement.classList.remove('no-scroll');
  headerElement.classList.remove('burger-menu-active');
  burgerMenu.classList.add('inactive');
  toggleBurgerBtnSvg();
}

function handleMobileScreenWidthChange(e) {
  if (!e.matches) {
    closeBurgerMenu();
  }
}

isMobile.addEventListener('change', handleMobileScreenWidthChange);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBurgerMenu();
  }
});
