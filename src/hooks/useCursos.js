import { useDispatch } from 'react-redux'
import { addCurso, addCursos, editCurso, initCursos, initCursosAssoc, removeCurso } from '../redux/actions/Cursos'

export const useCursos = () => {
  const dispatch = useDispatch()

  const init = (token) => {
    dispatch(initCursos(token))
  }

  const initAssociated = (assocTables, token) => {
    dispatch(initCursosAssoc(assocTables, token))
  }

  const getOne = (assocTables, id, token) => {
    dispatch(initCursos(assocTables, id, token))
  }

  const add = (newCurso, token) => {
    dispatch(addCurso(newCurso, token))
  }

  const addArray = (newCursos, token) => {
    dispatch(addCursos(newCursos, token))
  }

  const update = (id, updateCurso, token) => {
    dispatch(editCurso(id, updateCurso, token))
  }

  const remove = (id, token) => {
    dispatch(removeCurso(id, token))
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