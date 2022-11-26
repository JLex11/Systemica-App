import { useDispatch } from 'react-redux';
import { addTarea, editTarea, initTareas, removeTarea } from '../redux/actions/Tareas';

export const useTareas = () => {
  const dispatch = useDispatch();

  const init = (token) => {
    dispatch(initTareas(token));
  };

  const initAssociated = (assocTables, token) => {
    dispatch(initTareas(assocTables, token));
  };

  const getOne = (assocTables, id, token) => {
    dispatch(initTareas(assocTables, id, token));
  };

  const add = (newTarea, token) => {
    dispatch(addTarea(newTarea, token));
  };

  const update = (id, updateTarea, token) => {
    dispatch(editTarea(id, updateTarea, token));
  };

  const remove = (id, token) => {
    dispatch(removeTarea(id, token));
  };

  return {
    init,
    initAssociated,
    getOne,
    add,
    update,
    remove,
  };
};