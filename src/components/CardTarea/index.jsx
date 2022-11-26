import clsx from 'clsx'
import { memo } from 'react'
import { AiOutlineDelete, AiOutlineFieldTime } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toRtf } from '../../utils/toRtf'
import styles from './tareaCard.module.css'

const CardTarea = ({ tarea, onEdit, onDelete }) => {
  const user = useSelector(({ user }) => user?.results?.user_info)

  const alfabetizacion = useSelector(({ alfabetizaciones }) =>
    alfabetizaciones.find(({ id_alfabetizacion }) => id_alfabetizacion == tarea.id_alfabetizacion))
  
  const contratista = useSelector(({ contratistas }) => alfabetizacion &&
    contratistas.find(({ id_contratista }) => id_contratista == alfabetizacion.id_contratista))
  
  const alumno = useSelector(({ alumnos }) => alfabetizacion &&
    alumnos.find(({ id_alumno }) => id_alumno == alfabetizacion.id_alumno))
  
  const styleCardTarea = clsx(styles.TareasCard, [
    tarea.tarea_estado == 'En progreso' && styles.CardState_Progress,
    tarea.tarea_estado == 'Finalizado' && styles.CardState_Finalized,
    tarea.tarea_estado == 'Detenido' && styles.CardState_Pending,
    tarea.tarea_estado == 'Cancelado' && styles.CardState_Canceled,
  ])

  return (
    <li key={tarea.id_tarea} className={styleCardTarea}>
      <header className={styles.Header}>
        <div className={styles.TaskDate}>
          <AiOutlineFieldTime />
          <h2>{toRtf(tarea.fecha)}</h2>
        </div>
        <div className={styles.Actions}>
          {user.id_usuario == contratista?.id_usuario && (
            <>
              <button
                onClick={() => onEdit(tarea)}
                className={styles.ActionButton}
                title='Editar tarea'  
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => onDelete(tarea)}
                className={styles.ActionButton}
                title='Eliminar tarea'
              >
                <AiOutlineDelete />
              </button>
            </>
          )}
        </div>
      </header>
      <div className={styles.Body}>
        <header className={styles.BodyHeader}>
          <h3>{tarea.titulo}</h3>
          <h4 className={styles.Estado}>{tarea.tarea_estado}</h4>
        </header>
        <p>{tarea.descripcion}</p>
        <div className={styles.AssingInfo}>
          {contratista &&
            <Link to={`/usuarios/${contratista.id_usuario}`}>
              <h4>designada por: {contratista.nombres}</h4>
            </Link>
          }
          {alumno &&
            <Link to={`/usuarios/${alumno.id_usuario}`}>
              <h4>asignada a: {alumno.nombres}</h4>
            </Link>
          }
        </div>
      </div>
    </li>
  )
}

export default memo(CardTarea)