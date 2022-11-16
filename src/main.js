import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

const sectionProducts = document.querySelector('.products');

const AppendElements = async () => {
  const productList = await fetchProductsList('computador');
  productList.forEach((product) => {
    const productElement = createProductElement(product);
    sectionProducts.appendChild(productElement);
  });
};

AppendElements();

document.querySelector('.cep-button').addEventListener('click', searchCep);
