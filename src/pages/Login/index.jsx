import { memo } from 'react';
import { Link } from 'react-router-dom';
import graduate_icon from '../../assets/icons/graduate_icon.png';
import LoginForm from '../../components/LoginForm';

import styles from './login.module.css';

const Login = () => {
  return (
    <section className={styles.LoginSection}>
      <div className={styles.LoginContainer}>
        <header className={styles.LoginHeader}>
          <img src={graduate_icon} />
          <h1 className={styles.LoginTitle}>Iniciar sesion</h1>
        </header>
        <LoginForm />
        <footer className={styles.Register}>
          <p>¿No tienes cuenta?</p>
          <Link to={'/register'}>Registrate</Link>
        </footer>
      </div>
    </section>
  );
};

export default memo(Login);