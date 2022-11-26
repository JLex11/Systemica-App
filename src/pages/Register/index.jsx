import { memo } from 'react'
import { Link } from 'react-router-dom'
import graduate_icon from '../../assets/icons/graduate_icon.png'
import RegisterForm from '../../components/RegisterForm'

import styles from './register.module.css'

const Register = () => {
  return (
    <section className={styles.RegisterSection}>
      <div className={styles.RegisterContainer}>
        <header className={styles.RegisterHeader}>
          <img src={graduate_icon} />
          <h1 className={styles.RegisterTitle}>Registrate</h1>
        </header>
        <RegisterForm />
        <footer className={styles.Login}>
          <p>¿Tienes una cuenta?</p>
          <Link to={'/login'}>Inicia Sesion</Link>
        </footer>
      </div>
    </section>
  )
}

export default memo(Register)