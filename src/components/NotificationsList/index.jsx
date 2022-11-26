import { memo } from 'react';
import { useSelector } from 'react-redux';
import Notification from './Notification';
import styles from './notification.module.css';

const NotificationsList = () => {
  const notifications = useSelector(({ notifications }) => notifications);

  return (
    <>
      {notifications.length > 0 && (<div className={styles.NotificationsContainer}>
        <ul className={styles.NotificationsList}>
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
            />
          ))}
        </ul>
      </div>)}
    </>
  );
};

export default memo(NotificationsList);
