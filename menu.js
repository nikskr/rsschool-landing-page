// ==================== CARDS ====================

async function getProducts() {
  try {
    const response = await fetch('./products.json');
    if (!response.ok) {
      console.log('Products loading error', response.status);
    }
    const products = await response.json();

    return products;
  } catch (error) {
    throw new Error('Get products error');
  }
}

async function filterProductsByCategory(allProducts, selectedCategory) {
  try {
    const filteredProducts = allProducts.filter(
      (product) => product.category === selectedCategory,
    );
    return filteredProducts;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getFilteredByCategoryProducts(selectedCategory) {
  const allProducts = await getProducts();
  const filteredProducts = await filterProductsByCategory(
    allProducts,
    selectedCategory,
  );
  return filteredProducts;
}

const productList = document.querySelector('.products-list');

const modalOverlay = document.getElementById('modal');

function renderCards(products, isForMobileInitialProducts) {
  productList.innerHTML = '';

  if (products.length > 4 && isForMobileInitialProducts) {
    renderRestProductsBtn(true);
  } else {
    renderRestProductsBtn(false);
  }

  products.forEach((product, index) => {
    if (isForMobileInitialProducts && index >= 4) return;

    const productCard = document.createElement('li');
    productCard.classList.add('product-card');

    const productImg = document.createElement('img');
    productImg.classList.add('product-img');
    productImg.src = `./assets/images/${product.category}-${index + 1}.jpg`;
    productImg.alt = product.name;

    productCard.appendChild(productImg);

    const productInfoContainer = document.createElement('div');
    productInfoContainer.classList.add('product-info');

    const productTitle = document.createElement('h2');
    productTitle.classList.add('product-title', 'heading-3');
    productTitle.textContent = product.name;

    productInfoContainer.appendChild(productTitle);

    const productDescription = document.createElement('p');
    productDescription.classList.add('product-description');
    productDescription.textContent = product.description;

    productInfoContainer.appendChild(productDescription);

    const productPrice = document.createElement('h2');
    productPrice.classList.add('product-price', 'heading-3');
    productPrice.textContent = `$${product.price}`;

    productInfoContainer.appendChild(productPrice);

    productCard.appendChild(productInfoContainer);

    productCard.addEventListener('click', () => {
      openModal(product, index);
    });

    productList.appendChild(productCard);
  });
}

async function renderFilteredProductCards(
  category,
  isForMobileInitialProducts,
) {
  const products = await getFilteredByCategoryProducts(category);
  renderCards(products, isForMobileInitialProducts);
}

const initialCategory = 'coffee';

renderFilteredProductCards(initialCategory, isMobile.matches);

const categoryBtns = document.querySelectorAll('.menu-tab-btn');

function toggleActiveBtnStyle(btnId) {
  categoryBtns.forEach((btn) => {
    if (btn.id !== btnId) {
      btn.classList.remove('active');
    } else {
      btn.classList.add('active');
    }
  });
}

categoryBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    toggleActiveBtnStyle(btn.id);
    renderFilteredProductCards(btn.id, isMobile.matches);
  });
});

const restProductsBtn = document.getElementById('rest-btn');

restProductsBtn.addEventListener('click', () => {
  const currentCategory = document.querySelector('.menu-tab-btn.active').id;
  renderFilteredProductCards(currentCategory, false);
});

function renderRestProductsBtn(isRendered) {
  if (isRendered) {
    restProductsBtn.classList.add('active');
  } else {
    restProductsBtn.classList.remove('active');
  }
}

isMobile.addEventListener('change', (e) => {
  const currentCategory = document.querySelector('.menu-tab-btn.active').id;
  if (e.matches) {
    renderFilteredProductCards(currentCategory, true);
  } else {
    renderFilteredProductCards(currentCategory, false);
  }
});

// ==================== MODAL ====================

const closeModalBtn = document.getElementById('modal-close-btn');

closeModalBtn.addEventListener('click', () => {
  closeModal();
});

modalOverlay.addEventListener('click', () => {
  closeModal();
});

const modalContainer = document.querySelector('.modal-container');

modalContainer.addEventListener('click', (e) => {
  e.stopPropagation();
});

const sizeListElement = document.getElementById(`modal-product-sizes-list`);
const additivesListElement = document.getElementById(
  `modal-product-additives-list`,
);

let totalPrice = 0;

function handleActiveSize(sizeKey, product) {
  const activeSizeEl = sizeListElement.querySelector(
    '.modal-params-item.active',
  );
  totalPrice -= Number(product.sizes[activeSizeEl.id]['add-price']);
  activeSizeEl.classList.remove('active');

  const newActiveSizeEl = sizeListElement.querySelector(
    `.modal-params-item#${sizeKey}`,
  );
  totalPrice += Number(product.sizes[sizeKey]['add-price']);
  newActiveSizeEl.classList.add('active');

  priceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function handleActiveAdditive(additiveName, additivePrice) {
  const additiveItemEl = additivesListElement.querySelector(`#${additiveName}`);
  if (additiveItemEl.classList.contains('active')) {
    additiveItemEl.classList.remove('active');
    totalPrice -= Number(additivePrice);
    priceElement.textContent = `$${totalPrice.toFixed(2)}`;
  } else {
    additiveItemEl.classList.add('active');
    totalPrice += Number(additivePrice);
    priceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

function fillSizeParamList(product) {
  for (const [key, value] of Object.entries(product.sizes)) {
    const paramsItemElement = document.createElement('li');
    paramsItemElement.classList.add('modal-params-item');
    paramsItemElement.id = key;
    if (sizeListElement.querySelectorAll('.modal-params-item').length === 0) {
      paramsItemElement.classList.add('active');
    }

    const paramsBadgeElement = document.createElement('div');
    paramsBadgeElement.classList.add('modal-params-badge');
    paramsBadgeElement.textContent = String(key).toUpperCase();

    paramsItemElement.appendChild(paramsBadgeElement);

    const paramsTextElement = document.createElement('div');
    paramsTextElement.classList.add('modal-params-text');
    paramsTextElement.textContent = value.size;

    paramsItemElement.appendChild(paramsTextElement);

    paramsItemElement.addEventListener('click', () => {
      handleActiveSize(key, product);
    });

    sizeListElement.appendChild(paramsItemElement);
  }
}

function filladditivesParamList(product) {
  product.additives.forEach((additive, i) => {
    const paramsItemElement = document.createElement('li');
    paramsItemElement.classList.add('modal-params-item');
    paramsItemElement.id = additive.name;

    const paramsBadgeElement = document.createElement('div');
    paramsBadgeElement.classList.add('modal-params-badge');
    paramsBadgeElement.textContent = i + 1;

    paramsItemElement.appendChild(paramsBadgeElement);

    const paramsTextElement = document.createElement('div');
    paramsTextElement.classList.add('modal-params-text');
    paramsTextElement.textContent = additive.name;

    paramsItemElement.appendChild(paramsTextElement);

    paramsItemElement.addEventListener('click', () => {
      handleActiveAdditive(additive.name, additive['add-price']);
    });

    additivesListElement.appendChild(paramsItemElement);
  });
}

const priceElement = document.getElementById('modal-total-price');

function fillModalInfo(product, index) {
  const imgElement = document.getElementById('modal-product-img');
  imgElement.src = `./assets/images/${product.category}-${index + 1}.jpg`;

  const titleElement = document.getElementById('modal-product-title');
  titleElement.textContent = product.name;

  const descriptionElement = document.getElementById(
    'modal-product-description',
  );
  descriptionElement.textContent = product.description;

  fillSizeParamList(product);
  filladditivesParamList(product);

  totalPrice = Number(product.price);
  priceElement.textContent = `$${product.price}`;
}

function openModal(product, productIndex) {
  modalOverlay.classList.add('active');
  fillModalInfo(product, productIndex);
  // htmlElement.classList.add('no-scroll');
}

function closeModal() {
  sizeListElement.innerHTML = '';
  additivesListElement.innerHTML = '';
  modalOverlay.classList.remove('active');
  htmlElement.classList.remove('no-scroll');
}
