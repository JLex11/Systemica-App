import { createInstitucion, deleteInstitucion, getInstituciones, getInstitucionesAssoc, updateInstitucion } from '../../services/Instituciones'

export const initInstituciones = (token) => {
  return async dispatch => {
    const instituciones = await getInstituciones(token)
    dispatch({
      type: '@instituciones/INIT',
      payload: instituciones.results
    })
  }
}

export const initInstitucionesAssoc = (assocTables = [], token) => {
  return async dispatch => {
    const instituciones = await getInstitucionesAssoc(assocTables, token)
    dispatch({
      type: '@instituciones/INIT',
      payload: instituciones.results
    })
  }
}

export const getOneEstablecimiento = (assocTables, id, token) => {
  return async dispatch => {
    const instituciones = await getInstituciones(assocTables, id, token)
    dispatch({
      type: '@instituciones/GET_ONE',
      payload: instituciones.results
    })
  }
}

export const addInstitucion = (institucion, token) => {
  return async dispatch => {
    const newInstitucion = await createInstitucion(institucion, token)
    dispatch({
      type: '@instituciones/ADD',
      payload: newInstitucion.results
    })
  }
}

export const addInstituciones = (instituciones) => {
  return dispatch => {
    dispatch({
      type: '@instituciones/ADD_MULTIPLE',
      payload: instituciones
    })
  }
}

export const editInstitucion = (Instituciones, token) => {
  return async dispatch => {
    const updatedInstitucion = await updateInstitucion(Instituciones, token)
    dispatch({
      type: '@instituciones/UPDATE',
      payload: updatedInstitucion.results
    })
  }
}

export const removeInstitucion = (id, token) => {
  return async dispatch => {
    await deleteInstitucion(id, token)
    dispatch({
      type: '@instituciones/DELETE',
      payload: id
    })
  }
}