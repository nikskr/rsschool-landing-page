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
    console.log(error.message);
  }
}

async function getFilteredByCategoryProducts(selectedCategory) {
  const allProducts = await getProducts();
  const filteredProducts = await filterProductsByCategory(
    allProducts,
    selectedCategory,
  );
  renderCards(filteredProducts);
}

const productList = document.querySelector('.products-list');

async function renderCards(products) {
  console.log(products);
  products.forEach((product, index) => {
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

    productList.appendChild(productCard);
  });
}

console.log(123);

getFilteredByCategoryProducts('coffee');

const categoryBtns = document.querySelectorAll('.menu-tab-btn');

console.log(categoryBtns);

categoryBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    console.log(btn.id);
    getFilteredByCategoryProducts(btn.id);
  });
});

// TO FIX
