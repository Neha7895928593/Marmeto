async function fetchData() {
  const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
  const data = await response.json();
  return data.categories;
}

function displayProducts(categories) {
  categories.forEach(category => {
    const container = document.getElementById(category.category_name);
    container.innerHTML = ''; 

    if (category.category_name === 'Men') {
      displayProductCards(category.category_name, category.category_products);
      container.style.display = 'flex';
    } else {
      container.style.display = 'none';
    }
  });
}

function displayProductCards(category, products) {
  const container = document.getElementById(category);
  container.innerHTML = ''; 

  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });

  container.style.display = 'flex'; 
}



  function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.style.height = '143px';  // Adjust the value as needed
    card.style.width = '88px'; 
    

    const image = document.createElement('img');
    image.src = product.image;
    card.appendChild(image);

    // const badge = document.createElement('div');
    // badge.innerText = product.badge_text || '';
    // card.appendChild(badge);

    const title = document.createElement('div');
    title.innerText = product.title;
    card.appendChild(title);
    title.style.fontSize = '10px';


    const vendor = document.createElement('div');
    vendor.innerText = product.vendor;
    card.appendChild(vendor);

    const price = document.createElement('div');
    price.innerText = `$${product.price}`;
    card.appendChild(price);

    const comparePrice = document.createElement('div');
    comparePrice.innerText = `   $${product.compare_at_price}`;
    card.appendChild(comparePrice);
    comparePrice.style.textDecoration = 'line-through';


    const discount = document.createElement('div');
    const calculatedDiscount = Math.round(((parseInt(product.compare_at_price) - parseInt(product.price)) / parseInt(product.compare_at_price)) * 100);
    discount.innerText =   `${calculatedDiscount}% off`;
    card.appendChild(discount);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.innerText = 'Add to Cart';
    addToCartBtn.classList.add('add-to-cart-btn');
    card.appendChild(addToCartBtn);

    return card;
  }

  async function showTab(tabName) {
    const allTabs = document.querySelectorAll('.product-card');
    allTabs.forEach(tab => tab.style.display = 'none');

    const categories = await fetchData();
    const selectedCategory = categories.find(category => category.category_name === tabName);
    if (selectedCategory) {
      displayProductCards(tabName, selectedCategory.category_products);
    }
  }

  
  fetchData()
    .then(displayProducts)
    .catch(error => console.error('Error fetching product data:', error));

  
  