import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

describe('Teste a função fetchProduct', () => {
  it('FetchProduct é uma função:', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('Fetch é chamado ao executar fetchProduct:', async () => {
    const id = 'MLB1405519561';
    await fetchProduct(id);
    expect(fetch).toBeCalled();
  });
  it('Fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    const id = 'MLB1405519561';
    await fetchProduct(id);
    expect(fetch).toBeCalledWith(`https://api.mercadolibre.com/items/${id}`);
  });
  it('Função com o argumento "MLB1405519561" retorna obj igual "product"', async () => {
    const result = await fetchProduct('MLB1405519561');
    expect(result).toEqual(product);
  });
  it('FetchProduct retorna uma mensagem de erro caso seja chamada sem parâmetro', () => {
    const result = fetchProduct();
    expect(result).rejects.toThrow();
  });
});
