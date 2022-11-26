import { memo } from 'react';
import { IoLogInOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCursos } from '../../hooks/useCursos';
import { useEstablecimientos } from '../../hooks/useEstablecimientos';
import { useField } from '../../hooks/useField';
import { useNotification } from '../../hooks/useNotification';
import { useUsuarios } from '../../hooks/useUsuarios';
import { createUsuario } from '../../services/Usuarios';
import { email as emailRegExp, password as passRegExp, username as usernameRegExp } from '../../utils/regexPatterns';
import InputLabel from '../Input/InputLabel';
import Select from '../Select';
import styles from './registerForm.module.css';
const RegisterForm = () => {
  const username = useField({ type: 'text', regExp: usernameRegExp });
  const email = useField({ type: 'email', regExp: emailRegExp });
  const password = useField({ type: 'password', regExp: passRegExp });
  const passwordConfirm = useField({ type: 'password', regExp: passRegExp });
  const rol = useField({ type: 'text', defaultValue: 'alumno' });

  const navigate = useNavigate();
  const notifications = useNotification();
  const usuariosActions = useUsuarios();
  const cursosActions = useCursos();
  const establecimientosActions = useEstablecimientos();

  const handleSubmit = async e => {
    e.preventDefault();
    if (username.error) {
      notifications.add({ type: 'error', message: 'El nombre de usuario no es valido' });
      return;
    }
    if (email.error) {
      notifications.add({ message: 'Correo electrónico inválido', type: 'error' });
      return;
    }
    if (password.error || passwordConfirm.error) {
      notifications.add({ message: 'Contraseña inválida', type: 'error' });
      return;
    }
    if (password.value !== passwordConfirm.value) {
      notifications.add({ message: 'Las contraseñas no coinciden', type: 'error' });
      return;
    }
    
    notifications.add({ message: 'Registrando usuario...', type: 'loading' });
    
    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
      rol: rol.value
    };

    usuariosActions.add(userData);
    const registerResponse = await createUsuario(userData);

    if (registerResponse.error) {
      notifications.add({ message: registerResponse.message || registerResponse.error, type: 'error' });
      return;
    }

    cursosActions.init(registerResponse?.results?.token);
    establecimientosActions.init(registerResponse?.results?.token);
    
    notifications.add({ message: registerResponse.message, type: 'success' });
    navigate(`/agregar/${rol.value}`, { state: registerResponse });
  };

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
          { id: 'alumno', label: 'Alumno' },
          { id: 'contratista', label: 'Contratista' }
        ]}
      />
      <button type='submit' className={styles.SubmitButton}>
        <IoLogInOutline className={styles.IconButton} />
        <span>Registrarse</span>
      </button>
    </form>
  );
};

export default memo(RegisterForm);