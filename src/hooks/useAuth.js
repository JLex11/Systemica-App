import { useDispatch } from 'react-redux'
import { loggedUser, logoutUser } from '../redux/actions/Auth'

export const useAuth = () => {
  const dispatch = useDispatch()

  const Logged = (credencials) => {
    dispatch(loggedUser(credencials))
  }

  const Logout = () => {
    dispatch(logoutUser())
  }

  return {
    Logged,
    Logout,
  }
}