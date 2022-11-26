import { API_URL } from './ApiUrl';
const API_PATH = '/establecimientos';

export const createEstablecimiento = async (establecimiento, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(establecimiento),
  });
  return await response.json();
};

export const deleteEstablecimiento = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
};

export const getEstablecimientos = async (token) => {
  const response = await fetch(
    `${API_URL}${API_PATH}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': token,
      },
    }
  );
  return await response.json();
};

export const getEstablecimientosAssoc = async (assocTables = [], token) => {
  const response = await fetch(
    `${API_URL}${API_PATH}?assocTables=${assocTables.join(',')}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': token,
      },
    }
  );
  return await response.json();
};

export const updateEstablecimiento = async (establecimiento, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(establecimiento),
  });
  return await response.json();
};
