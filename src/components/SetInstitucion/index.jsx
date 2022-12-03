import { memo } from 'react'
import { useField } from '../../hooks/useField'
import styles from './setInstitucion.module.css'

const SetInstitucion = ({ institucion, /* action = 'update' */ }) => {
  const nombre = useField({ type: 'text', defaultValue: institucion?.nombre })
  const direccion = useField({ type: 'text', defaultValue: institucion?.direccion })
  const nit = useField({ type: 'number', defaultValue: institucion?.nit })
  const telefono = useField({ type: 'tel', defaultValue: institucion?.telefono })
  const url = useField({ type: 'text', defaultValue: institucion?.url })
  const img_url = useField({ type: 'text', defaultValue: institucion?.img_url })

  return (
    <div className={styles.ContainerInputs}>
      <header className={styles.Header}>
        <div className={styles.Nombre}>
          <span>Nombre del institucion:</span>
          <input
            name='nombre'
            id='nombre'
            type={nombre.type}
            value={nombre.value}
            onChange={nombre.onChange}
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
          <span>Website del institucion:</span>
          <input
            name='url'
            id='url'
            type={url.type}
            value={url.value}
            onChange={url.onChange}
            placeholder='www.institucion.com | https://www.institucion.com'
          />
        </div>
        <div className={styles.ImgUrl}>
          <span>Imagen/Foto del institucion:</span>
          <input
            name='img_url'
            id='img_url'
            type={img_url.type}
            value={img_url.value}
            onChange={img_url.onChange}
            placeholder='www.institucion.com/foto.png | https://www.institucion.com/foto.jpg'
          />
        </div>
      </header>
    </div>
  )
}

export default memo(SetInstitucion)
