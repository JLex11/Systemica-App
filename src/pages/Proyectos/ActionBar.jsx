import { memo, useCallback, useState } from 'react';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Form from '../../components/Form';
import SetProyecto from '../../components/SetProyecto';
import { useAlfabetizaciones } from '../../hooks/useAlfabetizaciones';
import { useNotification } from '../../hooks/useNotification';
import styles from './proyectos.module.css';

const ActionBar = () => {
  const [isAdding, setIsAdding] = useState(false);

  const userResults = useSelector(({ user }) => user?.results);
  const alfabetizacionActions = useAlfabetizaciones();

  const notification = useNotification();

  const handleAddProyecto = useCallback(() => setIsAdding(true));

  const handleSubmit = useCallback(({ target: { fecha_inicio, fecha_finalizacion, horas_realizadas, estado, id_alumno, id_contratista }}) => {
    if (horas_realizadas.value.length < 1) {
      notification.add({
        type: 'error',
        message: 'Por favor, complete todos los campos.'
      });
      return;
    }

    if (fecha_finalizacion.value.length <= 0 || Date.parse(fecha_inicio.value) > Date.parse(fecha_finalizacion.value)) {
      notification.add({
        type: 'error',
        message: 'La fecha de finalizacion no debe estar antes de la fecha de inicio'
      });
      return;
    }

    notification.add({ type: 'loading', message: 'Creando proyecto...' });

    alfabetizacionActions.add({
      fecha_inicio: fecha_inicio.value,
      fecha_finalizacion: fecha_finalizacion.value,
      horas_realizadas: horas_realizadas.value,
      estado: estado.value.value,
      id_alumno: id_alumno.value,
      id_contratista: id_contratista.value
    }, userResults.token);
    
    setIsAdding(false);
  });

  return (
    <div className={styles.ActionBar}>
      <div className={styles.ActionsButtons}>
        <button className={styles.AddTareaIcon} onClick={handleAddProyecto}>
          <HiOutlineViewGridAdd />
            Crear proyecto
        </button>
      </div>
      {isAdding && (
        <Form
          onSubmit={handleSubmit}
          submitButtonLabel='Agregar'
          onClose={() => setIsAdding(false)}
          titulo={'Nuevo proyecto'}
        >
          <SetProyecto action='create' />
        </Form>
      )}
    </div>
  );
};

export default memo(ActionBar);