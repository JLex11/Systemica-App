import { deleteUsuario, getUsuarios, updateUsuario } from '../../services/Usuarios';

export const initUsuarios = (assocTables = [], token) => {
  return async dispatch => {
    const usuarios = await getUsuarios(assocTables, token);
    dispatch({
      type: '@usuarios/INIT',
      payload: usuarios.results
    });
  };
};

export const getOneUsuario = (assocTables, id, token) => {
  return async dispatch => {
    const usuarios = await getUsuarios(assocTables, id, token);
    dispatch({
      type: '@usuarios/GET_ONE',
      payload: usuarios.results
    });
  };
};

export const addUsuario = (usuario) => {
  return dispatch => {
    dispatch({
      type: '@usuarios/ADD',
      payload: usuario
    });
  };
};

export const editUsuario = (usuario, token) => {
  return async dispatch => {
    const updatedUsuario = await updateUsuario(usuario, token);
    dispatch({
      type: '@usuarios/UPDATE',
      payload: updatedUsuario.results
    });
  };
};

export const removeUsuario = (id, token) => {
  return async dispatch => {
    await deleteUsuario(id, token);
    dispatch({
      type: '@usuarios/DELETE',
      payload: id
    });
  };
};