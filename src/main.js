import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

const sectionProducts = document.querySelector('.products');

const isLoading = () => {
  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.innerText = 'Carregando...';
  return loading;
};

const AppendElements = async () => {
  const loader = isLoading();
  sectionProducts.appendChild(loader);
  const productList = await fetchProductsList('computador');
  sectionProducts.removeChild(loader);
  productList.forEach((product) => {
    const productElement = createProductElement(product);
    sectionProducts.appendChild(productElement);
  });
};

AppendElements();

document.querySelector('.cep-button').addEventListener('click', searchCep);
