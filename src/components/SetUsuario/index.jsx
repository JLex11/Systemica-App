import { memo } from 'react'
import { useField } from '../../hooks/useField'
import styles from './setUsuario.module.css'

const SetUsuario = ({ usuario, /* action = 'update' */ }) => {
  const edad = useField({ type: 'number', defaultValue: usuario?.edad })
  const nombres = useField({ type: 'text', defaultValue: usuario?.nombres })
  const apellidos = useField({ type: 'text', defaultValue: usuario?.apellidos })
  const nro_documento = useField({ type: 'number', defaultValue: usuario?.nro_documento })
  const telefono = useField({ type: 'tel', defaultValue: usuario?.telefono })

  return (
    <div className={styles.ContainerInputs}>
      <header className={styles.Header}>
        <div>
          <span>Nombres:</span>
          <input
            name='nombres'
            id='nombres'
            placeholder='Nombres'
            type={nombres.type}
            onChange={nombres.onChange}
            value={nombres.value}
          />
        </div>
        <div>
          <span>Apellidos:</span>
          <input
            name='apellidos'
            id='apellidos'
            placeholder='Apellidos'
            type={apellidos.type}
            onChange={apellidos.onChange}
            value={apellidos.value}
          />
        </div>
        <div>
          <span>Edad:</span>
          <input
            name='edad'
            id='edad'
            placeholder='Edad'
            type={edad.type}
            onChange={edad.onChange}
            value={edad.value}
          />
        </div>
        <div>
          <span>Documento:</span>
          <input
            name='nro_documento'
            id='nro_documento'
            placeholder='Documento'
            type={nro_documento.type}
            onChange={nro_documento.onChange}
            value={nro_documento.value}
          />
        </div>
        <div>
          <span>Telefono:</span>
          <input
            name='telefono'
            id='telefono'
            placeholder='Telefono'
            type={telefono.type}
            onChange={telefono.onChange}
            value={telefono.value}
          />
        </div>
      </header>
    </div>
  )
}

export default memo(SetUsuario)
