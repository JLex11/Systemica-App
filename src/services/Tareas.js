import { API_URL } from './ApiUrl'
const API_PATH = '/tareas'

export const createTarea = async (tarea, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(tarea),
  })
  return await response.json()
}

export const deleteTarea = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
}

export const getTareas = async token => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: token,
    },
  })
  return await response.json()
}

export const getTareasAssoc = async (assocTables = [], token) => {
  const response = await fetch(
    `${API_URL}${API_PATH}?assocTables=${assocTables.join(',')}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: token,
      },
    }
  )
  return await response.json()
}

export const updateTarea = async (id, tarea, token) => {
  const response = await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(tarea),
  })
  return await response.json()
}
