import { API_URL } from './ApiUrl';
const API_PATH = '/cursos';

export const createCurso = async (curso, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(curso),
  });
  return await response.json();
};

export const deleteCurso = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
};

export const getCursos = async (token) => {
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

export const getCursosAssoc = async (assocTables = [], token) => {
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

export const updateCurso = async (curso, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(curso),
  });
  return await response.json();
};
