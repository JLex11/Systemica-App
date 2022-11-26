import { memo } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './headerIcons.module.css';

const UserIcon = () => {
  const user = useSelector(({ user }) => user?.results);

  return (
    <>
      {user?.token && (
        <Link to={`/usuarios/${user.user_info.id_usuario}`} className={styles.UserIcon}>
          <FaUserCircle className={styles.Icon} />
          <span>{user.user_info.username}</span>
        </Link>
      )}
    </>
  );
};

export default memo(UserIcon);