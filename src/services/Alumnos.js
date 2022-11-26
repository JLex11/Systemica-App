import { API_URL } from './ApiUrl';
const API_PATH = '/alumnos';

export const createAlumno = async (alumno, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(alumno),
  });
  return await response.json();
};

export const deleteAlumno = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
};

export const getAlumnos = async (token) => {
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

export const getAlumnosAssoc = async (assocTables = [], token) => {
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

export const updateAlumno = async (id, alumno, token) => {
  const response = await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(alumno),
  });
  return await response.json();
};
