import { memo } from 'react'
import { IoLogInOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useField } from '../../hooks/useField'
import { useNotification } from '../../hooks/useNotification'
import { Login } from '../../services/Login'
import { email as emailRegExp, password as passRegExp } from '../../utils/regexPatterns'
import InputLabel from '../Input/InputLabel'
import styles from './loginForm.module.css'

const LoginForm = () => {
  const email = useField({ type: 'text', regExp: emailRegExp })
  const password = useField({ type: 'password', regExp: passRegExp })

  const navigate = useNavigate()
  const user = useAuth()

  const notification = useNotification()

  const handleSubmit = async e => {
    e.preventDefault()
    
    if (email.error) {
      notification.add({ message: 'Correo electrónico inválido', type: 'error' })
      return
    }
    
    if (password.error) {
      notification.add({ message: 'Contraseña inválida', type: 'error' })
      return
    }
    
    notification.add({ message: 'Iniciando sesión...', type: 'info' })
    user.Logged({ email: email.value, password: password.value })
    const loginResponse = await Login({ email: email.value, password: password.value })
    if (loginResponse.error) {
      notification.add({ message: loginResponse.message || loginResponse.error, type: 'error' })
      return
    }
    
    navigate('/inicio')
  }

  return (
    <form className={styles.LoginForm} onSubmit={handleSubmit}>
      <InputLabel
        type={email.type}
        id={'email'}
        labelText={'Correo o nombre de usuario'}
        handleChange={email.onChange}
      />
      <InputLabel
        type={password.type}
        id={'password'}
        labelText={'Contraseña'}
        handleChange={password.onChange}
      />
      <button type='submit' className={styles.SubmitButton}>
        <IoLogInOutline className={styles.IconButton} />
        <span>Ingresar</span>
      </button>
    </form>
  )
}

export default memo(LoginForm)