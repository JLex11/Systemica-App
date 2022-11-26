import { memo } from 'react'
import { BsChevronDown, BsListTask } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './cardContratista.module.css'

const CardHeader = ({ contratista, tarea, establecimiento, handleVisible }) => {
  return (
    <div className={styles.CardHeader}>
      <picture className={styles.Foto}>
        <Link to={contratista.foto_url} target='_blank'>
          <img
            src={contratista.foto_url}
            alt={contratista.nombres}
            loading='lazy'
          />
        </Link>
        <span className={styles.Edad}>{contratista.edad} años</span>
      </picture>
      <div>
        <Link to={`/usuarios/${contratista.id_usuario}`}>
          <h3 className={styles.Nombre}>{contratista.nombres} {contratista.apellidos}</h3>
        </Link>
        {establecimiento && (
          <Link to={`/establecimientos/${establecimiento.id_establecimiento}`}>
            <span className={styles.Establecimiento}>{establecimiento.nombre}</span>
          </Link>
        )}
        {tarea && (
          <button type='button' className={styles.TaskLabel} onClick={handleVisible}>
            <BsListTask className={styles.TaskIcon} />
            <span>Tarea Reciente designada</span>
            <BsChevronDown className={styles.TaskIcon} />
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(CardHeader)