import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import styles from './cardAlumno.module.css'

const CardHeader = lazy(() => import('./CardHeader'))
const CardBody = lazy(() => import('./CardBody'))

const CardAlumno = ({ alumno }) => {
  const [visible, setVisible] = useState(false)
  const handleVisible = useCallback(() => setVisible(!visible), [visible])
  
  const alfabetizacion = useSelector(({ alfabetizaciones }) =>
    alfabetizaciones.find(({ id_alumno }) => id_alumno == alumno.id_alumno))

  const tarea = useSelector(({ tareas }) => alfabetizacion
    ? tareas.filter(({ id_alfabetizacion }) => id_alfabetizacion == alfabetizacion.id_alfabetizacion)[0]
    : null
  )
  
  const curso = {
    id_curso: alumno.id_curso,
    curso: alumno.curso,
    grupo: alumno.grupo,
  }
  
  return (
    <article className={styles.AlumnoCard}>
      <Suspense fallback={<Loader />}>
        <CardHeader
          alumno={alumno}
          alfabetizacion={alfabetizacion}
          tarea={tarea}
          curso={curso}
          handleVisible={handleVisible}
        />
        {
          tarea && (
            <CardBody
              tarea={tarea}
              visible={visible}
              handleVisible={handleVisible}
            />
          )
        }
      </Suspense>
    </article>
  )
}

export default memo(CardAlumno)
