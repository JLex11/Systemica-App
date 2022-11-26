export const alumnosReducer = (state = [], action) => {
  switch (action.type) {
    case '@alumnos/INIT':
      return action.payload;

    case '@alumnos/ADD':
      return [...state.filter(alumno => action.payload.id_alumno != alumno.id_alumno), action.payload];
        
    case '@alumnos/UPDATE':
      return state.map(alumno => (alumno.id_alumno === action.payload.id_alumno ? action.payload : alumno));

    case '@alumnos/DELETE':
      return state.filter(alumno => alumno.id_alumno !== action.payload);

    default:
      return state;

  }
};