import { memo, useEffect } from 'react'
import { BiNavigation } from 'react-icons/bi'
import { BsTagFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import styles from './establecimientoItem.module.css'

const EstablecimientoItem = ({ establecimiento }) => {
  const { id } = useParams()
  
  useEffect(() => {
    if (id == establecimiento.id_establecimiento)
      document.getElementById(id).scrollIntoView()
  }, [id])

  return (
    <div className={styles.EstablecimientoItem} id={establecimiento.id_establecimiento}>
      {establecimiento.url && (
        <a
          className={styles.NavigateToButton}
          title={`ir a ${establecimiento.nombre}`}
          href={establecimiento.url}
          target='_blank' rel='noreferrer'>
          <BiNavigation />
        </a>
      )}
      <Link
        to={`/establecimientos/${establecimiento.id_establecimiento}`}
        className={styles.Content}>
        <picture className={styles.EstablecimientoImage}>
          <img
            src={establecimiento.img_url}
            alt={establecimiento.nombre}
            loading='lazy'
          />
        </picture>
        <div className={styles.BodyCard}>
          <h3>{establecimiento.nombre}</h3>
          <p>Contacto: <b>{establecimiento.telefono}</b></p>
          <p>Direccion: <b>{establecimiento.direccion}</b></p>
          <span className={styles.Tag}>
            <BsTagFill />
            {establecimiento.tipo}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default memo(EstablecimientoItem)