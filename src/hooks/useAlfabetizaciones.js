import { useDispatch } from 'react-redux';
import { addAlfabetizacion, editAlfabetizacion, initAlfabetizaciones, initAlfabetizacionesAssoc, removeAlfabetizacion } from '../redux/actions/Alfabetizaciones';

export const useAlfabetizaciones = () => {
  const dispatch = useDispatch();

  const init = token => {
    dispatch(initAlfabetizaciones(token));
  };

  const initAssociated = (assocTables, token) => { 
    dispatch(initAlfabetizacionesAssoc(assocTables, token));
  };

  const getOne = (assocTables, id, token) => {
    dispatch(initAlfabetizacionesAssoc(assocTables, id, token));
  };

  const add = (newAlfabetizacion, token) => {
    dispatch(addAlfabetizacion(newAlfabetizacion, token));
  };

  const update = (id, updateAlfabetizacion, token) => {
    dispatch(editAlfabetizacion(id, updateAlfabetizacion, token));
  };

  const remove = (id, token) => {
    dispatch(removeAlfabetizacion(id, token));
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