import { memo, useEffect, useRef } from 'react';
import logoURL from '../../assets/icons/pencil.svg';
import LogoutIcon from '../HeaderIcons/LogoutIcon';
import UserIcon from '../HeaderIcons/UserIcon';
import styles from './header.module.css';

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      header.classList.toggle(styles.Sticky, window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={styles.Header} ref={headerRef}>
      <div className={styles.LogoName}>
        <img src={logoURL} alt='Systemica' width={40} />
        <h1>Systemica</h1>
      </div>
      <div className={styles.Icons}>
        <UserIcon />
        <LogoutIcon />
      </div>
    </header>
  );
};

export default memo(Header);