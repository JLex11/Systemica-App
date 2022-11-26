import { useDispatch } from 'react-redux';
import { addEstablecimiento, addEstablecimientos, editEstablecimiento, initEstablecimientos, initEstablecimientosAssoc, removeEstablecimiento } from '../redux/actions/Establecimientos';

export const useEstablecimientos = () => {
  const dispatch = useDispatch();

  const init = (token) => {
    dispatch(initEstablecimientos(token));
  };

  const initAssociated = (assocTables, token) => {
    dispatch(initEstablecimientosAssoc(assocTables, token));
  };

  const getOne = (assocTables, id, token) => {
    dispatch(initEstablecimientos(assocTables, id, token));
  };

  const add = (newEstablecimiento, token) => {
    dispatch(addEstablecimiento(newEstablecimiento, token));
  };

  const addArray = (newEstablecimientos, token) => {
    dispatch(addEstablecimientos(newEstablecimientos, token));
  };

  const update = (id, updateEstablecimiento, token) => {
    dispatch(editEstablecimiento(id, updateEstablecimiento, token));
  };

  const remove = (id, token) => {
    dispatch(removeEstablecimiento(id, token));
  };

  return {
    init,
    initAssociated,
    getOne,
    add,
    addArray,
    update,
    remove,
  };
};