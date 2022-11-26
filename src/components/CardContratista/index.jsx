import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import CardBody from './CardBody';
import styles from './cardContratista.module.css';
import CardHeader from './CardHeader';

const CardContratista = ({ contratista }) => {
  const [visible, setVisible] = useState(false);
  const handleVisible = useCallback(() => setVisible(!visible), [visible]);

  const alfabetizacion = useSelector(({ alfabetizaciones }) =>
    alfabetizaciones.find(({ id_contratista }) => id_contratista == contratista.id_contratista));

  const tarea = useSelector(({ tareas }) => alfabetizacion
    ? tareas.filter(({ id_alfabetizacion }) => id_alfabetizacion == alfabetizacion.id_alfabetizacion)[0]
    : null
  );

  const establecimiento = useSelector(({ establecimientos }) =>
    establecimientos.filter(({ id_establecimiento }) => id_establecimiento == contratista.id_establecimiento)[0]);
  
  return (
    <article className={styles.ContratistaCard}>
      <CardHeader
        contratista={contratista}
        tarea={tarea}
        establecimiento={establecimiento}
        handleVisible={handleVisible}
      />
      {
        tarea && (
          <CardBody
            tarea={tarea}
            visible={visible}
            handleVisible={handleVisible}
          />
        )
      }
    </article>
  );
};

export default memo(CardContratista);
