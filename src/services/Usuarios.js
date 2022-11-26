import { API_URL } from './ApiUrl';
const API_PATH = '/usuarios';
const API_REGISTER_PATH = '/register';

export const createUsuario = async (usuario) => {
  const response = await fetch(`${API_URL}${API_REGISTER_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  return await response.json();
};

export const deleteUsuario = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
};

export const getUsuarios = async (token) => {
  const response = await fetch(`${API_URL}${API_PATH}`,
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


export const getUsuariosAssoc = async (assocTables = [], id, token) => {
  const response = await fetch(
    `${API_URL}${API_PATH}?assocTables=${assocTables.join(',')}${
      id ? '/' + id : ''
    }`,
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

export const updateUsuario = async (usuario, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(usuario),
  });
  return await response.json();
};
