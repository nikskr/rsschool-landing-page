// ==================== SLIDER ====================
import { slidesContent } from './slidesContent.js';

let currentSliderIndex = 0;

const slideEl = document.getElementById('slide');
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

sliderPrevBtn.addEventListener('click', async () => {
  slideEl.classList.add('hide');

  setTimeout(() => {
    currentSliderIndex--;

    if (currentSliderIndex < 0) {
      currentSliderIndex = slidesContent.length - 1;
    }

    updateSlider();
  }, 300);

  setTimeout(() => {
    slideEl.classList.remove('hide');
  }, 400);
});

sliderNextBtn.addEventListener('click', () => {
  slideEl.classList.add('hide');

  setTimeout(() => {
    currentSliderIndex++;

    if (currentSliderIndex >= slidesContent.length) {
      currentSliderIndex = 0;
    }

    updateSlider();
  }, 300);

  setTimeout(() => {
    slideEl.classList.remove('hide');
  }, 400);
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
