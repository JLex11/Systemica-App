import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { toRtf } from '../../utils/toRtf';
import styles from './cardContratista.module.css';

const CardBody = ({ tarea, visible, handleVisible }) => {
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.animate(bodyFrames, bodyTiming);
  }, [visible]);
  
  const bodyFrames = [
    { transform: 'translateY(60%)' },
    { transform: 'translateY(0)' },
  ];
  
  const bodyTiming = {
    duration: 500,
    easing: 'ease-in-out',
  };

  const cardBody = clsx(styles.CardBody, visible && styles.CardBody_Visible);

  return (
    <div className={cardBody} ref={bodyRef} id='cardBody'>
      <header className={styles.CardBody_Header}>
        <div className={styles.TaskDate}>
          <AiOutlineFieldTime />
          <h2>{toRtf(tarea.fecha)}</h2>
        </div>
        <div className={styles.CloseButton} onClick={handleVisible}>
          <GrClose />
        </div>
      </header>
      <Link to={`/tareas/${tarea.id_tarea}`} className={styles.Tarea_Reciente}>
        <div className={styles.Tarea_Content}>
          <div className={styles.Tarea_Titulo}>
            <h4>{tarea.titulo}</h4>
          </div>
          <p className={styles.Tarea_Description}>{tarea.descripcion}</p>
        </div>
      </Link>
    </div>
  );
};

export default memo(CardBody);