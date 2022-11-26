import clsx from 'clsx';
import { memo } from 'react';
import styles from './stateLabel.module.css';

const StateLabel = ({ state }) => {
  const alfState = clsx(styles.State, [
    state == 'En progreso' && styles.State_Progress,
    state == 'Finalizado' && styles.State_Finalized,
    state == 'Detenido' && styles.State_Pending,
    state == 'Cancelado' && styles.State_Canceled,
  ]);

  return (
    <span className={alfState}>{state}</span>
  );
};

export default memo(StateLabel);