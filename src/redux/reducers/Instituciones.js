export const institucionesReducer = (state = [], action) => {
  switch (action.type) {
    case '@instituciones/INIT':
      return action.payload

    case '@instituciones/ADD':
      return [...state.filter(institucion_educativa => 
        action.payload.id_institucion_educativa != institucion_educativa.id_institucion_educativa), action.payload]

    case '@instituciones/ADD_MULTIPLE':
      return [...state.filter(institucion_educativa => 
        action.payload.id_institucion_educativa != institucion_educativa.id_institucion_educativa), ...action.payload]

    case '@instituciones/UPDATE':
      return state.map(institucion_educativa => 
        (institucion_educativa.id_institucion_educativa === action.payload.id_institucion_educativa
          ? action.payload
          : institucion_educativa)
      )

    case '@instituciones/DELETE':
      return state.filter(institucion_educativa => 
        institucion_educativa.id_institucion_educativa !== action.payload
      )

    default:
      return state
  }
}