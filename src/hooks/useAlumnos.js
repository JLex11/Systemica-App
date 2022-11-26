import { useDispatch } from 'react-redux';
import { addAlumno, editAlumno, initAlumnos, initAlumnosAssoc, removeAlumno } from '../redux/actions/Alumnos';

export const useAlumnos = () => {
  const dispatch = useDispatch();

  const init = (token) => {
    dispatch(initAlumnos(token));
  };

  const initAssociated = (assocTables, token) => {
    dispatch(initAlumnosAssoc(assocTables, token));
  };

  const getOne = (assocTables, id, token) => {
    dispatch(initAlumnos(assocTables, id, token));
  };

  const add = (newAlumno, token) => {
    dispatch(addAlumno(newAlumno, token));
  };

  const update = (id, updateAlumno, token) => {
    dispatch(editAlumno(id, updateAlumno, token));
  };

  const remove = (id, token) => {
    dispatch(removeAlumno(id, token));
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