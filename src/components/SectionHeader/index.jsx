import { memo } from 'react';
import styles from './sectionHeader.module.css';

const SectionHeader = ({ title, children }) => {
  return (
    <div className={styles.SectionHeader}>
      <h2 className={styles.SectionTitle}>{title}</h2>
      {children}
    </div>
  );
};

export default memo(SectionHeader);