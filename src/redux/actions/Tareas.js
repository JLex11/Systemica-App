import { createTarea, deleteTarea, getTareas, updateTarea } from '../../services/Tareas';

export const initTareas = (assocTables = [], token) => {
  return async dispatch => {
    const tareas = await getTareas(assocTables, token);
    dispatch({
      type: '@tareas/INIT',
      payload: tareas.results
    });
  };
};

export const getOneTarea = (assocTables, id, token) => {
  return async dispatch => {
    const tareas = await getTareas(assocTables, id, token);
    dispatch({
      type: '@tareas/GET_ONE',
      payload: tareas.results
    });
  };
};

export const addTarea = (tarea, token) => {
  return async dispatch => {
    const newTarea = await createTarea(tarea, token);
    dispatch({
      type: '@tareas/ADD',
      payload: newTarea.results
    });
  };
};

export const editTarea = (id, tarea, token) => {
  return async dispatch => {
    dispatch({
      type: '@tareas/UPDATE',
      payload: tarea
    });
    
    const updatedTarea = await updateTarea(id, tarea, token);
    dispatch({
      type: '@tareas/UPDATE',
      payload: updatedTarea.results
    });
  };
};

export const removeTarea = (id, token) => {
  return async dispatch => {
    await deleteTarea(id, token);
    dispatch({
      type: '@tareas/DELETE',
      payload: id
    });
  };
};