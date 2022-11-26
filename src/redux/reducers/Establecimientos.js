export const establecimientosReducer = (state = [], action) => {
  switch (action.type) {
    case '@establecimientos/INIT':
      return action.payload;

    case '@establecimientos/ADD':
      return [...state.filter(establecimiento => action.payload.id_establecimiento != establecimiento.id_establecimiento), action.payload];

    case '@establecimientos/ADD_MULTIPLE':
      return [...state.filter(establecimiento => action.payload.id_establecimiento != establecimiento.id_establecimiento), ...action.payload];

    case '@establecimientos/UPDATE':
      return state.map(establecimiento => (establecimiento.id_establecimiento === action.payload.id_establecimiento ? action.payload : establecimiento));

    case '@establecimientos/DELETE':
      return state.filter(establecimiento => establecimiento.id_establecimiento !== action.payload);

    default:
      return state;
  }
};