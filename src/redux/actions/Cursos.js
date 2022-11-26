import { createCurso, deleteCurso, getCursos, getCursosAssoc, updateCurso } from '../../services/Cursos';

export const initCursos = (token) => {
  return async dispatch => {
    const cursos = await getCursos(token);
    dispatch({
      type: '@cursos/INIT',
      payload: cursos.results
    });
  };
};

export const initCursosAssoc = (assocTables = [], token) => {
  return async dispatch => {
    const cursos = await getCursosAssoc(assocTables, token);
    dispatch({
      type: '@cursos/INIT',
      payload: cursos.results
    });
  };
};

export const getOneCurso = (assocTables, id, token) => {
  return async dispatch => {
    const cursos = await getCursos(assocTables, id, token);
    dispatch({
      type: '@cursos/GET_ONE',
      payload: cursos.results
    });
  };
};

export const addCurso = (cursos, token) => {
  return async dispatch => {
    const newCurso = await createCurso(cursos, token);
    dispatch({
      type: '@cursos/ADD',
      payload: newCurso.results
    });
  };
};

export const addCursos = (cursos) => {
  return async dispatch => {
    dispatch({
      type: '@cursos/ADD_MULTIPLE',
      payload: cursos
    });
  };
};

export const editCurso = (cursos, token) => {
  return async dispatch => {
    const updatedCurso = await updateCurso(cursos, token);
    dispatch({
      type: '@cursos/UPDATE',
      payload: updatedCurso.results
    });
  };
};

export const removeCurso = (id, token) => {
  return async dispatch => {
    await deleteCurso(id, token);
    dispatch({
      type: '@cursos/DELETE',
      payload: id
    });
  };
};