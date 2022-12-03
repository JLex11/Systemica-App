export const alfabetizacionesReducer = (state = [], action) => {
  switch (action.type) {
    case '@alfabetizaciones/INIT':
      return action.payload

    case '@alfabetizaciones/ADD':
      return [
        ...state.filter(
          alfabetizacion =>
            action.payload.id_alfabetizacion != alfabetizacion.id_alfabetizacion
        ),
        action.payload,
      ]

    case '@alfabetizaciones/UPDATE':
      return state.map(alfabetizacion =>
        alfabetizacion.id_alfabetizacion === action.payload.id_alfabetizacion
          ? action.payload
          : alfabetizacion
      )

    case '@alfabetizaciones/DELETE':
      return state.filter(
        alfabetizacion => alfabetizacion.id_alfabetizacion !== action.payload
      )

    default:
      return state
  }
}
