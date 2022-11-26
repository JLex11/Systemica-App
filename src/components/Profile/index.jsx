import { memo } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import styles from './profile.module.css';

const Profile = ({ usuario, handleEdit }) => {
  const { nombres, apellidos, edad, foto_url, email, username } = usuario;

  const results = useSelector(({ user }) => user?.results);

  const hasOwner = results?.user_info.id_usuario == usuario.id_usuario;

  return (
    <section className={styles.Profile}>
      {hasOwner && (
        <button className={styles.SettingsButton} onClick={handleEdit}>
          <FiEdit2 />
        </button>
      )}
      <picture className={styles.Foto}>
        <img src={foto_url} alt={nombres} width='150px' loading='lazy' />
      </picture>
      <div className={styles.Body}>
        <div className={styles.Usuario}>
          <h4>@{username}</h4>
        </div>
        <p>{email}</p>
        <span>{edad} años</span>
        <h5>{nombres} {apellidos}</h5>
      </div>
    </section>
  );
};

export default memo(Profile);