import { useDispatch } from 'react-redux'
import { addInstitucion, addInstituciones, editInstitucion, initInstituciones, initInstitucionesAssoc, removeInstitucion } from '../redux/actions/Instituciones'

export const useInstituciones = () => {
  const dispatch = useDispatch()

  const init = (token) => {
    dispatch(initInstituciones(token))
  }

  const initAssociated = (assocTables, token) => {
    dispatch(initInstitucionesAssoc(assocTables, token))
  }

  const getOne = (assocTables, id, token) => {
    dispatch(initInstituciones(assocTables, id, token))
  }

  const add = (newInstitucion, token) => {
    dispatch(addInstitucion(newInstitucion, token))
  }

  const addArray = (newInstituciones, token) => {
    dispatch(addInstituciones(newInstituciones, token))
  }

  const update = (id, updateInstitucion, token) => {
    dispatch(editInstitucion(id, updateInstitucion, token))
  }

  const remove = (id, token) => {
    dispatch(removeInstitucion(id, token))
  }

  return {
    init,
    initAssociated,
    getOne,
    add,
    addArray,
    update,
    remove,
  }
}