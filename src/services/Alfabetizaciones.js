import { API_URL } from './ApiUrl';
const API_PATH = '/alfabetizaciones';

export const createAlfabetizacion = async (alfabetizacion, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(alfabetizacion),
  });
  return await response.json();
};

export const deleteAlfabetizacion = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });
};

export const getAlfabetizaciones = async (token) => {
  const response = await fetch(
    `${API_URL}${API_PATH}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': token
      },
    }
  );
  return await response.json();
};

export const getAlfabetizacionesAssoc = async (assocTables = [], token) => {
  const response = await fetch(
    `${API_URL}/alfabetizacion_tarea?assocTables=${assocTables.join(',')}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': token
      },
    }
  );
  return await response.json();
};

export const updateAlfabetizacion = async (id, alfabetizacion, token) => {
  const response = await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(alfabetizacion),
  });
  return await response.json();
};
