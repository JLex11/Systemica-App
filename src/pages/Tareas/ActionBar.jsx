import { memo, useCallback, useState } from 'react';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Form from '../../components/Form';
import SetTarea from '../../components/SetTarea';
import { useNotification } from '../../hooks/useNotification';
import { useTareas } from '../../hooks/useTareas';
import styles from './tareas.module.css';

const ActionBar = () => {
  const [isAdding, setIsAdding] = useState(false);

  const userResults = useSelector(({ user }) => user?.results);
  const tareaActions = useTareas();

  const notification = useNotification();

  const handleAddTarea = useCallback(() => setIsAdding(true));

  const handleSubmit = useCallback(({ target: { titulo, descripcion, tarea_estado, id_alfabetizacion }}) => {
    if (titulo.value.length < 1 || descripcion.value.length < 1) {
      notification.add({
        type: 'error',
        message: 'Por favor, complete todos los campos.'
      });
      return;
    }

    notification.add({ type: 'loading', message: 'Creando tarea...' });

    tareaActions.add({
      titulo: titulo.value.replace(/\n+/, ' ').trim(),
      descripcion: descripcion.value.replace(/\n+/, ' ').trim(),
      tarea_estado: tarea_estado.value,
      id_alfabetizacion: id_alfabetizacion.value,
      fecha: new Date().toISOString().slice(0, 10),
    }, userResults.token);
    
    setIsAdding(false);
  });

  return (
    <div className={styles.ActionBar}>
      {userResults?.user_info.rol == 'contratista' && (
        <div className={styles.ActionsButtons}>
          <button className={styles.AddTareaIcon} onClick={handleAddTarea}>
            <HiOutlineViewGridAdd />
            Designar tarea
          </button>
        </div>
      )}
      {isAdding && (
        <Form
          onSubmit={handleSubmit}
          submitButtonLabel='Agregar'
          onClose={() => setIsAdding(false)}
        >
          <SetTarea action='create' />
        </Form>
      )}
    </div>
  );
};

export default memo(ActionBar);