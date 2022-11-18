const cepAdress = document.querySelector('.cart__address');

const fetchPromisse = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getAddress = () => {
  const cep = document.querySelector('.cep-input').value;
  const api1 = fetchPromisse(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const api2 = fetchPromisse(`https://cep.awesomeapi.com.br/json/${cep}`);

  return Promise.any([api1, api2])
    .then((data) => data)
    .catch(() => {
      console.log('cep inválido');
    });
};

// obs: api1 || api2
// street || adress - neighborhood || district - city - state

export const searchCep = async () => {
  try {
    const cep = await getAddress();
    const { city, state, street, address, neighborhood, district } = cep;
    const fullAdress = `${street || address} - ${
      neighborhood || district
    } - ${city} - ${state}`;
    cepAdress.innerHTML = fullAdress;
  } catch (e) {
    console.log(e);
    cepAdress.innerHTML = 'CEP não encontrado';
  }
};
