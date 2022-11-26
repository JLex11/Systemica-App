export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case '@user/LOGIN':
      return action.payload;
    case '@user/LOGOUT':
      return {};
    default:
      return state;
  }
};