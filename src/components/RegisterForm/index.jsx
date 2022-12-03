import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCursos } from '../../hooks/useCursos'
import { useEstablecimientos } from '../../hooks/useEstablecimientos'
import { useField } from '../../hooks/useField'
import { useInstituciones } from '../../hooks/useInstituciones'
import { useNotification } from '../../hooks/useNotification'
import { useUsuarios } from '../../hooks/useUsuarios'
import { createUsuario } from '../../services/Usuarios'
import {
  email as emailRegExp,
  password as passRegExp,
  username as usernameRegExp
} from '../../utils/regexPatterns'
import Form from './Form'

const RegisterForm = () => {
  const username = useField({ type: 'text', regExp: usernameRegExp })
  const email = useField({ type: 'email', regExp: emailRegExp })
  const password = useField({ type: 'password', regExp: passRegExp })
  const passwordConfirm = useField({ type: 'password', regExp: passRegExp })
  const rol = useField({ type: 'text', defaultValue: 'alumno' })

  const navigate = useNavigate()
  const notifications = useNotification()
  const usuariosActions = useUsuarios()
  const cursosActions = useCursos()
  const establecimientosActions = useEstablecimientos()
  const institucionesActions = useInstituciones()

  const handleSubmit = async e => {
    e.preventDefault()
    if (username.error) {
      notifications.add({
        type: 'error',
        message: 'El nombre de usuario no es valido',
      })
      return
    }
    if (email.error) {
      notifications.add({
        message: 'Correo electrónico inválido',
        type: 'error',
      })
      return
    }
    if (password.error || passwordConfirm.error) {
      notifications.add({ message: 'Contraseña inválida', type: 'error' })
      return
    }
    if (password.value !== passwordConfirm.value) {
      notifications.add({
        message: 'Las contraseñas no coinciden',
        type: 'error',
      })
      return
    }

    notifications.add({ message: 'Registrando usuario...', type: 'loading' })

    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
      rol: rol.value,
    }

    usuariosActions.add(userData)
    const registerResponse = await createUsuario(userData)

    if (registerResponse.error) {
      notifications.add({
        message: registerResponse.message || registerResponse.error,
        type: 'error',
      })
      return
    }

    const { results: { token }} = registerResponse

    cursosActions.init(token)
    establecimientosActions.init(token)
    institucionesActions.init(token)

    notifications.add({ message: registerResponse.message, type: 'success' })
    navigate(`/agregar/${rol.value}`, { state: registerResponse })
  }

  return (
    <Form
      username={username}
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      rol={rol}
      handleSubmit={handleSubmit}
    />
  )
}

export default memo(RegisterForm)
