import { memo, useCallback } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './headerIcons.module.css';

const LogoutIcon = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = useSelector(({ user }) => user?.results);

  const handleLogout = useCallback(() => {
    auth.Logout();
    navigate('/login');
  });
  
  return (
    <>
      {user?.token && (
        <button onClick={handleLogout} className={styles.LogoutIcon}>
          <FiLogOut />
        </button>
      )}
    </>
  );
};

export default memo(LogoutIcon);