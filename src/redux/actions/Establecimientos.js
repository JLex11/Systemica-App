import { createEstablecimiento, deleteEstablecimiento, getEstablecimientos, getEstablecimientosAssoc, updateEstablecimiento } from '../../services/Establecimientos';

export const initEstablecimientos = (token) => {
  return async dispatch => {
    const establecimientos = await getEstablecimientos(token);
    dispatch({
      type: '@establecimientos/INIT',
      payload: establecimientos.results
    });
  };
};

export const initEstablecimientosAssoc = (assocTables = [], token) => {
  return async dispatch => {
    const establecimientos = await getEstablecimientosAssoc(assocTables, token);
    dispatch({
      type: '@establecimientos/INIT',
      payload: establecimientos.results
    });
  };
};

export const getOneEstablecimiento = (assocTables, id, token) => {
  return async dispatch => {
    const establecimientos = await getEstablecimientos(assocTables, id, token);
    dispatch({
      type: '@establecimientos/GET_ONE',
      payload: establecimientos.results
    });
  };
};

export const addEstablecimiento = (establecimientos, token) => {
  return async dispatch => {
    const newEstablecimiento = await createEstablecimiento(establecimientos, token);
    dispatch({
      type: '@establecimientos/ADD',
      payload: newEstablecimiento.results
    });
  };
};

export const addEstablecimientos = (establecimientos) => {
  return dispatch => {
    dispatch({
      type: '@establecimientos/ADD_MULTIPLE',
      payload: establecimientos
    });
  };
};

export const editEstablecimiento = (establecimientos, token) => {
  return async dispatch => {
    const updatedEstablecimiento = await updateEstablecimiento(establecimientos, token);
    dispatch({
      type: '@establecimientos/UPDATE',
      payload: updatedEstablecimiento.results
    });
  };
};

export const removeEstablecimiento = (id, token) => {
  return async dispatch => {
    await deleteEstablecimiento(id, token);
    dispatch({
      type: '@establecimientos/DELETE',
      payload: id
    });
  };
};