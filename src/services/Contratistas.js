import { API_URL } from './ApiUrl';
const API_PATH = '/contratistas';

export const createContratista = async (contratista, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(contratista),
  });
  return await response.json();
};

export const deleteContratista = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
};

export const getContratistas = async (token) => {
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

export const getContratistasAssoc = async (assocTables = [], token) => {
  const response = await fetch(
    `${API_URL}/alfabetizacion_tarea?assocTables=${assocTables.join(',')}`,
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

export const updateContratista = async (id, contratista, token) => {
  const response = await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(contratista),
  });
  return await response.json();
};
