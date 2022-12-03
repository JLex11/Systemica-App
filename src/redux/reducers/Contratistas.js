export const contratistasReducer = (state = [], action) => {
  switch (action.type) {
    case '@contratistas/INIT':
      return action.payload

    case '@contratistas/ADD':
      return [
        ...state.filter(
          contratista =>
            action.payload.id_contratista != contratista.id_contratista
        ),
        action.payload,
      ]

    case '@contratistas/UPDATE':
      return state.map(contratista =>
        contratista.id_contratista === action.payload.id_contratista
          ? action.payload
          : contratista
      )

    case '@contratistas/DELETE':
      return state.filter(
        contratista => contratista.id_contratista !== action.payload
      )

    default:
      return state
  }
}
