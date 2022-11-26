import { memo } from 'react'
import { Link } from 'react-router-dom'
import StateLabel from '../StateLabel'
import TareasCarousel from '../TareasCarousel'
import styles from './cardProyecto.module.css'

const CardBody = ({ alumno, proyecto, contratista, tareas }) => {
  return (
    <div className={styles.CardBody}>
      <Link
        to={`/usuarios/${alumno?.id_usuario}`}
        className={styles.InfoAlumno}
      >
        <h5 className={styles.Nombres}>
          {alumno?.nombres} {alumno?.apellidos}
        </h5>
        <span className={styles.curso}>
          {alumno?.curso} - {alumno?.grupo}
        </span>
      </Link>
      <div className={styles.AlfEstado}>
        <span>Estado actual del proyecto:</span>
        <StateLabel state={proyecto.estado} />
      </div>
      <Link
        to={`/usuarios/${contratista?.id_usuario}`}
        className={styles.InfoAlumno}
      >
        <span>Contratista:</span>
        <h5 className={styles.Nombres}>
          {contratista?.nombres} {contratista?.apellidos}
        </h5>
      </Link>
      <div className={styles.Footer}>
        <p className={styles.Horas}>
          Horas realizadas: {proyecto.horas_realizadas}/80
        </p>
        <span>Tareas: {tareas?.length}</span>
      </div>
      {tareas?.length > 0 ? (
        <TareasCarousel tareas={tareas} />
      ) : (
        <h5>No hay tareas</h5>
      )}
    </div>
  )
}

export default memo(CardBody)