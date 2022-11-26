import clsx from 'clsx';
import { memo, useCallback, useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineExclamationCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { TailSpin } from 'react-loader-spinner';
import { useNotification } from '../../hooks/useNotification';
import styles from './notification.module.css';

function Notification({ notification }) {
  const [closing, setClosing] = useState(false);
  const notificationAction = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => handleCloseClick(), 2500);
    return () => clearTimeout(timer);
  }, []);

  const types = {
    success: {
      className: styles.Success,
      icon: <AiOutlineCheckCircle className={styles.icon} />,
    },
    error: {
      className: styles.Error,
      icon: <AiOutlineExclamationCircle className={styles.icon} />,
    },
    info: {
      className: styles.Info,
      icon: <AiOutlineInfoCircle className={styles.icon} />,
    },
    loading: {
      className: styles.Loading,
      icon: (
        <TailSpin width={40} height={25} color='#fff' className={styles.icon} />
      ),
    },
  };

  const handleCloseClick = useCallback(() => {
    if (!closing) {
      setClosing(true);
      setTimeout(() => notificationAction.remove(notification.id), 300);
    }
  }, [closing]);

  const Nstyles = clsx(styles.Notification, [
    types[notification.type].className,
    closing && styles.Closing,
  ]);

  return (
    <>
      {!closing && (<div className={Nstyles}>
        {types[notification.type].icon}
        <span>{notification.message}</span>
        <AiOutlineClose className={styles.icon} onClick={handleCloseClick} />
      </div>)}
    </>
  );
}

export default memo(Notification);