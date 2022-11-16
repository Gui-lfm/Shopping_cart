import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toBeCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const endpoint = 'computador';
    await fetchProductsList(endpoint);
    expect(fetch).toBeCalledWith(`https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`);
  });

  it('Função fetchProductsList(computador) retorna o objeto esperado', async () => {
    const returnedValue = await fetchProductsList('computador');
    expect(returnedValue).toEqual(computadorSearch);
  });
  it('Função retorna uma mensagem de erro caso seja chamada sem parâmetro', () => {
    const result = fetchProductsList();
    expect(result).rejects.toThrow();
  });
});
