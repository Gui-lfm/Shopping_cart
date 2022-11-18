/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = cartProducts.filter((product) => product !== id);
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

// salvando preços no localStorage:

export const getSavedPrices = () => {
  const cartPrices = localStorage.getItem('cartPrices');
  return cartPrices ? JSON.parse(cartPrices) : [];
};

export const saveCartPrice = (price) => {
  const cartPrices = getSavedPrices();
  const newCartPrices = [...cartPrices, price];
  localStorage.setItem('cartPrices', JSON.stringify(newCartPrices));
};

export const removeCartPrice = (price) => {
  const cartPrices = getSavedPrices();
  const newCartPrices = cartPrices.filter((product) => product !== price);
  localStorage.setItem('cartPrices', JSON.stringify(newCartPrices));
};
