import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ParticlesBackground from '../../components/ParticlesBackground';
import { useNotification } from '../../hooks/useNotification';
import styles from './inicio.module.css';

const Inicio = () => {
  const user = useSelector(({ user }) => user?.results);

  const notification = useNotification();
  
  useEffect(() => {
    if (user) notification.add({
      message: `Bienvenido ${user.user_info.username}`,
      type: 'success'
    });
  }, []);

  return (
    <section className={styles.SectionHome}>
      <h1 className={styles.WelcomeTitle}>
        <span>Bienvenido a</span> <span className={styles.LogoName}>Systemica</span>
      </h1>
      <div className={styles.WelcomeText}>
        <p>Sistema de administración de proyectos de alfabetización.</p>
        <p>Tratamos de brindarte la mejor experiencia de usuario posible ya si eres estudiante o contratista.</p>
      </div>
      <ParticlesBackground />
    </section>
  );
};

export default memo(Inicio);