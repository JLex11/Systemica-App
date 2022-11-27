import { memo } from 'react'
import { Link } from 'react-router-dom'
import styles from './tareaCard.module.css'

function CardBody(props) {
  return (
    <div className={styles.Body}>
      <header className={styles.BodyHeader}>
        <h3>{props.tarea.titulo}</h3>
        <h4 className={styles.Estado}>{props.tarea.tarea_estado}</h4>
      </header>
      <p>{props.tarea.descripcion}</p>
      <div className={styles.AssingInfo}>
        {props.contratista && (
          <Link to={`/usuarios/${props.contratista.id_usuario}`}>
            <h4>designada por: {props.contratista.nombres}</h4>
          </Link>
        )}
        {props.alumno && (
          <Link to={`/usuarios/${props.alumno.id_usuario}`}>
            <h4>asignada a: {props.alumno.nombres}</h4>
          </Link>
        )}
      </div>
    </div>
  )
}

export default memo(CardBody)