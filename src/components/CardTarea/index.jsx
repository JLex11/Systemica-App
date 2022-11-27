import clsx from 'clsx'
import { lazy, memo, Suspense } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import styles from './tareaCard.module.css'
const CardBody = lazy(()=>import('./CardBody'))
const CardHeader = lazy(()=>import('./CardHeader'))

const CardTarea = ({ tarea, onEdit, onDelete }) => {
  const user = useSelector(({ user }) => user?.results?.user_info)

  const alfabetizacion = useSelector(({ alfabetizaciones }) =>
    alfabetizaciones.find(
      ({ id_alfabetizacion }) => id_alfabetizacion == tarea.id_alfabetizacion
    )
  )

  const contratista = useSelector(({ contratistas }) => alfabetizacion &&
      contratistas.find(
        ({ id_contratista }) => id_contratista == alfabetizacion.id_contratista
      )
  )

  const alumno = useSelector(({ alumnos }) => alfabetizacion &&
      alumnos.find(({ id_alumno }) => id_alumno == alfabetizacion.id_alumno)
  )

  const styleCardTarea = clsx(styles.TareasCard, [
    tarea.tarea_estado == 'En progreso' && styles.CardState_Progress,
    tarea.tarea_estado == 'Finalizado' && styles.CardState_Finalized,
    tarea.tarea_estado == 'Detenido' && styles.CardState_Pending,
    tarea.tarea_estado == 'Cancelado' && styles.CardState_Canceled,
  ])

  return (
    <li key={tarea.id_tarea} className={styleCardTarea}>
      <Suspense fallback={<Loader />}>
        <CardHeader
          id_usuario={user.id_usuario}
          contratista={contratista}
          tarea={tarea}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <CardBody contratista={contratista} alumno={alumno} tarea={tarea} />
      </Suspense>
    </li>
  )
}

export default memo(CardTarea)
