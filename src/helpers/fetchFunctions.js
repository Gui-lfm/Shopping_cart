export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }

  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (endpoint) => {
  if (!endpoint) {
    throw new Error('Termo de busca não informado');
  }

  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`);
  const data = await response.json();
  const { results } = data;
  return results;
};
