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

const errorElement = () => {
  const error = document.createElement('div');
  error.classList.add('error');
  error.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  return error;
};

const AppendElements = async () => {
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
    console.log(error);
    sectionProducts.removeChild(loader);
    sectionProducts.appendChild(errorElement());
  }
};

AppendElements();

document.querySelector('.cep-button').addEventListener('click', searchCep);
