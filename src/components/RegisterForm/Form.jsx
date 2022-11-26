import { memo } from 'react'
import { IoLogInOutline } from 'react-icons/io5'
import InputLabel from '../Input/InputLabel'
import Select from '../Select'
import styles from './registerForm.module.css'

const Form = ({ handleSubmit, username, email, password, passwordConfirm, rol }) => {
  return (
    <form className={styles.LoginForm} onSubmit={handleSubmit}>
      <InputLabel
        type={username.type}
        id={'username'}
        labelText={'Nombre de usuario'}
        autocomplete='new-user'
        handleChange={username.onChange}
      />
      <InputLabel
        type={email.type}
        id={'email'}
        labelText={'Correo electrónico'}
        handleChange={email.onChange}
      />
      <InputLabel
        type={password.type}
        id={'password'}
        labelText={'Contraseña'}
        handleChange={password.onChange}
      />
      <InputLabel
        type={passwordConfirm.type}
        id={'passwordComfirm'}
        labelText={'Confirmar contraseña'}
        handleChange={passwordConfirm.onChange}
      />
      <Select
        field={rol}
        options={[
          {
            id: 'alumno',
            label: 'Alumno',
          },
          {
            id: 'contratista',
            label: 'Contratista',
          },
        ]}
      />
      <button type='submit' className={styles.SubmitButton}>
        <IoLogInOutline className={styles.IconButton} />
        <span>Registrarse</span>
      </button>
    </form>
  )
}

export default memo(Form)