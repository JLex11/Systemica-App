import { memo } from 'react';
import { useField } from '../../hooks/useField';
import styles from './setEstablecimiento.module.css';

const SetEstablecimiento = ({ establecimiento, /* action = 'update' */ }) => {
  const nombre = useField({ type: 'text', defaultValue: establecimiento?.nombre });
  const tipo = useField({ type: 'text', defaultValue: establecimiento?.tipo });
  const direccion = useField({ type: 'text', defaultValue: establecimiento?.direccion });
  const nit = useField({ type: 'number', defaultValue: establecimiento?.nit });
  const telefono = useField({ type: 'tel', defaultValue: establecimiento?.telefono });
  const url = useField({ type: 'text', defaultValue: establecimiento?.url });
  const img_url = useField({ type: 'text', defaultValue: establecimiento?.img_url });

  return (
    <div className={styles.ContainerInputs}>
      <header className={styles.Header}>
        <div className={styles.Nombre}>
          <span>Nombre del establecimiento:</span>
          <input
            name='nombre'
            id='nombre'
            type={nombre.type}
            value={nombre.value}
            onChange={nombre.onChange}
            require='true'
          />
        </div>
        <div className={styles.Tipo}>
          <span>Tipo de establecimiento:</span>
          <input
            name='tipo'
            id='tipo'
            type={tipo.type}
            value={tipo.value}
            onChange={tipo.onChange}
            placeholder='Universidad publica, Biblioteca municipal, etc.'
            require='true'
          />
        </div>
        <div className={styles.Direccion}>
          <span>Direccion:</span>
          <input
            name='direccion'
            id='direccion'
            type={direccion.type}
            value={direccion.value}
            onChange={direccion.onChange}
            placeholder='Cra 64, medellin'
            require='true'
          />
        </div>
        <div className={styles.Nit}>
          <span>Nit:</span>
          <input
            name='nit'
            id='nit'
            type={nit.type}
            value={nit.value}
            onChange={nit.onChange}
            placeholder='XXXX-XXXX'
            require='true'
          />
        </div>
        <div className={styles.Telefono}>
          <span>Telefono:</span>
          <input
            name='telefono'
            id='telefono'
            type={telefono.type}
            value={telefono.value}
            onChange={telefono.onChange}
            placeholder='018000XXXXX XXX'
            require='true'
          />
        </div>
        <div className={styles.Url}>
          <span>Website del establecimiento:</span>
          <input
            name='url'
            id='url'
            type={url.type}
            value={url.value}
            onChange={url.onChange}
            placeholder='www.establecimiento.com | https://www.establecimiento.com'
          />
        </div>
        <div className={styles.ImgUrl}>
          <span>Imagen/Foto del establecimiento:</span>
          <input
            name='img_url'
            id='img_url'
            type={img_url.type}
            value={img_url.value}
            onChange={img_url.onChange}
            placeholder='www.establecimiento.com/foto.png | https://www.establecimiento.com/foto.jpg'
          />
        </div>
      </header>
    </div>
  );
};

export default memo(SetEstablecimiento);
