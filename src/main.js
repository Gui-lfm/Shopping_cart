import { searchCep } from './helpers/cepFunctions';
import './style.css';
import {
  calculatePrice,
  createCartProductElement,
  createProductElement,
} from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

const sectionProducts = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');

const isLoading = () => {
  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.innerText = 'Carregando...';
  return loading;
};

const errorElement = () => {
  const error = document.createElement('div');
  error.classList.add('error');
  error.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  return error;
};

const appendElements = async () => {
  const loader = isLoading();
  sectionProducts.appendChild(loader);
  try {
    const productList = await fetchProductsList('computador');
    sectionProducts.removeChild(loader);
    productList.forEach((product) => {
      const productElement = createProductElement(product);
      sectionProducts.appendChild(productElement);
    });
  } catch (error) {
    sectionProducts.removeChild(loader);
    sectionProducts.appendChild(errorElement());
  }
};

const listProductsOnCart = () => {
  const cartProductsID = getSavedCartIDs();

  cartProductsID.forEach(async (productID) => {
    const data = await fetchProduct(productID);
    const cartElement = createCartProductElement(data);
    cartProducts.appendChild(cartElement);
  });
};

window.onload = () => {
  appendElements();
  listProductsOnCart();
  calculatePrice();
};

document.querySelector('.cep-button').addEventListener('click', searchCep);
