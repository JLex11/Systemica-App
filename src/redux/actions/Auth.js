import { Login, Logout } from '../../services/Login'

export const loggedUser = (credencials) => {
  return async dispatch => {
    const user_info = await Login(credencials)
    dispatch({
      type: '@user/LOGIN',
      payload: user_info
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    Logout()
    dispatch({
      type: '@user/LOGOUT',
    })
  }
}