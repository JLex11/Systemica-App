import { memo, useCallback, useState } from 'react';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Form from '../../components/Form';
import SetEstablecimiento from '../../components/SetEstablecimiento';
import { useEstablecimientos } from '../../hooks/useEstablecimientos';
import { useNotification } from '../../hooks/useNotification';
import styles from './establecimientos.module.css';

const ActionBar = () => {
  const [isAdding, setIsAdding] = useState(false);

  const userResults = useSelector(({ user }) => user?.results);
  const establecimientoActions = useEstablecimientos();

  const notification = useNotification();

  const handleAddEstablecimiento = useCallback(() => setIsAdding(true));

  const handleSubmit = useCallback(({ target: { nombre, tipo, direccion, nit, telefono, url, img_url }}) => {
    notification.add({ type: 'loading', message: 'Creando establecimiento...' });
    establecimientoActions.add({
      nombre: nombre.value,
      tipo: tipo.value,
      direccion: direccion.value,
      nit: nit.value,
      telefono: telefono.value,
      url: url.value,
      img_url: img_url.value
    }, userResults.token);
    
    setIsAdding(false);
  });

  return (
    <div className={styles.ActionBar}>
      <div className={styles.ActionsButtons}>
        {userResults.user_info.rol == 'contratista' && (
          <button className={styles.AddTareaIcon} onClick={handleAddEstablecimiento}>
            <HiOutlineViewGridAdd />
            Agregar establecimiento
          </button>
        )}
      </div>
      {isAdding && (
        <Form
          onSubmit={handleSubmit}
          submitButtonLabel='Agregar'
          onClose={() => setIsAdding(false)}
          titulo={'Nuevo establecimiento'}
        >
          <SetEstablecimiento action='create' />
        </Form>
      )}
    </div>
  );
};

export default memo(ActionBar);