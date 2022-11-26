import { createContratista, deleteContratista, getContratistas, getContratistasAssoc, updateContratista } from '../../services/Contratistas';

export const initContratistas = (token) => {
  return async dispatch => {
    const contratistas = await getContratistas(token);
    dispatch({
      type: '@contratistas/INIT',
      payload: contratistas.results
    });
  };
};

export const initContratistasAssoc = (assocTables = [], token) => {
  return async dispatch => {
    const contratistas = await getContratistasAssoc(assocTables, token);
    dispatch({
      type: '@contratistas/INIT',
      payload: contratistas.results
    });
  };
};

export const getOneContratista = (assocTables, id, token) => {
  return async dispatch => {
    const contratistas = await getContratistas(assocTables, id, token);
    dispatch({
      type: '@contratistas/GET_ONE',
      payload: contratistas.results
    });
  };
};

export const addContratista = (contratista, token) => {
  return async dispatch => {
    const newContratista = await createContratista(contratista, token);
    dispatch({
      type: '@contratistas/ADD',
      payload: newContratista.results
    });
  };
};

export const editContratista = (id, contratista, token) => {
  return async dispatch => {
    const updatedContratista = await updateContratista(id, contratista, token);
    dispatch({
      type: '@contratistas/UPDATE',
      payload: updatedContratista.results
    });
  };
};

export const removeContratista = (id, token) => {
  return async dispatch => {
    await deleteContratista(id, token);
    dispatch({
      type: '@contratistas/DELETE',
      payload: id
    });
  };
};