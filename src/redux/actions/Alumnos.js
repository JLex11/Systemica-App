import { createAlumno, deleteAlumno, getAlumnos, getAlumnosAssoc, updateAlumno } from '../../services/Alumnos';

export const initAlumnos = (token) => {
  return async dispatch => {
    const alumnos = await getAlumnos(token);
    dispatch({
      type: '@alumnos/INIT',
      payload: alumnos.results
    });
  };
};

export const initAlumnosAssoc = (assocTables = [], token) => {
  return async dispatch => {
    const alumnos = await getAlumnosAssoc(assocTables, token);
    dispatch({
      type: '@alumnos/INIT',
      payload: alumnos.results
    });
  };
};

export const getOneAlumno = (assocTables, id, token) => {
  return async dispatch => {
    const alumnos = await getAlumnos(assocTables, id, token);
    dispatch({
      type: '@alumnos/GET_ONE',
      payload: alumnos.results
    });
  };
};

export const addAlumno = (alumno, token) => {
  return async dispatch => {
    const newAlumno = await createAlumno(alumno, token);
    dispatch({
      type: '@alumnos/ADD',
      payload: newAlumno.results
    });
  };
};

export const editAlumno = (id, alumno, token) => {
  return async dispatch => {
    const updatedAlumno = await updateAlumno(id, alumno, token);
    dispatch({
      type: '@alumnos/UPDATE',
      payload: updatedAlumno.results
    });
  };
};

export const removeAlumno = (id, token) => {
  return async dispatch => {
    await deleteAlumno(id, token);
    dispatch({
      type: '@alumnos/DELETE',
      payload: id
    });
  };
};