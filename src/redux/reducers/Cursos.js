export const cursosReducer = (state = [], action) => {
  switch (action.type) {
    case '@cursos/INIT':
      return action.payload

    case '@cursos/ADD':
      return [
        ...state.filter(curso => action.payload?.id_curso != curso?.id_curso),
        action.payload,
      ]

    case '@cursos/ADD_MULTIPLE':
      return [
        ...state.filter(curso => action.payload?.id_curso != curso?.id_curso),
        ...action.payload,
      ]

    case '@cursos/UPDATE':
      return state.map(curso =>
        curso?.id_curso === action.payload?.id_curso ? action.payload : curso
      )

    case '@cursos/DELETE':
      return state.filter(curso => curso?.id_curso !== action.payload)

    default:
      return state
  }
}
