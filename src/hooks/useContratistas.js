import { useDispatch } from 'react-redux';
import { addContratista, editContratista, initContratistas, initContratistasAssoc, removeContratista } from '../redux/actions/Contratistas';

export const useContratistas = () => {
  const dispatch = useDispatch();

  const init = (token) => {
    dispatch(initContratistas(token));
  };

  const initAssociated = (assocTables, token) => {
    dispatch(initContratistasAssoc(assocTables, token));
  };

  const getOne = (assocTables, id, token) => {
    dispatch(initContratistas(assocTables, id, token));
  };

  const add = (newContratista, token) => {
    dispatch(addContratista(newContratista, token));
  };

  const update = (id, updateContratista, token) => {
    dispatch(editContratista(id, updateContratista, token));
  };

  const remove = (id, token) => {
    dispatch(removeContratista(id, token));
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