import { API_URL } from './ApiUrl'
const API_PATH = '/instituciones_educativas'

export const createInstitucion = async (institucion, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(institucion),
  })
  return await response.json()
}

export const deleteInstitucion = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
}

export const getInstituciones = async token => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: token,
    },
  })
  return await response.json()
}

export const getInstitucionesAssoc = async (assocTables = [], token) => {
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

export const updateInstitucion = async (institucion, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(institucion),
  })
  return await response.json()
}
