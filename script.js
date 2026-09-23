const products = {
  tea: [
    {
      name: 'Moroccan',
      description:
        'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint',
      price: '$4.50',
      img: './assets/images/tea-1.jpg',
    },
    {
      name: 'Ginger',
      description: 'Original black tea with fresh ginger, lemon and honey',
      price: '$5.00',
      img: './assets/images/tea-2.jpg',
    },
    {
      name: 'Cranberry',
      description: 'Invigorating black tea with cranberry and honey',
      price: '$4.50',
      img: './assets/images/tea-3.jpg',
    },
    {
      name: 'Sea buckthorn',
      description:
        'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon',
      price: '$5.50',
      img: './assets/images/tea-4.jpg',
    },
  ],
  coffee: [
    {
      name: 'Irish coffee',
      description:
        'Fragrant black coffee with Jameson Irish whiskey and whipped milk',
      price: '$7.00',
      img: './assets/images/coffee-1.jpg',
    },
    {
      name: 'Kahlua coffee',
      description:
        'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk',
      price: '$7.00',
      img: './assets/images/coffee-2.jpg',
    },
    {
      name: 'Honey raf',
      description: 'Espresso with frothed milk, cream and aromatic honey',
      price: '$5.50',
      img: './assets/images/coffee-3.jpg',
    },
    {
      name: 'Ice cappuccino',
      description: 'Cappuccino with soft thick foam in summer version with ice',
      price: '$5.00',
      img: './assets/images/coffee-4.jpg',
    },
    {
      name: 'Espresso',
      description: 'Classic black coffee',
      price: '$4.50',
      img: './assets/images/coffee-5.jpg',
    },
    {
      name: 'Latte',
      description:
        'Espresso coffee with the addition of steamed milk and dense milk foam',
      price: '$5.50',
      img: './assets/images/coffee-6.jpg',
    },
    {
      name: 'Latte macchiato',
      description: 'Espresso with frothed milk and chocolate',
      price: '$5.50',
      img: './assets/images/coffee-7.jpg',
    },
    {
      name: 'Coffee with cognac',
      description: 'Fragrant black coffee with cognac and whipped cream',
      price: '$6.50',
      img: './assets/images/coffee-8.jpg',
    },
  ],
  dessert: [
    {
      name: 'Marble cheesecake',
      description:
        'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam',
      price: '$3.50',
      img: './assets/images/dessert-1.jpg',
    },
    {
      name: 'Red velvet',
      description: 'Layer cake with cream cheese frosting',
      price: '$4.00',
      img: './assets/images/dessert-2.jpg',
    },
    {
      name: 'Cheesecakes',
      description:
        'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar',
      price: '$4.50',
      img: './assets/images/dessert-3.jpg',
    },
    {
      name: 'Creme brulee',
      description:
        'Delicate creamy dessert in a caramel basket with wild berries',
      price: '$4.00',
      img: './assets/images/dessert-4.jpg',
    },
    {
      name: 'Pancakes',
      description: 'Tender pancakes with strawberry jam and fresh strawberries',
      price: '$4.50',
      img: './assets/images/dessert-5.jpg',
    },
    {
      name: 'Honey cake',
      description: 'Classic honey cake with delicate custard',
      price: '$4.50',
      img: './assets/images/dessert-6.jpg',
    },
    {
      name: 'Chocolate cake',
      description:
        'Cake with hot chocolate filling and nuts with dried apricots',
      price: '$5.50',
      img: './assets/images/dessert-7.jpg',
    },
    {
      name: 'Black forest',
      description:
        'A combination of thin sponge cake with cherry jam and light chocolate mousse',
      price: '$6.50',
      img: './assets/images/dessert-8.jpg',
    },
  ],
};

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
  headerElement.classList.toggle('burger-menu-active');
  burgerMenu.classList.toggle('inactive');

  if (burgerMenu.classList.contains('inactive')) {
    burgerBtnImg.src = './assets/icons/burger-menu.svg';
  } else {
    burgerBtnImg.src = './assets/icons/close.svg';
  }
});

// ==================== SLIDER ====================

const slidesContent = [
  {
    name: 'S`mores Frappuccino',
    description:
      'This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.',
    price: '$5.50',
    img: './assets/images/coffee-slider-1.png',
  },
  {
    name: 'Caramel Macchiato',
    description:
      'Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.',
    price: '$5.00',
    img: './assets/images/coffee-slider-2.png',
  },
  {
    name: 'Ice coffee',
    description:
      'A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.',
    price: '$4.50',
    img: './assets/images/coffee-slider-3.png',
  },
];

let currentSliderIndex = 0;

const sliderImg = document.getElementById('slide-img');
const sliderTitle = document.getElementById('slide-title');
const sliderDescription = document.getElementById('slide-description');
const sliderPrice = document.getElementById('slide-price');

const sliderPrevBtn = document.querySelector('.slider-prev-btn');
const sliderNextBtn = document.querySelector('.slider-next-btn');

const dashesContainer = document.querySelector('.slider-pagination');

function createDashes() {
  slidesContent.forEach((_, i) => {
    const dash = document.createElement('div');
    dash.classList.add('dash');

    dash.addEventListener('click', () => {
      currentSliderIndex = i;
      updateSlider();
    });

    dashesContainer.append(dash);
  });
}

function updateSlider() {
  sliderImg.src = slidesContent[currentSliderIndex].img;
  sliderTitle.textContent = slidesContent[currentSliderIndex].name;
  sliderDescription.textContent = slidesContent[currentSliderIndex].description;
  sliderPrice.textContent = slidesContent[currentSliderIndex].price;

  const allDashElements = document.querySelectorAll('.dash');

  allDashElements.forEach((dashElement, i) => {
    if (i === currentSliderIndex) {
      dashElement.classList.add('active');
    } else {
      dashElement.classList.remove('active');
    }
  });
}

sliderPrevBtn.addEventListener('click', () => {
  currentSliderIndex--;

  if (currentSliderIndex < 0) {
    currentSliderIndex = slidesContent.length - 1;
  }

  updateSlider();
});

sliderNextBtn.addEventListener('click', () => {
  currentSliderIndex++;

  if (currentSliderIndex >= slidesContent.length) {
    currentSliderIndex = 0;
  }

  updateSlider();
});

function sliderInit() {
  createDashes();
  updateSlider();
}

sliderInit();

// ==================== SLIDER BY SWIPE ON MOBILE ====================

let touchPointStartX = 0;
let touchPointEndX = 0;

const minSwipeDistance = 50;

const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('touchstart', (event) => {
  touchPointStartX = event.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', (event) => {
  touchPointEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchPointEndX - touchPointStartX;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      sliderPrevBtn.click();
    } else {
      sliderNextBtn.click();
    }
  }
}
