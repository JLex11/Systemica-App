import clsx from 'clsx'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import CardBody from './CardBody'
import CardHeader from './CardHeader'
import styles from './cardProyecto.module.css'



const CardProyecto = ({ proyecto, onEdit, onDelete, handleReport }) => {
  const user = useSelector(({ user }) => user?.results?.user_info)

  const alumno = useSelector(({ alumnos }) =>
    alumnos.find(({ id_alumno }) => id_alumno == proyecto.id_alumno)
  )

  const tareas = useSelector(({ tareas }) =>
    tareas.filter(
      ({ id_alfabetizacion }) => id_alfabetizacion == proyecto.id_alfabetizacion
    )
  )

  const contratista = useSelector(({ contratistas }) =>
    contratistas.find(
      ({ id_contratista }) => id_contratista == proyecto.id_contratista
    )
  )

  const styleCardProyecto = clsx(styles.CardProyecto, [
    proyecto.estado == 'En progreso' && styles.CardState_Progress,
    proyecto.estado == 'Finalizado' && styles.CardState_Finalized,
    proyecto.estado == 'Detenido' && styles.CardState_Pending,
    proyecto.estado == 'Cancelado' && styles.CardState_Canceled,
  ])

  const activeActions =
    user.id_usuario == contratista.id_usuario && user.rol == 'contratista'

  return (
    <li className={styleCardProyecto}>
      <CardHeader
        alumno={alumno}
        tareas={tareas}
        contratista={contratista}
        proyecto={proyecto}
        activeActions={activeActions}
        onEdit={onEdit}
        onDelete={onDelete}
        handleReport={handleReport}
      />
      <CardBody
        alumno={alumno}
        tareas={tareas}
        contratista={contratista}
        proyecto={proyecto}
      />
    </li>
  )
}

export default memo(CardProyecto)
