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

// ==================== SLIDER BY SWIPE ====================

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
