import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import styles from './cardContratista.module.css'

const CardBody = lazy(()=>import('./CardBody'))
const CardHeader = lazy(()=>import('./CardHeader'))

const CardContratista = ({ contratista }) => {
  const [visible, setVisible] = useState(false)
  const handleVisible = useCallback(() => setVisible(!visible), [visible])

  const alfabetizacion = useSelector(({ alfabetizaciones }) =>
    alfabetizaciones.find(({ id_contratista }) => id_contratista == contratista.id_contratista))

  const tarea = useSelector(({ tareas }) => alfabetizacion
    ? tareas.filter(({ id_alfabetizacion }) => id_alfabetizacion == alfabetizacion.id_alfabetizacion)[0]
    : null
  )

  const establecimiento = useSelector(({ establecimientos }) =>
    establecimientos.filter(({ id_establecimiento }) => id_establecimiento == contratista.id_establecimiento)[0])
  
  return (
    <article className={styles.ContratistaCard}>
      <Suspense fallback={<Loader />}>
        <CardHeader
          contratista={contratista}
          tarea={tarea}
          establecimiento={establecimiento}
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

export default memo(CardContratista)
