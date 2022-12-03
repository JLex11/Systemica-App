export const tareasReducer = (state = [], action) => {
  switch (action.type) {
    case '@tareas/INIT':
      return action.payload

    case '@tareas/ADD':
      return [
        ...state.filter(tarea => action.payload.id_tarea != tarea.id_tarea),
        action.payload,
      ]

    case '@tareas/UPDATE':
      return state.map(tarea =>
        tarea.id_tarea === action.payload.id_tarea ? action.payload : tarea
      )

    case '@tareas/DELETE':
      return state.filter(tarea => tarea.id_tarea !== action.payload)

    default:
      return state
  }
}
