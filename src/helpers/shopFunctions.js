import {
  getSavedPrices,
  removeCartID,
  removeCartPrice,
  saveCartID,
  saveCartPrice } from './cartFunctions';
import { fetchProduct } from './fetchFunctions';

const cartProducts = document.querySelector('.cart__products');
const totalPrice = document.querySelector('.total-price');

export const calculatePrice = () => {
  const prices = getSavedPrices();
  if (prices.length === 0) {
    totalPrice.innerHTML = 0;
  } else {
    const total = prices.reduce((acc, curr) => acc + curr);
    totalPrice.innerHTML = total;
  }
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

export const createCustomElement = (element, className, innerText = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

export const getIdFromProduct = (product) => (
  product.querySelector('span.product__id').innerText
);

const removeCartProduct = (li, id, price) => {
  li.remove();
  removeCartID(id);
  removeCartPrice(price);
};

export const createCartProductElement = ({ id, title, price, pictures }) => {
  const li = document.createElement('li');
  li.className = 'cart__product';
  const imgContainer = createCustomElement('div', 'cart__product__image-container');

  const img = createProductImageElement(pictures[0].url);
  imgContainer.appendChild(img);

  const img2 = createProductImageElement((pictures[1] || pictures[0]).url);
  imgContainer.appendChild(img2);

  li.appendChild(imgContainer);

  const infoContainer = createCustomElement('div', 'cart__product__info-container');
  infoContainer.appendChild(createCustomElement('span', 'product__title', title));
  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  infoContainer.appendChild(priceElement);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', () => {
    removeCartProduct(li, id, price);
    calculatePrice();
  });
  return li;
};

const addToCart = async (productId) => {
  saveCartID(productId);
  const data = await fetchProduct(productId);
  const { price: currentPrice } = data;
  saveCartPrice(currentPrice);
  calculatePrice();
  const cartElement = createCartProductElement(data);
  cartProducts.appendChild(cartElement);
};

export const createProductElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'product';

  const productId = createCustomElement('span', 'product__id', id);
  section.appendChild(productId);

  const thumbnailContainer = createCustomElement('div', 'img__container');
  thumbnailContainer.appendChild(createProductImageElement(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  section.appendChild(priceElement);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Adicionar ao carrinho!',
  );

  section.appendChild(cartButton);

  cartButton.addEventListener('click', () => {
    const ProductId = productId.innerHTML;
    addToCart(ProductId);
  });

  return section;
};
