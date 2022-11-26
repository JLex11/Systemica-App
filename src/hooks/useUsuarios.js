import { useDispatch } from 'react-redux';
import { addUsuario, editUsuario, initUsuarios, removeUsuario } from '../redux/actions/Usuarios';

export const useUsuarios = () => {
  const dispatch = useDispatch();

  const init = (token) => {
    dispatch(initUsuarios(token));
  };

  const initAssociated = (assocTables, token) => {
    dispatch(initUsuarios(assocTables, token));
  };

  const getOne = (assocTables, id, token) => {
    dispatch(initUsuarios(assocTables, id, token));
  };

  const add = (newUsuario) => {
    dispatch(addUsuario(newUsuario));
  };

  const update = (id, updateUsuario, token) => {
    dispatch(editUsuario(id, updateUsuario, token));
  };

  const remove = (id, token) => {
    dispatch(removeUsuario(id, token));
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