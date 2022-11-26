import { createAlfabetizacion, deleteAlfabetizacion, getAlfabetizaciones, getAlfabetizacionesAssoc, updateAlfabetizacion } from '../../services/Alfabetizaciones';

export const initAlfabetizaciones = (token) => {
  return async dispatch => {
    const Alfabetizaciones = await getAlfabetizaciones(token);
    dispatch({
      type: '@alfabetizaciones/INIT',
      payload: Alfabetizaciones.results
    });
  };
};

export const initAlfabetizacionesAssoc = (assocTables, token) => {
  return async dispatch => {
    const Alfabetizaciones = await getAlfabetizacionesAssoc(assocTables, token);
    dispatch({
      type: '@alfabetizaciones/INIT',
      payload: Alfabetizaciones.results
    });
  };
};

export const getOneAlfabetizacion = (assocTables, id, token) => {
  return async dispatch => {
    const Alfabetizaciones = await getAlfabetizaciones(assocTables, id, token);
    dispatch({
      type: '@alfabetizaciones/GET_ONE',
      payload: Alfabetizaciones.results
    });
  };
};

export const addAlfabetizacion = (alfabetizacion, token) => {
  return async dispatch => {
    const newAlfabetizacion = await createAlfabetizacion(alfabetizacion, token);
    dispatch({
      type: '@alfabetizaciones/ADD',
      payload: newAlfabetizacion.results
    });
  };
};

export const editAlfabetizacion = (id, alfabetizacion, token) => {
  return async dispatch => {
    const updatedAlfabetizacion = await updateAlfabetizacion(id, alfabetizacion, token);
    dispatch({
      type: '@alfabetizaciones/UPDATE',
      payload: updatedAlfabetizacion.results
    });
  };
};

export const removeAlfabetizacion = (id, token) => {
  return async dispatch => {
    await deleteAlfabetizacion(id, token);
    dispatch({
      type: '@alfabetizaciones/DELETE',
      payload: id
    });
  };
};