import { memo, useEffect } from 'react'
import { BiNavigation } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import styles from './institucionItem.module.css'

const InstitucionItem = ({ institucion }) => {
  const { id } = useParams()
  
  useEffect(() => {
    if (id == institucion.id_institucion_educativa)
      document.getElementById(id).scrollIntoView()
  }, [id])

  return (
    <div className={styles.InstitucionItem} id={institucion.id_institucion_educativa}>
      {institucion.url && (
        <a
          className={styles.NavigateToButton}
          title={`ir a ${institucion.nombre}`}
          href={institucion.url}
          target='_blank' rel='noreferrer'>
          <BiNavigation />
        </a>
      )}
      <Link
        to={`/institucions/${institucion.id_institucion_educativa}`}
        className={styles.Content}>
        <picture className={styles.InstitucionImage}>
          <img
            src={institucion.img_url}
            alt={institucion.nombre}
            loading='lazy'
          />
        </picture>
        <div className={styles.BodyCard}>
          <h3>{institucion.nombre}</h3>
          {institucion.telefono && <p>Contacto: <b>{institucion.telefono}</b></p>}
          {institucion.direccion && <p>Direccion: <b>{institucion.direccion}</b></p>}
        </div>
      </Link>
    </div>
  )
}

export default memo(InstitucionItem)